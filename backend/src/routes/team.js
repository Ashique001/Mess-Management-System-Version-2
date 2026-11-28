// The mess admin looks after the manager accounts of the mess.

import { Router } from 'express'
import { z } from 'zod'
import { conflict, forbidden } from '../lib/errors.js'
import { hashPassword } from '../lib/passwords.js'
import { email, newPassword, requiredText, validate } from '../lib/validate.js'
import { userView } from '../lib/views.js'
import { User } from '../models/User.js'
import { createUser } from '../services/accounts.js'
import { findOwned } from '../services/tenant.js'

const MAX_MANAGERS = 10

const createSchema = z.object({
  name: requiredText('the manager name', 100),
  email,
  password: newPassword,
})

const updateSchema = z
  .object({
    name: requiredText('the manager name', 100).optional(),
    active: z.boolean({ error: 'Please choose a status.' }).optional(),
    password: newPassword.optional(),
  })
  .refine((changes) => Object.keys(changes).length > 0, 'There is nothing to change.')

async function findManager(req) {
  const user = await findOwned(User, req.params.userId, req.mess, 'Manager not found.')
  if (user.role !== 'manager') throw forbidden('Only manager accounts can be changed here.')
  return user
}

export const teamRouter = Router()

teamRouter.get('/', async (req, res) => {
  const users = await User.find({ messId: req.mess._id }).sort({ role: 1, name: 1 })
  res.json({ items: users.map(userView) })
})

teamRouter.post('/', async (req, res) => {
  const input = validate(createSchema, req.body)
  const managers = await User.countDocuments({ messId: req.mess._id, role: 'manager' })
  if (managers >= MAX_MANAGERS) {
    throw conflict(`A mess can have at most ${MAX_MANAGERS} managers.`)
  }
  const user = await createUser({ ...input, role: 'manager', messId: req.mess._id })
  res.status(201).json(userView(user))
})

/** Rename, enable or disable a manager, or set a new password. */
teamRouter.patch('/:userId', async (req, res) => {
  const user = await findManager(req)
  const { password, ...changes } = validate(updateSchema, req.body)
  user.set(changes)
  if (password) user.passwordHash = await hashPassword(password)
  // A new password or a disabled account ends the manager's logins.
  if (password || changes.active === false) user.tokenVersion += 1
  await user.save()
  res.json(userView(user))
})

teamRouter.delete('/:userId', async (req, res) => {
  const user = await findManager(req)
  await user.deleteOne()
  res.status(204).end()
})
