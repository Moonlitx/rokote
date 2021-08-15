import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import VaccinationList from "./components/vaccinations-list";
import SolarList from "./components/solar-list";
import AntiquaList from "./components/antiqua-list";
import ZerpfyList from "./components/zerpfy-list";

function App() {

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/vaccinations" className="navbar-brand">
          Vaccinations
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/solar"} className="nav-link">
              Solar
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/antiqua"} className="nav-link">
              Antiqua
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/zerpfy"} className="nav-link">
              Zerpfy
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/vaccinations"]} component={VaccinationList} />
          <Route exact path={["/", "/solar"]} component={SolarList} />
          <Route exact path={["/", "/antiqua"]} component={AntiquaList} />
          <Route exact path={["/", "/zerpfy"]} component={ZerpfyList} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
