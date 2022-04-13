import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage";
import TestSale from "./pages/test-sale";
import NYC26 from "./pages/ny26";
import ReactGA from "react-ga4";
import TGOB from "./pages/TGOB";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Feed from "./pages/feed";
import ScrollToTop from "./utils/scrollToTop";
import Team from "./pages/team";
import Login from "./components/login";
import { AppContextProvider } from "./context/appContext";
import { NotFound } from "./pages/notFound";
import {
    getAuth,
    signOut,
} from "firebase/auth";

ReactGA.initialize("G-WGSG8KJ0Z1");
ReactGA.send("pageview");

function App() {
    const [user, setUser] = useState({});
    const [userAccount, setUserAccount] = useState("");

    const auth = getAuth();

        
    // if user object exists -- user is logged in
    auth.onAuthStateChanged((user) => {
        if (user) {
            setUser(user);
        } else {
            setUser("");
        }
    });

    const handleLogout = () => {
        signOut(auth);
    };

    // const checkWalletIsConnected = () => {
    //     const { ethereum } = window as any;
    //     if (!ethereum) {
    //         console.log("wallet not connected!");
    //     } else {
    //         connectWalletHandler();
    //         console.log("wallet successfully connected!");
    //     }
    // };

    // const connectWalletHandler = async () => {
    //     const { ethereum } = window as any;
    //     if (!ethereum) {
    //         alert("please install metamask");
    //     } else {
    //         try {
    //             const accounts = await ethereum.request({
    //                 method: "eth_requestAccounts",
    //             });
    //             console.log("Received accounts", accounts);
    //             setUserAccount(accounts[0]);
    //         } catch (err) {
    //             console.log("Error while retrieving account address: ", err);
    //         }
    //     }
    // };

    return (
        <div className="app">
                <ScrollToTop />
                <Navbar handleLogout={handleLogout} user={user} />
                <Routes>
                    <Route
                        path="/test-sale"
                        element={<TestSale userAccount={userAccount} />}
                    />
                    <Route path="/nyc26" element={<NYC26 />} />
                    <Route path="/tgob" element={<TGOB />} />
                    <Route path="/team" element={<Team />} />
                    <Route path="/login" element={<Login user={user} />} />
                    <Route path="/feed" element={<Feed/>} />
                    <Route
                        path="/"
                        element={
                            <HomePage
                            // connectWalletHandler={connectWalletHandler()}
                            />
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
        </div>
    );
}

export default App;
