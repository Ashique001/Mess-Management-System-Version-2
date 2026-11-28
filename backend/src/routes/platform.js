// For the super admin: the messes that use the platform. These routes manage
// accounts and limits; they do not expose a mess's meals or money.

import { Router } from 'express'
import { z } from 'zod'
import { badRequest } from '../lib/errors.js'
import { hashPassword } from '../lib/passwords.js'
import {
  email,
  newPassword,
  optionalText,
  pageQuery,
  requiredText,
  validate,
} from '../lib/validate.js'
import { pageView, userView } from '../lib/views.js'
import { DEFAULT_MEMBER_LIMIT, Mess, MESS_STATUSES } from '../models/Mess.js'
import { Member } from '../models/Member.js'
import { User } from '../models/User.js'
import { createMessWithAdmin } from '../services/accounts.js'
import { deleteMess, platformStats, summariseMesses } from '../services/platform.js'
import { findById, findOwned } from '../services/tenant.js'

const memberLimit = z
  .number({ error: 'Please enter the member limit.' })
  .int('The member limit must be a whole number.')
  .min(1, 'The member limit must be at least 1.')
  .max(1000, 'The member limit cannot be more than 1000.')

const listQuery = pageQuery.extend({
  status: z.enum(MESS_STATUSES).optional().catch(undefined),
  search: z.string().trim().max(100).catch(''),
})

const createSchema = z.object({
  messName: requiredText('the mess name', 100),
  address: optionalText('address', 200),
  phone: optionalText('phone number', 20),
  memberLimit: memberLimit.default(DEFAULT_MEMBER_LIMIT),
  name: requiredText('the admin name', 100),
  email,
  password: newPassword,
})

const updateSchema = z
  .object({
    // A mess is only ever "pending" before its first approval.
    status: z.enum(['active', 'suspended'], { error: 'Unknown status.' }).optional(),
    memberLimit: memberLimit.optional(),
  })
  .refine((changes) => Object.keys(changes).length > 0, 'There is nothing to change.')

const passwordSchema = z.object({ password: newPassword })

const MESS_NOT_FOUND = 'Mess not found.'

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

async function details(mess) {
  const [summary] = await summariseMesses([mess])
  const users = await User.find({ messId: mess._id }).sort({ role: 1, name: 1 })
  return { ...summary, users: users.map(userView) }
}

export const platformRouter = Router()

platformRouter.get('/stats', async (req, res) => {
  res.json(await platformStats())
})

platformRouter.get('/messes', async (req, res) => {
  const { page, limit, status, search } = validate(listQuery, req.query)
  const filter = {}
  if (status) filter.status = status
  if (search) filter.name = { $regex: escapeRegex(search), $options: 'i' }
  const [messes, total] = await Promise.all([
    Mess.find(filter)
      .sort({ createdAt: -1, _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Mess.countDocuments(filter),
  ])
  res.json(pageView(await summariseMesses(messes), { page, limit, total }))
})

/** The super admin adds a mess and its admin. It is active at once. */
platformRouter.post('/messes', async (req, res) => {
  const input = validate(createSchema, req.body)
  const { mess } = await createMessWithAdmin(
    {
      name: input.messName,
      address: input.address,
      phone: input.phone,
      memberLimit: input.memberLimit,
      status: 'active',
    },
    { name: input.name, email: input.email, password: input.password },
  )
  res.status(201).json(await details(mess))
})

platformRouter.get('/messes/:messId', async (req, res) => {
  const mess = await findById(Mess, req.params.messId, MESS_NOT_FOUND)
  res.json(await details(mess))
})

/** Approve, suspend, reactivate or change the member limit. */
platformRouter.patch('/messes/:messId', async (req, res) => {
  const mess = await findById(Mess, req.params.messId, MESS_NOT_FOUND)
  mess.set(validate(updateSchema, req.body))
  await mess.save()
  res.json(await details(mess))
})

platformRouter.post('/messes/:messId/users/:userId/password', async (req, res) => {
  const mess = await findById(Mess, req.params.messId, MESS_NOT_FOUND)
  const user = await findOwned(User, req.params.userId, mess, 'User not found.')
  const { password } = validate(passwordSchema, req.body)
  user.passwordHash = await hashPassword(password)
  user.tokenVersion += 1
  await user.save()
  res.status(204).end()
})

/** Removes a mess with all its data. The name must be repeated to confirm. */
platformRouter.delete('/messes/:messId', async (req, res) => {
  const mess = await findById(Mess, req.params.messId, MESS_NOT_FOUND)
  if (req.body?.confirmName !== mess.name) {
    throw badRequest('Type the exact mess name to confirm the deletion.')
  }
  const members = await Member.countDocuments({ messId: mess._id })
  await deleteMess(mess)
  console.log(`Mess deleted: ${mess._id} (${members} members) by user ${req.user._id}`)
  res.status(204).end()
})
