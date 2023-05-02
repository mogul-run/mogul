import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ScrollToTop from "./utils/scrollToTop";
import "./App.css";
import { useAuth } from "./context/authContext";
import { ModalProvider } from "./context/modalContext";
import Sidebar from "./components/nav/sidebar";
import Footer from "./components/nav/footer";
import Navbar from "./components/nav/navbar";
import LabsLanding from "./labs/landing";

export function WithNavFooter({
    children,
}: {
    children: React.ReactNode | React.ReactNode[];
}) {
    const { getUser, signOut, getWallet } = useAuth();
    return (
        <div className="h-screen flex flex-col">
            <div className="">
                <Navbar
                    handleLogout={signOut}
                    user={getUser()}
                    walletAddr={getWallet()}
                />
            </div>
            <div className="flex-1 overflow-y-hide"> {children}</div>
            <div className="">
                <Footer />
            </div>
        </div>
    );
}
export function WithSidebar({
    children,
}: {
    children: React.ReactNode | React.ReactNode[];
}) {
    const [open, setOpen] = useState(true);
    const { getUser, signOut, getWallet } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        // if not auth, nav back to home
        if (!getUser()) {
            navigate("/");
        } else {
            if (window.innerWidth <= 800) {
                setOpen(false);
            }
        }
    }, []);

    const handleOpen = () => {
        setOpen(!open);
    };
    return (
        <div className="flex flex-row">
            {open ? (
                <div className="w-64">
                    <Sidebar handleOpen={handleOpen} />{" "}
                </div>
            ) : (
                <div className="fixed left-5 top-5 bg-stone-200 p-2 opacity-80 rounded cursor-pointer">
                    <div onClick={handleOpen}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </div>
                </div>
            )}
            <div className="w-full ml-10">{children}</div>
        </div>
    );
}

function App() {
    const { getUser } = useAuth();

    return (
        <div className="app">
            <ModalProvider>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<LabsLanding />} />
                </Routes>
            </ModalProvider>
        </div>
    );
}

export default App;
