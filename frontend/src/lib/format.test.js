import { describe, expect, it } from 'vitest'
import { dayCount, formatDate, formatMoney, isValidDate, monthEndIso } from './format.js'

describe('format', () => {
  it('accepts only real dates', () => {
    expect(isValidDate('2028-02-29')).toBe(true)
    expect(isValidDate('2026-02-29')).toBe(false)
    expect(isValidDate('')).toBe(false)
    expect(isValidDate('1999-12-31')).toBe(false)
  })

  it('counts days across months and years', () => {
    expect(dayCount('2026-01-01', '2026-12-31')).toBe(365)
    expect(dayCount('2026-12-31', '2027-01-01')).toBe(2)
  })

  it('finds the last day of a month', () => {
    expect(monthEndIso(new Date(2028, 1, 10))).toBe('2028-02-29')
  })

  it('shows dates and money', () => {
    expect(formatDate('2026-11-05')).toBe('05-11-2026')
    expect(formatMoney(1234.5)).toBe('৳ 1,234.50')
    expect(formatMoney(-0.001)).toBe('৳ 0.00')
  })
})
