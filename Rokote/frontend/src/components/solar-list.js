import React, { useState, useEffect } from "react";
import VaccinationDataService from "../services/vaccination";

const SolarList = props => {
  const [solar, setSolar] = useState([]);
  const [dist, setDist] = useState("Kaikki");

  function changeHealthCareDist(event) {
    event.preventDefault();
    console.log(event.target.value);
    setDist(event.target.value);
    console.log(dist);
  }

  useEffect(() => {
    retrieveSolar();
    
  }, []);

  const retrieveSolar = () => {
    VaccinationDataService.getAllSolar()
      .then(response => {
        console.log(response.data);
        setSolar(response.data.solar);
        
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <div>
      <select class="form-select" defaultValue={'Kaikki'} aria-label="Default select example" onChange={changeHealthCareDist}>
        <option selected>Lajittele sairaanhoitopiirillä</option>
        <option value="HYKS">HYKS</option>
        <option value="KYS">KYS</option>
        <option value="OYS">OYS</option>
        <option value="TAYS">TAYS</option>
        <option value="TYKS">TYKS</option>
        <option value="Kaikki">Kaikki</option>
      </select>
      <div className="row mt-1">
        {solar.map((solar) => {

        if(dist === solar.healthCareDistrict || dist === "Kaikki"){ 
          
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{solar.vaccine}</h5>
                  <p className="card-text">
                    <strong>Healthcare district: </strong>{solar.healthCareDistrict}<br/>
                    <strong>Number of ordears: </strong>{solar.orderNumber}
                  </p>
                  <div className="row">
                  </div>
                </div>
              </div>
            </div>
          );
        
        }
        })}

      </div>
    </div>
  );
};

export default SolarList;