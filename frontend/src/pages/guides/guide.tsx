import { AuthErrorCodes, getAdditionalUserInfo } from "firebase/auth";
import UserPopup from "../../components/social/userPopup";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Board } from "../../components/social/board";
import { User } from "../../components/auth/current-user";
import EventPreview from "../../components/preview-cards/event-preview";
import { child, get, getDatabase, onValue, ref } from "firebase/database";
import { Guide as GuideType } from "../../types/types";
import { useAuth } from "../../context/authContext";

// const guide = {
//     title: "Out of the gym and into the rocks",
//     desc: "a guide to help you make your first forays on outdoor rock fun and safe!",
//     date: "5/24/2022",
//     cover_url:
//         "https://thatsmypark.org/wp-content/uploads/2022/01/CastleRock-2022-1161-1024x869.jpg",
//     author: {
//         photoURL:
//             "https://firebasestorage.googleapis.com/v0/b/mogul-run.appspot.com/o/user%2FvlITP8crPWNU1jjE1TCosD6L20x2%2Fprofile_img?alt=media&token=481869b3-dfd6-4844-b917-0757ed8bc2c0",
//         displayName: "Lucas Song",
//         walletAddr: "0xCe4E67E407aB231925DF614a5e72687fD597324B",
//     },
//     md_text: "## hi *lol*",
// };

const md = `
# Climbing Outdoors

Making the transition towards climbing outdoors is no small feat!

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

## subheader

![tux, lol](https://i.imgur.com/5T4PBDW.jpeg)

### triple subheader

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;

// TODO: add type for guide

// import markdown and render
function Guide() {
    const { guide_id } = useParams();
    const [guide, setGuide] = useState<GuideType>();
    const [loading, setLoading] = useState(true);
    const db = getDatabase();
    const { getUser } = useAuth();

    useEffect(() => {
        getGuide();
    }, []);

    const getGuide = () => {
        // setLoading(false);
        onValue(
            ref(db, `/guides/${guide_id}`),

            (snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    setGuide(snapshot.val());
                    setLoading(false);
                }
                setLoading(false);
            },
            {
                onlyOnce: false,
            }
        );
    };

    return (
        <div className="flex flex-col w-full items-center space-y-3">
            <GuideNavbar guide={guide} />
            {!loading ? (
                guide ? (
                    <div>
                        <div className="space-y-3 md:w-[768px] w-full">
                            {getUser() && getUser().uid === guide.author.uid && (
                                <div className="flex flex-row-reverse">
                                    <Link to={`/guides/${guide_id}/edit`}>
                                        <div className="btn-ghost">edit</div>
                                    </Link>
                                </div>
                            )}
                            {guide.cover_url && (
                                <img
                                    src={guide.cover_url}
                                    className="w-full h-64 object-cover rounded shadow-lg mb-10"
                                />
                            )}
                            <GuideHeader guide={guide} />
                            <GuideContent guide={guide} />
                            <GuideBlocks />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center">
                        there's no guide here
                        <img
                            className="w-96 my-2"
                            src="https://s.yimg.com/ny/api/res/1.2/tw9KQNHLA6caLDVOJq1stw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTg1OQ--/https://s.yimg.com/uu/api/res/1.2/zVwGY_4HkGhHsbO6cYIUWg--~B/aD0yMjAwO3c9MTY0MDthcHBpZD15dGFjaHlvbg--/http://media.zenfs.com/en_us/News/Reuters/2014-02-13T074227Z_1779854471_LR2EA2D0LEGRK_RTRMADP_3_OLYMPICS-FREESTYLE.JPG"
                        />
                        sorry!
                    </div>
                )
            ) : (
                <div>loading </div>
            )}
        </div>
    );
}

function GuideNavbar(props: any) {
    return (
        <div className="flex flex-row-reverse items-center w-full min-h-32 justify-between px-10 py-5">
            <User />
            {props.guide && <UserPopup user={props.guide.author} />}
        </div>
    );
}

function GuideHeader(props: any) {
    return (
        <div className="space-y-3 md:w-[768px] w-full">
            <div className="text-5xl font-bold script">{props.guide.title}</div>
            <div className="grid grid-cols-3">
                {/* <div className="text-lg col-span-2 italic script">
                    {props.guide.desc}
                </div> */}
                <div className="w-full">
                    <div className="col-span-1 serif text-sm p-1">
                        {props.guide.posted}
                    </div>
                </div>
            </div>
        </div>
    );
}

// renders MD file into article
function GuideContent(props: any) {
    return (
        <div className="script md:w-[768px] w-full ">
            {/* <ReactMarkdown>{guide.md_text}</ReactMarkdown> */}
            <ReactMarkdown>{props.guide.md_text}</ReactMarkdown>
        </div>
    );
}

// renders blocks at bottom of article
// can contain author's events, other articles to read, etc
// temp: hardcoded to render comments section with bounty, event booking
function GuideBlocks() {
    return (
        <div className="w-full">
            <EventBlurb />
            <DiscussionBlurb />
        </div>
    );
}

function EventBlurb() {
    return (
        <div className="grid grid-cols-1 gap-4 my-8 bg-stone-200 outline rounded shadow-inner p-10 w-full">
            <div className="mb-4">
                <div className="text-md font-bold mb-2 text-stone-500">
                    {/* Liked the article? Book an in-person experience with 
                    Lucas. */}
                </div>
                <EventPreview event={{}} />
            </div>
            <div className="mt-4">
                <div className="text-md font-bold mb-2 text-stone-500">
                    {/* Not in the area? Lucas also offers online consultations. */}
                </div>
                <Link to="/e/tree">
                    <EventPreview event={{}} />
                </Link>
            </div>
        </div>
    );
}

// place for readers to post comments, questions, questions with bounties
function DiscussionBlurb() {
    const [open, setOpen] = useState(false);
    return (
        <div className="">
            <div
                className="flex cursor-pointer text-sky-800 hover:underline font-bold mb-10"
                onClick={() => setOpen(!open)}
            >
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
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                </svg>
                Questions? Comments?
            </div>
            {open && <GuideBoard setOpen={setOpen} />}
        </div>
    );
}

function GuideBoard(props: any) {
    const { guide_id } = useParams();
    return (
        <div className="w-96 h-full fixed overflow-scroll shadow-lg bg-stone-200 top-0 right-0">
            <div
                onClick={() => props.setOpen(false)}
                className="hover:text-stone-400 cursor-pointer rounded pl-3 pt-3"
            >
                {" "}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>{" "}
            </div>
            <Board path={`/guide/${guide_id}/comments`} tags={false} />
        </div>
    );
}

export default Guide;
