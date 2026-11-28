// What the API sends out. Listing the fields keeps private ones from leaking.

import { toTaka } from './calculations.js'

export const userView = (user) => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  role: user.role,
  active: user.active,
  lastLoginAt: user.lastLoginAt,
})

export const messView = (mess) =>
  mess && {
    id: String(mess._id),
    name: mess.name,
    address: mess.address,
    phone: mess.phone,
    status: mess.status,
    memberLimit: mess.memberLimit,
    createdAt: mess.createdAt,
  }

export const sessionView = (user, mess) => ({ user: userView(user), mess: messView(mess) })

export const memberView = (member) => ({
  id: String(member._id),
  name: member.name,
  phone: member.phone,
  active: member.active,
})

export const depositView = (deposit, member) => ({
  id: String(deposit._id),
  memberId: member ? String(member._id) : '',
  memberName: member?.name ?? 'Unknown',
  date: deposit.date,
  amount: toTaka(deposit.amountPaisa),
})

export const expenseView = (expense) => ({
  id: String(expense._id),
  date: expense.date,
  amount: toTaka(expense.amountPaisa),
  description: expense.description,
})

export const pageView = (items, { page, limit, total }) => ({
  items,
  page,
  total,
  pages: Math.max(1, Math.ceil(total / limit)),
})
