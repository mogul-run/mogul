import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage";
import TestSale from "./pages/test-sale";
import TGOB from "./pages/TGOB";
import Navbar from "./components/navbar";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer";
import Feed from "./pages/feed";
import ScrollToTop from "./utils/scrollToTop";
import Team from "./pages/team";
import Login from "./components/login";
import { useAuth } from "./context/authContext";
import { NotFound } from "./pages/notFound";
import AccountSettings from "./pages/account-settings";
import MogulPad from "./pages/mogulpad";

function WithNavFooter({
    children,
}: {
    children: React.ReactNode | React.ReactNode[];
}) {
    const { getUser, signOut, getWallet } = useAuth();
    return (
        <div>
            <Navbar
                handleLogout={signOut}
                user={getUser()}
                walletAddr={getWallet()}
            />
            {children}
            <Footer />
        </div>
    );
}
function WithSidebar({
    children,
}: {
    children: React.ReactNode | React.ReactNode[];
}) {
    const { getUser, signOut, getWallet } = useAuth();
    return (
        <div>
            <Sidebar />
            {children}
        </div>
    );
}

function App() {
    const { getUser, signOut, getWallet } = useAuth();

    return (
        <div className="app">
            <ScrollToTop />
            <Routes>
                {/* <Route path="/nyc26" element={<NYC26 />} /> */}
                <Route
                    path="/tgob"
                    element={
                        <WithNavFooter>
                            <TGOB />
                        </WithNavFooter>
                    }
                />
                <Route
                    path="/team"
                    element={
                        <WithNavFooter>
                            <Team />
                        </WithNavFooter>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <WithNavFooter>
                            <Login user={getUser()} />
                        </WithNavFooter>
                    }
                />
                <Route
                    path="/account-settings"
                    element={
                        <WithNavFooter>
                            <AccountSettings
                                user={getUser()}
                                walletAddr={getWallet()}
                            />
                        </WithNavFooter>
                    }
                />
                <Route
                    path="/"
                    element={
                        getUser ? (
                            <WithSidebar>
                                <MogulPad />
                            </WithSidebar>
                        ) : (
                            <WithNavFooter>
                                <HomePage />
                            </WithNavFooter>
                        )
                    }
                />
                <Route
                    path="*"
                    element={
                        <WithNavFooter>
                            <NotFound />
                        </WithNavFooter>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
