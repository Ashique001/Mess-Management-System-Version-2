import { Router } from 'express'
import { z } from 'zod'
import { badRequest } from '../lib/errors.js'
import { amountInPaisa, date, id, pageQuery, validate } from '../lib/validate.js'
import { depositView, pageView } from '../lib/views.js'
import { Deposit } from '../models/Deposit.js'
import { Member } from '../models/Member.js'
import { findOwned } from '../services/tenant.js'

const NO_MEMBER = 'Please select a member.'
const NOT_FOUND = 'Deposit not found.'

const depositSchema = z.object({
  memberId: id(NO_MEMBER),
  date,
  amount: amountInPaisa,
})

/** Checks the input, including that the member belongs to this mess. */
async function readDeposit(req) {
  const input = validate(depositSchema, req.body)
  const member = await Member.findOne({ _id: input.memberId, messId: req.mess._id })
  if (!member) throw badRequest(NO_MEMBER)
  return {
    member,
    values: { memberId: member._id, date: input.date, amountPaisa: input.amount },
  }
}

export const depositsRouter = Router()

/** Newest first, one page at a time. */
depositsRouter.get('/', async (req, res) => {
  const { page, limit } = validate(pageQuery, req.query)
  const filter = { messId: req.mess._id }
  const [deposits, total] = await Promise.all([
    Deposit.find(filter)
      .sort({ date: -1, _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('memberId', 'name'),
    Deposit.countDocuments(filter),
  ])
  const items = deposits.map((d) => depositView(d, d.memberId))
  res.json(pageView(items, { page, limit, total }))
})

depositsRouter.post('/', async (req, res) => {
  const { member, values } = await readDeposit(req)
  const deposit = await Deposit.create({
    ...values,
    messId: req.mess._id,
    createdBy: req.user._id,
  })
  res.status(201).json(depositView(deposit, member))
})

depositsRouter.put('/:id', async (req, res) => {
  const deposit = await findOwned(Deposit, req.params.id, req.mess, NOT_FOUND)
  const { member, values } = await readDeposit(req)
  deposit.set(values)
  await deposit.save()
  res.json(depositView(deposit, member))
})

depositsRouter.delete('/:id', async (req, res) => {
  const deposit = await findOwned(Deposit, req.params.id, req.mess, NOT_FOUND)
  await deposit.deleteOne()
  res.status(204).end()
})
