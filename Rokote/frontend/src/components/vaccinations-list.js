import React, { useState, useEffect } from "react";
import VaccinationDataService from "../services/vaccination";

const VaccinationsList = props => {
  const [vaccinations, setVaccinations] = useState([]);
  const [totalSolar, setTotalSolar] = useState([]);
  const [totalAntiqua, setTotalAntiqua] = useState([]);
  const [totalZerpfy, setTotalZerpfy] = useState([]);
  const [totalVaccines, setTotalVaccinations] = useState([]);
  let total = totalSolar+totalAntiqua+totalZerpfy;

  useEffect(() => {
    retrieveVaccinations();
  }, []);

  const retrieveVaccinations = () => {
    VaccinationDataService.getAll()
      .then(response => {
        console.log(response.data);
        setVaccinations(response.data.vaccinations);
        setTotalVaccinations(response.data.total_results);
        
      })
      .catch(e => {
        console.log(e);
      });
    
      VaccinationDataService.getAllSolar()
      .then(response => {
        console.log(response.data);
        setTotalSolar(response.data.total_results);
        
      })
      .catch(e => {
        console.log(e);
      });

      VaccinationDataService.getAllAntiqua()
      .then(response => {
        console.log(response.data);
        setTotalAntiqua(response.data.total_results);
        
      })
      .catch(e => {
        console.log(e);
      });

      VaccinationDataService.getAllZerpfy()
      .then(response => {
        console.log(response.data);
        setTotalZerpfy(response.data.total_results);
        
      })
      .catch(e => {
        console.log(e);
      });
  };


  return (
    <div>
      <div className="row pb-1">
        <div className="input-group col-lg-4">
        </div>
        <div className="input-group col-lg-4">
        </div>
      </div>
      <div className="row">
        <ul>
          <li><strong>SolarBuddhica total: {totalSolar}</strong></li>
          <li><strong>Antiqua total: {totalAntiqua}</strong></li>
          <li><strong>Zerpfy total:{totalZerpfy}</strong></li>
          <li><strong>Total number of orders: {total}</strong></li>
          <li><strong>Total vaccinations: {totalVaccines}</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default VaccinationsList;