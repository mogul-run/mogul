import { Link } from "react-router-dom";
import PreviewCourse from "../../../components/preview-course/preview-course";
const surf_course = {
    emojis: "🧘‍♂🌲",
    title: "The Inlanders Guide to Surfing",
    path: "/course/valley-surfers",
    author: {
        photoURL:
            "https://firebasestorage.googleapis.com/v0/b/mogul-run.appspot.com/o/user%2FvlITP8crPWNU1jjE1TCosD6L20x2%2Fprofile_img?alt=media&token=481869b3-dfd6-4844-b917-0757ed8bc2c0",
        displayName: "Lucas Song",
        walletAddr: "0xCe4E67E407aB231925DF614a5e72687fD597324B",
    },
    location: "SF Bay Area",
    duration: "4 weeks",
    cover_url: "https://i.imgur.com/8wHHHoi.jpg",
    hook: "Build a strong base to become a confident surfer. Targeted towards beginning surfers that live inland, but open to all levels and localities. ",
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

function Marketplace() {
    return (
        <div className="menu min-w-full ">
            {/* <img className="my-4" src={Bananas}/> */}
            <div className="text-2xl uppercase tracking-wider text-stone-600 my-2">Courses</div>
            <div className="space-y-2">
                <PreviewCourse course={surf_course}/>
            </div>
        </div>
    );
}

function MarketplaceItem(props: any) {
    return (
        <Link to="/">
            {" "}
            <div className="my-2 outline rounded flex items-center justify-between text-stone-700 hover:bg-stone-200 cursor-pointer">
                <div>
                    {/* <div className="text-2xl text-bold">{sample_item.title}</div>
                    <div className="text-md">{sample_item.desc}</div> */}
                </div>
            </div>
        </Link>
    );
}

export default Marketplace;
