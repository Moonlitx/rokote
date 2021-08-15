  import express from "express"
  import VaccinationsCtrl from "./vaccination.controller.js"
  import SolarCtrl from "./solar.controller.js"
  import AntiquaCtrl from "./antiqua.controller.js"
  import ZerpfyCtrl from "./zerpfy.controller.js"

  const router = express.Router()

  router.route("/").get(VaccinationsCtrl.apiGetVaccinations)
  router.route("/solar").get(SolarCtrl.apiGetSolar)
  router.route("/antiqua").get(AntiquaCtrl.apiGetAntiqua)
  router.route("/zerpfy").get(ZerpfyCtrl.apiGetZerpfy)


  export default router