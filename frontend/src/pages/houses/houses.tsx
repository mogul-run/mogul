import { Link } from "react-router-dom";
import UserPopup from "../../components/social/userPopup";
import { useAuth } from "../../context/authContext";

const house = {
    name: "the house of bob",
    img_url: "https://i.imgur.com/c5bDFvw.jpg",
    house_id: "alpha",
};

const houses = [house];

function Houses() {
    return (
        <div className="content-container flex-col">
            <div className="flex justify-between items-center">
                <div className="mb-4">
                    <div className="text-4xl uppercase italic font-bold tracking-wider">
                        Houses
                    </div>
                    <div className="text-md mb-4 text-gray-500">
                        {" "}
                        Token-gated Community Spaces{" "}
                    </div>
                </div>
                <div className="btn-ghost flex items-center cursor-not-allowed">
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
        <Link className="" to={`/house/${props.house.house_id}`}>
            <div className="flex w-full justify-between items-center outline rounded">
                <img
                    className="object-cover w-32 h-32 rounded-full"
                    src={props.house.img_url}
                    alt=""
                />
                <div className="mt-4 text-xl font-bold text-gray-900">
                    {props.house.name}
                </div>
                <div>
                    <p className="max-w-sm mt-2 text-gray-700"></p>
                </div>
                <div className="flex flex-col space-y-4 text-gray-900">
                    <div>
                        <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                            hosted by:
                        </label>
                        <UserPopup user={getUser()} />
                    </div>
                    <div>members: 13</div>
                </div>
            </div>
        </Link>
    );
}

export default Houses;
