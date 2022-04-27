import { getDatabase, onValue, push, ref } from "firebase/database";
import { toArray } from "lodash";
import { useEffect, useRef, useState } from "react";
import { text } from "stream/consumers";
import { User } from "../../components/navbar";
import { useAuth } from "../../context/authContext";
import "./mogulrun.css";

const test_content = [
    {
        type: "text",
        text: "are there any good spots to surf in santa cruz rn?",
        author: "willy wishbones",
        tags: ["surf", "cook"],
        comments: [
            {
                author: {
                    displayName: "Lucas",
                    walletAddr: "123",
                },
                text: "hahah fuck u",
            },
            {
                author: {
                    displayName: "Lucas",
                    walletAddr: "123",
                },
                text: "hahah fuck u",
            },
        ],
    },
    {
        type: "text",
        text: "with the invention of wave pools, electronic propelled machines and other innovations to ways you can get pitted... what is surfing? it began when someone asked if wake surfing behind a boat wake, is surfing. that lead to interesting perspectives about paddling, reading waves, knowledge, experience and the things we probably assume is unique to surfing. with the increasing availability of wave pools, many 'surfers' can catch wave after wave without any skill other than popping up and turning right or left. just like any person can ride up a mountain pass on an e-bike or anyone can see the world with a vr set. similarly to skateboarding. there is a lot of things going on with a old school skateboard that are removed when you add an electric motor and system to do that work for you. it could extend to literally every form of hobby or discipline. so... what is surfing?",
        author: "willy wishbones",

        comments: [
            {
                author: {
                    displayName: "Lucas",
                    walletAddr: "123",
                },
                text: "hahah fuck u",
            },
            {
                author: {
                    displayName: "Lucas",
                    walletAddr: "123",
                },
                text: "hahah fuck u",
            },
        ],
    },
    {
        type: "text",
        text: "anyone know the lowdown on skis?",
        author: "willy wishbones",
        bounty: "1.00",
        tags: ["surf", "cook"],
    },
    {
        type: "text",
        text: "anyone know the lowdown on skis?",
        author: "willy wishbones",
    },
    {
        type: "text",
        text: "hi, tech nomad here, i recently moved to the beach and have decided to take up surfing as a new hobby and source of exercise (when i don't feel like riding my peloton, lol). question, i was asking some guys at my 'local' break about the pros and cons of the 2022 patagonia wetsuit lineup. they informed me that patagonia wetsuits don't contain any seal skin, and that the best wetsuits will be 100% seal skin. apparently you can tell based on if the numbers say 2:1, 3:2, etc what blend of seal skin / artificial materials are used. does anyone have a 1:1 seal-skin wetsuit and can tell me the benefits of over a say, a 5:6 hybrid? i want to maximize my popup and straightline distance. aloha and mahalo! -braydin ",
        author: "john mel",
        bounty: "1.00",
    },
    {
        type: "text",
        text: "so i got into gym bouldering about 6 months ago and started crushing v4 (v9 in your gym) pretty much right away. anyways i've had this boyfriend for awhile and we used to get along well but now he gets jealous that i spend 6 hours a week less with him and that i climb with guys? most of the people at the gym are guys i can't help that? he claims he got 'scared' after whipping 8ft (which he must certainly is not) off this v0 and then pouted and never came to the gym again? what do? is it even possible for a climber to date a non-climber. now that i'm fully addicted to climbing i'm rethinking my entire dating strategy. should i exclusively go after men that live in vans? thanks for any advice! ",
        author: "beegdaddy1",
    },
    {
        type: "text",
        text: "my summer goal is to top rope el cap in yosemite. i will be climbing the “free-rider” route and doing the karate kick because i just watched a cool movie about it. i climb indoor 5.9 and have done some v3 boulders before, so i should be fine from a difficulty standpoint. i’m currently in the market for a rope around 6,600ft(2100m). ideally used so that i can save some bucks. i am not looking to buy any of that “trad” gear because it is too expensive and dangerous. i am trying to work out a number of kinks. how will the belayer hold the binoculars and keep both hands on the rope? how will i let my belayer know that i want him to take? as for the anchor, i plan to build it off the famous old tree that alex and tommy touch when the are done. i wouldn’t want to anger climbers by pulling it down so i would need some help finding another tree to equalize the weight. how can i yell rope loud enough to avoid hitting multiple parties on the wall or any pedestrians in the valley? any words of wisdom from someone who’s done this before?",
        author: "topropewarrior",
    },
];

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
            <div className="flex flex-col items-center">
                <Content />
            </div>
        </div>
    );
}

function Content() {
    const [openPost, setOpenPost] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);

    const getPosts = () => {
        const db = getDatabase();
        onValue(
            ref(db, `/the-mogul-run/posts`),
            (snapshot) => {
                if (snapshot.exists()) {
                    // .reverse() to display posts with most recent on top
                    setPosts(toArray(snapshot.val()).reverse());
                    // setPosts(snapshot.val());
                }
            },
            {
                onlyOnce: false,
            }
        );
    };
    
    useEffect(() => {
        getPosts();
    })

    function handlePost() {
        setOpenPost(!openPost);
    }

    return (
        <div className="mr-content space-y-2 ">
            <div className="flex flex-col border-2 rounded-lg border-dashed border-orange-400">
                <div className="flex justify-between p-2">
                    {" "}
                    <div
                        className="button-primary"
                        onClick={() => handlePost()}
                    >
                        Post Content{" "}
                    </div>
                    <div className="flex space-x-2 items-center ">
                        <div>Filter:</div>
                        <div className="tags h-full space-x-1">
                            {tags.map((tag) => {
                                return (
                                    <strong className="cursor-pointer border text-orange-500 border-current uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                                        {tag}
                                    </strong>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {openPost && <PostContent setOpenPost={setOpenPost}/>}
            </div>
            <div className="grid gap-4 grid-cols-7 grid-flow-rows auto-rows-max">
                {posts.map((post) => {
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
            console.log("add", value);
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
        const newPost = {
            type: "text",
            text: post,
            author: getUser().displayName,
            walletAddr: getWallet(),
            tags: tags,
            bounty: bounty,
            comments: [],
        };
        console.log("submitting post: ", newPost);
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
                <div className="text-xs my-2">Hot take incoming!</div>
                <div className="flex">
                    <textarea
                        onChange={(event) => handlePost(event.target.value)}
                        className="text-input bg-stone-100 rounded-l p-2 w-full"
                        placeholder="What's on your mind?"
                    />
                    <div className="error text-red-500">{error}</div>
                </div>
                <div>
                    <div className="text-xs my-2">Add Tags</div>
                    <div className="overflow-scroll flex space-x-2">
                        {tags.map((tag) => {
                            if (selectedTags.includes(tag)) {
                                return (
                                    <strong
                                        onClick={() => handleTags(tag)}
                                        className="cursor-pointer border text-white bg-orange-500 border-current uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide"
                                    >
                                        {tag}
                                    </strong>
                                );
                            } else {
                                return (
                                    <strong
                                        onClick={() => handleTags(tag)}
                                        className="cursor-pointer border text-orange-500 border-current uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide"
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
                    <div className="text-xs my-2">Add Bounty</div>
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
                    className="button-primary rounded-lg"
                    onClick={
                        post
                            ? () => handlePostSubmit()
                            : () => handleError("Can't submit an empty post")
                    }
                >
                    submit
                </button>
            </div>
        </div>
    );
}

//
function Post(props: any) {
    return (
        <div className="post card col-span-4 row-span-2">{props.post.text}</div>
    );
}

function TextPost(props: any) {
    const ref = useRef<null | HTMLDivElement>(null);
    const [selected, setSelected] = useState(false);
    const [expand, setExpand] = useState(false);

    function handleSelected() {
        // if (!selected && ref && ref.current) {
        //     ref.current?.scrollIntoView({behavior: "smooth"});
        // }
        setSelected(true);
    }
    function handleClose() {
        setSelected(false);
    }

    return (
        <div
            ref={ref}
            className={` 
${
    props.post.text.length > 300
        ? `col-span-4 row-span-2`
        : `col-span-3 row-span-1`
}
${selected && ``}
        `}
        >
            <div
                className={`cursor-pointer p-1 shadow-xl rounded-2xl ${
                    props.post.bounty
                        ? `bg-gradient-to-r from-orange-300 to-orange-600 `
                        : `bg-stone-300`
                }
            `}
                onClick={() => handleSelected()}
            >
                <div className="flex flex-col justify-end h-full p-6 bg-stone-200 sm:p-8 rounded-xl hover:bg-opacity-90">
                    <div className="mt-10">
                        {/* <p className="text-xs font-medium text-gray-500"> */}
                        <p className="text-sm text-stone-400 font-medium">
                            26/05/2021
                        </p>
                        <h5 className="mt-2 text-xl font-bold ">
                            {/* <h5 className="mt-2 text-xl font-bold text-white"> */}
                            {props.post.text}
                        </h5>
                        <div className="flex items-center justify-between mt-6">
                            <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                {props.post.bounty &&
                                    `${props.post.bounty} MATIC`}
                            </p>
                            <ul className="flex space-x-1">
                                {props.post.tags &&
                                    props.post.tags.map((tag: string) => {
                                        return (
                                            <li className="inline-block rounded-full text-white text-xs font-medium px-3 py-1.5 bg-gray-800">
                                                {tag}
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                        <div className="text-sm text-stone-400">
                            {props.post.comments
                                ? props.post.comments.length
                                : "0"}{" "}
                            comments
                        </div>
                    </div>
                </div>
                {selected && (
                    <div className="p-2">
                        <Comments comments={props.post.comments} />
                    </div>
                )}
            </div>
        </div>
    );
}

function Comments(props: any) {
    return (
        <div className="flex flex-col space-y-2">
            <div className="space-y-2">
                {props.comments &&
                    props.comments.map((comment: any) => {
                        return <Comment comment={comment} />;
                    })}
            </div>
            <div className="flex space-x-1">
                <input
                    className="inline-flex items-center bg-stone-200 px-5 py-1.5 rounded-full w-full"
                    placeholder="comment"
                />
                <button className="button-primary rounded-full text-sm">
                    Send
                </button>
            </div>
        </div>
    );
}

function Comment(props: any) {
    return (
        <div className="flex flex-col space-x-2 ">
            <div className="inline-flex items-center bg-stone-200 px-5 py-1.5 rounded-full">
                <img
                    className="object-cover w-6 h-6 rounded-full -ml-2.5 mr-2.5"
                    src="https://www.hyperui.dev/photos/man-4.jpeg"
                    alt="Simon Lewis"
                />

                <span className="text-sm ">
                    <b> {props.comment.author.displayName}:</b>{" "}
                    {props.comment.text}
                </span>
            </div>{" "}
        </div>
    );
}

export default MogulRun;
