import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let solar

export default class SolarDAO {
  static async injectDB(conn) {
    if (solar) {
      return
    }
    try {
      solar = await conn.db(process.env.VACCINATION_NS).collection("solar")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in solarDAO: ${e}`,
      )
    }
  }

  static async getSolar({
    filters = null,
    page = 0,
    solarPerPage = 20,
  } = {}) {
    let query
    if (filters) {
      if ("vaccine" in filters) {
        query = { $text: { $search: filters["vaccine"] } }
      } else if ("healtCareDistrict" in filters) {
        query = { "healtCareDistrict": { $eq: filters["healtCareDistrict"] } }
      } else if ("orderNumber" in filters) {
        query = { "orderNumber": { $eq: filters["orderNumber"] } }
      }
    }

    let cursor
    
    try {
      cursor = await solar
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { solarList: [], totalNumSolar: 0 }
    }

    const displayCursor = cursor

    try {
      const solarList = await displayCursor.toArray()
      const totalNumSolar = await solar.countDocuments(query)

      return { solarList, totalNumSolar }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { SolarList: [], totalNumSolar: 0 }
    }
  }
}