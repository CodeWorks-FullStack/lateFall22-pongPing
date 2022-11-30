import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId

export const PlayerSchema = new Schema({
  accountId: { type: ObjectId, required: true, ref: 'Account' },
  classId: { type: ObjectId, required: true, ref: 'Class' },
  name: { type: String, required: true },
  wins: { type: Number, required: true, default: 0 },
  losses: { type: Number, required: true, default: 0 },
  // win loose ratio?
}, { timestamps: true, toJSON: { virtuals: true } })

PlayerSchema.virtual('class', {
  localField: 'classId',
  ref: 'Class',
  foreignField: '_id',
  justOne: true
})
