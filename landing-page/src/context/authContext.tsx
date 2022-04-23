import { getAuth, signInWithEmailAndPassword, User } from "@firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { getEmitHelpers } from "typescript";
import { AppContextType } from "./appContext";
import { Contract, providers } from "ethers";
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
        return balance ? formatUnits(balance, 18).substring(0, 6) : "0.0";
    }

    async function getETHBalance() {
        const provider = new providers.Web3Provider(ethereum);
        const balance = await provider.getBalance(walletAddr);
        return formatEther(balance).substring(0, 6);
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
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
