import { dbContext } from "../db/DbContext.js"


class MatchesService {
  async getMatchesByPlayer(playerId) {//        find a players matches where one of these has to be true
    const matches = await dbContext.Matches.find({ $or: [{ homePlayerId: playerId }, { awayPlayerId: playerId }] }).populate('homePlayer awayPlayer winner', 'name')

    // find matches where player is the winner
    // const matches = await dbContext.Matches.find({winnerId: playerId})

    // this bit of alchemy would find any of the players matches that happened in specific location wether or not they were the home or away player
    // const matches = await dbContext.Matches.find({ $and: [{ $or: [{ homePlayerId: playerId }, { awayPlayerId: playerId }] }, { location: 'France' }] }).populate('homePlayer awayPlayer winner', 'name')
    return matches
  }
  async create(matchData) {
    const match = await dbContext.Matches.create(matchData)
    // we will do things here
    await match.populate('homePlayer awayPlayer winner', 'name')
    return match
  }

}

export const matchesService = new MatchesService()
