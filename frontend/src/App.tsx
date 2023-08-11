import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import LabsLanding from "./home/landing";
import DinnersHomepage from "./home/dinners/premvp";


function App() {

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<LabsLanding />} />
                <Route path="/dinners" element={<DinnersHomepage/>} />
            </Routes>
        </div>
    );
}

export default App;
