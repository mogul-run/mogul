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
            <div>
                <div className="max-w-[768px] md:w-full space-y-4 mx-10 sm:mx-2">
                    <div className="flex flex-col space-y-8">
                        <div className="flex flex-col">
                            <div>
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
                                                    <UserPopup
                                                        user={course?.author}
                                                    />
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
                                                {/* <div className="">
                                                    <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                                        Enrollment Type
                                                    </label>
                                                    <div className="flex  space-x-2">
                                                        <div className="outline text-sm rounded-full text-gray-500 px-2">
                                                            In Person
                                                        </div>
                                                        <div className="outline text-sm rounded-full text-gray-500 px-2">
                                                            Virtual
                                                        </div>
                                                        <div className="outline text-sm rounded-full text-gray-500 px-2">
                                                            Asynchronous
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div>
                                            <div>
                                                Always wanted to feel the thrill
                                                of riding the surf but not sure
                                                where to start? We'll take you
                                                from landlubber to salty surfer.
                                            </div>
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
                                                The ocean can be a dangerous
                                                place for the uninitiated.
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold">
                                                Locals Only Safety Training
                                            </div>
                                            <div className="text-md">
                                                No one wants to get their head
                                                bashed into by a local. Learn
                                                how to be a respectful surfer in
                                                the lineup.
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-lg font-bold">
                                                Surfboard Technician
                                                Certification
                                            </div>
                                            <div className="text-md">
                                                The ins and outs of surfboard
                                                design, construction, and care.
                                                We'll teach you how to pick the
                                                right board for your skill level
                                                and the conditions.
                                            </div>
                                        </div>
                                        <div className="">
                                            <div className="text-lg font-bold">
                                                Concrete Wave Shred-ology
                                            </div>
                                            <div className="text-md">
                                                Just because you're inland
                                                doesn't mean ya can't surf!
                                                Learn techniques to keep surf
                                                fitness and skills sharp when
                                                you can't get to the beach.
                                            </div>
                                        </div>
                                        <div className="col-span-1 flex justify-end items-end mt-2">
                                            <div className="text-md font-bold uppercase text-gray-500 tracking-widest">
                                                ...and much more!
                                            </div>
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
                        </div>
                        <div
                            onClick={() => setOpenComment(!openComment)}
                            className="flex items-center text-sm text-stone-400 cursor-pointer hover:text-stone-600 decoration-solid"
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
                            <Comments
                                comment_path="/course/valley-surfers/comments"
                                comments={comments}
                            />
                        )}
                    </div>
                </div>
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
            <div className="flex flex-col text-xl items-center justify-center bg-stone-100 h-full space-y-5 ">
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                        <div className="text-2xl text-stone-500 uppercase tracking-widest mb-3">
                            Enrollment Options
                        </div>
                        <div className="flex flex-col space-y-3 h-full justify-center">
                            <div
                                className={`outline px-2 py-1 text-stone-600 hover:bg-orange-400 hover:text-stone-100 cursor-pointer ${"inperson" === enrollment ? "bg-orange-400 text-stone-100" : ""}`}
                                onClick={() => setEnrollment("inperson")}
                            >
                                <div className="font-bold text-xl tracking-wider">
                                    In-Person
                                </div>
                                <div className="text-sm">
                                    Full fledged course with multiple in-person
                                    trainings and surf sessions. Limited seats.{" "}
                                </div>
                            </div>
                            <div
                                className={`outline px-2 py-1 text-stone-600 hover:bg-orange-400 hover:text-stone-100 cursor-pointer ${"virtual" === enrollment ? "bg-orange-400 text-stone-100" : ""}`}
                                onClick={() => setEnrollment("virtual")}
                            >
                                <div className="font-bold text-xl tracking-wider">
                                    Virtual
                                </div>
                                <div className="text-sm">
                                    Follow along the in-person class with
                                    virtual training assessments and virtual
                                    coaching sessions.
                                </div>
                            </div>
                            <div
                                className={`outline px-2 py-1 text-stone-600 hover:bg-orange-400 hover:text-stone-100 cursor-pointer ${"async" === enrollment ? "bg-orange-400 text-stone-100" : ""}`}
                                onClick={() => setEnrollment("async")}
                            >
                                <div className="font-bold text-xl tracking-wider">
                                    Asynchronous
                                </div>
                                <div className="text-sm">
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
    switch (props.enrollment) {
        case "inperson":
            return (
                <div className="grid grid-cols-3 gap-3">
                    <div className="relative col-span-2 ">
                        <label className="block p-4 text-sm uppercase transition-colors border border-stone-100 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 ">
                            <span> Next Session</span>
                            <span className="block mt-1 text-md text-stone-600">
                                September 4, 2022 - October 4, 2022
                            </span>
                        </label>
                    </div>
                    <div className="relative">
                        <label className="block p-4 text-sm uppercase transition-colors border border-stone-100 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 ">
                            <span> Seats Left</span>

                            <span className="block mt-1 text-lg text-stone-600">
                                4
                            </span>
                        </label>
                    </div>

                    <div className="relative">
                        <label className="block p-4 text-sm uppercase font-medium transition-colors border border-stone-100 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 ">
                            <span> Seat Price</span>

                            <span className="block mt-1 text-stone-600 text-lg">
                                0.3 ETH
                            </span>
                        </label>
                    </div>
                    <div className="col-span-2 flex items-end">
                        <button
                            className="nostyle relative inline-block group focus:outline-none focus:ring"
                            onClick={props.handleSignup}
                        >
                            <span className="rounded absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-morange group-hover:translate-y-0 group-hover:translate-x-0"></span>

                            <span className="rounded relative inline-block px-8 py-3 text-lg font-bold tracking-widest uppercase border-2 border-current group-active:text-opacity-75">
                                Grab a seat!
                            </span>
                        </button>
                    </div>
                </div>
            );

        case "virtual":
            return (
                <div className="grid grid-cols-3 gap-3">
                    <div className="relative col-span-2 ">
                        <label className="block p-4 text-sm uppercase transition-colors border border-stone-100 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 ">
                            <span> Next Session</span>
                            <span className="block mt-1 text-md text-stone-600">
                                September 4, 2022 - October 4, 2022
                            </span>
                        </label>
                    </div>
                    <div className="relative">
                        <label className="block p-4 text-sm uppercase transition-colors border border-stone-100 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 ">
                            <span> Seats Left</span>
                            <span className="block mt-1 text-lg text-stone-600">8</span>
                        </label>
                    </div>

                    <div className="relative">
                        <label className="block p-4 text-sm uppercase font-medium transition-colors border border-stone-100 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 ">
                            <span> Seat Price</span>

                            <span className="block mt-1 text-stone-600 text-lg">
                                {surf_course.seat_price} ETH
                            </span>
                        </label>
                    </div>
                    <div className="col-span-2 flex items-end">
                        <button
                            className="nostyle relative inline-block group focus:outline-none focus:ring"
                            onClick={props.handleSignup}
                        >
                            <span className="rounded absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-morange group-hover:translate-y-0 group-hover:translate-x-0"></span>

                            <span className="rounded relative inline-block px-8 py-3 text-lg font-bold tracking-widest uppercase border-2 border-current group-active:text-opacity-75">
                                Grab a seat!
                            </span>
                        </button>
                    </div>
                </div>
            );
        case "async":
            return <div>
                keep me in the loop!

            </div>;
    }
    return <div />;
}

export default CoursePage;
