import {
    child,
    getDatabase,
    onValue,
    onChildChanged,
    push,
    ref,
    remove,
    set,
} from "firebase/database";
import { sample, toArray } from "lodash";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User } from "../../components/auth/current-user";
import { Comments } from "../../components/social/post";
import UserPopup from "../../components/social/userPopup";
import { useAuth } from "../../context/authContext";
import { useAuthModal } from "../../context/modalContext";
import Transfer from "../../components/web3/transfer";
import { Course } from "../../types/types";
import { getAdditionalUserInfo } from "firebase/auth";

const surf_course = {
    title: "The Inlanders Guide to Surfing",
    id: "valley_surfers",
    author: {
        photoURL:
            "https://firebasestorage.googleapis.com/v0/b/mogul-run.appspot.com/o/user%2FvlITP8crPWNU1jjE1TCosD6L20x2%2Fprofile_img?alt=media&token=481869b3-dfd6-4844-b917-0757ed8bc2c0",
        displayName: "lucasxsong",
        walletAddr: "0xCe4E67E407aB231925DF614a5e72687fD597324B",
        uid: "123",
    },
    location: "SF Bay Area, CA",
    duration: "4 weeks",
    cover_url: "https://i.imgur.com/cov0ZJB.jpg",
    hook: "Build a strong base to become a confident surfer. Targeted towards beginning surfers that live inland, but open to all levels and localities. ",
    desc: "Climb up a Redwood tree with panoramic views of beautiful Fremont. As the sun comes down, ",
    num_seats: 3,
    seat_price: 0.05,
    media: ["https://i.imgur.com/cov0ZJB.jpg", ""],
};

function CoursePage() {
    const [course, setCourse] = useState<Course>(surf_course);
    const [loaded, setLoaded] = useState(true);
    const [openComment, setOpenComment] = useState(false);
    const [userRSVPd, setUserRSVPd] = useState(false);
    const [participants, setParticipants] = useState<any[]>([]);
    const [comments, setComments] = useState<any[]>([]);
    const [signup, setSignup] = useState(false);
    const { getUser, getWallet } = useAuth();
    let { handleModal } = useAuthModal();
    const db = getDatabase();
    const { course_id } = useParams();

    useEffect(() => {
        getParticipants();
        getComments();
    }, []);

    const getParticipants = () => {
        onValue(
            ref(db, `/course/valley-surfers/participants`),
            (snapshot) => {
                if (snapshot.exists()) {
                    if (snapshot.val()[getUser().uid]) {
                        setUserRSVPd(true);
                    }
                    // console.log(participants_arr)
                    setParticipants(toArray(snapshot.val()));
                }
            },
            {
                onlyOnce: false,
            }
        );
    };
    const getComments = () => {
        onValue(
            ref(db, `/course/valley-surfers/comments`),
            (snapshot) => {
                if (snapshot.exists()) {
                    setComments(toArray(snapshot.val()));
                }
            },
            {
                onlyOnce: false,
            }
        );
    };

    const handleRSVP = () => {
        if (!getUser()) {
            handleModal();
        } else {
            // add user to rsvp list
            const new_user = {
                displayName: getUser().displayName,
                photoURL: getUser().photoURL,
                walletAddr: getWallet(),
            };
            set(
                ref(db, `course/valley-surfers/participants/${getUser().uid}`),
                new_user
            )
                .then(() => {
                    setUserRSVPd(true);
                })
                .catch((error) => {
                    console.log("error: ", error);
                });
        }
    };
    const handleRemoveRSVP = () => {
        // add user to rsvp list
        remove(ref(db, `course/valley-surfers/participants/${getUser().uid}`))
            .then(() => {
                setUserRSVPd(false);
            })
            .catch((error) => {
                console.log("error: ", error);
            });
    };

    const handleSuccess = () => {
        // function to add current user to event participants list when tx succeeds
        console.log(getUser().displayName, "to be added");
    };

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <div className="max-w-[768px] md:w-full mx-10 sm:mx-2 flex flex-col space-y-8">
                <div className="mt-4 max-w-[768px] md:w-full md:grid md:grid-cols-5 md:grid-flow-row gap-8 sm:flex sm:flex-col space-y-4">
                    <div className="col-span-3 flex flex-col space-y-8">
                        <div className="mt-10">
                            <div className="mt-2 text-3xl font-bold">
                                The Inlander's Guide to Surfing
                            </div>
                            <div className="flex mt-6 w-full flex-wrap space-y-3 justify-between items-baseline">
                                <div className="">
                                    <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                        hosted by
                                    </label>
                                    <UserPopup user={course?.author} />
                                </div>
                                <div className="">
                                    <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                        location
                                    </label>
                                    {course?.location}
                                </div>
                                <div className="">
                                    <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                        duration
                                    </label>
                                    {course?.duration}
                                </div>
                            </div>
                        </div>
                        <div className="text-stone-500 text-md">
                            Always wanted to feel the thrill of riding the surf
                            but not sure where to start? We'll take you from
                            landlubber to salty surfer.
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                        <img
                            src={
                                "https://firebasestorage.googleapis.com/v0/b/mogul-run.appspot.com/o/user%2FvlITP8crPWNU1jjE1TCosD6L20x2%2Fprofile_img?alt=media&token=481869b3-dfd6-4844-b917-0757ed8bc2c0"
                            }
                            className="object-cover w-[300px] h-[400px] rounded bg-morange p-1"
                        />
                    </div>
                </div>
                <div className="my-10 flex flex-col space-y-3">
                    <div className="grid md:grid-cols-2 gap-2">
                        <div className="uppercase text-md font-bold text-gray-500 tracking-widest">
                            This Course Includes...
                        </div>
                        <div>
                            <div className="text-lg font-bold">
                                How To Be Cool With Poseidon 101
                            </div>
                            <div className="text-md">
                                The ocean can be a dangerous place for the
                                uninitiated.
                            </div>
                        </div>
                        <div>
                            <div className="text-lg font-bold">
                                Locals Only Safety Training
                            </div>
                            <div className="text-md">
                                No one wants to get their head bashed into by a
                                local. Learn how to be a respectful surfer in
                                the lineup.
                            </div>
                        </div>
                        <div>
                            <div className="text-lg font-bold">
                                Surfboard Technician Certification
                            </div>
                            <div className="text-md">
                                The ins and outs of surfboard design,
                                construction, and care. We'll teach you how to
                                pick the right board for your skill level and
                                the conditions.
                            </div>
                        </div>
                        <div className="">
                            <div className="text-lg font-bold">
                                Concrete Wave Shred-ology
                            </div>
                            <div className="text-md">
                                Just because you're inland doesn't mean ya can't
                                surf! Learn techniques to keep surf fitness and
                                skills sharp when you can't get to the beach.
                            </div>
                        </div>
                        <div className="col-span-1 flex justify-end items-end mt-2">
                            <div className="text-md font-bold uppercase text-gray-500 tracking-widest">
                                ...and much more!
                            </div>
                        </div>
                    </div>
                </div>{" "}
                <EnrollmentMenu />
                {/* <div
                                className={`my-5 flex flex-col w-full space-x-5 items-center`}
                            >
                                <div className="text-xl hover:rotate-2 underline-offset-2 hover:underline-offset-8 transition-all font-bold mb-3">
                                    course attendees
                                </div>
                                <div className="flex flex-col max-h-32 space-y-2">
                                    {getUser() ? (
                                        participants.map((u) => {
                                            return (
                                                <div className="">
                                                    <UserPopup user={u} />
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div>
                                            <span
                                                onClick={handleModal}
                                                className="cursor-pointer text-sky-700"
                                            >
                                                sign in
                                            </span>{" "}
                                            to view list
                                        </div>
                                    )}
                                </div>
                            </div> */}
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3 flex-wrap pb-10">
                    <div>
                        <div className="text-lg tracking-widest">
                            Meet Your Instructor, Lucas
                        </div>
                        <div className="text-md">
                            Lucas grew up in Sunny Fremont, CA and spent his
                            childhood years playing in the pool.
                        </div>
                    </div>
                    <div className="outline-box px-3 py-7 bg-gradient-to-br from-purple-700 to-teal-400 text-stone-100">
                        <div className="text-2xl tracking-widest font-bold animate-bounce mb-2">
                            CRYPTO GOODIES!
                        </div>
                        <div className="text-sm">
                            The course NFT will be available to mint after
                            graduation of the first cohort. Attendees that pass
                            the course will be entitled to a free mint, and
                            remaining NFTs will be released to the general
                            public.
                            <div className="mt-2 text-lg font-bold">NFT owners get perks like:</div>
                            <ul className="built">
                                <li>
                                    Access to a creator houses.
                                </li>
                                <li>

                                </li>
                            </ul>
                        </div>
                        <div className="btn-std mt-3">
                            Read More About Mogul NFTs
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => setOpenComment(!openComment)}
                    className="flex items-center text-sm text-stone-400 cursor-pointer hover:text-stone-600 decoration-solid pb-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                        />
                    </svg>
                    {comments ? comments.length : "0"} comment
                    {comments.length === 1 ? "" : "s"}
                </div>
                {openComment && (
                    <div className="pb-4">
                        <Comments
                            comment_path="/course/valley-surfers/comments"
                            comments={comments}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

const EnrollmentMenu = () => {
    const [signup, setSignup] = useState(false);
    const [enrollment, setEnrollment] = useState("inperson");
    let { handleModal } = useAuthModal();
    const { getUser, getWallet } = useAuth();
    const handleSignup = () => {
        if (!getUser()) {
            handleModal();
        } else {
            setSignup(!signup);
        }
    };
    const handleSuccess = () => {
        // function to add current user to event participants list when tx succeeds
        console.log(getUser().displayName, "to be added");
    };

    return (
        <div
            className={`
             outline-box flex flex-col flex-wrap md:flex-row justify-between`}
        >
            <div className="flex flex-col flex-wrap  text-xl items-center justify-center bg-stone-100 h-full space-y-5 ">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
                    <div className="flex flex-col">
                        <div className="text-2xl text-stone-500 uppercase tracking-widest mb-3">
                            Enrollment Options
                        </div>
                        <div className="flex flex-col space-y-3 h-full justify-center">
                            <div
                                className={`outline px-2 py-1 text-stone-600 cursor-pointer ${
                                    "inperson" === enrollment
                                        ? "bg-orange-400 text-stone-100"
                                        : "hover:bg-stone-200"
                                }`}
                                onClick={() => setEnrollment("inperson")}
                            >
                                <div className="font-bold text-xl tracking-wider">
                                    In-Person
                                </div>
                                <div className="text-xs">
                                    Full fledged course with multiple in-person
                                    trainings and surf sessions. Limited seats.{" "}
                                </div>
                            </div>
                            <div
                                className={`outline px-2 py-1 text-stone-600 cursor-pointer ${
                                    "virtual" === enrollment
                                        ? "bg-orange-400 text-stone-100"
                                        : "hover:bg-stone-200"
                                }`}
                                onClick={() => setEnrollment("virtual")}
                            >
                                <div className="font-bold text-xl tracking-wider">
                                    Virtual
                                </div>
                                <div className="text-xs">
                                    Follow along the in-person class with
                                    virtual training assessments and virtual
                                    coaching sessions.
                                </div>
                            </div>
                            <div
                                className={`outline px-2 py-1 text-stone-600 cursor-pointer ${
                                    "async" === enrollment
                                        ? "bg-orange-400 text-stone-100"
                                        : "hover:bg-stone-200"
                                }`}
                                onClick={() => setEnrollment("async")}
                            >
                                <div className="font-bold text-xl tracking-wider">
                                    Asynchronous
                                </div>
                                <div className="text-xs">
                                    Receive course notes emailed to you after
                                    the course terminates.
                                </div>
                            </div>
                        </div>
                    </div>
                    <EnrollmentSwitch
                        enrollment={enrollment}
                        handleSignup={handleSignup}
                    />
                </div>
            </div>
            {signup && (
                <div className="flex w-full justify-center mt-3">
                    <Transfer
                        note="For Inland Surf Training"
                        to={surf_course.author}
                        amount={surf_course.seat_price}
                        handleSuccess={handleSuccess}
                    />
                </div>
            )}
        </div>
    );
};

function EnrollmentSwitch(props: any) {
    const { getUser } = useAuth();
    let { handleModal } = useAuthModal();
    switch (props.enrollment) {
        // case "inperson":
        //     return (
        //         <div className="grid grid-cols-3 gap-3">
        //             <div className="relative col-span-2 ">
        //                 <label className="block p-4 text-sm uppercase transition-colors border border-stone-100 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 ">
        //                     <span> Next Session</span>
        //                     <span className="block mt-1 text-md text-stone-600">
        //                         September 4, 2022 - October 4, 2022
        //                     </span>
        //                 </label>
        //             </div>
        //             <div className="relative">
        //                 <label className="block p-4 text-sm uppercase transition-colors border border-stone-100 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 ">
        //                     <span> Seats Left</span>

        //                     <span className="block mt-1 text-lg text-stone-600">
        //                         4
        //                     </span>
        //                 </label>
        //             </div>

        //             <div className="relative">
        //                 <label className="block p-4 text-sm uppercase font-medium transition-colors border border-stone-100 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 ">
        //                     <span> Seat Price</span>

        //                     <span className="block mt-1 text-stone-600 text-lg">
        //                         0.3 ETH
        //                     </span>
        //                 </label>
        //             </div>
        //             <div className="col-span-2 flex items-end">
        //                 <button
        //                     className="nostyle relative inline-block group focus:outline-none focus:ring"
        //                     onClick={props.handleSignup}
        //                 >
        //                     <span className="rounded absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-orange-400 group-hover:translate-y-0 group-hover:translate-x-0"></span>

        //                     <span className="rounded relative inline-block px-8 py-3 text-lg font-bold tracking-widest uppercase border-2 border-current group-active:text-opacity-75">
        //                         Grab a seat!
        //                     </span>
        //                 </button>
        //             </div>
        //         </div>
        //     );
        case "inperson":
            return (
                <div className="flex flex-col items-around justify-around p-2">
                    <div className="text-sm">
                        Got any questions? Want to sign up for the course?
                    </div>
                    {getUser() ? (
                        <div>
                            <div className="text-lg flex items-center text-bold">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 p-1 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                                    />
                                </svg>
                                <a href="tel:5105168818 text-stone-700">
                                    510-516-8818
                                </a>
                            </div>
                            <div className="text-lg flex items-center text-bold ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 p-1 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M7.875 14.25l1.214 1.942a2.25 2.25 0 001.908 1.058h2.006c.776 0 1.497-.4 1.908-1.058l1.214-1.942M2.41 9h4.636a2.25 2.25 0 011.872 1.002l.164.246a2.25 2.25 0 001.872 1.002h2.092a2.25 2.25 0 001.872-1.002l.164-.246A2.25 2.25 0 0116.954 9h4.636M2.41 9a2.25 2.25 0 00-.16.832V12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 12V9.832c0-.287-.055-.57-.16-.832M2.41 9a2.25 2.25 0 01.382-.632l3.285-3.832a2.25 2.25 0 011.708-.786h8.43c.657 0 1.281.287 1.709.786l3.284 3.832c.163.19.291.404.382.632M4.5 20.25h15A2.25 2.25 0 0021.75 18v-2.625c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125V18a2.25 2.25 0 002.25 2.25z"
                                    />
                                </svg>
                                <a href="mailto:lucas@mogul.run">
                                    lucas@mogul.run
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="h-32 flex items-center justify-center">
                            <div
                                className="btn-primary flex items-center"
                                onClick={() => handleModal(false)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 p-1 mr-2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                                    />
                                </svg>
                                Sign in to view contact info
                            </div>
                        </div>
                    )}
                    <div className="text-sm">
                        Discounts and scholarships are available on case by case
                        basis and are likely to be granted to friends and family
                        ;).{" "}
                    </div>
                </div>
            );

        case "virtual":
            return (
                <div className="flex flex-col p-2 justify-around">
                    <div className="text-sm">
                        Virtual class schedule is dependent on in-person class
                        schedules. Want to be notified when a course is
                        starting?
                    </div>
                    <div className="btn-primary">Sign Up</div>
                </div>
            );
        case "async":
            return <div>keep me in the loop!</div>;
    }
    return <div />;
}

export default CoursePage;
