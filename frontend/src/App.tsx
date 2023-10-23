import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import LabsLanding from "./home/landing";
import DinnersHomepage from "./home/dinners/premvp";
import { CommunitiesRouter } from "./routes/CommunitiesRouter";


function App() {

    return (
        <div className="app">
                <CommunitiesRouter/> 
        </div>
    );
}

export default App;
