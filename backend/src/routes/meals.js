import { Router } from 'express'
import { z } from 'zod'
import { badRequest } from '../lib/errors.js'
import { date, id, validate } from '../lib/validate.js'
import { memberView } from '../lib/views.js'
import { MealDay } from '../models/MealDay.js'
import { Member } from '../models/Member.js'

const dateParams = z.object({ date })

const checkbox = z.boolean({ error: 'Meals must be ticked or not ticked.' })

const daySchema = z.object({
  entries: z
    .array(
      z.object({ memberId: id('Member not found.'), lunch: checkbox, dinner: checkbox }),
      { error: 'There are no meals to save.' },
    )
    .min(1, 'There are no meals to save.')
    .max(1000, 'Too many members in one request.')
    .refine(
      (entries) => new Set(entries.map((e) => e.memberId)).size === entries.length,
      'A member is listed twice.',
    ),
})

/** Active members, plus inactive members who already have a meal that day. */
async function readDay(messId, day) {
  const [members, meals] = await Promise.all([
    Member.find({ messId }).collation({ locale: 'en' }).sort({ name: 1, _id: 1 }),
    MealDay.find({ messId, date: day }),
  ])
  const byMember = new Map(meals.map((m) => [String(m.memberId), m]))
  return {
    date: day,
    members: members
      .filter((m) => m.active || byMember.has(String(m._id)))
      .map((m) => {
        const meal = byMember.get(String(m._id))
        return {
          ...memberView(m),
          lunch: Boolean(meal?.lunch),
          dinner: Boolean(meal?.dinner),
        }
      }),
  }
}

export const mealsRouter = Router()

mealsRouter.get('/:date', async (req, res) => {
  const params = validate(dateParams, req.params)
  res.json(await readDay(req.mess._id, params.date))
})

/** Saves one day. Members who are not listed keep their meals. */
mealsRouter.put('/:date', async (req, res) => {
  const { date: day } = validate(dateParams, req.params)
  const { entries } = validate(daySchema, req.body)
  const messId = req.mess._id

  const ids = entries.map((e) => e.memberId)
  const known = await Member.countDocuments({ messId, _id: { $in: ids } })
  if (known !== ids.length) throw badRequest('Member not found.')

  await MealDay.bulkWrite(
    entries.map(({ memberId, lunch, dinner }) => {
      const filter = { messId, date: day, memberId }
      return lunch || dinner
        ? { updateOne: { filter, update: { $set: { lunch, dinner } }, upsert: true } }
        : { deleteOne: { filter } }
    }),
  )
  res.json(await readDay(messId, day))
})
