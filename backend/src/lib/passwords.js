import bcrypt from 'bcryptjs'
import { getConfig } from '../config.js'

const rounds = () => (getConfig().isTest ? 4 : 11)

export const hashPassword = (password) => bcrypt.hash(password, rounds())

let dummyHash

/**
 * Compares a password with a hash. Without a hash (unknown email) it still does
 * the same work, so response time does not reveal which emails exist.
 */
export async function verifyPassword(password, hash) {
  dummyHash ??= hashPassword('no-account-has-this-password')
  const matches = await bcrypt.compare(password, hash ?? (await dummyHash))
  return Boolean(hash) && matches
}
