import { Router } from 'express'
import { z } from 'zod'
import { conflict } from '../lib/errors.js'
import { optionalText, requiredText, validate } from '../lib/validate.js'
import { memberView } from '../lib/views.js'
import { Deposit } from '../models/Deposit.js'
import { MealDay } from '../models/MealDay.js'
import { Member } from '../models/Member.js'
import { findOwned } from '../services/tenant.js'

const memberSchema = z.object({
  name: requiredText('member name', 100),
  phone: optionalText('phone number', 20),
  active: z.boolean({ error: 'Please choose a status.' }).default(true),
})

const NOT_FOUND = 'Member not found.'

async function checkLimit(mess) {
  const active = await Member.countDocuments({ messId: mess._id, active: true })
  if (active >= mess.memberLimit) {
    throw conflict(
      `Your mess can have at most ${mess.memberLimit} active members. ` +
        'Set a member to Inactive, or ask the platform owner to raise the limit.',
    )
  }
}

export const membersRouter = Router()

membersRouter.get('/', async (req, res) => {
  const members = await Member.find({ messId: req.mess._id })
    .collation({ locale: 'en' })
    .sort({ name: 1, _id: 1 })
  res.json({ items: members.map(memberView) })
})

membersRouter.post('/', async (req, res) => {
  const input = validate(memberSchema, req.body)
  if (input.active) await checkLimit(req.mess)
  const member = await Member.create({ ...input, messId: req.mess._id })
  res.status(201).json(memberView(member))
})

membersRouter.put('/:id', async (req, res) => {
  const member = await findOwned(Member, req.params.id, req.mess, NOT_FOUND)
  const input = validate(memberSchema, req.body)
  if (input.active && !member.active) await checkLimit(req.mess)
  member.set(input)
  await member.save()
  res.json(memberView(member))
})

membersRouter.delete('/:id', async (req, res) => {
  const member = await findOwned(Member, req.params.id, req.mess, NOT_FOUND)
  const filter = { messId: req.mess._id, memberId: member._id }
  if ((await MealDay.exists(filter)) || (await Deposit.exists(filter))) {
    throw conflict(
      'This member has meals or deposits, so deleting would change old reports. ' +
        'Set the status to Inactive instead.',
    )
  }
  await member.deleteOne()
  res.status(204).end()
})
