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
            <div className="mb-4">
                <div className="text-4xl uppercase italic font-bold tracking-wider">
                    Collections
                </div>
                <div className="text-xl mb-4"> Description </div>
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
        <Link className="block" to={`/collection/${props.collection.collection_id}`}>
            <div className="flex flex-col">
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

                        <p className="max-w-sm mt-2 text-gray-700">
                            
                        </p>
                    </div>
                    <div>
                        <UserPopup user={getUser()} />
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Collections;
