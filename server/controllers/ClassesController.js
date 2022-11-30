import { Auth0Provider } from "@bcwdev/auth0provider";
import { BadRequest } from "@bcwdev/auth0provider/lib/Errors.js";
import { classesService } from "../services/ClassesService.js";
import BaseController from "../utils/BaseController.js";
import { logger } from "../utils/Logger.js";

function _middleWareDemo(req, res, next) {
  logger.log('hitting the middleware')
  next()
}

export class ClassesController extends BaseController {
  constructor() {
    super('api/classes')
    this.router // these requests go in order top to bottom, use acts as a gate the requests have to go through
      .get('', this.getAll)
      .use(_middleWareDemo)
      //NOTE this next line is the gate that keeps non logged in users out.
      .use(Auth0Provider.getAuthorizedUserInfo) // BCW module to get authorized user info
      .post('', this.create)
      .delete('/:id', this.remove)
  }

  async getAll(req, res, next) {
    try {
      const classes = await classesService.getAll()
      return res.send(classes)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.coachId = req.userInfo.id // give the class a coach id of the user making the request
      const newClass = await classesService.create(req.body)
      return res.send(newClass)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    try {
      const message = await classesService.remove(req.params.id, req.userInfo)
      return res.send(message)
    } catch (error) {
      next(error)
    }
  }
}
