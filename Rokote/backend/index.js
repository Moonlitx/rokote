
import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import VaccinationDAO from "./dao/vaccinationDAO.js"
import SolarDAO from "./dao/solarDAO.js"
import AntiquaDAO from "./dao/antiquaDAO.js"
import ZerpfyDAO from "./dao/zerpfyDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.VACCINATION_DB_URI,
    {
        maxPoolSize:50,
        wtimeoutMS:2500,
        useNewUrlParser:true
    }
)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await VaccinationDAO.injectDB(client)
    await SolarDAO.injectDB(client)
    await AntiquaDAO.injectDB(client)
    await ZerpfyDAO.injectDB(client)
    app.listen(port, () => {
        console.log('listening on port '+port)
    })
})