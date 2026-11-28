import { Router } from 'express'
import { z } from 'zod'
import { dayCount } from '../lib/dates.js'
import { date, validate } from '../lib/validate.js'
import { dashboardReport, monthlyReport, settlementReport } from '../services/reports.js'

const MAX_DAYS = 366

const periodQuery = z
  .object({ from: date, to: date })
  .refine(({ from, to }) => from <= to, "The 'From' date cannot be greater than the 'To' date.")

// The daily sheet has a row per day, so its period is limited.
const sheetQuery = periodQuery.refine(
  ({ from, to }) => dayCount(from, to) <= MAX_DAYS,
  'Please choose a period of one year or less.',
)

export const reportsRouter = Router()

reportsRouter.get('/dashboard', async (req, res) => {
  res.json(await dashboardReport(req.mess._id))
})

reportsRouter.get('/settlement', async (req, res) => {
  const { from, to } = validate(periodQuery, req.query)
  res.json(await settlementReport(req.mess._id, from, to))
})

reportsRouter.get('/monthly', async (req, res) => {
  const { from, to } = validate(sheetQuery, req.query)
  res.json(await monthlyReport(req.mess._id, from, to))
})
