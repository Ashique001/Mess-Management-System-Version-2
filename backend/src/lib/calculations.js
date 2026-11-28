// All the maths of the app, ported from the SQL queries of the desktop version.
// Pure functions: money comes in as whole paisa and goes out in taka.
//
// Meal rate = market cost / number of meals.
// Balance   = deposit - (meals x meal rate), for the chosen period only.

import { datesBetween } from './dates.js'

export const toTaka = (paisa) => paisa / 100

export const mealRate = (marketPaisa, mealCount) =>
  mealCount > 0 ? toTaka(marketPaisa) / mealCount : 0

export const sortByName = (members) =>
  [...members].sort((a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id))

const NO_MEALS = { lunch: 0, dinner: 0 }

function periodTotals(marketPaisa, mealCounts) {
  let mealCount = 0
  for (const { lunch, dinner } of mealCounts.values()) mealCount += lunch + dinner
  return {
    marketCost: toTaka(marketPaisa),
    mealCount,
    rate: mealRate(marketPaisa, mealCount),
  }
}

/**
 * Settlement report. Lists active members, plus inactive members who ate or
 * deposited in the period, so that the rows always add up to the totals.
 *
 * mealCounts:    Map of member id to { lunch, dinner }
 * depositTotals: Map of member id to paisa
 */
export function memberReport({ members, mealCounts, depositTotals, marketPaisa }) {
  const totals = periodTotals(marketPaisa, mealCounts)
  const rows = sortByName(members).flatMap((member) => {
    const { lunch, dinner } = mealCounts.get(member.id) ?? NO_MEALS
    const meals = lunch + dinner
    if (!member.active && meals === 0 && !depositTotals.has(member.id)) return []

    const cost = meals * totals.rate
    const deposit = toTaka(depositTotals.get(member.id) ?? 0)
    return [{ ...member, meals, cost, deposit, balance: deposit - cost }]
  })
  return { ...totals, rows }
}

/**
 * Per-member lunch and dinner counts, and the day-by-day sheet.
 *
 * mealDays: [{ memberId, date, lunch, dinner }] within the period
 */
export function monthlyOverview({ members, mealDays, marketPaisa, from, to }) {
  const taken = new Map()
  const mealCounts = new Map()
  for (const day of mealDays) {
    taken.set(`${day.memberId}|${day.date}`, day)
    const count = mealCounts.get(day.memberId) ?? { ...NO_MEALS }
    count.lunch += day.lunch ? 1 : 0
    count.dinner += day.dinner ? 1 : 0
    mealCounts.set(day.memberId, count)
  }
  const totals = periodTotals(marketPaisa, mealCounts)

  // Active members, plus inactive members who ate in the period.
  const listed = sortByName(members.filter((m) => m.active || mealCounts.has(m.id)))

  const summary = listed.map((member) => {
    const { lunch, dinner } = mealCounts.get(member.id) ?? NO_MEALS
    const total = lunch + dinner
    return {
      ...member,
      lunch,
      dinner,
      total,
      share: totals.mealCount > 0 ? (total / totals.mealCount) * 100 : 0,
    }
  })

  const days = datesBetween(from, to).map((date) => {
    const cells = listed.map((member) => {
      const day = taken.get(`${member.id}|${date}`)
      return { memberId: member.id, lunch: day?.lunch ? 1 : 0, dinner: day?.dinner ? 1 : 0 }
    })
    return { date, cells, total: cells.reduce((sum, c) => sum + c.lunch + c.dinner, 0) }
  })

  return {
    ...totals,
    activeMembers: members.filter((m) => m.active).length,
    summary,
    days,
  }
}

/**
 * The newest deposits, market expenses and meals. Each list must already hold
 * the newest `limit` records of its kind.
 */
export function recentActivities({ deposits, expenses, mealDays, names }, limit = 15) {
  const nameOf = (id) => names.get(id) ?? 'Unknown'
  const activities = [
    ...deposits.map((d) => ({
      key: `deposit-${d.id}`,
      type: 'Deposit',
      description: `${nameOf(d.memberId)} deposited money`,
      date: d.date,
      amount: toTaka(d.amountPaisa),
    })),
    ...expenses.map((e) => ({
      key: `expense-${e.id}`,
      type: 'Market Expense',
      description: e.description,
      date: e.date,
      amount: toTaka(e.amountPaisa),
    })),
    ...mealDays.flatMap((day) =>
      ['Lunch', 'Dinner']
        .filter((type) => day[type.toLowerCase()])
        .map((type) => ({
          key: `meal-${day.memberId}-${day.date}-${type}`,
          type: 'Meal',
          description: `${nameOf(day.memberId)} - ${type}`,
          date: day.date,
          amount: null,
        })),
    ),
  ]
  // Newest first. Within a day the order above is kept: money before meals.
  return activities.sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit)
}
