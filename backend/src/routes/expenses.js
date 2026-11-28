import { Router } from 'express'
import { z } from 'zod'
import { amountInPaisa, date, pageQuery, requiredText, validate } from '../lib/validate.js'
import { expenseView, pageView } from '../lib/views.js'
import { Expense } from '../models/Expense.js'
import { findOwned } from '../services/tenant.js'

const NOT_FOUND = 'Expense not found.'

const expenseSchema = z.object({
  amount: amountInPaisa,
  description: requiredText('description', 500),
  date,
})

function readExpense(req) {
  const { amount, ...rest } = validate(expenseSchema, req.body)
  return { ...rest, amountPaisa: amount }
}

export const expensesRouter = Router()

/** Newest first, one page at a time. */
expensesRouter.get('/', async (req, res) => {
  const { page, limit } = validate(pageQuery, req.query)
  const filter = { messId: req.mess._id }
  const [expenses, total] = await Promise.all([
    Expense.find(filter)
      .sort({ date: -1, _id: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Expense.countDocuments(filter),
  ])
  res.json(pageView(expenses.map(expenseView), { page, limit, total }))
})

expensesRouter.post('/', async (req, res) => {
  const expense = await Expense.create({
    ...readExpense(req),
    messId: req.mess._id,
    createdBy: req.user._id,
  })
  res.status(201).json(expenseView(expense))
})

expensesRouter.put('/:id', async (req, res) => {
  const expense = await findOwned(Expense, req.params.id, req.mess, NOT_FOUND)
  expense.set(readExpense(req))
  await expense.save()
  res.json(expenseView(expense))
})

expensesRouter.delete('/:id', async (req, res) => {
  const expense = await findOwned(Expense, req.params.id, req.mess, NOT_FOUND)
  await expense.deleteOne()
  res.status(204).end()
})
