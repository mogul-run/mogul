import { Editor, EditorState, RichUtils } from "draft-js";
import { useCallback, useEffect, useRef, useState } from "react";
import { setSyntheticLeadingComments } from "typescript";

// component for
function Write() {
    const [titleState, setTitleState] = useState(() =>
        EditorState.createEmpty()
    );
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const handlePublish = () => {
        console.log("publish clicked")
    }
    const handleSave = () => {
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
