// Made-up data for the demo, covering last month and this month.

import { datesBetween } from '../src/lib/dates.js'
import { Deposit } from '../src/models/Deposit.js'
import { Expense } from '../src/models/Expense.js'
import { MealDay } from '../src/models/MealDay.js'
import { Member } from '../src/models/Member.js'
import { createMessWithAdmin, createUser, saveSuperAdmin } from '../src/services/accounts.js'

export const DEMO_PASSWORD = 'demo-password'

export const DEMO_ACCOUNTS = [
  { role: 'Super admin', email: 'owner@demo.test' },
  { role: 'Mess admin', email: 'admin@demo.test' },
  { role: 'Manager', email: 'manager@demo.test' },
  { role: 'Waiting for approval', email: 'pending@demo.test' },
]

const NAMES = ['Arif', 'Bashir', 'Faruk', 'Hasan', 'Imran', 'Kamal']

const ITEMS = [
  'Rice 10 kg, lentils, oil',
  'Chicken, potatoes, onions',
  'Fish, vegetables, green chili',
  'Eggs, spices, salt',
  'Beef, garlic, ginger',
  'Vegetables, tomatoes, coriander',
]

/** The days from the first of last month until today. */
function recentDays(now) {
  const iso = (date) => date.toISOString().slice(0, 10)
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1))
  return datesBetween(iso(start), iso(now))
}

export async function createDemoData(now = new Date()) {
  const [owner, admin, , pending] = DEMO_ACCOUNTS.map((a) => a.email)
  const password = DEMO_PASSWORD

  await saveSuperAdmin({ name: 'Platform Owner', email: owner, password })

  const { mess, user } = await createMessWithAdmin(
    { name: 'Herar Alo', address: 'Dhaka', phone: '01700-000000', status: 'active' },
    { name: 'Rahim (Admin)', email: admin, password },
  )
  await createUser({
    name: 'Sumon (Manager)',
    email: DEMO_ACCOUNTS[2].email,
    password,
    role: 'manager',
    messId: mess._id,
  })
  await createMessWithAdmin(
    { name: 'Green House', status: 'pending' },
    { name: 'Karim', email: pending, password },
  )

  const members = await Member.insertMany(
    NAMES.map((name, i) => ({ messId: mess._id, name, phone: `01700-00000${i + 1}` })),
  )

  const meals = []
  const expenses = []
  const deposits = []
  const base = { messId: mess._id }

  recentDays(now).forEach((date, day) => {
    // A fixed pattern, so the demo looks the same on every start.
    members.forEach((member, i) => {
      const lunch = (day + i + 1) % 7 !== 0
      const dinner = (day * 3 + i + 1) % 5 !== 0
      if (lunch || dinner) meals.push({ ...base, memberId: member._id, date, lunch, dinner })
    })

    if (day % 3 === 0) {
      expenses.push({
        ...base,
        date,
        amountPaisa: (1500 + ((day * 137) % 900)) * 100,
        description: ITEMS[(day / 3) % ITEMS.length],
        createdBy: user._id,
      })
    }

    if (date.endsWith('-01') || date.endsWith('-15')) {
      members.forEach((member, i) => {
        deposits.push({
          ...base,
          memberId: member._id,
          date,
          amountPaisa: (2000 + ((i + 1) % 3) * 250) * 100,
          createdBy: user._id,
        })
      })
    }
  })

  await Promise.all([
    MealDay.insertMany(meals),
    Expense.insertMany(expenses),
    Deposit.insertMany(deposits),
  ])
}
