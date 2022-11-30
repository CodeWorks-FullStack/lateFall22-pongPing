import { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId


export const MatchSchema = new Schema({
  //this can contain more data, as long as it only pertains to the match
  location: { type: String, default: 'Boise CodeWorks' },
  homePlayerId: { type: ObjectId, required: true, ref: 'Player' },
  awayPlayerId: { type: ObjectId, required: true, ref: 'Player' },
  winnerId: { type: ObjectId, required: true, ref: 'Player' }
}, { timestamps: true, toJSON: { virtuals: true } })


MatchSchema.virtual('homePlayer', {
  localField: 'homePlayerId',
  ref: 'Player',
  foreignField: '_id',
  justOne: true
})

MatchSchema.virtual('awayPlayer', {
  localField: 'awayPlayerId',
  ref: 'Player',
  foreignField: '_id',
  justOne: true
})

MatchSchema.virtual('winner', {
  localField: 'winnerId',
  ref: 'Player',
  foreignField: '_id',
  justOne: true
})


