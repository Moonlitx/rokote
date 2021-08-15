import zerpfyDAO from "../dao/zerpfyDAO.js"

export default class ZerpfyCtrl {
  static async apiGetZerpfy(req, res, next) {
    const zerpfyPerPage = req.query.zerpfyPerPage ? parseInt(req.query.zerpfyPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.vaccine) {
      filters.vaccine = req.query.vaccine
    } else if (req.query.healtCareDistrict) {
      filters.ghealtCareDistrict = req.query.healtCareDistrict
    } else if (req.query.orderNumber) {
      filters.orderNumber = req.query.orderNumber
    }

    const { zerpfyList, totalNumZerpfy } = await zerpfyDAO.getZerpfy({
      filters,
      page,
      zerpfyPerPage,
    })

    let response = {
      zerpfy: zerpfyList,
      page: page,
      filters: filters,
      entries_per_page: zerpfyPerPage,
      total_results: totalNumZerpfy,
    }
    res.json(response)
  }
  
}