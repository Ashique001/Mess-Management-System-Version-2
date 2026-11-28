// Creating messes and accounts.

import { getConfig } from '../config.js'
import { conflict } from '../lib/errors.js'
import { hashPassword } from '../lib/passwords.js'
import { email as emailSchema, newPassword, validate } from '../lib/validate.js'
import { Mess } from '../models/Mess.js'
import { User } from '../models/User.js'

const EMAIL_TAKEN = 'An account with this email already exists.'

export async function createUser({ name, email, password, role, messId = null }) {
  if (await User.exists({ email })) throw conflict(EMAIL_TAKEN)
  try {
    return await User.create({
      name,
      email,
      role,
      messId,
      passwordHash: await hashPassword(password),
    })
  } catch (error) {
    // Someone else took the address between the check and the insert.
    if (error.code === 11000) throw conflict(EMAIL_TAKEN)
    throw error
  }
}

/** Creates a mess together with its admin. Nothing is kept if the admin fails. */
export async function createMessWithAdmin(mess, admin) {
  if (await User.exists({ email: admin.email })) throw conflict(EMAIL_TAKEN)
  const created = await Mess.create(mess)
  try {
    const user = await createUser({ ...admin, role: 'admin', messId: created._id })
    return { mess: created, user }
  } catch (error) {
    await created.deleteOne()
    throw error
  }
}

/** Creates the super admin, or resets that account's name and password. */
export async function saveSuperAdmin({ name, email, password }) {
  const address = validate(emailSchema, email)
  validate(newPassword, password)
  const existing = await User.findOne({ email: address })
  if (!existing) return createUser({ name, email: address, password, role: 'superadmin' })
  if (existing.role !== 'superadmin') {
    throw conflict(`${address} already belongs to a mess account. Use another email.`)
  }
  existing.name = name
  existing.active = true
  existing.passwordHash = await hashPassword(password)
  existing.tokenVersion += 1
  return existing.save()
}

/**
 * On the first start, creates the super admin from the SUPERADMIN_* settings.
 * It never changes an existing one.
 */
export async function ensureSuperAdmin() {
  const { superAdmin } = getConfig()
  if (!superAdmin || (await User.exists({ role: 'superadmin' }))) return
  try {
    await saveSuperAdmin(superAdmin)
    console.log(`Super admin created: ${superAdmin.email}`)
  } catch (error) {
    // The rest of the API must keep working when these settings are wrong.
    console.error(`Super admin was not created: ${error.message}`)
  }
}
