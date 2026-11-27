// Dates are kept as 'YYYY-MM-DD' strings in local time, so a day never shifts
// because of the time zone. These strings also sort and compare correctly.

const pad = (n) => String(n).padStart(2, '0')

export const toIso = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

export const fromIso = (iso) => {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const todayIso = () => toIso(new Date())

export const monthStartIso = (now = new Date()) =>
  toIso(new Date(now.getFullYear(), now.getMonth(), 1))

export const monthEndIso = (now = new Date()) =>
  toIso(new Date(now.getFullYear(), now.getMonth() + 1, 0))

/** True for a real calendar date between the years 2000 and 2100. */
export const isValidDate = (iso) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso ?? '')) return false
  const year = Number(iso.slice(0, 4))
  return year >= 2000 && year <= 2100 && toIso(fromIso(iso)) === iso
}

/** Every date from `from` to `to`, both included. */
export const datesBetween = (from, to) => {
  const dates = []
  for (let d = fromIso(from); toIso(d) <= to; d.setDate(d.getDate() + 1)) {
    dates.push(toIso(d))
  }
  return dates
}

/** 2026-11-05 -> 05-11-2026 */
export const formatDate = (iso) => iso.split('-').reverse().join('-')

export const weekday = (iso) =>
  fromIso(iso).toLocaleDateString('en-US', { weekday: 'short' })

const numberFormat = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatAmount = (value) => {
  // Avoid showing "-0.00" for tiny negative rounding leftovers.
  const rounded = Math.round(value * 100) / 100
  return numberFormat.format(rounded === 0 ? 0 : rounded)
}

export const formatMoney = (value) => `৳ ${formatAmount(value)}`
