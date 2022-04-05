import React, { useEffect, useState } from "react";
import {ethers} from "ethers";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage";
import TestSale from "./pages/test-sale";
import NYC26 from "./pages/ny26";
import ReactGA from "react-ga4";

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

  // const mintNftHandler = async () => { 
  //   try {
  //     const { ethereum } = window as any;

  //     if(ethereum) {
  //       // provider, signer, then generate nftcontract 
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       // provider uses private key to provide signer object to "sign" tx (access balance)
  //       const signer = provider.getSigner();
  //       const nftContract = new ethers.Contract(contractAddress, abi, signer);

  //       console.log("init payment");
  //       const nftTx = await nftContract.mintNFTs(1, {value: ethers.utils.parseEther("0.01")});

  //       console.log("mining, please wait");
  //       await nftTx.wait();

  //       console.log(`Mined, please check transaction at https://ropsten.etherscan.io/tx/${nftTx.hash}`);
  //     }
  //     else {
  //       alert("please install metamask");
  //     }

  //   }
  //   catch(err) {
  //       console.log("error while minting nft:", err);
  //   }

  // }

  const connectWalletButton = () => {
    return (
      <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Wallet
      </button>
    )
  }

  // const mintNftButton = () => {
  //   return (
  //     <button onClick={mintNftHandler} className='cta-button mint-nft-button'>
  //       Mint NFT
  //     </button>
  //   )
  // }

  useEffect(() => {
    checkWalletIsConnected();
  }, [])

    return (
        <div className="app">
            <Routes>
                <Route path="/test-sale" element={<TestSale userAccount={userAccount}/>}/>
                <Route path="/nyc26" element={<NYC26 />}/>
                {/* <Route path="/" element={<WIP/>}/> */}
                <Route path="/" element={<HomePage connectWalletHandler={connectWalletHandler}/>}/>
            </Routes>
        </div>
    );
}

export default App;
