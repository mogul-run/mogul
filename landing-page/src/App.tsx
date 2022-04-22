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
import { useAuth } from "./context/authContext";
import { NotFound } from "./pages/notFound";
import AccountSettings from "./pages/account-settings";
import Chalet from "./pages/chalet/chalet";

ReactGA.initialize("G-WGSG8KJ0Z1");
ReactGA.send("pageview");

function App() {
    const { getUser, signOut } = useAuth();
    const [walletAddr, setWalletAddr] = useState("");
    const [currentChain, setCurrentChain] = useState("");


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
                walletAddr={walletAddr}
            />
            <Routes>
                <Route
                    path="/test-sale"
                    element={<TestSale userAccount={walletAddr} />}
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
                            walletAddr={walletAddr}
                            setWalletAddr={setWalletAddr}
                        />
                    }
                />
                <Route
                    path="/feed"
                    element={<Feed user={getUser()} walletAddr={walletAddr} />}
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
