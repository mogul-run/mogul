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
import { getAuth, signOut } from "firebase/auth";
import AccountSettings from "./pages/account-settings";
import Chalet from "./pages/chalet";

ReactGA.initialize("G-WGSG8KJ0Z1");
ReactGA.send("pageview");

function App() {
    const [user, setUser] = useState({});
    const [walletAddr, setWalletAddr] = useState("");
    const [currentChain, setCurrentChain] = useState("");

    const auth = getAuth();

    // Check if user is connected with Metamask and update 'walletAddr' state
    useEffect(() => {
        // Setup Listen Handlers on MetaMask change events
        const { ethereum } = window as any;
        if (ethereum) {
            // Add Listener when accounts switch
            ethereum.request({
                method: "eth_requestAccounts",
            }).then(
            (accounts: string[]) => {
                setWalletAddr(accounts[0])
            }
            );

            ethereum.on("accountsChanged", (accounts: string[]) => {
                console.log("Account changed: ", accounts[0]);
                setWalletAddr(accounts[0]);
            });

            // Do something here when Chain changes
            ethereum.on("chainChanged", (chaindId: string) => {
                console.log("Chain ID changed: ", chaindId);
                setCurrentChain(chaindId);
            });
        } else {
            alert("Please install MetaMask to use this service!");
        }
    });

    // Firebase Auth listeners to maintain 'user' state 
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

    return (
        <div className="app">
            <ScrollToTop />
            <Navbar
                handleLogout={handleLogout}
                user={user}
                walletAddr={walletAddr}
            />
            <Routes>
                <Route
                    path="/test-sale"
                    element={<TestSale userAccount={walletAddr} />}
                />
                <Route path="/nyc26" element={<NYC26 />} />
                <Route path="/tgob" element={<TGOB />} />
                <Route path="/team" element={<Team />} />
                <Route path="/login" element={<Login user={user} />} />
                <Route
                    path="/account-settings"
                    element={
                        <AccountSettings
                            user={user}
                            walletAddr={walletAddr}
                            setWalletAddr={setWalletAddr}
                        />
                    }
                />
                <Route
                    path="/feed"
                    element={<Feed user={user} walletAddr={walletAddr} />}
                />
                <Route 
                    path="/c/lucas"
                    element={<Chalet user={user} walletAddr={walletAddr}/>}
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
