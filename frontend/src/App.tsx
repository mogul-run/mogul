import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./context/authContext";
import Sidebar from "./subdomains/communities/components/nav/sidebar";
import Footer from "./subdomains/communities/components/nav/footer";
import Navbar from "./subdomains/communities/components/nav/navbar";
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
