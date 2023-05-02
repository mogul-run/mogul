import { Link } from "react-router-dom";
import UserPopup from "../components/social/userPopup";
import { useAuth } from "../../context/authContext";

const house = {
    name: "the house of bob",
    img_url: "https://i.imgur.com/c5bDFvw.jpg",
    house_id: "alpha",
    author: {
        displayName: "lucasxsong",
        photoURL: "https://i.imgur.com/rWcSsf0.jpg",
    },
};

const houses = [house];

function Houses() {
    return (
        <div className="content-container flex-col">
            <div className="flex flex-wrap justify-between items-center mb-2">
                <div className="mb-1">
                    <div className="text-4xl uppercase italic font-bold tracking-wider">
                        Houses
                    </div>
                    <div className="text-md mb-4 text-gray-500">
                        {" "}
                        Token-gated Community Spaces{" "}
                    </div>
                </div>
                <div className="btn-ghost mb-1 flex items-center cursor-not-allowed">
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
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                    </svg>
                    <div className="uppercase">Create New House</div>
                </div>
            </div>
            <div className="">
                {houses.map((house) => {
                    return <HouseCard house={house} />;
                })}
            </div>
        </div>
    );
}

function HouseCard(props: any) {
    const { getUser } = useAuth();
    return (
        <Link className="" to={`/house/${props.house.house_id}/home`}>
            <div className="flex flex-wrap w-full justify-between items-center outline rounded hover:shadow-sm">
                <div className="flex items-center space-x-4">
                    <img
                        className="object-cover w-32 h-32 rounded-full"
                        src={props.house.img_url}
                        alt=""
                    />
                    <div className="text-2xl font-bold uppercase tracking-wider text-gray-900">
                        {props.house.name}
                    </div>
                </div>
                <div>
                    <p className="mt-2 text-gray-700"></p>
                </div>
                <div className="flex flex-col space-y-4 text-gray-900">
                    <div>
                        <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                            hosted by
                        </label>
                        <UserPopup user={props.house.author} />
                    </div>
                    <div>
                        <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                            members
                        </label>
                        ???
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Houses;
