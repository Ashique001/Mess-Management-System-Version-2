import { forbidden, unauthorized } from '../lib/errors.js'
import { verifyToken } from '../lib/tokens.js'
import { Mess } from '../models/Mess.js'
import { User } from '../models/User.js'

const EXPIRED = 'Your session has ended. Please log in again.'

/**
 * Sets req.user and req.mess from the "Authorization: Bearer" token. Both are
 * read from the database on every request, so disabling an account or
 * suspending a mess takes effect at once.
 */
export async function authenticate(req, res, next) {
  const [scheme, token] = (req.get('authorization') ?? '').split(' ')
  if (scheme !== 'Bearer' || !token) throw unauthorized('Please log in.')

  let payload
  try {
    payload = verifyToken(token)
  } catch {
    throw unauthorized(EXPIRED)
  }

  const user = await User.findById(payload.sub)
  if (!user || !user.active || user.tokenVersion !== payload.v) throw unauthorized(EXPIRED)

  const mess = user.messId ? await Mess.findById(user.messId) : null
  if (user.role !== 'superadmin' && !mess) throw unauthorized(EXPIRED)

  req.user = user
  req.mess = mess
  next()
}

/** Lets only the listed roles through. */
export const allow =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw forbidden('You do not have permission to do this.')
    }
    next()
  }

export function requireActiveMess(req, res, next) {
  if (req.mess?.status === 'pending') {
    throw forbidden('Your mess is waiting for approval.', 'MESS_PENDING')
  }
  if (req.mess?.status !== 'active') {
    throw forbidden('Your mess has been suspended.', 'MESS_SUSPENDED')
  }
  next()
}
