import { describe, expect, it } from 'vitest'
import { memberReport, monthlyOverview, recentActivities } from '../src/lib/calculations.js'
import { datesBetween, dayCount, isValidDate } from '../src/lib/dates.js'

const members = [
  { id: 'a', name: 'Asha', active: true },
  { id: 'b', name: 'Bina', active: false }, // ate and paid
  { id: 'c', name: 'Cara', active: false }, // no records at all
]

describe('memberReport', () => {
  const report = memberReport({
    members,
    mealCounts: new Map([
      ['a', { lunch: 2, dinner: 1 }],
      ['b', { lunch: 0, dinner: 1 }],
    ]),
    depositTotals: new Map([
      ['a', 50_000],
      ['b', 10_000],
    ]),
    marketPaisa: 40_000,
  })

  it('divides the market cost by the number of meals', () => {
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
    const empty = memberReport({
      members,
      mealCounts: new Map(),
      depositTotals: new Map(),
      marketPaisa: 5000,
    })
    expect(empty.rate).toBe(0)
  })
})

describe('monthlyOverview', () => {
  const overview = monthlyOverview({
    members,
    mealDays: [
      { memberId: 'a', date: '2026-11-01', lunch: true, dinner: true },
      { memberId: 'a', date: '2026-11-02', lunch: true, dinner: false },
      { memberId: 'b', date: '2026-11-02', lunch: false, dinner: true },
    ],
    marketPaisa: 40_000,
    from: '2026-11-01',
    to: '2026-11-03',
  })

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

  it('counts only active members in the total', () => {
    expect(overview.activeMembers).toBe(1)
  })
})

describe('recentActivities', () => {
  const records = {
    deposits: [{ id: '1', memberId: 'a', date: '2026-11-02', amountPaisa: 100 }],
    expenses: [{ id: '2', date: '2026-11-01', amountPaisa: 200, description: 'Rice' }],
    mealDays: [{ memberId: 'a', date: '2026-11-02', lunch: true, dinner: true }],
    names: new Map([['a', 'Asha']]),
  }

  it('shows the newest first, money before meals, up to the limit', () => {
    expect(recentActivities(records, 3).map((a) => a.description)).toEqual([
      'Asha deposited money',
      'Asha - Lunch',
      'Asha - Dinner',
    ])
  })
})

describe('dates', () => {
  it('accepts only real dates', () => {
    expect(isValidDate('2028-02-29')).toBe(true)
    expect(isValidDate('2026-02-29')).toBe(false)
    expect(isValidDate('2026-13-01')).toBe(false)
    expect(isValidDate('1999-12-31')).toBe(false)
  })

  it('counts across months and years', () => {
    expect(datesBetween('2026-12-31', '2027-01-01')).toEqual(['2026-12-31', '2027-01-01'])
    expect(dayCount('2026-01-01', '2026-12-31')).toBe(365)
  })
})
