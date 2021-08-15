import React, { useState, useEffect } from "react";
import VaccinationDataService from "../services/vaccination";

const AntiquaList = props => {
  const [antiquas, setAntiqua] = useState([]);
  const [dist, setDist] = useState("Kaikki");

  function changeHealthCareDist(event) {
    event.preventDefault();
    console.log(event.target.value);
    setDist(event.target.value);
    console.log(dist);
  }

  useEffect(() => {
    retrieveAntiqua();

  }, []);

  const retrieveAntiqua = () => {
    VaccinationDataService.getAllAntiqua()
      .then(response => {
        console.log(response.data);
        setAntiqua(response.data.antiqua);
        
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
        {antiquas.map((antiqua) => {

        if(dist === antiqua.healthCareDistrict || dist === "Kaikki"){ 
          
          return (
            <div className="col-lg-4 pb-1">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{antiqua.vaccine}</h5>
                  <p className="card-text">
                    <strong>Healthcare district: </strong>{antiqua.healthCareDistrict}<br/>
                    <strong>Number of ordears: </strong>{antiqua.orderNumber}
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

export default AntiquaList;