// Calendar days as 'YYYY-MM-DD' strings. They sort and compare correctly, and
// UTC arithmetic keeps the result independent of the server's time zone.

const toIso = (date) => date.toISOString().slice(0, 10)

const fromIso = (iso) => new Date(`${iso}T00:00:00Z`)

/** True for a real calendar date between the years 2000 and 2100. */
export function isValidDate(iso) {
  if (typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false
  const year = Number(iso.slice(0, 4))
  const date = fromIso(iso)
  return year >= 2000 && year <= 2100 && !Number.isNaN(date.getTime()) && toIso(date) === iso
}

/** How many days from `from` to `to`, both included. */
export const dayCount = (from, to) => Math.round((fromIso(to) - fromIso(from)) / 86_400_000) + 1

/** Every date from `from` to `to`, both included. */
export function datesBetween(from, to) {
  const dates = []
  for (let day = fromIso(from); toIso(day) <= to; day.setUTCDate(day.getUTCDate() + 1)) {
    dates.push(toIso(day))
  }
  return dates
}
