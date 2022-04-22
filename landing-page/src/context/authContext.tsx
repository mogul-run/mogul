import { getAuth, signInWithEmailAndPassword, User } from "@firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { AppContextType } from "./appContext";

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
        const { ethereum } = window as any;
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

    function getWallet() {
        return walletAddr;
    }

    async function connectWallet() {
        const { ethereum } = window as any;
        if (!ethereum) {
            alert("please install metamask");
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

    const value = {
        currentUser,
        getUser,
        login,
        signOut,
        signUp,
        getWallet,
        connectWallet,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
