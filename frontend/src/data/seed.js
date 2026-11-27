// Made-up sample data so every page has something to show. Dates are relative
// to today, covering last month and this month.

import { datesBetween, toIso } from '../lib/format.js'

const NAMES = ['Arif', 'Bashir', 'Faruk', 'Hasan', 'Imran', 'Kamal']

const ITEMS = [
  'Rice 10 kg, lentils, oil',
  'Chicken, potatoes, onions',
  'Fish, vegetables, green chili',
  'Eggs, spices, salt',
  'Beef, garlic, ginger',
  'Vegetables, tomatoes, coriander',
]

export function createSeedData(now = new Date()) {
  const start = toIso(new Date(now.getFullYear(), now.getMonth() - 1, 1))
  const dates = datesBetween(start, toIso(now))

  const members = NAMES.map((name, i) => ({
    id: i + 1,
    name,
    phone: `01700-00000${i + 1}`,
    active: true,
  }))

  const meals = []
  const expenses = []
  const deposits = []

  dates.forEach((date, day) => {
    members.forEach(({ id }) => {
      // A fixed pattern, so the sample data is the same on every reset.
      if ((day + id) % 7 !== 0) meals.push({ memberId: id, date, type: 'Lunch' })
      if ((day * 3 + id) % 5 !== 0) meals.push({ memberId: id, date, type: 'Dinner' })
    })

    if (day % 3 === 0) {
      expenses.push({
        id: expenses.length + 1,
        date,
        amount: 1500 + ((day * 137) % 900),
        description: ITEMS[(day / 3) % ITEMS.length],
      })
    }

    const dayOfMonth = Number(date.slice(8))
    if (dayOfMonth === 1 || dayOfMonth === 15) {
      members.forEach(({ id }) => {
        deposits.push({
          id: deposits.length + 1,
          memberId: id,
          date,
          amount: 2000 + (id % 3) * 250,
        })
      })
    }
  })

  return {
    version: 1,
    members,
    meals,
    deposits,
    expenses,
    nextId: {
      members: members.length + 1,
      deposits: deposits.length + 1,
      expenses: expenses.length + 1,
    },
  }
}
