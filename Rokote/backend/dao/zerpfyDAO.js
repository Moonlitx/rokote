import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let zerpfy

export default class ZerpfyDAO {
  static async injectDB(conn) {
    if (zerpfy) {
      return
    }
    try {
      zerpfy = await conn.db(process.env.VACCINATION_NS).collection("zerpfy")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in zerpfyDAO: ${e}`,
      )
    }
  }

  static async getZerpfy({
    filters = null,
    page = 0,
    zerpfyPerPage = 20,
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
      cursor = await zerpfy
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { zerpfyList: [], totalNumAntiqua: 0 }
    }

    const displayCursor = cursor
    try {
      const zerpfyList = await displayCursor.toArray()
      const totalNumZerpfy = await zerpfy.countDocuments(query)

      return { zerpfyList, totalNumZerpfy }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { ZerpfyList: [], totalNumZerpfy: 0 }
    }
  }
}