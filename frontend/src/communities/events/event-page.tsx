import { child, get, getDatabase, onValue, push, ref } from "firebase/database";
import { sample, toArray, update } from "lodash";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User } from "../components/auth/current-user";
import { Comments } from "../components/social/post";
import UserPopup from "../components/social/userPopup";
import Transfer from "../components/web3/transfer";
import { useAuth } from "../../context/authContext";
import { useAuthModal } from "../../context/modalContext";
import {Event, User as UserType} from "../../types/types";

const sample_event = {
    emojis: "🧘‍♂🌲",
    title: "Coast Redwood Sunset Retreat",
    author: {
        photoURL:
            "https://firebasestorage.googleapis.com/v0/b/mogul-run.appspot.com/o/user%2FvlITP8crPWNU1jjE1TCosD6L20x2%2Fprofile_img?alt=media&token=481869b3-dfd6-4844-b917-0757ed8bc2c0",
        displayName: "Lucas Song",
        walletAddr: "0xCe4E67E407aB231925DF614a5e72687fD597324B",
    },
    location: "Fremont, CA",
    duration: "60 minutes",
    cover_url: "https://i.imgur.com/cov0ZJB.jpg",
    hook: "Take a retreat into the welcoming branches of an old Sequoia Sempervirens. Panoramic await you -- if you dare to climb.",
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
    const [signup, setSignup] = useState(false);
    const [event, setEvent] = useState<Event>();
    const { event_id } = useParams();
    const { getUser } = useAuth();
    let { handleModal } = useAuthModal();
    const db = getDatabase();
    const participants = event ? toArray(event.participants) : [];
    const seats_left = event ? event.num_seats - participants.length : 0;

    const getEvent = () => {
        setLoading(true);
        onValue(
            ref(db, `/events/${event_id}`),
            (snapshot) => {
                if (snapshot.exists()) {
                    // .reverse() to display posts with most recent on top
                    setEvent(snapshot.val());
                }
                setLoading(false);
            },
            {
                onlyOnce: false,
            }
        );
    };

    const handleSignup = () => {
        if (!getUser()) {
            handleModal();
        } else {
            setSignup(!signup);
        }
    };

    const handleSuccess = () => {
        // function to add current user to event participants list when tx succeeds
        // should add event to user's event list and add
        push(
            ref(db, `events/${event_id}/participants/`),
            getUser().displayName
        ).catch((error) => {
            console.log("error: ", error);
        });
        console.log(getUser().displayName, "to be added");
    };

    useEffect(() => {
        getEvent();
    }, []);

    return (
        <div className="flex flex-col w-full justify-center items-center">
            {loading || !event ? (
                <LoadingPage loading={loading} event={event} />
            ) : (
                <div>
                    <div className="mt-4 max-w-[768px] flex m-10 justify-end">
                        <User />
                    </div>
                    <div className="mt-10 max-w-[768px] md:w-full m-10 md:grid md:grid-cols-5 md:grid-flow-row gap-8 sm:flex sm:flex-col space-y-4">
                        <div className="col-span-3 flex flex-col space-y-8">
                            <div className="mt-10">
                                <button className="btn-ghost">
                                    {sample_event.emojis}
                                </button>
                                <div className="mt-2 text-3xl font-bold">
                                    {event.title
                                        ? event.title
                                        : sample_event.title}
                                </div>
                                <div className="flex mt-6 w-full justify-between items-center">
                                    <div className="">
                                        <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                            hosted by
                                        </label>
                                        <UserPopup user={event.author} />
                                    </div>
                                    <div className="">
                                        <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                            location
                                        </label>
                                        {event.location}
                                    </div>
                                    <div className="">
                                        {event.duration && (
                                            <>
                                                {" "}
                                                <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                                    duration
                                                </label>
                                                {event.duration}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>{event.hook}</div>
                            </div>
                        </div>
                        <div className="col-span-2 flex items-center justify-center">
                            <img
                                src={sample_event.cover_url}
                                className="object-cover w-[300px] h-[400px] rounded bg-amber-500 p-1"
                            />
                        </div>
                        <div className="col-span-5 flex flex-col items-center script py-6 px-8">
                            <div>
                                <div className="h-3 text-2xl text-left text-stone-600">
                                    “
                                </div>
                                <p className="px-4 text-lg text-center text-stone-600">
                                    I kept my lofty perch for hours, frequently
                                    closing my eyes to enjoy the music by
                                    itself, or to feast quietly on the delicious
                                    fragrance that was streaming past.
                                </p>
                                <div className="h-3 text-2xl text-right text-stone-600">
                                    ”
                                </div>
                            </div>
                            <div className="mt-2 text-md">
                                - <b>John Muir</b>
                                <div>
                                    Chilling in a tree,{" "}
                                    <a
                                        className="text-amber-800 italic underline-none"
                                        target="__blank"
                                        href="https://vault.sierraclub.org/john_muir_exhibit/writings/the_mountains_of_california/chapter_10.aspx"
                                    >
                                        The Mountains of California{" "}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`${
                                signup ? "col-span-5" : "col-span-2"
                            } outline-box flex flex-col md:flex-row justify-between`}
                        >
                            <div className="flex flex-col text-xl items-center justify-center bg-stone-100 h-full space-y-5">
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="relative col-span-2 ">
                                        <label className="block p-4 text-sm uppercase transition-colors border border-stone-100 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 ">
                                            <span> Next Session</span>
                                            <span className="block mt-1 text-md text-stone-600">
                                                May 16, 2022 @ 7:30PM
                                            </span>
                                        </label>
                                    </div>
                                    <div className="relative">
                                        <label className="block p-4 text-sm uppercase transition-colors border border-stone-100 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 ">
                                            <span> Seats Left</span>

                                            <span className="block mt-1 text-lg text-stone-600">
                                                {seats_left}
                                            </span>
                                        </label>
                                    </div>

                                    <div className="relative">
                                        <label className="block p-4 text-sm uppercase font-medium transition-colors border border-stone-100 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 ">
                                            <span> Seat Price</span>

                                            <span className="block mt-1 text-stone-600 text-lg">
                                                {event.seat_price} ETH
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    {seats_left && seats_left > 0 ? (
                                        <button
                                            className="nostyle relative inline-block group focus:outline-none focus:ring"
                                            onClick={handleSignup}
                                        >
                                            <span className="rounded absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-amber-500 group-hover:translate-y-0 group-hover:translate-x-0"></span>

                                            <span className="rounded relative inline-block px-8 py-3 text-lg font-bold tracking-widest uppercase border-2 border-current group-active:text-opacity-75">
                                                Grab a seat!
                                            </span>
                                        </button>
                                    ) : (
                                        <button className="nostyle cursor-not-allowed relative inline-block group focus:outline-none focus:ring">
                                            <span className="rounded absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-red-400 animate-pulse group-hover:translate-y-0 group-hover:translate-x-0"></span>

                                            <span className="rounded relative inline-block px-8 py-3 text-lg font-bold tracking-widest uppercase border-2 border-current group-active:text-opacity-75">
                                                Sold Out!!
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                            {signup && (
                                <Transfer
                                    note={`For a ${event.title} seat`}
                                    to={event.author}
                                    amount={event.seat_price}
                                    handleSuccess={handleSuccess}
                                />
                            )}
                        </div>

                        <div className="col-span-3 space-y-6 p-4">
                            {event.desc && (
                                <div>
                                    {" "}
                                    <label className="block uppercase tracking-wide text-stone-600 text-sm font-bold mb-1">
                                        What to expect
                                    </label>
                                    <div>{event.desc}</div>
                                </div>
                            )}
                            <div>
                                <label className="block uppercase tracking-wide text-stone-600 text-sm font-bold mb-1">
                                    What to bring
                                </label>
                                <div>
                                    <ul>
                                        {sample_event.materials_list.map(
                                            (item) => {
                                                return (
                                                    <li className="flex items-center my-1">
                                                        {" "}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6 p-1 mr-1 text-stone-400"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                            strokeWidth={2}
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>{" "}
                                                        {item}
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                </div>
                            </div>
                            <div className="outline">
                                <label className="block uppercase tracking-wide text-stone-600 text-sm font-bold mb-1">
                                    Signups
                                </label>
                                <div className="max-h-32 overflow-scroll">
                                    <ul>
                                        {" "}
                                        {toArray(event.participants).map(
                                            (val, key) => (
                                                <li>{key + 1}. {val}</li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-5 space-y-2">
                            <div className="text-xl font-bold">
                                {" "}
                                A bit about your host, Lucas
                            </div>
                            <div>
                                Devoted to bumsports. Avid rock climber, surfer
                                and rock climber. Love spending time outdoors
                                and on the search for GLIDE. Believer in the
                                wisdom of trees.{" "}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function LoadingPage(props: any) {
    return (
        <div className="mt-10 text-3xl">
            {props.loading ? (
                "event loading..."
            ) : (
                <div className="flex flex-col items-center justify-center">
                    there's no event here
                    <img
                        className="w-96 my-2"
                        src="https://s.yimg.com/ny/api/res/1.2/tw9KQNHLA6caLDVOJq1stw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTg1OQ--/https://s.yimg.com/uu/api/res/1.2/zVwGY_4HkGhHsbO6cYIUWg--~B/aD0yMjAwO3c9MTY0MDthcHBpZD15dGFjaHlvbg--/http://media.zenfs.com/en_us/News/Reuters/2014-02-13T074227Z_1779854471_LR2EA2D0LEGRK_RTRMADP_3_OLYMPICS-FREESTYLE.JPG"
                    />
                    sorry!
                </div>
            )}
        </div>
    );
}

export default EventPage;
