import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/authContext";
import Sidebar from "./communities/components/nav/sidebar";
import Footer from "./communities/components/nav/footer";
import Navbar from "./communities/components/nav/navbar";
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
