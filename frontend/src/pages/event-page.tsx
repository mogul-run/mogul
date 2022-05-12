import { sample } from "lodash";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserPopup from "../components/userPopup";
import { useAuth } from "../context/authContext";

const sample_event = {
    emojis: "🧘‍♂🌲",
    title: "Body Awareness Session 40ft up a Coastal Redwood",
    author: {
        photoURL:
            "https://firebasestorage.googleapis.com/v0/b/mogul-run.appspot.com/o/user%2FvlITP8crPWNU1jjE1TCosD6L20x2%2Fprofile_img?alt=media&token=481869b3-dfd6-4844-b917-0757ed8bc2c0",
        displayName: "Lucas Song",
        walletAddr: "1",
    },
    cover_url: "https://i.imgur.com/cov0ZJB.jpg",
    desc: "Do yoga in a tree. Includes optional marijuana priming session. Bring functional climbing harness and warm layers with plenty of zippered pockets. All other necessary materials will be provided :). ",
    materials_list: [
        "warm layers with plenty of zipper pockets",
        "water bottle",
        "climbing harness to anchor into the tree",
    ],
    media: ["https://i.imgur.com/cov0ZJB.jpg", ""],
};

function EventPage() {
    const [loading, setLoading] = useState(true);
    const { event_id } = useParams();
    const { getUser } = useAuth();
    console.log(getUser().photoURL);

    const getEvent = () => {
        setLoading(false);
    };

    useEffect(() => {
        getEvent();
    }, []);

    return (
        <div className="flex flex-col w-full justify-center items-center">
            {loading ? (
                <LoadingPage />
            ) : (
                <div className="mt-16 max-w-[768px] md:w-full m-10 md:grid md:grid-cols-5 md:grid-flow-row gap-8 sm:flex sm:flex-col space-y-4">
                    <div className="col-span-3 flex flex-col space-y-8">
                        <div className="mt-10">
                            <button className="button-ghost">
                                {sample_event.emojis}
                            </button>
                            <div className="mt-4 text-3xl font-bold">
                                {sample_event.title}
                            </div>
                            <div className="mt-2 w-max-content">
                                <UserPopup user={sample_event.author} />
                            </div>
                        </div>
                        <div>
                            <div>{sample_event.desc}</div>
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-center">
                        <img
                            src={sample_event.cover_url}
                            className="object-cover w-[300px] h-[400px] rounded bg-morange p-1"
                        />
                    </div>
                    <div className="col-span-5 flex flex-col items-center text-xl quote p-10">
                        <div>
                            <div className="h-3 text-3xl text-left text-gray-600">
                                “
                            </div>
                            <p className="px-4 text-2xl text-center text-gray-600">
                                I kept my lofty perch for hours, frequently
                                closing my eyes to enjoy the music by itself, or
                                to feast quietly on the delicious fragrance that
                                was streaming past.
                            </p>
                            <div className="h-3 text-3xl text-right text-gray-600">
                                ”
                            </div>
                        </div>
                        <div className="mt-2 text-md">
                            - <b>John Muir</b>
                            <div>
                                Chilling on a tree in{" "}
                                <a
                                    className="text-morange italic underline-none"
                                    target="__blank"
                                    href="https://vault.sierraclub.org/john_muir_exhibit/writings/the_mountains_of_california/"
                                >
                                    The Mountains of California{" "}
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 bg-morange object-cover rounded-lg p-1">
                        <div className="flex flex-col text-xl items-center justify-center bg-stone-100 h-full rounded-lg p-2 space-y-5 ">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative">
                                    <label className="block p-4 text-sm font-medium transition-colors border border-stone-100 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 ">
                                        <span> Seats Left</span>

                                        <span className="block mt-1 text-lg text-stone-600">
                                            3
                                        </span>
                                    </label>

                                    <svg
                                        className="absolute w-5 h-5 text-blue-600 opacity-0 top-4 right-4 peer-checked:opacity-100"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clip-rule="evenodd"
                                        />
                                    </svg>
                                </div>

                                <div className="relative">
                                    <label className="block p-4 text-sm font-medium transition-colors border border-stone-100 rounded-lg shadow-sm cursor-pointer hover:bg-stone-50 ">
                                        <span> Cost Per Seat</span>

                                        <span className="block mt-1 text-stone-600 text-lg">
                                            0.03ETH
                                        </span>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <Link
                                    className="nostyle relative inline-block group focus:outline-none focus:ring"
                                    to={`/m/${event_id}/signup`}
                                >
                                    <span className="rounded absolute inset-0 transition-transform translate-x-1.5 translate-y-1.5 bg-morange group-hover:translate-y-0 group-hover:translate-x-0"></span>

                                    <span className="rounded relative inline-block px-8 py-3 text-lg font-bold tracking-widest uppercase border-2 border-current group-active:text-opacity-75">
                                       Grab a seat! 
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3 space-y-6">
                        <div>
                            <label className="block uppercase tracking-wide text-gray-600 text-md font-bold mb-1">
                                What you'll do
                            </label>
                            <div>{sample_event.desc}</div>
                        </div>
                        <div>
                            <label className="block uppercase tracking-wide text-gray-600 text-md font-bold mb-1">
                                Things you'll need
                            </label>
                            <div>
                                <ul>
                                    {sample_event.materials_list.map((item) => {
                                        return <li> {item}</li>;
                                    })}
                                </ul>
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
