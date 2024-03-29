import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDatabase, push, ref, get, onValue } from "firebase/database";
import { toArray } from "lodash";
import { useAuth } from "../../context/authContext";

const test_content = [
    {
        type: "text",
        text: "With the invention of wave pools, electronic propelled machines and other innovations to ways you can get pitted... what is surfing? It began when someone asked if Wake Surfing behind a boat wake, is surfing. That lead to interesting perspectives about paddling, reading waves, knowledge, experience and the things we probably assume is unique to surfing. With the increasing availability of wave pools, many 'surfers' can catch wave after wave without any skill other than popping up and turning right or left. Just like any person can ride up a mountain pass on an e-bike or anyone can see the world with a VR set. Similarly to skateboarding. There is a lot of things going on with a old school skateboard that are removed when you add an electric motor and system to do that work for you. It could extend to literally every form of hobby or discipline. So... what is surfing?",
        author: "willy wishbones",
    },
    {
        type: "text",
        text: "Hi, Tech nomad here, I recently moved to the beach and have decided to take up surfing as a new hobby and source of exercise (when I don't feel like riding my Peloton, lol). Question, I was asking some guys at my 'local' break about the pros and cons of the 2022 Patagonia wetsuit lineup. They informed me that Patagonia wetsuits don't contain any seal skin, and that the best wetsuits will be 100% seal skin. Apparently you can tell based on if the numbers say 2:1, 3:2, etc what blend of seal skin / artificial materials are used. Does anyone have a 1:1 seal-skin wetsuit and can tell me the benefits of over a say, a 5:6 hybrid? I want to maximize my popup and straightline distance. Aloha and mahalo! -Braydin ",
        author: "john mel",
    },
    {
        type: "text",
        text: "So I got into gym bouldering about 6 months ago and started crushing V4 (V9 in your gym) pretty much right away. Anyways I've had this boyfriend for awhile and we used to get along well but now he gets jealous that I spend 6 hours a week less with him and that I climb with guys? Most of the people at the gym are guys I can't help that? He claims he got 'scared' after whipping 8ft (which he must certainly is not) off this V0 and then pouted and never came to the gym again? What do? Is it even possible for a climber to date a non-climber. Now that I'm fully addicted to climbing I'm rethinking my entire dating strategy. Should I exclusively go after men that live in vans? Thanks for any advice! ",
        author: "beegdaddy1",
    },
    {
        type: "text",
        text: "My summer goal is to top rope el cap in Yosemite. I will be climbing the “free-rider” route and doing the karate kick because I just watched a cool movie about it. I climb indoor 5.9 and have done some V3 boulders before, so I should be fine from a difficulty standpoint. I’m currently in the market for a rope around 6,600ft(2100m). Ideally used so that I can save some bucks. I am not looking to buy any of that “trad” gear because it is too expensive and dangerous. I am trying to work out a number of kinks. How will the belayer hold the binoculars and keep both hands on the rope? How will I let my belayer know that I want him to take? As for the anchor, I plan to build it off the famous old tree that Alex and Tommy touch when the are done. I wouldn’t want to anger climbers by pulling it down so I would need some help finding another tree to equalize the weight. How can I yell ROPE loud enough to avoid hitting multiple parties on the wall or any pedestrians in the valley? Any words of wisdom from someone who’s done this before?",
        author: "topropewarrior",
    },
];
function Feed(props: any) {
    const [openPost, setOpenPost] = useState(false);
    const [posts, setPosts] = useState<any[]>([]);
    const navigate = useNavigate();
    const { getUser, getWallet } = useAuth();

    const getPosts = () => {
        const db = getDatabase();
        onValue(
            ref(db, `/posts/${props.chaletId}`),
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
        if (!getUser()) {
            // navigate("/");
        } else {
            getPosts();
        }
    }, []);

    return (
        <div className="w-full">
            {" "}
            <>
                {" "}
                <div>
                    {openPost ? (
                        <PostContent
                            user={getUser()}
                            setOpenPost={setOpenPost}
                            walletAddr={getWallet()}
                            chaletId={props.chaletId}
                        />
                    ) : (
                        <PostButton setOpenPost={setOpenPost} />
                    )}
                </div>
                <div className="feed-wrapper">
                    <div className="feed-content">
                        {posts.length > 0 &&
                            posts.map((post, id) => <TextPost post={post} key={id}/>)}
                    </div>
                </div>
            </>
        </div>
    );
}

function PostButton(props: any) {
    const handlePost = () => {
        props.setOpenPost(true);
    };
    return (
        <button
            className="mx-6 my-2 btn-primary"
            onClick={() => handlePost()}
        >
            {" "}
            post{" "}
        </button>
    );
}

function PostContent(props: any) {
    const [post, setPost] = useState("");
    const [error, setError] = useState("");
    const db = getDatabase();

    const handleError = (error: string) => {
        setError(error);
    };
    const handlePost = (value: string) => {
        setPost(value);
    };

    const handlePostSubmit = () => {
        // should add post to user's list of posts as well as global list of posts
        // for now we'll just add to the global list of posts
        const newPost = {
            type: "text",
            text: post,
            author: props.user.displayName,
            walletAddr: "",
        };
        if (props.walletAddr) {
            /// TEMP: adding wallet addr to post for tipping
            newPost.walletAddr = props.walletAddr;
        }
        push(ref(db, `posts/${props.chaletId}`), newPost)
            .then(props.setOpenPost(false))
            .catch((error) => {
                console.log("error: ", error);
                handleError(error.value());
            });

        console.log("submitting post");
    };

    return (
        <div className="w-full m-3 message-primary p-3">
            <div className="text-lg my-3">Hot take incoming!</div>
            <textarea
                onChange={(event) => handlePost(event.target.value)}
                className="overflow-wrap rounded p-1"
            />
            <div className="my-2">
                <button
                    className="btn-primary"
                    onClick={
                        post
                            ? () => handlePostSubmit()
                            : () => handleError("Can't submit an empty post")
                    }
                >
                    submit
                </button>
                <div className="error text-red-500">{error}</div>
            </div>
        </div>
    );
}

function TextPost(props: any) {
    async function handleTip() {
        const { ethereum } = window as any;
        const LucasTokenAddr = "0x8531f05D2F69E2591Dac5dFcaBc53b614fc636b4";
        let data = "0x";
        // function signature for transfer
        data += "a9059cbb";
        // adds receipient (32bytes right aligned)

        // data += props.post.walletAddr.padStart(24, "0")
        // console.log(data)
        data +=
            "000000000000000000000000Ce4E67E407aB231925DF614a5e72687fD597324B";
        // data += props.post.walletAddr.padStart(32, '0');
        // adds amount
        data +=
            "00000000000000000000000000000000000000000000000002c68af0bb140000";

        const txParams = {
            nonce: "0x00", // ignored by MetaMask
            // gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
            // gas: '0x2710', // customizable by user during MetaMask confirmation.
            to: LucasTokenAddr, // for smart contract interactions, this should be the smart contract addr
            // to: props.post.walletAddr, // Required except during contract publications.
            from: ethereum.selectedAddress, // must match user's active address.
            value: "0x0", // Only required to send ether to the recipient from the initiating external account.
            data: data,
            chainId: "0x3", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };
        const txHash = await ethereum.request({
            method: "eth_sendTransaction",
            params: [txParams],
        });
    }

    return (
        <div className="card w-full m-3">
            <div className="author font-bold my-2">{props.post.author}</div>
            <div className="post-text">{props.post.text}</div>
            <div className="post-logic my-1">
                <button className="btn-ghost mr-2"> react </button>
                <button className="btn-ghost mr-2 "> comment</button>
                <button className="btn-ghost" onClick={() => handleTip()}>
                    {" "}
                    tip{" "}
                    {props.post.walletAddr && (
                        <span className="px-2 bg-gray-200 rounded">
                            {" "}
                            {props.post.walletAddr &&
                                props.post.walletAddr.substring(0, 6)}
                        </span>
                    )}{" "}
                </button>
            </div>
        </div>
    );
}

export default Feed;
