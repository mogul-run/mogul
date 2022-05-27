import { getDatabase, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Write, { GuideEditor } from "./write";
import { Guide } from "../../types/types";
import { useAuth } from "../../context/authContext";

function EditTopBar(props: any) {
    return (
        <div className="flex content-between flex-row-reverse mt-10 ">
            <div className="flex ml-2">
                <div className="bg-stone-200 p-2 rounded-l-lg text-stone-500 font-bold text-sm">
                    mogul.run/guides/
                </div>
                <div
                    id="id"
                    className="w-full p-2  text-sm border-stone-200 bg-amber-600 text-stone-100 items-center rounded-r-lg shadow-sm"
                >
                    {props.guideId}
                </div>
            </div>
            <button
                className={`${
                    props.guideId.length > 0 ? "btn-primary" : "btn-disabled"
                } mx-2`}
                onClick={props.handlePublish}
            >
                {" "}
                publish edits
            </button>
            {/* <button className="btn-ghost mx-2" onClick={props.handleSave}>
                {" "}
                save draft
            </button> */}
        </div>
    );
}

function GuideEdit() {
    const { guide_id } = useParams();
    const [guide, setGuide] = useState<Guide>();
    const [input, setInput] = useState("");
    const [guideId, setGuideId] = useState("");
    const [submitting, setSubmitting] = useState(false)
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const { getUser, getWallet } = useAuth();
    const db = getDatabase();
    const navigate = useNavigate();

    useEffect(() => {
        getGuide();
    }, []);

    useEffect(() => {
        if (guide) {
        setTitle(guide.title)
        setInput(guide.md_text);
        }
    }, [guide])

    const getGuide = () => {
        // setLoading(false);
        onValue(
            ref(db, `/guides/${guide_id}`),

            (snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());
                    setGuide(snapshot.val());
                    setLoading(false);
                }
                setLoading(false);
            },
            {
                onlyOnce: false,
            }
        );
    };

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
        set(ref(db, `guides/${guide_id}`), newPost)
            .then((x) => {
                console.log("post submitted", x);
                setSubmitting(false);
                navigate(`/guides/${guide_id}`);
            })
            .catch((error) => {
                console.log("error: ", error);
                setSubmitting(false);
            });

    }

    return (
        <div>
            {!loading && guide && (
                <div className="w-full flex items-center justify-center">
                    <div className="lg:w-[768px] md:w-[540px] w-full h-full">
                        <EditTopBar guideId={guide_id}  handlePublish={handlePublish}/>
                        <GuideEditor
                            title={title}
                            setTitle={setTitle}
                            input={input}
                            setInput={setInput}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default GuideEdit;
