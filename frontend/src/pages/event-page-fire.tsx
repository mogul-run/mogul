import { child, get, getDatabase, ref } from "firebase/database";
import { sample } from "lodash";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User } from "../components/navbar";
import Transfer from "../components/transfer";
import UserPopup from "../components/userPopup";
import { useAuth } from "../context/authContext";
import { ModalContext, useAuthModal } from "../context/modalContext";
import { TokenSale } from "./chalet/components/TokenInfo";

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
    const [ERC20Bal, setERC20Bal] = useState("");
    const [ETHBal, setETHBal] = useState("");
    const [userAllowed, setUserAllowed] = useState(false);
    const [purchased, setPurchased] = useState(false);
    const [signup, setSignup] = useState(false);
    const { getUser } = useAuth();
    let { handleModal } = useAuthModal();
    const db = getDatabase();

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
                                    <span className="script text-2xl font-bold">
                                        mogul
                                    </span>
                                    <span className=""> presents</span>
                                </div>
                                <div className="sm:col-span-3 text-center hover:animate-pulse transition-all mt-2 text-5xl font-bold text-stone-100 bg-gradient-to-r from-amber-600 to-red-700 px-5 py-3 rounded-tl-full rounded-br-full">
                                    <span className="font-bold font-serif">
                                        camp
                                    </span>
                                    <span className="font-light ">fire</span>
                                </div>
                                <div className="ml-20 font-mono sm:col-span-3 font-sans mt-2 text-3xl font-bold">
                                    no. 1
                                </div>
                                <div className="ml-10 sm:col-span-2 text-center text-lg mb-10 font-bold">
                                    May 27, 2022 @ 9:00pm
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
                                            Quema Dr and Paseo Padre
                                        </div>
                                    </a>
                                </div>
                                <div className="sm:col-span-3 rounded bg-stone-200 p-5">
                                    a night of fire toasted snacks, drinks, and
                                    gear raffles. hosted deep in the wilderness
                                    of fremont, ca.
                                </div>
                                <div className="sm:col-span-2 flex text-md font-bold">
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
                            </div>
                        </div>
                        <div className="mt-5 flex flex-col">
                            <div>

                            </div>
                            Campfire no.1 will be open to all. However, meal and
                            raffle tickets will be available for sale.
                            <div className="bg-stone-200 p-10">
                                <TokenSale />
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
