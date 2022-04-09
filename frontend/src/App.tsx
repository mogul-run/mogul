import React, { useEffect, useState } from "react";
import {ethers} from "ethers";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage";
import TestSale from "./pages/test-sale";
import NYC26 from "./pages/ny26";
import ReactGA from "react-ga4";
import TGOB from "./pages/TGOB";
import Navbar from "./components/navbar";

ReactGA.initialize("G-WGSG8KJ0Z1");
ReactGA.send("pageview");

function App() {
  const [userAccount, setUserAccount] = useState("");

  const checkWalletIsConnected = () => { 
    const { ethereum } = window as any;
    if(!ethereum) {
        console.log("wallet not connected!");
    }
    else {
      connectWalletHandler();
      console.log("wallet successfully connected!");
    }
  }

  const connectWalletHandler = async () => { 
    const { ethereum } = window as any;
    if(!ethereum) {
        alert("please install metamask");
    }
    else {
        try {
            const accounts = await ethereum.request({method: "eth_requestAccounts"});
            console.log("Received accounts", accounts);
            setUserAccount(accounts[0]);
        }
        catch (err) {
          console.log("Error while retrieving account address: ", err);
        }
    }
  }


  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

    return (
        <div className="app">
          <Navbar/>
            <Routes>
                <Route path="/test-sale" element={<TestSale userAccount={userAccount}/>}/>
                <Route path="/nyc26" element={<NYC26 />}/>
                <Route path="/tgob" element={<TGOB/> }/>
                <Route path="/" element={<HomePage connectWalletHandler={connectWalletHandler}/>}/>
            </Routes>
        </div>
    );
}

export default App;