import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"


class ClassesService {
  async getAll() {
    //                                           .populate attaches the virtual in the schema by name
    const classes = await dbContext.Classes.find().populate('coach')
    return classes
  }
  async create(classData) {
    const newClass = await dbContext.Classes.create(classData)
    return newClass
  }
  async remove(classId, userInfo) {
    const classToRemove = await dbContext.Classes.findById(classId)

    if (!classToRemove) throw new BadRequest(`no class at id: ${classId}`)
    // need to string for objectId's to compare on user id.
    if (userInfo.id !== classToRemove.coachId.toString()) throw new Forbidden('Nacho class')

    // if neither error throws we can assume we are meant to be here and can run the function as intended
    await classToRemove.remove()
    return `the ${classToRemove.teamName} was disbanded.`
  }

}

export const classesService = new ClassesService()
