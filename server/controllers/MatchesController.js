import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { matchesService } from "../services/MatchesService.js";

export class MatchesController extends BaseController {
  constructor() {
    super('api/matches')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }


  async create(req, res, next) {
    try {
      const match = await matchesService.create(req.body)
      return res.send(match)
    } catch (error) {
      next(error)
    }
  }

}
