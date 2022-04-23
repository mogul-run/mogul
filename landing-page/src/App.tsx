import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage";
import TestSale from "./pages/test-sale";
import ReactGA from "react-ga4";
import TGOB from "./pages/TGOB";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Feed from "./pages/feed";
import ScrollToTop from "./utils/scrollToTop";
import Team from "./pages/team";
import Login from "./components/login";
import { useAuth } from "./context/authContext";
import { NotFound } from "./pages/notFound";
import AccountSettings from "./pages/account-settings";

ReactGA.initialize("G-WGSG8KJ0Z1");
ReactGA.send("pageview");

function App() {
    const { getUser, signOut, getWallet } = useAuth();


    console.log(getUser());
    // Firebase Auth listeners to maintain 'user' state
    // if user object exists -- user is logged in
    // auth.onAuthStateChanged((user) => {
    //     if (user) {
    //         setUser(user);
    //     } else {
    //         setUser("");
    //     }
    // });

    // const handleLogout = () => {
    //     signOut(auth);
    // };

    return (
        <div className="app">
            <ScrollToTop />
            <Navbar
                handleLogout={signOut}
                user={getUser()}
                walletAddr={getWallet()}
            />
            <Routes>
                <Route
                    path="/test-sale"
                    element={<TestSale userAccount={getWallet()} />}
                />
                {/* <Route path="/nyc26" element={<NYC26 />} /> */}
                <Route path="/tgob" element={<TGOB />} />
                <Route path="/team" element={<Team />} />
                <Route path="/login" element={<Login user={getUser()} />} />
                <Route
                    path="/account-settings"
                    element={
                        <AccountSettings
                            user={getUser()}
                            walletAddr={getWallet()}
                        />
                    }
                />
                <Route
                    path="/feed"
                    element={<Feed user={getUser()} walletAddr={getWallet()} />}
                />
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
