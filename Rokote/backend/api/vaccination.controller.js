import vaccinationDAO from "../dao/vaccinationDAO.js"

export default class VaccinationsCtrl {
  static async apiGetVaccinations(req, res, next) {
    const vaccinationsPerPage = req.query.vaccinationsPerPage ? parseInt(req.query.vaccinationsPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0

    let filters = {}
    if (req.query.sourceBottle) {
      filters.sourceBottle = req.query.sourceBottle
    } else if (req.query.gender) {
      filters.gender = req.query.gender
    } else if (req.query.vaccinationDate) {
      filters.vaccinationDate = req.query.vaccinationDate
    }

    const { vaccinationsList, totalNumVaccinations } = await vaccinationDAO.getVaccinations({
      filters,
      page,
      vaccinationsPerPage,
    })

    let response = {
      vaccinations: vaccinationsList,
      page: page,
      filters: filters,
      entries_per_page: vaccinationsPerPage,
      total_results: totalNumVaccinations,
    }
    res.json(response)
  }
}