import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { getDatabase, push, ref, set } from "firebase/database";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";

// component for
function Write(props: any) {
    const [submitting, setSubmitting] = useState(false);
    const [input, setInput] = useState("");
    const [guideId, setGuideId] = useState("");
    const { guide_id } = useParams();
    const [title, setTitle] = useState("");
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const { getUser, getWallet } = useAuth();
    const db = getDatabase();
    const navigate = useNavigate();

    useEffect(() => {
        if (props.title) {
        }
        if (props.md_text) {
            setInput(props.md_text);
        }
    }, []);

    const handlePublish = () => {
        // needs to add new article to both the new posts as well as author's posts
        console.log("publish clicked");
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
        const newPost = {
            title: title,
            posted: formatted_date,
            md_text: input,
            author: author,
            comments: [],
        };
        set(ref(db, `/guides/${guideId}`), newPost)
            .then((x) => {
                console.log("post submitted", x);
                setSubmitting(false);
                navigate(`/guides/${guideId}`);
            })
            .catch((error) => {
                console.log("error: ", error);
                setSubmitting(false);
            });
    };
    const handleSave = () => {
        // let's not do this for now
        console.log("save clicked");
    };

    return (
        <div className="w-full flex items-center justify-center">
            <div className="lg:w-[768px] md:w-[540px] w-full h-full">
                <TopBar
                    handlePublish={handlePublish}
                    handleSave={handleSave}
                    setGuideId={setGuideId}
                    guideId={guideId}
                />
                <GuideEditor
                    title={title}
                    setTitle={setTitle}
                    input={input}
                    setInput={setInput}
                />
            </div>
        </div>
    );
}

export function GuideEditor(props: any) {
    return (
        <div>
            <div className="flex justify-between">
                <div className="w-full">
                    <TitleInput title={props.title} setTitle={props.setTitle} />
                </div>
            </div>
            <TextEditor input={props.input} setInput={props.setInput} />
        </div>
    );
}

function TopBar(props: any) {
    return (
        <div className="flex content-between flex-row-reverse mt-10 ">
            <div className="flex ml-2">
                <div className="bg-stone-200 p-2 rounded-l-lg text-stone-500 font-bold text-sm">
                    mogul.run/guides/
                </div>
                <input
                    id="id"
                    name="id"
                    className="w-full p-2  text-sm border-stone-200 rounded-r-lg shadow-sm"
                    placeholder="how-to-ski-moguls"
                    onChange={(e) => props.setGuideId(e.target.value)}
                />
            </div>
            <button
                className={`${
                    props.guideId.length > 0 ? "btn-primary" : "btn-disabled"
                } mx-2`}
                onClick={props.handlePublish}
            >
                {" "}
                publish
            </button>
            {/* <button className="btn-ghost mx-2" onClick={props.handleSave}>
                {" "}
                save draft
            </button> */}
        </div>
    );
}

function TitleInput(props: any) {
    return (
        <div className="text-2xl font-bold mb-4 script">
            <input
                onChange={(e) => props.setTitle(e.target.value)}
                value={props.title}
                placeholder="What's your title?"
                className="bg-stone-100 py-1 rounded focus:outline-none script w-full"
            />
        </div>
    );
}

export function TextEditor(props: any) {
    return (
        <div className="grid grid-cols-2 gap-4 script">
            <div className="">
                <textarea
                    className="bg-stone-100 rounded focus:outline-none"
                    value={props.input}
                    placeholder="Write something!"
                    cols={40}
                    rows={30}
                    onChange={(e) => props.setInput(e.target.value)}
                />
            </div>
            <div>
                <ReactMarkdown>{props.input}</ReactMarkdown>
            </div>
        </div>
    );
}

export default Write;
