// Every change to the data goes through these functions. Each takes the current
// data, checks the input and returns new data, or throws an Error whose message
// is shown to the user. The backend will need the same rules later.

import { isValidDate } from '../lib/format.js'

const MAX_AMOUNT = 10_000_000

export function parseAmount(input) {
  const text = String(input ?? '').trim()
  if (!text) throw new Error('Please enter amount.')
  if (!/^-?(\d+(\.\d{1,2})?|\.\d{1,2})$/.test(text)) {
    throw new Error('Please enter a valid amount (up to 2 decimal places).')
  }
  const amount = Number(text)
  if (amount <= 0) throw new Error('Amount must be greater than zero.')
  if (amount > MAX_AMOUNT) throw new Error('Amount is too large.')
  return amount
}

function checkDate(date) {
  if (!isValidDate(date)) throw new Error('Please choose a valid date.')
  return date
}

function findRow(rows, id, message) {
  const row = rows.find((r) => r.id === id)
  if (!row) throw new Error(message)
  return row
}

/** Adds a row with the next free id to one of the collections. */
function insert(data, collection, values) {
  const id = data.nextId[collection]
  return {
    ...data,
    [collection]: [...data[collection], { id, ...values }],
    nextId: { ...data.nextId, [collection]: id + 1 },
  }
}

const replace = (data, collection, id, values) => ({
  ...data,
  [collection]: data[collection].map((r) => (r.id === id ? { id, ...values } : r)),
})

const remove = (data, collection, id) => ({
  ...data,
  [collection]: data[collection].filter((r) => r.id !== id),
})

// ---- Members ----

function memberValues({ name, phone, active }) {
  const cleanName = String(name ?? '').trim()
  if (!cleanName) throw new Error('Please enter member name.')
  return { name: cleanName, phone: String(phone ?? '').trim(), active: Boolean(active) }
}

export const addMember = (data, input) => insert(data, 'members', memberValues(input))

export function updateMember(data, id, input) {
  findRow(data.members, id, 'Member not found.')
  return replace(data, 'members', id, memberValues(input))
}

export function deleteMember(data, id) {
  findRow(data.members, id, 'Member was not found.')
  const hasRecords =
    data.meals.some((m) => m.memberId === id) ||
    data.deposits.some((d) => d.memberId === id)
  if (hasRecords) {
    throw new Error(
      'This member has meals or deposits, so deleting would change old reports. Set the status to Inactive instead.',
    )
  }
  return remove(data, 'members', id)
}

// ---- Deposits ----

function depositValues(data, { memberId, date, amount }) {
  const member = data.members.find((m) => m.id === Number(memberId))
  if (!member) throw new Error('Please select a member.')
  return { memberId: member.id, date: checkDate(date), amount: parseAmount(amount) }
}

export const addDeposit = (data, input) => insert(data, 'deposits', depositValues(data, input))

export function updateDeposit(data, id, input) {
  findRow(data.deposits, id, 'Deposit not found.')
  return replace(data, 'deposits', id, depositValues(data, input))
}

export function deleteDeposit(data, id) {
  findRow(data.deposits, id, 'Deposit not found.')
  return remove(data, 'deposits', id)
}

// ---- Market expenses ----

function expenseValues({ date, amount, description }) {
  const cleanAmount = parseAmount(amount)
  const cleanDescription = String(description ?? '').trim()
  if (!cleanDescription) throw new Error('Please enter description.')
  return { date: checkDate(date), amount: cleanAmount, description: cleanDescription }
}

export const addExpense = (data, input) => insert(data, 'expenses', expenseValues(input))

export function updateExpense(data, id, input) {
  findRow(data.expenses, id, 'Expense not found.')
  return replace(data, 'expenses', id, expenseValues(input))
}

export function deleteExpense(data, id) {
  findRow(data.expenses, id, 'Expense not found.')
  return remove(data, 'expenses', id)
}

// ---- Meals ----

/**
 * Saves one day. `entries` is [{ memberId, lunch, dinner }]. Meals of members
 * who are not listed stay as they are.
 */
export function saveMeals(data, date, entries) {
  checkDate(date)
  const listed = new Set(entries.map((e) => e.memberId))
  const meals = data.meals.filter((m) => m.date !== date || !listed.has(m.memberId))
  for (const { memberId, lunch, dinner } of entries) {
    findRow(data.members, memberId, 'Member not found.')
    if (lunch) meals.push({ memberId, date, type: 'Lunch' })
    if (dinner) meals.push({ memberId, date, type: 'Dinner' })
  }
  return { ...data, meals }
}
