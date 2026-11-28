// Input checks. Every value from a client passes through one of these before it
// reaches the database, which also keeps out MongoDB query operators.

import { z } from 'zod'
import { badRequest } from './errors.js'

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

export const newPassword = z
  .string({ error: 'Please enter a password.' })
  .min(8, 'Password must be at least 8 characters.')
  // bcrypt ignores everything after 72 bytes.
  .refine((value) => Buffer.byteLength(value) <= 72, 'Password is too long.')
