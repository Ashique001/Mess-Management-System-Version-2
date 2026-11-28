// Reads what the reports need from the database. The maths is in
// lib/calculations.js. Every query is limited to one mess.

import {
  mealRate,
  memberReport,
  monthlyOverview,
  recentActivities,
  toTaka,
} from '../lib/calculations.js'
import { Deposit } from '../models/Deposit.js'
import { Expense } from '../models/Expense.js'
import { MealDay } from '../models/MealDay.js'
import { Member } from '../models/Member.js'

const period = (messId, from, to) => ({ messId, date: { $gte: from, $lte: to } })

const countIf = (field) => ({ $sum: { $cond: [field, 1, 0] } })

async function listMembers(messId) {
  const members = await Member.find({ messId }).lean()
  return members.map((m) => ({ id: String(m._id), name: m.name, active: m.active }))
}

async function totalPaisa(Model, match) {
  const [result] = await Model.aggregate([
    { $match: match },
    { $group: { _id: null, total: { $sum: '$amountPaisa' } } },
  ])
  return result?.total ?? 0
}

export async function settlementReport(messId, from, to) {
  const $match = period(messId, from, to)
  const [members, meals, deposits, marketPaisa] = await Promise.all([
    listMembers(messId),
    MealDay.aggregate([
      { $match },
      { $group: { _id: '$memberId', lunch: countIf('$lunch'), dinner: countIf('$dinner') } },
    ]),
    Deposit.aggregate([
      { $match },
      { $group: { _id: '$memberId', total: { $sum: '$amountPaisa' } } },
    ]),
    totalPaisa(Expense, $match),
  ])
  return memberReport({
    members,
    mealCounts: new Map(meals.map((m) => [String(m._id), m])),
    depositTotals: new Map(deposits.map((d) => [String(d._id), d.total])),
    marketPaisa,
  })
}

export async function monthlyReport(messId, from, to) {
  const match = period(messId, from, to)
  const [members, mealDays, marketPaisa] = await Promise.all([
    listMembers(messId),
    MealDay.find(match).lean(),
    totalPaisa(Expense, match),
  ])
  return monthlyOverview({
    members,
    mealDays: mealDays.map((d) => ({ ...d, memberId: String(d.memberId) })),
    marketPaisa,
    from,
    to,
  })
}

const LATEST = 15

/** All-time totals and the latest activities. */
export async function dashboardReport(messId) {
  const newest = (Model) =>
    Model.find({ messId }).sort({ date: -1, _id: -1 }).limit(LATEST).lean()
  const normalise = (rows) =>
    rows.map((r) => ({ ...r, id: String(r._id), memberId: String(r.memberId) }))

  const [members, depositPaisa, expensePaisa, meals, deposits, expenses, mealDays] =
    await Promise.all([
      listMembers(messId),
      totalPaisa(Deposit, { messId }),
      totalPaisa(Expense, { messId }),
      MealDay.aggregate([
        { $match: { messId } },
        { $group: { _id: null, lunch: countIf('$lunch'), dinner: countIf('$dinner') } },
      ]),
      newest(Deposit),
      newest(Expense),
      newest(MealDay),
    ])

  const totalMeals = meals.length ? meals[0].lunch + meals[0].dinner : 0
  return {
    activeMembers: members.filter((m) => m.active).length,
    totalDeposit: toTaka(depositPaisa),
    totalExpense: toTaka(expensePaisa),
    totalMeals,
    rate: mealRate(expensePaisa, totalMeals),
    recentActivities: recentActivities(
      {
        deposits: normalise(deposits),
        expenses: normalise(expenses),
        mealDays: normalise(mealDays),
        names: new Map(members.map((m) => [m.id, m.name])),
      },
      LATEST,
    ),
  }
}
