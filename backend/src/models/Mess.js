import mongoose from 'mongoose'

export const MESS_STATUSES = ['pending', 'active', 'suspended']
export const DEFAULT_MEMBER_LIMIT = 50

/** A mess is one tenant: everything it records is tagged with its id. */
const messSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    address: { type: String, default: '', trim: true, maxlength: 200 },
    phone: { type: String, default: '', trim: true, maxlength: 20 },
    status: { type: String, enum: MESS_STATUSES, default: 'pending', index: true },
    // How many active members the mess may have. Set by the super admin.
    memberLimit: { type: Number, default: DEFAULT_MEMBER_LIMIT, min: 1 },
  },
  { timestamps: true },
)

export const Mess = mongoose.model('Mess', messSchema)
