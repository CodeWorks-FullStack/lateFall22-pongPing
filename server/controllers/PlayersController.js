import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { playersService } from "../services/PlayersService.js";
import { matchesService } from "../services/MatchesService.js";


export class PlayersController extends BaseController {
  constructor() {
    super('api/players')
    this.router
      .get('', this.getAll)
      .get('/:id/matches', this.getPlayerMatches)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .put('/:id', this.update)
  }

  async getAll(req, res, next) {
    try {
      const players = await playersService.getAll()
      return res.send(players)
    } catch (error) {
      next(error)
    }
  }

  // NOTE this starts in the player controller cause the player id from the route
  async getPlayerMatches(req, res, next) {
    try {
      const matches = await matchesService.getMatchesByPlayer(req.params.id)
      return res.send(matches)
    } catch (error) {

    }
  }

  async create(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const player = await playersService.create(req.body)
      return res.send(player)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const player = await playersService.update(req.params.id, req.body, req.userInfo.id)
      return res.send(player)
    } catch (error) {
      next(error)
    }
  }
}
