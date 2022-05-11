import { Editor, EditorState, RichUtils } from "draft-js";
import 'draft-js/dist/Draft.css';
import { getDatabase, push, ref } from "firebase/database";
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../context/authContext";

// component for
function Write() {
    const [submitting, setSubmitting] = useState(false);
    const [titleState, setTitleState] = useState(() =>
        EditorState.createEmpty()
    );
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const {getUser, getWallet} = useAuth();
    const db = getDatabase();

    const handlePublish = () => {
        // needs to add new article to both the new posts as well as author's posts
        console.log("publish clicked")
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
        const text = editorState.getCurrentContent().getPlainText("\u0001")
        const title = titleState.getCurrentContent().getPlainText("\u0001")
        const newPost = {
            title: title,
            posted: formatted_date,
            text: text,
            author: author,
            comments: [],
        };
        push(ref(db, `${getUser().uid}/posts`), newPost)
            .then((x) => {
                console.log("post submitted", x)
                setSubmitting(false);
            })
            .catch((error) => {
                console.log("error: ", error);
                setSubmitting(false);
            });
    }
    const handleSave = () => {
        // let's not do this for now
        console.log("save clicked")
    }
    useEffect(() => {
        console.log(titleState);
    }, [titleState]);

    return (
        <div className="w-full flex items-center justify-center">
            <div className="lg:w-[768px] md:w-[540px] w-full h-full">
                <TopBar handlePublish={handlePublish} handleSave={handleSave} />
                <TitleInput
                    titleState={titleState}
                    setTitleState={setTitleState}
                />
                <MainEditor
                    editorState={editorState}
                    setEditorState={setEditorState}
                />
            </div>
        </div>
    );
}

function TopBar(props: any) {
    return (
        <div className="flex content-between flex-row-reverse mt-10 space-x-3">
                <button className="button-primary mx-2" onClick={props.handlePublish}> publish</button>
                <button className="button-ghost mx-2" onClick={props.handleSave}> save draft</button>
        </div>
    );
}

function TitleInput(props: any) {
    const editor = useRef<any>(null);
    function focusEditor() {
        editor.current && editor.current.focus();
    }
    return (
        <div className="text-2xl font-bold mb-4" onClick={focusEditor}>
            <Editor
                ref={editor}
                editorState={props.titleState}
                onChange={props.setTitleState}
                placeholder="What's your title?"
            />
        </div>
    );
}

function MainEditor(props: any) {
    const editor = useRef<any>(null);
    function focusEditor() {
        editor.current && editor.current.focus();
    }
    useEffect(() => {
        console.log(
            props.editorState.getCurrentContent().getPlainText("\u0001")
        );
    }, [props.editorState]);

    return (
        <div onClick={focusEditor}>
            <Editor
                ref={editor}
                editorState={props.editorState}
                onChange={props.setEditorState}
                placeholder="Write something!"
            />
        </div>
    );
}

export default Write;
