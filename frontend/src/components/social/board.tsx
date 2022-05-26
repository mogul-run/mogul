import { getDatabase, onValue, push, ref } from "firebase/database";
import {
    getDownloadURL,
    getStorage,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";
import { toArray } from "lodash";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { TextPost } from "./post";
import UploadButton from "../upload-button";
import UserPopup from "./userPopup";

export interface postType {
    posted: string;
    type: "text";
    text: string;
    mediaType?: string;
    media?: any;
    author: {
        displayName: any;
        walletAddr: any;
        uid: any;
        photoURL: any;
    };
    tags: String[];
    bounty: string;
    comments: any;
}

const mediaTypes = ["photo", "video"];

export function Board(props: any) {
    const [posts, setPosts] = useState<any[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);
    const [selectedTags, setSelectedTags] = useState<String[]>([]);
    const { getUser, getWallet } = useAuth();
    const tags: string[] = props.tags ? props.tags : null;

    const handleTags = (value: string) => {
        if (selectedTags.includes(value)) {
            setSelectedTags(
                selectedTags.filter((v) => {
                    if (v !== value) {
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
            ref(db, props.path),
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
        // if (selectedTags.length > 0 && props.tags.length > 0) {
        //     let filtered_posts: any[] = [];

        //     selectedTags.forEach((tag) => {
        //         let tag_post = posts.filter(
        //             (post) => post.tags && post.tags.includes(tag)
        //         );
        //         filtered_posts.push(...tag_post);
        //     });
        //     setFilteredPosts(filtered_posts);
        // } else {
        setFilteredPosts(posts);
        // }
    }, [selectedTags]);

    return (
        <div className="mr-content w-full p-2 space-y-2 ">
            {/* <div className="flex flex-col md:border-2 md:p-1 rounded-lg border-dashed border-orange-400"> */}
            <div className="flex flex-col md:border-2">
                <div className="flex flex-row-reverse justify-between items-center ">
                    {" "}
                    <div className="space-x-2 items-center  ">
                        {props.tags && (
                            <div>
                                <div className="font-bold text-sm text-stone-500 ">
                                    Filter by tag:
                                </div>
                                <div className="flex items-center tags h-10 space-x-1 ">
                                    {tags.map((tag) => {
                                        if (selectedTags.includes(tag)) {
                                            return (
                                                <strong
                                                    onClick={() =>
                                                        handleTags(tag)
                                                    }
                                                    className="cursor-pointer border text-white bg-orange-500 border-current uppercase px-5 py-1.5 rounded-full text-sm tracking-wide"
                                                >
                                                    {tag}
                                                </strong>
                                            );
                                        } else {
                                            return (
                                                <strong
                                                    onClick={() =>
                                                        handleTags(tag)
                                                    }
                                                    className="cursor-pointer border text-orange-500 border-current uppercase px-5 py-1.5 rounded-full text-sm tracking-wide"
                                                >
                                                    {tag}
                                                </strong>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                    {getUser() && <PostContent tags={tags} path={props.path} />}
                </div>
            </div>
            {/* <div className="grid gap-4 place-content-stretch md:grid-cols-7 sm:grid-cols-1 grid-flow-row-dense auto-rows-max"> */}
            <div className="grid gap-4 place-content-stretch md:grid-cols-1 sm:grid-cols-1 grid-flow-row-dense auto-rows-max">
                {posts.map((post) => {
                    switch (post.type) {
                        case "text":
                            return <TextPost post={post} path={props.path} />;
                    }
                })}
            </div>
        </div>
    );
}

function PostContent(props: any) {
    const [openPost, setOpenPost] = useState(false);
    const [post, setPost] = useState("");
    const [selectedTags, setSelectedTags] = useState<String[]>([]);
    const [selectedMedia, setSelectedMedia] = useState<string | undefined>(
        undefined
    );
    const [selectedMediaFile, setSelectedMediaFile] = useState(undefined);
    const [submitting, setSubmitting] = useState<boolean>(false);
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
                    if (v !== value) {
                        return v;
                    }
                })
            );
        } else {
            setSelectedTags([...selectedTags, value]);
        }
    };
    const handleMedia = (value: string) => {
        if (selectedMedia === value) {
            setSelectedMedia(undefined);
        } else {
            setSelectedMedia(value);
        }
    };
    const handleUploadPicture = (event: any) => {
        const image = event.target.files[0];
        if (!image.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            console.log(
                "Error: File must be one of these formats: jpg, jpeg, png, gif"
            );
            return null;
        } else {
            console.log("Success: it's a file!");
            setSelectedMedia("photo");
            setSelectedMediaFile(image);
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

    const handlePostSubmit = async () => {
        // should add post to user's list of posts as well as global list of posts
        // for now we'll just add to the global list of posts
        setSubmitting(true);
        const date = new Date(Date.now()).toString();
        const formatted_date = date.split(" GMT")[0];
        const author = {
            displayName: getUser().displayName,
            walletAddr: getWallet(),
            uid: getUser().uid,
            photoURL: getUser().photoURL,
        };
        const newPost: postType = {
            posted: formatted_date,
            type: "text",
            text: post,
            author: author,
            tags: selectedTags,
            bounty: bounty,
            comments: [],
        };
        if (selectedMedia === "photo" && selectedMediaFile) {
            newPost.mediaType = selectedMedia;
            const storage = getStorage();
            const postImageRef = storageRef(
                storage,
                `user/${getUser().uid}/post_images/${formatted_date
                    .split(" ")
                    .join("-")}`
            );
            await uploadBytes(postImageRef, selectedMediaFile)
                .then((snapshot) => {
                    return getDownloadURL(snapshot.ref);
                })
                .then((url) => {
                    newPost.media = url;
                });
        }
        if (props.walletAddr) {
            /// TEMP: adding wallet addr to post for tipping
            newPost.author.walletAddr = props.walletAddr;
        }
        push(ref(db, props.path), newPost)
            .then((x) => {
                setOpenPost(false);
                setPost("");
                setBounty("");
                setSubmitting(false);
            })
            .catch((error) => {
                console.log("error: ", error);
                handleError(error);
                setSubmitting(false);
            });
    };

    return (
        <div className="flex flex-col w-full">
            <div className="w-full bg-stone-100 shadow-md p-2 space-y-2 rounded">
                {/* <div className="text-sm my-2 text-stone-500 font-bold">
                    Speak your mind...
                </div> */}
                {openPost && (
                    <div className="my-2">
                        <UserPopup user={getUser()} />
                    </div>
                )}
                <div className="flex" onClick={() => setOpenPost(true)}>
                    <textarea
                        onChange={(event) => handlePost(event.target.value)}
                        value={post}
                        className="bg-stone-100 rounded-l p-1 text-md w-full h-max-content"
                        placeholder="What's on your mind?"
                        rows={openPost ? 3 : 1}
                    />
                    <div className="error text-red-500">{error}</div>
                </div>
                {openPost && (
                    <div>
                        <div className="flex flex-wrap justify-between">
                            <div>
                                <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                    Upload Images
                                </label>
                                <UploadButton
                                    handlePhotoUpload={handleUploadPicture}
                                    selectedImage={selectedMediaFile}
                                />
                            </div>
                            <div className="p1">
                                <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                    Include Bounty
                                </label>
                                <div className="flex">
                                    <div className="relative shadow-sm p-1 bg-gradient-to-r from-orange-300 to-orange-600 rounded-full">
                                        <input
                                            className="inline-flex items-center bg-stone-100 px-5 py-1.5 pr-12 rounded-full w-40"
                                            placeholder="0.00"
                                            onChange={(e) =>
                                                handleBounty(e.target.value)
                                            }
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-stone-600">
                                            MATIC
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {props.tags && (
                                <div>
                                    <div className="text-sm my-2 text-stone-500 font-bold">
                                        Add Tags
                                    </div>
                                    <div className="overflow-scroll flex space-x-2">
                                        {props.tags.map((tag: string) => {
                                            if (selectedTags.includes(tag)) {
                                                return (
                                                    <strong
                                                        onClick={() =>
                                                            handleTags(tag)
                                                        }
                                                        className="cursor-pointer border text-white bg-orange-500 border-current uppercase px-5 py-1.5 rounded-full text-sm tracking-wide"
                                                    >
                                                        {tag}
                                                    </strong>
                                                );
                                            } else {
                                                return (
                                                    <strong
                                                        onClick={() =>
                                                            handleTags(tag)
                                                        }
                                                        className="cursor-pointer border text-orange-500 border-current uppercase px-5 py-1.5 rounded-full text-sm tracking-wide"
                                                    >
                                                        {tag}
                                                    </strong>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex w-full justify-center p-2 space-x-4 mt-5">
                            {" "}
                            <button
                                className="text-sm text-stone-600 hover:text-stone-400"
                                onClick={() => setOpenPost(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={`btn-primary rounded-lg text-sm flex items-center justify-center ${
                                    submitting && "cursor-not-allowed"
                                }`}
                                onClick={
                                    post
                                        ? () =>
                                              !submitting && handlePostSubmit()
                                        : () =>
                                              handleError(
                                                  "Can't submit an empty post"
                                              )
                                }
                            >
                                {submitting ? (
                                    <svg
                                        role="status"
                                        className="w-5 h-5 mx-3 my-0 text-stone-200 animate-spin dark:text-stone-200 fill-morange"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                ) : (
                                    <>Submit</>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
