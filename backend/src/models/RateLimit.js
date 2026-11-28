import mongoose from 'mongoose'

// Request counters. They live in the database because serverless instances do
// not share memory. MongoDB removes each one after it expires.
const rateLimitSchema = new mongoose.Schema(
  {
    _id: String,
    count: { type: Number, default: 0 },
    expiresAt: { type: Date, required: true, expires: 0 },
  },
  { versionKey: false },
)

export const RateLimit = mongoose.model('RateLimit', rateLimitSchema)
