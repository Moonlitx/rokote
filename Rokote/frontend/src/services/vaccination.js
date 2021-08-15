import http from "../http-common";

class VaccinationDataService {
  getAll(page = 0) {
    return http.get(`?page=${page}`);
  }

  getAllSolar(page = 0) {
    return http.get(`solar?page=${page}`);
  }

  getAllAntiqua(page = 0) {
    return http.get(`antiqua?page=${page}`);
  }

  getAllZerpfy(page = 0) {
    return http.get(`zerpfy?page=${page}`);
  }

}

export default new VaccinationDataService();
