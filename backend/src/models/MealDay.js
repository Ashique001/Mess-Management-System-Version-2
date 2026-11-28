import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

/**
 * One member's meals on one day. Days without a meal have no document, which
 * keeps the database small.
 */
const mealDaySchema = new mongoose.Schema(
  {
    messId: { type: ObjectId, ref: 'Mess', required: true },
    memberId: { type: ObjectId, ref: 'Member', required: true },
    date: { type: String, required: true },
    lunch: { type: Boolean, default: false },
    dinner: { type: Boolean, default: false },
  },
  { versionKey: false },
)

mealDaySchema.index({ messId: 1, date: 1, memberId: 1 }, { unique: true })
mealDaySchema.index({ messId: 1, memberId: 1 })

export const MealDay = mongoose.model('MealDay', mealDaySchema)
