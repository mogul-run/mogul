import { Route, Routes, useNavigate } from "react-router-dom";
import Chalet from "../subdomains/communities/club/club";
import AccountSettings from "../subdomains/communities/account-settings";
import Team from "../subdomains/communities/landing/team";
import Write from "../subdomains/communities/guides/write";
import Guide from "../subdomains/communities/guides/guide";
import GuideEdit from "../subdomains/communities/guides/guide-edit";
import EventPageTree from "../subdomains/communities/events/event-page-tree";
import EventPage from "../subdomains/communities/events/event-page-tree";
import EventPageFire from "../subdomains/communities/events/event-page-fire";
import UserPosts from "../subdomains/communities/user-posts";
import Houses from "../subdomains/communities/houses/houses";
import Alpha from "../subdomains/communities/alpha/alpha";
import { NotFound } from "../subdomains/communities/notFound";
import CreateCourse from "../subdomains/communities/courses/create-course";
import CoursePage from "../subdomains/communities/courses/course-page";
import CoursePageSurf from "../subdomains/communities/courses/course-page-surf";
import Courses from "../subdomains/communities/courses/courses";
import Collections from "../subdomains/communities/collections/collection";
import { ModalProvider } from "../context/modalContext";
import ScrollToTop from "../utils/scrollToTop";
import HomePage from "../subdomains/communities/homepage";
import { AuthProvider, useAuth } from "../context/authContext";
import Navbar from "../subdomains/communities/components/nav/navbar";
import Footer from "../subdomains/communities/components/nav/footer";
import { useEffect, useState } from "react";
import Sidebar from "../subdomains/communities/components/nav/sidebar";

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

export function CommunitiesRouter() {
    return (
        <>
            <AuthProvider>
                <ModalProvider>
                    <ScrollToTop />
                    <Routes>
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
                        <Route
                            path="/"
                            element={
                                // getUser() ? (
                                //     <WithNavFooter>
                                //         <Home />
                                //     </WithNavFooter>
                                // ) : (
                                <WithNavFooter>
                                    <HomePage />
                                </WithNavFooter>
                                // )
                            }
                        />
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
            </AuthProvider>
        </>
    );
}
