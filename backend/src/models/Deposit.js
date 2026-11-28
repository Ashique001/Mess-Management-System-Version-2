import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types

const depositSchema = new mongoose.Schema(
  {
    messId: { type: ObjectId, ref: 'Mess', required: true },
    memberId: { type: ObjectId, ref: 'Member', required: true },
    // A calendar day, 'YYYY-MM-DD', so it never shifts with the time zone.
    date: { type: String, required: true },
    // Money is stored in whole paisa so that sums are exact.
    amountPaisa: { type: Number, required: true, min: 1 },
    createdBy: { type: ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
)

depositSchema.index({ messId: 1, date: -1 })
depositSchema.index({ messId: 1, memberId: 1 })

export const Deposit = mongoose.model('Deposit', depositSchema)
