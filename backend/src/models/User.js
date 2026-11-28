import mongoose from 'mongoose'

export const ROLES = ['superadmin', 'admin', 'manager']

/** A person who can log in. Mess members who only eat are not users. */
const userSchema = new mongoose.Schema(
  {
    // Empty only for the super admin, who belongs to no mess.
    messId: { type: mongoose.Schema.Types.ObjectId, ref: 'Mess', default: null },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
    passwordHash: { type: String, required: true, select: false },
    role: { type: String, enum: ROLES, required: true },
    active: { type: Boolean, default: true },
    // Raising this number ends every existing login of the user.
    tokenVersion: { type: Number, default: 0 },
    lastLoginAt: { type: Date, default: null },
  },
  { timestamps: true },
)

userSchema.index({ messId: 1, role: 1 })

export const User = mongoose.model('User', userSchema)
