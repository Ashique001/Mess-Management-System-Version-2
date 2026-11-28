import { messView } from '../lib/views.js'
import { Deposit } from '../models/Deposit.js'
import { Expense } from '../models/Expense.js'
import { MealDay } from '../models/MealDay.js'
import { Member } from '../models/Member.js'
import { Mess } from '../models/Mess.js'
import { User } from '../models/User.js'

export async function platformStats() {
  const [byStatus, members, users] = await Promise.all([
    Mess.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Member.countDocuments({ active: true }),
    User.countDocuments({ messId: { $ne: null } }),
  ])
  const messes = { total: 0, pending: 0, active: 0, suspended: 0 }
  for (const { _id: status, count } of byStatus) {
    messes[status] = count
    messes.total += count
  }
  return { messes, activeMembers: members, users }
}

/** Each mess with its admin and the number of active members. */
export async function summariseMesses(messes) {
  const ids = messes.map((m) => m._id)
  const [counts, admins] = await Promise.all([
    Member.aggregate([
      { $match: { messId: { $in: ids }, active: true } },
      { $group: { _id: '$messId', count: { $sum: 1 } } },
    ]),
    User.find({ messId: { $in: ids }, role: 'admin' }),
  ])
  const countOf = new Map(counts.map((c) => [String(c._id), c.count]))
  const adminOf = new Map(admins.map((a) => [String(a.messId), a]))
  return messes.map((mess) => {
    const admin = adminOf.get(String(mess._id))
    return {
      ...messView(mess),
      activeMembers: countOf.get(String(mess._id)) ?? 0,
      admin: admin ? { name: admin.name, email: admin.email } : null,
    }
  })
}

/**
 * Deletes everything that belongs to a mess. The mess itself goes last, so a
 * deletion that was interrupted can simply be repeated.
 */
export async function deleteMess(mess) {
  const filter = { messId: mess._id }
  for (const Model of [MealDay, Deposit, Expense, Member, User]) {
    await Model.deleteMany(filter)
  }
  await mess.deleteOne()
}
