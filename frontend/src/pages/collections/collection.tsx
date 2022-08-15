import { Link } from "react-router-dom";
import { User } from "../../components/auth/current-user";
import UserPopup from "../../components/social/userPopup";
import { useAuth } from "../../context/authContext";

const alpha = {
    name: "Alpha Series",
    img_url: "https://i.imgur.com/rWcSsf0.jpg",
    collection_id: "alpha",
};
const collections = [alpha];

function Collections() {
    return (
        <div className="content-container flex-col">
            <div className="flex justify-between items-center">
                <div className="mb-4">
                    <div className="text-4xl uppercase italic font-bold tracking-wider">
                        Collections
                    </div>
                    <div className="text-md mb-4 text-gray-500">
                        {" "}
                        NFT Drops!{" "}
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
                    <div className="uppercase">Create New Collection</div>
                </div>
            </div>
            <div className="">
                {collections.map((collection) => {
                    return <CollectionsCards collection={collection} />;
                })}
            </div>
        </div>
    );
}

function CollectionsCards(props: any) {
    const { getUser } = useAuth();
    return (
        <Link
            className="flex space-x-5"
            to={`/collection/${props.collection.collection_id}`}
        >
            <div className="flex flex-col w-96">
                <img
                    className="object-cover w-96 h-96 rounded"
                    src={props.collection.img_url}
                    alt=""
                />
                <div className="flex justify-between items-center">
                    <div>
                        <div className="mt-4 text-xl font-bold text-gray-900">
                            Genesis Series: lucasxsong
                        </div>

                        <p className="mt-2 text-gray-700"></p>
                    </div>
                    <div>
                        <UserPopup user={getUser()} />
                    </div>
                </div>
                <div>
                    <p className="mt-2 text-gray-700">
                        A series of 57 nfts.{" "}
                    </p>
                </div>
            </div>
        </Link>
    );
}

export default Collections;
