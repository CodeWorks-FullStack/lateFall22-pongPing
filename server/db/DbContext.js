import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ClassSchema } from '../models/Class.js';
import { MatchSchema } from '../models/Match.js';
import { PlayerSchema } from '../models/Player.js';
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Classes = mongoose.model('Class', ClassSchema);
  Players = mongoose.model('Player', PlayerSchema);
  Matches = mongoose.model('Match', MatchSchema)
}

export const dbContext = new DbContext()
