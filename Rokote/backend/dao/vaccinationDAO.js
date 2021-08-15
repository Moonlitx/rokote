import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let vaccinations

export default class VaccinationDAO {
  static async injectDB(conn) {
    if (vaccinations) {
      return
    }
    try {
      vaccinations = await conn.db(process.env.VACCINATION_NS).collection("vaccination")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in vaccinationsDAO: ${e}`,
      )
    }
  }

  static async getVaccinations({
    filters = null,
    page = 0,
    vaccinationsPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("vaccinationDate" in filters) {
        query = { $text: { $search: filters["vaccinationDate"] } }
      } else if ("sourceBottle" in filters) {
        query = { "sourceBottle": { $eq: filters["sourceBottle"] } }
      } else if ("gender" in filters) {
        query = { "gender": { $eq: filters["gender"] } }
      }
    }

    let cursor
    
    try {
      cursor = await vaccinations
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { vaccinationsList: [], totalNumVaccinations: 0 }
    }

    const displayCursor = cursor
    try {
      const vaccinationsList = await displayCursor.toArray()
      const totalNumVaccinations = await vaccinations.countDocuments(query)

      return { vaccinationsList, totalNumVaccinations }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { VaccinationsList: [], totalNumVaccinations: 0 }
    }
  }
}

