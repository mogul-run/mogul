import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage";
import ScrollToTop from "./utils/scrollToTop";
import { useAuth } from "./context/authContext";
import { NotFound } from "./pages/notFound";
import AccountSettings from "./pages/account-settings";
import MogulPad from "./pages/home";
import MogulRun from "./pages/bulletin/bulletin";
import Write from "./pages/guides/write";
import UserPosts from "./pages/user-posts";
import { ModalProvider } from "./context/modalContext";
import CreateEvent from "./pages/events/create-event";
import Chalet from "./pages/chalet/chalet";
import Guide from "./pages/guides/guide";
import Sidebar from "./components/nav/sidebar";
import Footer from "./components/nav/footer";
import Navbar from "./components/nav/navbar";
import EventPageTree from "./pages/events/event-page-tree";
import EventPageFire from "./pages/events/event-page-fire";
import EventPage from "./pages/events/event-page-tree";
import TGOB from "./pages/landing/TGOB";
import Team from "./pages/landing/team";

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
    const { getUser, signOut, getWallet } = useAuth();

    return (
        <div className="app">
            <ModalProvider>
                <ScrollToTop />
                <Routes>
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
                        path="/settings"
                        element={
                            <WithSidebar>
                                <AccountSettings
                                    user={getUser()}
                                    walletAddr={getWallet()}
                                />
                            </WithSidebar>
                        }
                    />
                    <Route
                        path="/write"
                        element={
                            <WithSidebar>
                                <Write />
                            </WithSidebar>
                        }
                    />
                    <Route
                        path="/e/create"
                        element={
                            <WithSidebar>
                                {" "}
                                <CreateEvent />
                            </WithSidebar>
                        }
                    />
                    <Route path="/guides/:post_id" element={<Guide />} />
                    <Route path="/e/tree" element={<EventPageTree />} />
                    <Route path="/e/fire" element={<EventPageFire />} />
                    <Route path="/e/:guide_id" element={<EventPage />} />
                    <Route
                        path="/:user_id/posts"
                        element={
                            <WithSidebar>
                                <UserPosts />
                            </WithSidebar>
                        }
                    />
                    <Route
                        path="/m/sender-central"
                        element={
                            <WithSidebar>
                                <Chalet />
                            </WithSidebar>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            getUser() ? (
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
                        path="/questions"
                        element={
                            <WithSidebar>
                                <MogulRun />
                            </WithSidebar>
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
            </ModalProvider>
        </div>
    );
}

export default App;
