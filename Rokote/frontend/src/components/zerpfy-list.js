import React, { useState, useEffect } from "react";
import VaccinationDataService from "../services/vaccination";

const ZerpfyList = props => {
  const [zerpfy, setZerpfy] = useState([]);
  const [dist, setDist] = useState("Kaikki");

  function changeHealthCareDist(event) {
    event.preventDefault();
    console.log(event.target.value);
    setDist(event.target.value);
    console.log(dist);
  }

  useEffect(() => {
    retrieveZerpfy();
  }, []);

  const retrieveZerpfy = () => {
    VaccinationDataService.getAllZerpfy()
      .then(response => {
        console.log(response.data);
        setZerpfy(response.data.zerpfy);
        
      })
      .catch(e => {
        console.log(e);
      });
  };

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
        {zerpfy.map((zerpfy) => {

      if(dist === zerpfy.healthCareDistrict || dist === "Kaikki"){ 
          
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{zerpfy.vaccine}</h5>
                  <p className="card-text">
                    <strong>Healthcare district: </strong>{zerpfy.healthCareDistrict}<br/>
                    <strong>Number of ordears: </strong>{zerpfy.orderNumber}
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

export default ZerpfyList;