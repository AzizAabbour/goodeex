import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import MainForm from "./MainForm.jsx";
import ResultSummary from "./ResultSummary.jsx";

const App = () => {
    return (
      <>
        <nav>
          <Link to="/">Formulaire</Link> | <Link to="/resultats">Résultats</Link>
        </nav>


        <Routes>
            <Route path="/" element={<MainForm />} />
            <Route path="/resultats" element={<ResultSummary />} />
        </Routes>
      </>
    )
  }

  export default App;
