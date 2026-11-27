// All the maths of the app, ported from the SQL queries of the desktop version.
// Pure functions: they take the data and return what a page needs to show.

import { datesBetween } from './format.js'

const inRange = (date, from, to) => date >= from && date <= to

// Add money in whole paisa so that decimals do not drift.
export const sumAmounts = (rows) =>
  rows.reduce((total, row) => total + Math.round(row.amount * 100), 0) / 100

export const mealRate = (marketCost, mealCount) =>
  mealCount > 0 ? marketCost / mealCount : 0

export const sortByName = (members) =>
  [...members].sort((a, b) => a.name.localeCompare(b.name) || a.id - b.id)

/** Market cost, number of meals and meal rate for a period. */
export function periodTotals(data, from, to) {
  const marketCost = sumAmounts(data.expenses.filter((e) => inRange(e.date, from, to)))
  const mealCount = data.meals.filter((m) => inRange(m.date, from, to)).length
  return { marketCost, mealCount, rate: mealRate(marketCost, mealCount) }
}

/** The 15 newest deposits, market expenses and meals. */
export function recentActivities(data, limit = 15) {
  const names = new Map(data.members.map((m) => [m.id, m.name]))
  const activities = [
    ...data.deposits.map((d) => ({
      key: `deposit-${d.id}`,
      type: 'Deposit',
      description: `${names.get(d.memberId) ?? 'Unknown'} deposited money`,
      date: d.date,
      amount: d.amount,
    })),
    ...data.expenses.map((e) => ({
      key: `expense-${e.id}`,
      type: 'Market Expense',
      description: e.description || 'Market expense',
      date: e.date,
      amount: e.amount,
    })),
    ...data.meals.map((m) => ({
      key: `meal-${m.memberId}-${m.date}-${m.type}`,
      type: 'Meal',
      description: `${names.get(m.memberId) ?? 'Unknown'} - ${m.type}`,
      date: m.date,
      amount: null,
    })),
  ]
  // Newest first. Within a day the order above is kept: money before meals.
  return activities.sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit)
}

/** All-time figures shown on the dashboard. */
export function dashboardSummary(data) {
  const totalExpense = sumAmounts(data.expenses)
  return {
    activeMembers: data.members.filter((m) => m.active).length,
    totalDeposit: sumAmounts(data.deposits),
    totalExpense,
    totalMeals: data.meals.length,
    rate: mealRate(totalExpense, data.meals.length),
  }
}

/**
 * Settlement report. Lists active members, plus inactive members who ate or
 * deposited in the period, so that the rows always add up to the totals.
 */
export function memberReport(data, from, to) {
  const totals = periodTotals(data, from, to)
  const rows = sortByName(data.members).flatMap((member) => {
    const meals = data.meals.filter(
      (m) => m.memberId === member.id && inRange(m.date, from, to),
    ).length
    const deposits = data.deposits.filter(
      (d) => d.memberId === member.id && inRange(d.date, from, to),
    )
    if (!member.active && meals === 0 && deposits.length === 0) return []

    const cost = meals * totals.rate
    const deposit = sumAmounts(deposits)
    return [{
      id: member.id,
      name: member.name,
      active: member.active,
      meals,
      cost,
      deposit,
      balance: deposit - cost,
    }]
  })
  return { ...totals, rows }
}

/** Per-member lunch and dinner counts, and the day-by-day sheet. */
export function monthlyOverview(data, from, to) {
  const totals = periodTotals(data, from, to)
  const taken = new Set()
  const counts = new Map()
  for (const meal of data.meals) {
    if (!inRange(meal.date, from, to)) continue
    taken.add(`${meal.memberId}|${meal.date}|${meal.type}`)
    const count = counts.get(meal.memberId) ?? { Lunch: 0, Dinner: 0 }
    count[meal.type] += 1
    counts.set(meal.memberId, count)
  }

  // Active members, plus inactive members who ate in the period.
  const members = sortByName(data.members.filter((m) => m.active || counts.has(m.id)))

  const summary = members.map((member) => {
    const { Lunch: lunch, Dinner: dinner } = counts.get(member.id) ?? { Lunch: 0, Dinner: 0 }
    const total = lunch + dinner
    return {
      id: member.id,
      name: member.name,
      active: member.active,
      lunch,
      dinner,
      total,
      share: totals.mealCount > 0 ? (total / totals.mealCount) * 100 : 0,
    }
  })

  const days = datesBetween(from, to).map((date) => {
    const cells = members.map((member) => ({
      memberId: member.id,
      lunch: taken.has(`${member.id}|${date}|Lunch`) ? 1 : 0,
      dinner: taken.has(`${member.id}|${date}|Dinner`) ? 1 : 0,
    }))
    return {
      date,
      cells,
      total: cells.reduce((sum, c) => sum + c.lunch + c.dinner, 0),
    }
  })

  return {
    ...totals,
    activeMembers: data.members.filter((m) => m.active).length,
    members,
    summary,
    days,
  }
}
