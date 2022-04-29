import { getDatabase, push, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../context/authContext";

export function TextPost(props: any) {
    const ref = useRef<null | HTMLDivElement>(null);
    const [selected, setSelected] = useState(false);
    const [expand, setExpand] = useState(false);

    function handleSelected() {
        // if (!selected && ref && ref.current) {
        //     ref.current?.scrollIntoView({behavior: "smooth"});
        // }
        setSelected(!selected);
    }
    function handleClose() {
        setSelected(false);
    }

    return (
        <div
            ref={ref}
            className={` 
${
    props.post.text.length > 50
        ? `md:col-span-4 sm:col-span-1 row-span-2`
        : `md:col-span-3 sm:col-span-1 row-span-1`
}
        `}
        >
            <div
                className={`p-1 shadow-xl rounded-2xl ${
                    props.post.bounty
                        ? `bg-gradient-to-r from-orange-300 to-orange-600 `
                        : `bg-stone-300`
                }
            `}
            >
                <div
                    className="flex flex-col cursor-pointer justify-end h-full p-4  bg-stone-200 sm:p-8 rounded-xl hover:bg-opacity-90"
                    onClick={() => handleSelected()}
                >
                    <div className="md:mt-10 sm:mt-6">
                        {/* <p className="text-xs font-medium text-gray-500"> */}
                        <p className="text-sm text-stone-400 font-medium">
                            {props.post.posted && props.post.posted}
                        </p>
                        <h5 className="mt-2 text-xl font-bold ">
                            {/* <h5 className="mt-2 text-xl font-bold text-white"> */}
                            {props.post.text}
                        </h5>
                        <p className="text-sm text-stone-400 font-medium">
                            {props.post.author}
                        </p>
                        <div className="flex items-center justify-between mt-6">
                            <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                {props.post.bounty &&
                                    `${props.post.bounty} MATIC`}
                            </p>
                            <ul className="flex space-x-1 overflow-scroll max-w-64">
                                {props.post.tags &&
                                    props.post.tags.map((tag: string) => {
                                        return (
                                            <strong className="cursor-pointer border text-orange-500 border-current uppercase px-5 py-1.5 rounded-full text-[10px] tracking-wide">
                                                {tag}
                                            </strong>
                                        );
                                    })}
                            </ul>
                        </div>
                        <div className="text-sm text-stone-400 mt-3 cursor-pointer hover:text-stone-600 decoration-solid">
                            {props.post.comments
                                ? props.post.comments.length
                                : "0"}{" "}
                            comments
                        </div>
                    </div>
                </div>
                {selected && (
                    <div className="p-2">
                        <Comments
                            post_key={props.post.key}
                            comments={props.post.comments}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

function Comments(props: any) {
    const [comment, setComment] = useState("");
    const handleComment = (comment: string) => {
        setComment(comment);
    };
    const db = getDatabase();
    const { getUser, getWallet } = useAuth();
    const submitComment = () => {
        if (comment.length > 0) {
            // should add post to user's list of posts as well as global list of posts
            // for now we'll just add to the global list of posts
            const date = new Date(Date.now()).toString();
            const formatted_date = date.split(" GMT")[0];
            const newComment = {
                posted: formatted_date,
                text: comment,
                author: {
                    displayName: getUser().displayName,
                    walletAddr: getWallet(),
                },
            };
            console.log("submitting comment: ", newComment);
            push(
                ref(db, `the-mogul-run/posts/${props.post_key}/comments`),
                newComment
            )
                .then(() => {
                    setComment("");
                })
                .catch((error) => {
                    console.log("error: ", error);
                });
        }
    };

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
                    className="inline-flex items-center bg-stone-200 px-5 py-1.5 rounded-l-full w-full"
                    placeholder="comment"
                    value={comment}
                    onChange={(e) => handleComment(e.target.value)}
                />
                <button
                    className="button-primary rounded-r-full text-sm"
                    onClick={() => submitComment()}
                >
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
