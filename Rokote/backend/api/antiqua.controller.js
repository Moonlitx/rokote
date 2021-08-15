import antiquaDAO from "../dao/antiquaDAO.js"

export default class AntiquaCtrl {
  static async apiGetAntiqua(req, res, next) {
    const antiquaPerPage = req.query.antiquaPerPage ? parseInt(req.query.antiquaPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.vaccine) {
      filters.vaccine = req.query.vaccine
    } else if (req.query.healtCareDistrict) {
      filters.ghealtCareDistrict = req.query.healtCareDistrict
    } else if (req.query.orderNumber) {
      filters.orderNumber = req.query.orderNumber
    }

    const { antiquaList, totalNumAntiqua } = await antiquaDAO.getAntiqua({
      filters,
      page,
      antiquaPerPage,
    })

    let response = {
      antiqua: antiquaList,
      page: page,
      filters: filters,
      entries_per_page: antiquaPerPage,
      total_results: totalNumAntiqua,
    }
    res.json(response)
  }

}