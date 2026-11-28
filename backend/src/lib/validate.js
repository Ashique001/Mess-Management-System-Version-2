// Input checks. Every value from a client passes through one of these before it
// reaches the database, which also keeps out MongoDB query operators.

import { z } from 'zod'
import { isValidDate } from './dates.js'
import { badRequest } from './errors.js'

const MAX_AMOUNT = 10_000_000

export function validate(schema, input) {
  const result = schema.safeParse(input ?? {})
  if (!result.success) throw badRequest(result.error.issues[0].message)
  return result.data
}

const capital = (text) => text[0].toUpperCase() + text.slice(1)

const string = (label, max) =>
  z
    .string({ error: `Please enter ${label}.` })
    .trim()
    .max(max, `${capital(label)} is too long (at most ${max} characters).`)

export const requiredText = (label, max) => string(label, max).min(1, `Please enter ${label}.`)

export const optionalText = (label, max) => string(label, max).default('')

export const email = z
  .string({ error: 'Please enter an email address.' })
  .trim()
  .toLowerCase()
  .max(254, 'Email address is too long.')
  .pipe(z.email('Please enter a valid email address.'))

const OBJECT_ID = /^[a-f\d]{24}$/i

export const isId = (value) => OBJECT_ID.test(value)

export const id = (message) => z.string({ error: message }).regex(OBJECT_ID, message)

const BAD_DATE = 'Please choose a valid date.'

export const date = z.string({ error: BAD_DATE }).refine(isValidDate, BAD_DATE)

/** Takes an amount in taka, as text or number, and returns whole paisa. */
export const amountInPaisa = z
  .custom((value) => ['string', 'number'].includes(typeof value), 'Please enter amount.')
  .transform((value, context) => {
    const fail = (message) => {
      context.addIssue({ code: 'custom', message })
      return z.NEVER
    }
    const text = String(value).trim()
    if (!text) return fail('Please enter amount.')
    if (!/^-?(\d+(\.\d{1,2})?|\.\d{1,2})$/.test(text)) {
      return fail('Please enter a valid amount (up to 2 decimal places).')
    }
    const amount = Number(text)
    if (amount <= 0) return fail('Amount must be greater than zero.')
    if (amount > MAX_AMOUNT) return fail('Amount is too large.')
    return Math.round(amount * 100)
  })

export const pageQuery = z.object({
  page: z.coerce.number().int().min(1).max(100_000).catch(1),
  limit: z.coerce.number().int().min(1).max(200).catch(50),
})

export const newPassword = z
  .string({ error: 'Please enter a password.' })
  .min(8, 'Password must be at least 8 characters.')
  // bcrypt ignores everything after 72 bytes.
  .refine((value) => Buffer.byteLength(value) <= 72, 'Password is too long.')
