import { Link } from "react-router-dom";
import UserPopup from "../social/userPopup";

const event = {
    emojis: "🧘‍♂🌲",
    title: "Castle Rock B.B.B",
    path: "/e/outdoor_climb",
    author: {
        photoURL:
            "https://firebasestorage.googleapis.com/v0/b/mogul-run.appspot.com/o/user%2FvlITP8crPWNU1jjE1TCosD6L20x2%2Fprofile_img?alt=media&token=481869b3-dfd6-4844-b917-0757ed8bc2c0",
        displayName: "Lucas Song",
        walletAddr: "0xCe4E67E407aB231925DF614a5e72687fD597324B",
    },
    location: "Castle Rock State Park",
    duration: "a day",
    cover_url: "https://i.imgur.com/r3OuB8r.png",
    hook: "Bouldering, bevs, and bites. Guidance on bouldering at Castle Rock for any level of climber!",
    desc: "",
    materials_list: [
        "Comfortable workout clothes",
        "Shoes you can climb a tree with",
        "Water",
        "Climbing harness",
    ],
    seat_price: "0.03",
    media: ["https://i.imgur.com/cov0ZJB.jpg", ""],
};

function EventPreview(props: any) {
    return (
        <>
            {" "}
            <Link
                to={event.path}
                className="grid grid-cols-3 items-center bg-stone-100 shadow-md rounded p-3 "
            >
                <img
                    src={event.cover_url}
                    className="col-span-1 rounded w-40 h-40 object-cover"
                />
                <div className="col-span-2 text-stone-600">
                    <div className="text-2xl font-bold">{event.title}</div>
                    <div className="text-md">{event.hook}</div>
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
            </Link>
        </>
    );
}

export default EventPreview;
