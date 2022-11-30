import { Schema } from "mongoose";


export const ClassSchema = new Schema({
  coachId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  cohort: { type: String, required: true },
  teamName: { type: String, required: true },
  graduated: { type: Boolean, required: true, default: false }
  // studentCount?
}, { timestamps: true, toJSON: { virtuals: true } })


ClassSchema.virtual('coach', {
  // NOTE this is special virtual for pulling other db info into this object
  localField: 'coachId', //what on this schema to look at
  ref: 'Account', // what model to look at
  foreignField: '_id', //what on the reference model to look at
  justOne: true
})
