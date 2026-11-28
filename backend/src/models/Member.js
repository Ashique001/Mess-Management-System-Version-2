import mongoose from 'mongoose'

/** Someone who eats at the mess. Not the same as a login (see User). */
const memberSchema = new mongoose.Schema(
  {
    messId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mess', required: true },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    phone: { type: String, default: '', trim: true, maxlength: 20 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
)

memberSchema.index({ messId: 1, active: 1 })

export const Member = mongoose.model('Member', memberSchema)
