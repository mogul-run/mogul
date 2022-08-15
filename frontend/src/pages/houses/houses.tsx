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
            <div className="mb-4">
                <div className="text-4xl uppercase italic font-bold tracking-wider">
                    Houses
                </div>
                <div className="text-xl mb-4"> Description </div>
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
