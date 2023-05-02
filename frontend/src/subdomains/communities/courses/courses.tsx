import { Link } from "react-router-dom";
import { User } from "../components/auth/current-user";
import PreviewCourse from "../components/preview-course/preview-course";
import UserPopup from "../components/social/userPopup";
import { useAuth } from "../../../context/authContext";
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
const climbing = {
    emojis: "🧘‍♂🌲",
    title: "Rock Climbing on Real Rocks!",
    path: "/course/climb-brave",
    author: {
        photoURL:
            "https://firebasestorage.googleapis.com/v0/b/mogul-run.appspot.com/o/user%2FvlITP8crPWNU1jjE1TCosD6L20x2%2Fprofile_img?alt=media&token=481869b3-dfd6-4844-b917-0757ed8bc2c0",
        displayName: "Lucas Song",
        walletAddr: "0xCe4E67E407aB231925DF614a5e72687fD597324B",
    },
    location: "Castle Rock State Park",
    duration: "a day",
    cover_url: "https://i.imgur.com/r3OuB8r.png",
    hook: "making the transition outdoors is tough. learn from a local how to climb on real rocks!",
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

const courses= [surf_course ];

function Courses() {
    return (
        <div className="content-container flex-col">
            <div className="flex justify-between items-center">
                <div className="mb-4">
                    <div className="text-4xl uppercase italic font-bold tracking-wider">
                      Courses 
                    </div>
                    <div className="text-md mb-4 text-gray-500">
                        {" "}
                        Bumsport instructionals with local knowledge. Support your local bum!  
                    </div>
                </div>
            </div>
            <div className="space-y-3">
                {courses.map((course) => {
                    return <PreviewCourse course={course} />;
                })}
            </div>
        </div>
    );
}


export default Courses;
