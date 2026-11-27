import { describe, expect, it } from 'vitest'
import { isValidDate } from '../lib/format.js'
import * as m from './mutations.js'
import { createSeedData } from './seed.js'

const data = {
  members: [
    { id: 1, name: 'Asha', phone: '', active: true },
    { id: 2, name: 'Bina', phone: '', active: true },
  ],
  meals: [{ memberId: 1, date: '2026-11-01', type: 'Lunch' }],
  deposits: [],
  expenses: [],
  nextId: { members: 3, deposits: 1, expenses: 1 },
}

describe('members', () => {
  it('adds with the next id and trims text', () => {
    const next = m.addMember(data, { name: '  Cara ', phone: ' 1 ', active: true })
    expect(next.members.at(-1)).toEqual({ id: 3, name: 'Cara', phone: '1', active: true })
    expect(next.nextId.members).toBe(4)
    expect(data.members).toHaveLength(2) // the old data is untouched
  })

  it('needs a name', () => {
    expect(() => m.addMember(data, { name: '  ' })).toThrow('member name')
  })

  it('keeps members who have records', () => {
    expect(() => m.deleteMember(data, 1)).toThrow('Inactive')
    expect(m.deleteMember(data, 2).members).toHaveLength(1)
  })
})

describe('amounts', () => {
  it.each(['', 'abc', '0', '-5', '1.234', '1e3', '99999999999'])('rejects "%s"', (input) => {
    expect(() => m.parseAmount(input)).toThrow()
  })

  it('accepts normal amounts', () => {
    expect(m.parseAmount(' 1250.50 ')).toBe(1250.5)
  })
})

describe('deposits and expenses', () => {
  it('needs a member', () => {
    expect(() => m.addDeposit(data, { memberId: '', date: '2026-11-01', amount: '5' }))
      .toThrow('select a member')
  })

  it('needs a description and a real date', () => {
    expect(() => m.addExpense(data, { date: '2026-11-01', amount: '5', description: '' }))
      .toThrow('description')
    expect(() => m.addExpense(data, { date: '2026-02-30', amount: '5', description: 'x' }))
      .toThrow('valid date')
  })

  it('cannot update a missing record', () => {
    expect(() => m.updateDeposit(data, 9, {})).toThrow('not found')
  })
})

describe('saveMeals', () => {
  it('replaces the day for listed members only, without duplicates', () => {
    const entries = [{ memberId: 2, lunch: true, dinner: true }]
    const once = m.saveMeals(data, '2026-11-01', entries)
    const twice = m.saveMeals(once, '2026-11-01', entries)
    expect(twice.meals).toHaveLength(3) // Asha's lunch stays
  })

  it('removes unticked meals', () => {
    const next = m.saveMeals(data, '2026-11-01', [{ memberId: 1, lunch: false, dinner: false }])
    expect(next.meals).toEqual([])
  })
})

describe('sample data', () => {
  it('is consistent, even on the first day of a year', () => {
    const seed = createSeedData(new Date(2027, 0, 1))
    expect(seed.members).toHaveLength(6)
    expect([...seed.meals, ...seed.deposits, ...seed.expenses].every((r) => isValidDate(r.date)))
      .toBe(true)
    expect(new Set(seed.expenses.map((e) => e.id)).size).toBe(seed.expenses.length)
    expect(seed.expenses.every((e) => e.description)).toBe(true)
  })
})
