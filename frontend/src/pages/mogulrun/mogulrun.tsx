import { getDatabase, onValue, push, ref } from "firebase/database";
import { toArray } from "lodash";
import { useEffect, useRef, useState } from "react";
import { text } from "stream/consumers";
import { User } from "../../components/navbar";
import { useAuth } from "../../context/authContext";
import { TextPost } from "./components/post";
import "./mogulrun.css";

const tags = [
    "surf",
    "climb",
    "ski",
    "snowboard",
    "bikes",
    "gear",
    "fitness",
    "beta",
];

function MogulRun() {
    return (
        <div className="flex flex-col ">
            <div className="topbar">
                <div className="mogul-header text-3xl font-bold">
                    The Mogul Run
                </div>
                <div className="">
                    <User />
                </div>
            </div>
            <div className="flex flex-col items-center p-2">
                <Content />
            </div>
        </div>
    );
}

function Content() {
    const [openPost, setOpenPost] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const [selectedTags, setSelectedTags] = useState<String[]>([]);

    const handleTags = (value: string) => {
        if (selectedTags.includes(value)) {
            setSelectedTags(
                selectedTags.filter((v) => {
                    if (v != value) {
                        return v;
                    }
                })
            );
        } else {
            setSelectedTags([...selectedTags, value]);
        }
    };

    const getPosts = () => {
        const db = getDatabase();
        onValue(
            ref(db, `/the-mogul-run/posts`),
            (snapshot) => {
                if (snapshot.exists()) {
                    // .reverse() to display posts with most recent on top
                    let new_posts: any[] = [];
                    snapshot.forEach((data: any) => {
                        let new_post = data.val();
                        new_post.key = data.key;
                        new_post.comments = toArray(new_post.comments);
                        new_posts.push(new_post);
                    });
                    setPosts(new_posts.reverse());
                    setFilteredPosts(new_posts);
                }
            },
            {
                onlyOnce: false,
            }
        );
    };

    useEffect(() => {
        getPosts();
    }, []);

    useEffect(() => {
        if (selectedTags.length > 0) {
            let filtered_posts: any[] = [];

            selectedTags.forEach((tag) => {
                let tag_post = posts.filter((post) => post.tags.includes(tag))
                filtered_posts.push(...tag_post);
            });
            setFilteredPosts(filtered_posts);
        } else {
            setFilteredPosts(posts);
        }
    }, [selectedTags]);

    function handlePost() {
        setOpenPost(!openPost);
    }

    return (
        <div className="mr-content space-y-2 ">
            <div className="flex flex-col md:border-2 md:p-1 rounded-lg border-dashed border-orange-400">
                <div className="flex space-x-1 justify-between md:p-2">
                    {" "}
                    <div
                        className="button-primary font-bold text-sm flex h-10 items-center md:px-3"
                        onClick={() => handlePost()}
                    >
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                        </svg>
                    </div>
                    <div className="flex space-x-2 items-center  ">
                        <div className="font-bold text-sm ">Filter:</div>
                        <div className="flex items-center tags h-10 space-x-1 ">
                            {tags.map((tag) => {
                                if (selectedTags.includes(tag)) {
                                    return (
                                        <strong
                                            onClick={() => handleTags(tag)}
                                            className="cursor-pointer border text-white bg-orange-500 border-current uppercase px-5 py-1.5 rounded-full text-sm tracking-wide"
                                        >
                                            {tag}
                                        </strong>
                                    );
                                } else {
                                    return (
                                        <strong
                                            onClick={() => handleTags(tag)}
                                            className="cursor-pointer border text-orange-500 border-current uppercase px-5 py-1.5 rounded-full text-sm tracking-wide"
                                        >
                                            {tag}
                                        </strong>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>

                {openPost && <PostContent setOpenPost={setOpenPost} />}
            </div>
            <div className="grid gap-4 md:grid-cols-7 sm:grid-cols-1 grid-flow-row-dense auto-rows-max">
                {filteredPosts.map((post) => {
                    switch (post.type) {
                        case "text":
                            return <TextPost post={post} />;
                    }
                })}
            </div>
        </div>
    );
}

function PostContent(props: any) {
    const [post, setPost] = useState("");
    const [selectedTags, setSelectedTags] = useState<String[]>([]);
    const [bounty, setBounty] = useState("");
    const [error, setError] = useState("");
    const db = getDatabase();
    const { getUser, getWallet } = useAuth();

    const handleError = (error: string) => {
        setError(error);
    };
    const handlePost = (value: string) => {
        setPost(value);
    };
    const handleBounty = (value: string) => {
        setBounty(value);
    };
    const handleTags = (value: string) => {
        if (selectedTags.includes(value)) {
            setSelectedTags(
                selectedTags.filter((v) => {
                    if (v != value) {
                        return v;
                    }
                })
            );
        } else {
            setSelectedTags([...selectedTags, value]);
        }
    };
    // {
    //     type: "text",
    //     text: "are there any good spots to surf in santa cruz rn?",
    //     author: "willy wishbones",
    //     tags: ["surf", "cook"],
    //      bounty: "1.0",
    //     comments: [
    //         {
    //             author: {
    //                 displayName: "Lucas",
    //                 walletAddr: "123",
    //             },
    //             text: "hahah fuck u",
    //         },
    //     ],
    // },

    const handlePostSubmit = () => {
        // should add post to user's list of posts as well as global list of posts
        // for now we'll just add to the global list of posts
        const date = new Date(Date.now()).toString();
        const formatted_date = date.split(" GMT")[0];
        const newPost = {
            posted: formatted_date,
            type: "text",
            text: post,
            author: getUser().displayName,
            walletAddr: getWallet(),
            tags: selectedTags,
            bounty: bounty,
            comments: [],
        };
        if (props.walletAddr) {
            /// TEMP: adding wallet addr to post for tipping
            newPost.walletAddr = props.walletAddr;
        }
        push(ref(db, `the-mogul-run/posts`), newPost)
            .then(props.setOpenPost(false))
            .catch((error) => {
                console.log("error: ", error);
                handleError(error.value());
            });
    };

    return (
        <div className="flex flex-col">
            <div className="w-full bg-stone-200 p-3 space-y-2">
                <div className="text-sm my-2 text-stone-500 font-bold">
                    Hot take incoming!
                </div>
                <div className="flex">
                    <textarea
                        onChange={(event) => handlePost(event.target.value)}
                        className="text-input bg-stone-100 rounded-l p-2 w-full"
                        placeholder="What's on your mind?"
                    />
                    <div className="error text-red-500">{error}</div>
                </div>
                <div>
                    <div className="text-sm my-2 text-stone-500 font-bold">
                        Add Tags
                    </div>
                    <div className="overflow-scroll flex space-x-2">
                        {tags.map((tag) => {
                            if (selectedTags.includes(tag)) {
                                return (
                                    <strong
                                        onClick={() => handleTags(tag)}
                                        className="cursor-pointer border text-white bg-orange-500 border-current uppercase px-5 py-1.5 rounded-full text-sm tracking-wide"
                                    >
                                        {tag}
                                    </strong>
                                );
                            } else {
                                return (
                                    <strong
                                        onClick={() => handleTags(tag)}
                                        className="cursor-pointer border text-orange-500 border-current uppercase px-5 py-1.5 rounded-full text-sm tracking-wide"
                                    >
                                        {tag}
                                    </strong>
                                );
                            }
                        })}
                    </div>
                </div>
                <div
                    className="p1 
                "
                >
                    <div className="text-sm my-2 text-stone-500 font-bold">
                        Add Bounty
                    </div>
                    <div
                        className="flex
                    "
                    >
                        <div
                            className="relative shadow-sm p-1 bg-gradient-to-r from-orange-300 to-orange-600 rounded-full
                        "
                        >
                            <input
                                className="inline-flex items-center bg-stone-100 px-5 py-1.5 pr-12 rounded-full w-40"
                                placeholder="0.00"
                                onChange={(e) => handleBounty(e.target.value)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-600">
                                MATIC
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex w-full justify-center p-2">
                {" "}
                <button
                    className="button-primary rounded-lg text-sm"
                    onClick={
                        post
                            ? () => handlePostSubmit()
                            : () => handleError("Can't submit an empty post")
                    }
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default MogulRun;
