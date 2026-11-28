import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

/** Money spent at the market (bazar). */
const expenseSchema = new mongoose.Schema(
  {
    messId: { type: ObjectId, ref: 'Mess', required: true },
    date: { type: String, required: true },
    amountPaisa: { type: Number, required: true, min: 1 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    createdBy: { type: ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
)

expenseSchema.index({ messId: 1, date: -1 })

export const Expense = mongoose.model('Expense', expenseSchema)
