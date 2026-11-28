import { Router } from 'express'
import { z } from 'zod'
import { optionalText, requiredText, validate } from '../lib/validate.js'
import { messView } from '../lib/views.js'

const settingsSchema = z.object({
  name: requiredText('the mess name', 100),
  address: optionalText('address', 200),
  phone: optionalText('phone number', 20),
})

export const messRouter = Router()

/** The admin changes the details of the mess. */
messRouter.put('/', async (req, res) => {
  req.mess.set(validate(settingsSchema, req.body))
  await req.mess.save()
  res.json(messView(req.mess))
})
