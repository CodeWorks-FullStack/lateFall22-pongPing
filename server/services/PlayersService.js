import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";

const populateFields = 'teamName cohort' // you could abstract out commonly populated stuff


class PlayersService {
  async getAll() {
    const players = await dbContext.Players.find().populate('class', 'teamName cohort')
    return players
  }
  async create(playerData) {
    // Get the class and check if current user is coach of class
    const player = await dbContext.Players.create(playerData) // you can't populate here
    // populate creates after
    await player.populate('class', 'teamName cohort')// why? idk ask the mongoose devs?
    return player
  }

  async update(playerId, playerData, userId) {
    const player = await dbContext.Players.findById(playerId)

    if (!player) throw new BadRequest(`no player at id: ${playerId}`)
    // find the players class
    const playerClass = await dbContext.Classes.findById(player.classId)
    // @ts-ignore for .toString()
    if (player.accountId.toString() !== userId && playerClass.coachId.toString() !== userId) throw new Forbidden(`not allowed to update this player`)

    // updated this | new info passed on body ? if yes use body | if not, use original
    player.wins = playerData.wins != undefined ? playerData.wins : player.wins
    player.losses = playerData.losses != undefined ? playerData.losses : player.losses

    await player.save()
    player.populate('class', populateFields)
    return player
  }
}
export const playersService = new PlayersService()
