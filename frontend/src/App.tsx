import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import LabsLanding from "./labs/landing";


function App() {

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<LabsLanding />} />
            </Routes>
        </div>
    );
}

export default App;
