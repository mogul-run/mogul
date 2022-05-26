import { getAdditionalUserInfo } from "firebase/auth";
import UserPopup from "../../components/social/userPopup";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Board } from "../../components/social/board";
import { User } from "../../components/auth/current-user";

const guide = {
    title: "Out of the gym and into the rocks",
    desc: "a guide to help you make your first forays on outdoor rock fun and safe!",
    date: "5/24/2022",
    cover_url:
        "https://thatsmypark.org/wp-content/uploads/2022/01/CastleRock-2022-1161-1024x869.jpg",
    author: {
        photoURL:
            "https://firebasestorage.googleapis.com/v0/b/mogul-run.appspot.com/o/user%2FvlITP8crPWNU1jjE1TCosD6L20x2%2Fprofile_img?alt=media&token=481869b3-dfd6-4844-b917-0757ed8bc2c0",
        displayName: "Lucas Song",
        walletAddr: "0xCe4E67E407aB231925DF614a5e72687fD597324B",
    },
    md_text: "## hi *lol*",
};

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

// import markdown and render
function Guide() {
    const { guide_id } = useParams();

    return (
        <div className="flex flex-col w-full items-center space-y-3">
            <GuideNavbar />
            <div className="space-y-3 md:w-[768px] w-full">
                <img
                    src={guide.cover_url}
                    className="w-full h-64 object-cover rounded shadow-lg mb-10"
                />
                <GuideHeader />
                <GuideContent />
                <GuideBlocks />
            </div>
        </div>
    );
}

function GuideNavbar() {
    return (
        <div className="flex items-center w-full min-h-32 justify-between px-10 py-5">
            <UserPopup user={guide.author} />
            <User />
        </div>
    );
}

function GuideHeader() {
    return (
        <div className="space-y-3 md:w-[768px] w-full">
            <div className="text-5xl font-bold script">{guide.title}</div>
            <div className="grid grid-cols-3">
                <div className="text-lg col-span-2 italic script">
                    {guide.desc}
                </div>
                <div className="w-full text-right">
                    <div className="col-span-1 serif text-sm p-1">
                        {guide.date}
                    </div>
                </div>
            </div>
        </div>
    );
}

// renders MD file into article
function GuideContent() {
    return (
        <div className="script md:w-[768px] w-full ">
            {/* <ReactMarkdown>{guide.md_text}</ReactMarkdown> */}
            <ReactMarkdown>{md}</ReactMarkdown>
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
        <div className="grid grid-cols-3 gap-4 my-8 bg-stone-200 rounded shadow-inner text-white p-10 w-full">
            <Link to="/e/tree" className="col-span-2">
                <div className="card bg-stone-100 text-stone-600">
                    another call to action
                </div>
            </Link>
            <Link to="/e/tree">
                <div className="card bg-stone-100 text-stone-600">
                    another call to action
                </div>
            </Link>
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
            <div onClick={() => props.setOpen(false)} className="hover:text-stone-400 cursor-pointer rounded pl-3 pt-3">
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
            <Board path={`/guide/${guide_id}`} tags={false} />
        </div>
    );
}

export default Guide;
