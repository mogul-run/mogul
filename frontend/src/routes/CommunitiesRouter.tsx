import { Route, Routes } from "react-router-dom";
import Chalet from "../communities/club/club";
import MogulRun from "../communities/bulletin/bulletin";
import AccountSettings from "../communities/account-settings";
import { WithNavFooter, WithSidebar } from "../App";
import CommunitiesHomePage from "../communities/homepage";
import Team from "../communities/landing/team";
import Write from "../communities/guides/write";
import Guide from "../communities/guides/guide";
import GuideEdit from "../communities/guides/guide-edit";
import EventPageTree from "../communities/events/event-page-tree";
import EventPage from "../communities/events/event-page-tree";
import EventPageFire from "../communities/events/event-page-fire";
import UserPosts from "../communities/user-posts";
import Houses from "../communities/houses/houses";
import Alpha from "../communities/alpha/alpha";
import { NotFound } from "../communities/notFound";
import CreateCourse from "../communities/courses/create-course";
import CoursePage from "../communities/courses/course-page";
import CoursePageSurf from "../communities/courses/course-page-surf";
import Courses from "../communities/courses/courses";
import Collections from "../communities/collections/collection";


export function CommunitiesRouter() {
    return (
        <>
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
        </>
    );
}