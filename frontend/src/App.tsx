import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./communities/homepage";
import ScrollToTop from "./utils/scrollToTop";
import { useAuth } from "./context/authContext";
import { NotFound } from "./communities/notFound";
import AccountSettings from "./communities/account-settings";
import Home from "./communities/home";
import MogulRun from "./communities/bulletin/bulletin";
import Write from "./communities/guides/write";
import UserPosts from "./communities/user-posts";
import { ModalProvider } from "./context/modalContext";
import CreateEvent from "./communities/events/create-event";
import Chalet from "./communities/club/club";
import Guide from "./communities/guides/guide";
import Sidebar from "./components/nav/sidebar";
import Footer from "./components/nav/footer";
import Navbar from "./components/nav/navbar";
import EventPageTree from "./communities/events/event-page-tree";
import EventPageFire from "./communities/events/event-page-fire";
import EventPage from "./communities/events/event-page-tree";
import TGOB from "./communities/landing/TGOB";
import Team from "./communities/landing/team";
import GuideEdit from "./communities/guides/guide-edit";
import Alpha from "./communities/alpha/alpha";
import Collections from "./communities/collections/collection";
import Courses from "./communities/courses/courses";
import Houses from "./communities/houses/houses";
import CoursePage from "./communities/courses/course-page";
import CreateCourse from "./communities/courses/create-course";
import CoursePageSurf from "./communities/courses/course-page-surf";
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
    const { getUser } = useAuth();

    return (
        <div className="app">
            <ModalProvider>
                <ScrollToTop />
                <Routes>
                    {/* <Route
                        path="/tgob"
                        element={
                            <WithNavFooter>
                                <TGOB />
                            </WithNavFooter>
                        }
                    /> */}
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
                            <WithNavFooter>
                                <AccountSettings />
                            </WithNavFooter>
                        }
                    />
                    <Route
                        path="/write"
                        element={
                            <WithNavFooter>
                                <Write />
                            </WithNavFooter>
                        }
                    />
                    {/* <Route
                        path="/e/create"
                        element={
                            <WithSidebar>
                                {" "}
                                <CreateEvent />
                            </WithSidebar>
                        }
                    /> */}
                    {/* <Route
                        path="/questions"
                        element={
                            <WithSidebar>
                                <MogulRun />
                            </WithSidebar>
                        }
                    /> */}
                    <Route path="/guides/:guide_id" element={<Guide />} />
                    <Route
                        path="/guides/:guide_id/edit"
                        element={<GuideEdit />}
                    />
                    <Route path="/e/tree" element={<EventPageTree />} />
                    <Route path="/e/fire" element={<EventPageFire />} />
                    <Route path="/e/:post_id" element={<EventPage />} />
                    <Route
                        path="/:user_id/posts"
                        element={
                            <WithSidebar>
                                <UserPosts />
                            </WithSidebar>
                        }
                    />
                    <Route path="/" element={<LabsLanding />} />
                    {/* #### old component for homepage  
                    <Route
                        path="/"
                        element={
                            // getUser() ? (
                            //     <WithNavFooter>
                            //         <Home />
                            //     </WithNavFooter>
                            // ) : (
                            <WithNavFooter>
                                <LabsLanding/>
                            </WithNavFooter>
                            // )
                        }
                    /> */}
                    <Route
                        path="/collections"
                        element={
                            // getUser() ? (
                            //     <WithNavFooter>
                            //         <Home />
                            //     </WithNavFooter>
                            // ) : (
                            <WithNavFooter>
                                <Collections />
                            </WithNavFooter>
                            // )
                        }
                    />
                    <Route
                        path="/courses"
                        element={
                            <WithNavFooter>
                                <Courses />
                            </WithNavFooter>
                        }
                    />
                    <Route
                        path="/course/create"
                        element={
                            <WithNavFooter>
                                <CreateCourse />
                            </WithNavFooter>
                        }
                    />
                    <Route
                        path="/course/valley-surfers"
                        element={
                            <WithNavFooter>
                                <CoursePageSurf />
                            </WithNavFooter>
                        }
                    />
                    <Route
                        path="/course/:course_id"
                        element={
                            <WithNavFooter>
                                <CoursePage />
                            </WithNavFooter>
                        }
                    />
                    <Route
                        path="/collection/:collection_id"
                        element={
                            <WithNavFooter>
                                <Alpha />
                            </WithNavFooter>
                        }
                    />
                    <Route
                        path="/collection/:collection_id/:nft_id"
                        element={
                            <WithNavFooter>
                                <Alpha />
                            </WithNavFooter>
                        }
                    />
                    <Route
                        path="/houses"
                        element={
                            <WithNavFooter>
                                <Houses />
                            </WithNavFooter>
                        }
                    />
                    <Route
                        path="/house/:house_id"
                        element={
                            <WithNavFooter>
                                <Chalet />
                            </WithNavFooter>
                        }
                    />
                    <Route
                        path="/house/:house_id/:subpage_id"
                        element={
                            <WithNavFooter>
                                <Chalet />
                            </WithNavFooter>
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
