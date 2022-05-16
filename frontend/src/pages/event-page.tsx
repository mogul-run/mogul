import { sample } from "lodash";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { User } from "../components/navbar";
import UserPopup from "../components/userPopup";
import { useAuth } from "../context/authContext";
import { ModalContext, useAuthModal } from "../context/modalContext";

const sample_event = {
    emojis: "🧘‍♂🌲",
    title: "Coast Redwood Sunset Retreat",
    author: {
        photoURL:
            "https://firebasestorage.googleapis.com/v0/b/mogul-run.appspot.com/o/user%2FvlITP8crPWNU1jjE1TCosD6L20x2%2Fprofile_img?alt=media&token=481869b3-dfd6-4844-b917-0757ed8bc2c0",
        displayName: "Lucas Song",
        walletAddr: "1",
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
    media: ["https://i.imgur.com/cov0ZJB.jpg", ""],
};

function EventPage() {
    const [loading, setLoading] = useState(true);
    const [signup, setSignup] = useState(true);
    const { event_id } = useParams();
    const { getUser } = useAuth();
    const navigate = useNavigate();
    let { handleModal } = useAuthModal();

    const getEvent = () => {
        setLoading(false);
    };

    const handleSignup = () => {
        if (!getUser()) {
            handleModal()
        } else {
            setSignup(!signup);

        }
        console.log("hi");
    };

    useEffect(() => {
        getEvent();
    }, []);

    return (
        <div className="flex flex-col w-full justify-center items-center">
            {loading ? (
                <LoadingPage />
            ) : (
                <div>
                    <div className="mt-4 max-w-[768px] flex m-10 justify-end">
                        <User />
                    </div>
                    <div className="mt-10 max-w-[768px] md:w-full m-10 md:grid md:grid-cols-5 md:grid-flow-row gap-8 sm:flex sm:flex-col space-y-4">
                        <div className="col-span-3 flex flex-col space-y-8">
                            <div className="mt-10">
                                <button className="button-ghost">
                                    {sample_event.emojis}
                                </button>
                                <div className="mt-2 text-3xl font-bold">
                                    {sample_event.title}
                                </div>
                                <div className="flex mt-6 w-full justify-between items-center">
                                    <div className="">
                                        <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                            hosted by
                                        </label>
                                        <UserPopup user={sample_event.author} />
                                    </div>
                                    <div className="">
                                        <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                            location
                                        </label>
                                        {sample_event.location}
                                    </div>
                                    <div className="">
                                        <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                            duration
                                        </label>
                                        {sample_event.duration}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>{sample_event.hook}</div>
                            </div>
                        </div>
                        <div className="col-span-2 flex items-center justify-center">
                            <img
                                src={sample_event.cover_url}
                                className="object-cover w-[300px] h-[400px] rounded bg-morange p-1"
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
                                        className="text-morange italic underline-none"
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
                            } outline-box`}
                        >
                            <div className="flex flex-col text-xl items-center justify-center bg-stone-100 h-full space-y-5 ">
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
                                                3
                                            </span>
                                        </label>
                                    </div>

                                    <div className="relative">
                                        <label className="block p-4 text-sm uppercase font-medium transition-colors border border-stone-100 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 ">
                                            <span> Seat Price</span>

                                            <span className="block mt-1 text-stone-600 text-lg">
                                                0.03ETH
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className="nostyle relative inline-block group focus:outline-none focus:ring"
                                        onClick={handleSignup}
                                    >
                                        <span className="rounded absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-morange group-hover:translate-y-0 group-hover:translate-x-0"></span>

                                        <span className="rounded relative inline-block px-8 py-3 text-lg font-bold tracking-widest uppercase border-2 border-current group-active:text-opacity-75">
                                            Grab a seat!
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-3 space-y-6 outline-box">
                            <div>
                                <label className="block uppercase tracking-wide text-stone-600 text-sm font-bold mb-1">
                                    What to expect
                                </label>
                                <div>{sample_event.desc}</div>
                            </div>
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

function LoadingPage() {
    return <div>loading </div>;
}

export default EventPage;
