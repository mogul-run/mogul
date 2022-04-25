import { getAuth, signInWithEmailAndPassword, User } from "@firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { getEmitHelpers } from "typescript";
import { AppContextType } from "./appContext";
import { Contract, ethers, providers } from "ethers";
import { formatEther, formatUnits } from "ethers/lib/utils";

export const AuthContext = React.createContext<any | null>(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
    const auth = getAuth();
    const [currentUser, setCurrentUser] = useState<User | null>();
    const [loading, setLoading] = useState(true);
    const [walletAddr, setWalletAddr] = useState("");
    const [currentChain, setCurrentChain] = useState("");
    const { ethereum } = window as any;

    function login(email: string, password: string) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function signOut() {
        return auth.signOut();
    }

    function signUp(email: string, password: string) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function getUser() {
        return currentUser;
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    // Check if user is connected with Metamask and update 'walletAddr' state
    useEffect(() => {
        // Setup Listen Handlers on MetaMask change events
        if (ethereum) {
            // Add Listener when accounts switch
            ethereum
                .request({
                    method: "eth_requestAccounts",
                })
                .then((accounts: string[]) => {
                    setWalletAddr(accounts[0]);
                });

            ethereum.on("accountsChanged", (accounts: string[]) => {
                console.log("Account changed: ", accounts[0]);
                setWalletAddr(accounts[0]);
                window.location.reload();
            });

            // Do something here when Chain changes
            ethereum.on("chainChanged", (chaindId: string) => {
                console.log("Chain ID changed: ", chaindId);
                setCurrentChain(chaindId);
                window.location.reload();
            });
        } else {
            console.log("Please install MetaMask to use this service!");
        }
    });

    function getWallet() {
        return walletAddr;
    }

    function getEthereum() {
        return ethereum;
    }

    async function connectWallet() {
        if (!ethereum) {
            console.log("please install metamask");
        } else {
            try {
                const accounts = await ethereum
                    .request({
                        method: "wallet_requestPermissions",
                        params: [
                            {
                                eth_accounts: {},
                            },
                        ],
                    })
                    .then(() =>
                        ethereum.request({ method: "eth_requestAccounts" })
                    );
                console.log("Received accounts", accounts);
                setWalletAddr(accounts[0]);
            } catch (err: any) {
                console.log("Error while retrieving account address: ", err);
            }
        }
    }

    async function getERC20Balance(contract_address: string) {
        const abi = [
            {
                constant: true,
                inputs: [
                    {
                        name: "_owner",
                        type: "address",
                    },
                ],
                name: "balanceOf",
                outputs: [
                    {
                        name: "balance",
                        type: "uint256",
                    },
                ],
                payable: false,
                type: "function",
            },
        ];
        const provider = new providers.Web3Provider(ethereum);
        const contract = new Contract(contract_address, abi, provider);
        const balance = await contract
            .balanceOf(walletAddr)
            .catch((err: Error) => {
                console.log(err);
            });

        // if errored out, just return 0
        return balance ? formatUnits(balance, 18) : "0.0";
    }

    async function getETHBalance() {
        const provider = new providers.Web3Provider(ethereum);
        const balance = await provider.getBalance(walletAddr);
        return formatEther(balance).substring(0, 6);
    }


    // recipient: eth wallet addr
    // amount: plaintext eth ex: 0.30 eth. we need to convert this to wei in txParams
    async function sendTransaction(recipient: string, value: string) {

        const txParams = {
            nonce: "0x00", // ignored by MetaMask
            // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
            // gas: '0x2710', // customizable by user during MetaMask confirmation.
            to: recipient, // for smart contract interactions, this should be the smart contract addr
            // to: props.post.walletAddr, // Required except during contract publications.
            from: ethereum.selectedAddress, // must match user's active address.
            // value: String(ethers.utils.parseUnits(value)), // Only required to send ether to the recipient from the initiating external account.
            value: ethers.utils.parseUnits(value).toHexString(), // Only required to send ether to the recipient from the initiating external account.
            // value: "1000000000", // Only required to send ether to the recipient from the initiating external account.
            // chainId: "0x3", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };
        const txHash = await ethereum.request({
            method: "eth_sendTransaction",
            params: [txParams],
        });
    }

    const value = {
        currentUser,
        getUser,
        login,
        signOut,
        signUp,
        getWallet,
        connectWallet,
        getERC20Balance,
        getETHBalance,
        getEthereum,
        sendTransaction,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
