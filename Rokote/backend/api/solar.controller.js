import solarDAO from "../dao/solarDAO.js"

export default class SolarCtrl {
  static async apiGetSolar(req, res, next) {
    const solarPerPage = req.query.solarPerPage ? parseInt(req.query.solarPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.vaccine) {
      filters.vaccine = req.query.vaccine
    } else if (req.query.healtCareDistrict) {
      filters.ghealtCareDistrict = req.query.healtCareDistrict
    } else if (req.query.orderNumber) {
      filters.orderNumber = req.query.orderNumber
    }

    const { solarList, totalNumSolar } = await solarDAO.getSolar({
      filters,
      page,
      solarPerPage,
    })

    let response = {
      solar: solarList,
      page: page,
      filters: filters,
      entries_per_page: solarPerPage,
      total_results: totalNumSolar,
    }
    res.json(response)
  }
}