import { describe, expect, it } from 'vitest'
import {
  dashboardSummary, memberReport, monthlyOverview, recentActivities, sumAmounts,
} from './calculations.js'

const data = {
  members: [
    { id: 1, name: 'Asha', active: true },
    { id: 2, name: 'Bina', active: false }, // ate and paid in November
    { id: 3, name: 'Cara', active: false }, // no records at all
  ],
  meals: [
    { memberId: 1, date: '2026-11-01', type: 'Lunch' },
    { memberId: 1, date: '2026-11-01', type: 'Dinner' },
    { memberId: 1, date: '2026-11-02', type: 'Lunch' },
    { memberId: 2, date: '2026-11-02', type: 'Dinner' },
    { memberId: 1, date: '2026-10-31', type: 'Lunch' },
  ],
  deposits: [
    { id: 1, memberId: 1, date: '2026-11-01', amount: 500 },
    { id: 2, memberId: 2, date: '2026-11-02', amount: 100 },
  ],
  expenses: [
    { id: 1, date: '2026-11-02', amount: 400, description: 'Rice' },
    { id: 2, date: '2026-10-31', amount: 90, description: 'Eggs' },
  ],
}

describe('memberReport', () => {
  const report = memberReport(data, '2026-11-01', '2026-11-02')

  it('calculates the rate from the period only', () => {
    expect(report).toMatchObject({ marketCost: 400, mealCount: 4, rate: 100 })
  })

  it('includes an inactive member who has records, and skips one without', () => {
    expect(report.rows.map((r) => r.name)).toEqual(['Asha', 'Bina'])
  })

  it('balances each member and adds up to the market cost', () => {
    expect(report.rows[0]).toMatchObject({ meals: 3, cost: 300, deposit: 500, balance: 200 })
    expect(report.rows[1]).toMatchObject({ meals: 1, cost: 100, deposit: 100, balance: 0 })
    expect(report.rows.reduce((sum, r) => sum + r.cost, 0)).toBeCloseTo(report.marketCost)
  })

  it('has a zero rate when nobody ate', () => {
    expect(memberReport(data, '2026-09-01', '2026-09-30').rate).toBe(0)
  })
})

describe('monthlyOverview', () => {
  const overview = monthlyOverview(data, '2026-11-01', '2026-11-03')

  it('lists every day, with matching totals', () => {
    expect(overview.days.map((d) => d.total)).toEqual([2, 2, 0])
    expect(overview.mealCount).toBe(4)
  })

  it('gives shares that add up to 100', () => {
    expect(overview.summary.map((r) => [r.name, r.lunch, r.dinner, r.share])).toEqual([
      ['Asha', 2, 1, 75],
      ['Bina', 0, 1, 25],
    ])
  })

  it('counts only active members in the KPI', () => {
    expect(overview.activeMembers).toBe(1)
  })
})

describe('dashboard', () => {
  it('totals everything', () => {
    expect(dashboardSummary(data)).toEqual({
      activeMembers: 1, totalDeposit: 600, totalExpense: 490, totalMeals: 5, rate: 98,
    })
  })

  it('does not fail on an empty mess', () => {
    const empty = { members: [], meals: [], deposits: [], expenses: [] }
    expect(dashboardSummary(empty).rate).toBe(0)
    expect(recentActivities(empty)).toEqual([])
  })

  it('shows the newest activities first, up to the limit', () => {
    const recent = recentActivities(data, 3)
    expect(recent).toHaveLength(3)
    expect(recent.every((a) => a.date === '2026-11-02')).toBe(true)
  })
})

describe('sumAmounts', () => {
  it('does not drift with decimals', () => {
    expect(sumAmounts([{ amount: 0.1 }, { amount: 0.2 }])).toBe(0.3)
  })
})
