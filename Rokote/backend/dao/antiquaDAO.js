import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

let antiqua

export default class AntiquaDAO {
  static async injectDB(conn) {
    if (antiqua) {
      return
    }
    try {
      antiqua = await conn.db(process.env.VACCINATION_NS).collection("antiqua")
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in antiquaDAO: ${e}`,
      )
    }
  }

  static async getAntiqua({
    filters = null,
    page = 0,
    antiquaPerPage = 20,
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
      cursor = await antiqua
        .find(query)
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`)
      return { antiquaList: [], totalNumAntiqua: 0 }
    }

    const displayCursor = cursor


    try {
      const antiquaList = await displayCursor.toArray()
      const totalNumAntiqua = await antiqua.countDocuments(query)

      return { antiquaList, totalNumAntiqua }
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`,
      )
      return { AntiquaList: [], totalNumAntiqua: 0 }
    }
  }
}
