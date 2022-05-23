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
import { User } from "../components/navbar";
import Transfer from "../components/transfer";
import UserPopup from "../components/userPopup";
import { useAuth } from "../context/authContext";
import { ModalContext, useAuthModal } from "../context/modalContext";
import { TokenSale } from "./chalet/components/TokenInfo";
import { Comments } from "./mogulrun/components/post";

const sample_event = {
    emojis: "🧘‍♂🌲",
    author: {
        photoURL:
            "https://i0.heartyhosting.com/www.surfer.com/wp-content/uploads/2020/05/BT20614.jpg?resize=2000%2C1333&ssl=1",
        displayName: "mogul",
        walletAddr: "0xdf294464D3fAF933a1d864b6861475ab41B3Cf8F",
    },
    location: "Fremont, CA",
    duration: "60 minutes",
    cover_url: "https://i.imgur.com/cov0ZJB.jpg",
    hook: "Take a retreat into the welcoming branches of an old Sequoia Sempervirens. Panoramic views await you -- if you dare to climb.",
    desc: "Climb up a Redwood tree with panoramic views of beautiful Fremont. As the sun comes down, ",
    materials_list: [
        "Comfortable workout clothes",
        "Shoes you can climb a tree with",
        "Water",
        "Climbing harness",
    ],
    seat_price: "0.03",
    media: ["https://i.imgur.com/cov0ZJB.jpg", ""],
};

function EventPage() {
    const [loading, setLoading] = useState(true);
    const [openComment, setOpenComment] = useState(false);
    const [userRSVPd, setUserRSVPd] = useState(false);
    const [participants, setParticipants] = useState<any[]>([]);
    const [comments, setComments] = useState<any[]>([]);
    const { getUser, getWallet } = useAuth();
    let { handleModal } = useAuthModal();
    const db = getDatabase();

    useEffect(() => {
        getParticipants();
        getComments();
        setLoading(false);
    }, []);

    const getParticipants = () => {
        onValue(
            ref(db, `/events/fire-1/participants`),
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
            ref(db, `/events/fire-1/comments`),
            (snapshot) => {
                if (snapshot.exists()) {
                    setComments(toArray(snapshot.val()).reverse());
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
                ref(db, `events/fire-1/participants/${getUser().uid}`),
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
        remove(ref(db, `events/fire-1/participants/${getUser().uid}`))
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

    useEffect(() => {}, []);

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <div>
                <div className="mt-4 max-w-[768px] flex my-10 justify-end mx-10 sm:mx-2">
                    <User />
                </div>
                <div className="mt-10 max-w-[768px] md:w-full space-y-4 mx-10 sm:mx-2">
                    <div className="flex flex-col space-y-8">
                        <div className="mt-10">
                            <div className="grid sm:grid-cols-5 grid-flow-row-dense grid-cols-1 gap-4">
                                <div className="ml-5 sm:col-span-2 mt-2 text-xl">
                                    <Link to="/" className="nostyle">
                                        <span className="script text-2xl font-bold">
                                            mogul
                                        </span>
                                    </Link>
                                    <span className=""> presents</span>
                                </div>
                                <div className="sm:col-span-3 text-center hover:animate-pulse transition-all mt-2 text-5xl font-bold text-stone-100 bg-gradient-to-r from-amber-600 to-red-700 px-5 py-3 rounded-tl-full rounded-br-full">
                                    <span className="font-bold font-serif">
                                        camp
                                    </span>
                                    <span className="font-light ">fire</span>
                                </div>
                                <div className="ml-20 font-serif sm:col-span-3 mt-2 text-3xl">
                                    no. 1
                                </div>
                                <div className="ml-10 sm:col-span-2 flex flex-col items-end text-lg mb-10 font-bold">
                                    <div>May 27, 2022 @ 9:00pm</div>
                                    {getUser() ? (
                                        <a
                                            href="https://goo.gl/maps/iL3xqZjEyjzUwT9y8"
                                            target="__blank"
                                        >
                                            <div className="flex text-sky-800 items-center rounded text-sm">
                                                {" "}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-6 w-6 p-1"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                </svg>
                                                Quema Dr. and Paseo Padre
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="flex text-sky-800 cursor-pointer" onClick={handleModal}>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 p-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            ????
                                        </div>
                                    )}
                                </div>
                                <div className="sm:col-span-3 mt-0 rounded bg-stone-200 p-5 mr-5">
                                    a night of fire-toasted snacks, drinks, and
                                    stargazing, hosted at a wilderness location
                                    in fremont, ca. bring warm layers,
                                    comfortable shoes, flashlights, and good
                                    vibes!
                                </div>
                                <div className="sm:col-span-2 mt-2 flex flex-col text-md space-y-2">
                                    <div className="mt-2 flex text-md font-bold">
                                        sponsored by
                                        <a
                                            href="https://poler.com/"
                                            target="__blank"
                                        >
                                            <img
                                                className="h-24 hover:scale-150 transition-all"
                                                src="https://i.imgur.com/rLmT1xB.png"
                                            />
                                        </a>
                                    </div>
                                    <div className="text-sm">
                                        we'll be raffling away some poler gear
                                        at the campfire!
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row-reverse">
                            {" "}
                            <div
                                className={`mt-5 flex w-full space-x-5 justify-center items-start ${
                                    loading && "hidden"
                                }`}
                            >
                                {userRSVPd ? (
                                    <div
                                        className="font-bold text-red-500 p-1 rounded outline outline-stone-100 hover:outline-red-500 text-2xl cursor-pointer"
                                        onClick={handleRemoveRSVP}
                                    >
                                        un-R.S.V.P
                                    </div>
                                ) : (
                                    <div
                                        className="btn-ghost font-bold text-2xl cursor-pointer"
                                        onClick={handleRSVP}
                                    >
                                        R.S.V.P
                                    </div>
                                )}
                            </div>
                            <div
                                className={`my-5 flex flex-col w-full space-x-5 items-center ${
                                    loading && "hidden"
                                }`}
                            >
                                <div className="text-xl hover:rotate-2 underline-offset-2 hover:underline-offset-8 transition-all font-bold mb-3">
                                    campfire attendees
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LoadingPage() {
    return <div>loading </div>;
}

export default EventPage;
