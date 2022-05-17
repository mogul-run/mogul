import { getDatabase, push, ref, remove } from "firebase/database";
import { toArray } from "lodash";
import { useEffect, useRef, useState } from "react";
import UserPopup from "../../../components/userPopup";
import { useAuth } from "../../../context/authContext";

export function TextPost(props: any) {
    const [selected, setSelected] = useState(false);
    const { getUser } = useAuth();
    const db = getDatabase();
    const shakasArr = props.post.shakas
        ? Object.keys(props.post.shakas).map((shaka) => {
              return { id: shaka, name: props.post.shakas[shaka] };
          })
        : [];

    function handleSelected() {
        setSelected(!selected);
    }

    function handleShaka() {
        const user_match = shakasArr.find(
            (shaka) => shaka.name === getUser().uid
        );

        if (user_match) {
            remove(
                ref(
                    db,
                    `the-mogul-run/posts/${props.post.key}/shakas/${user_match.id}`
                )
            ).catch((error) => {
                console.log("error: ", error);
            });
        } else {
            push(
                ref(db, `the-mogul-run/posts/${props.post.key}/shakas/`),
                getUser().uid
            ).catch((error) => {
                console.log("error: ", error);
            });
        }
    }

    function returnColSpan() {
        if (props.post.bounty) {
            // bounty posts should be full width
            return "sm:col-span-1 md:col-span-7";
        } else {
            if (props.post.text.length > 70) {
                return "md:col-span-5 sm:col-span-1 row-span-2";
            }
            if (props.post.text.length > 35) {
                return "md:col-span-4 sm:col-span-1 row-span-2";
            }
            else {
                return `md:col-span-3 sm:col-span-1 row-span-1`;
            }
        }
    }

    return (
        <div className={returnColSpan()}>
            <div
                className={`p-1 shadow-xl rounded-2xl ${
                    props.post.bounty
                        ? `bg-gradient-to-r from-orange-300 to-orange-600 `
                        : `bg-stone-300`
                }
            `}
            >
                <div className="flex flex-col justify-end h-full bg-stone-200 rounded-xl hover:bg-opacity-90">
                    <div className="md:mt-10 sm:mt-6 sm:pt-8 p-4">
                        <div
                            className="cursor-pointer p-2 rounded hover:bg-opacity-80"
                            onClick={() => handleSelected()}
                        >
                            {" "}
                            {/* <p className="text-xs font-medium text-gray-500"> */}
                            <p className="text-sm text-stone-400 font-medium">
                                {props.post.posted && props.post.posted}
                            </p>
                            <h5 className="mt-2 text-xl font-bold ">
                                {/* <h5 className="mt-2 text-xl font-bold text-white"> */}
                                {props.post.text}
                            </h5>
                            <h5 className="mt-2 text-xl font-bold ">
                                {props.post.media && <img src={props.post.media} />}
                            </h5>
                            <div className="flex flex-row items-center mt-2 text-stone-500 font-normal">
                                <UserPopup user={props.post.author}/>
                            </div>
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
                        </div>

                        <div className="flex w-full justify-between items-center mt-3 space-x-2">
                            <div
                                className={`hover:scale-110 hover:-rotate-2 cursor-pointer text-sm outline outline-stone-300 px-2 py-1 hover:bg-opacity-80 ${
                                    shakasArr.some(
                                        (shaka) => shaka.name === getUser()?.uid
                                    )
                                        ? `bg-orange-500 text-white`
                                        : `text-stone-600`
                                }`}
                                onClick={() => handleShaka()}
                            >
                                🤙 +{props.post.shakas ? shakasArr.length : "0"}
                            </div>
                            <div
                                onClick={() => handleSelected()}
                                className="flex items-center text-sm text-stone-400 cursor-pointer hover:text-stone-600 decoration-solid"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                                    />
                                </svg>
                                {props.post.comments
                                    ? props.post.comments.length
                                    : "0"}{" "}
                                comments
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <strong className="inline-flex items-center gap-1 rounded-tl-xl rounded-br-xl bg-green-600 py-1.5 px-3 text-white">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                />
                            </svg>

                            <span className="text-[10px] font-medium sm:text-xs">
                                Solved!
                            </span>
                        </strong>
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
                    uid: getUser().uid,
                    displayName: getUser().displayName,
                    photoURL: getUser().photoURL,
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
            <div className="inline-flex items-center bg-stone-200 px-5 py-1.5 rounded-full space-x-3 text-sm">
                <UserPopup user={props.comment.author} />

                <span>{props.comment.text}</span>
            </div>{" "}
        </div>
    );
}
