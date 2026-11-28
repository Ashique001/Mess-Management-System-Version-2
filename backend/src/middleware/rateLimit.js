import { AppError } from '../lib/errors.js'
import { RateLimit } from '../models/RateLimit.js'

/**
 * Allows `max` requests per fixed time window for each key (the visitor's IP
 * address unless `keyOf` says otherwise).
 */
export const rateLimit =
  ({ name, max, windowMinutes, keyOf = (req) => req.ip }) =>
  async (req, res, next) => {
    const length = windowMinutes * 60_000
    const window = Math.floor(Date.now() / length)
    const counter = await RateLimit.findOneAndUpdate(
      { _id: `${name}:${keyOf(req)}:${window}` },
      { $inc: { count: 1 }, $setOnInsert: { expiresAt: new Date((window + 1) * length) } },
      { upsert: true, returnDocument: 'after' },
    )
    if (counter.count > max) {
      res.set('Retry-After', String(Math.ceil((counter.expiresAt - Date.now()) / 1000)))
      throw new AppError(429, 'Too many attempts. Please wait a while and try again.')
    }
    next()
  }
