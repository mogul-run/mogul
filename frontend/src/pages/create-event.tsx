import { EditorState } from "draft-js";
import { getDatabase, push, ref } from "firebase/database";
import {
    getDownloadURL,
    getStorage,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";
import { ChangeEvent, useState } from "react";
import UploadButton from "../components/upload-button";
import { useAuth } from "../context/authContext";
import { TextEditor } from "./write";
import { Formik, Field, Form, FormikHelpers } from "formik";

const sample_event = {
    emojis: "🧘‍♂🌲",
    title: "Coast Redwood Sunset Retreat",
    author: {
        photoURL:
            "https://firebasestorage.googleapis.com/v0/b/mogul-run.appspot.com/o/user%2FvlITP8crPWNU1jjE1TCosD6L20x2%2Fprofile_img?alt=media&token=481869b3-dfd6-4844-b917-0757ed8bc2c0",
        displayName: "Lucas Song",
        walletAddr: "0xCe4E67E407aB231925DF614a5e72687fD597324B",
    },
    location: "Fremont, CA",
    duration: "60 minutes",
    cover_url: "https://i.imgur.com/cov0ZJB.jpg",
    hook: "Take a retreat into the welcoming branches of an old Sequoia Sempervirens. Panoramic await you -- if you dare to climb.",
    desc: "Climb up a Redwood tree with panoramic views of beautiful Fremont. As the sun comes down, ",
    materials_list: [
        "Comfortable workout clothes",
        "Shoes you can climb a tree with",
        "Water",
        "Climbing harness",
    ],
    seat_price: "0.03",
    media: ["https://i.imgur.com/cov0ZJB.jpg", ""],
};

interface EventValues {
    title: string;
    hook: string;
    location: string;
    duration: string;
    desc: string;
    seat_price: number;
    num_seats: number;
}

function CreateEvent() {
    // state for event attributes
    const [files, setFiles] = useState<FileList | null>(null);
    const [descState, setDescState] = useState(() => EditorState.createEmpty());

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const { getUser, getWallet } = useAuth();
    const db = getDatabase();

    const handleMultiplePhotos = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("profile upload");
        if (event.target.files) {
            setFiles(event.target.files);
        }
    };

    // const handleEventSubmit = async () => {
    //     // should add post to user's list of posts as well as global list of posts
    //     // for now we'll just add to the global list of posts
    //     setSubmitting(true);
    //     const date = new Date(Date.now()).toString();
    //     const formatted_date = date.split(" GMT")[0];
    //     const author = {
    //         displayName: getUser().displayName,
    //         walletAddr: getWallet(),
    //         uid: getUser().uid,
    //         photoURL: getUser().photoURL,
    //     };
    //     const newEvent = {
    //         posted: formatted_date,
    //         author: author,
    //         title: title,
    //         id: id,
    //         hook: hook,
    //     };
    //     if (files !== null) {
    //         const storage = getStorage();
    //         const postImageRef = storageRef(
    //             storage,
    //             `user/${getUser().uid}/post_images/${formatted_date
    //                 .split(" ")
    //                 .join("-")}`
    //         );
    //         // list of urls user uploaded
    //         let media_urls = [];
    //         for (let i = 0; i < files.length; i++) {
    //             await uploadBytes(postImageRef, files[i])
    //                 .then((snapshot) => {
    //                     return getDownloadURL(snapshot.ref);
    //                 })
    //                 .then((url) => {
    //                     media_urls.push(url);
    //                 });
    //         }
    //     }
    //     push(ref(db, `events/${id}`), newEvent)
    //         .then((x) => {
    //             setSubmitting(false);
    //         })
    //         .catch((error) => {
    //             console.log("error: ", error);
    //             setError(error.value());
    //             setSubmitting(false);
    //         });
    // };

    return (
        <div className="flex flex-col sidebar-content">
            <Formik
                initialValues={{
                    title: "",
                    hook: "",
                    location: "",
                    duration: "",
                    desc: "",
                    seat_price: 0,
                    num_seats: 0,
                }}
                onChange={(values: EventValues) => {
                    console.log(values);
                }}
                onSubmit={(
                    values: EventValues,
                    { setSubmitting }: FormikHelpers<EventValues>
                ) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 500);
                }}
            >
                <Form>
                    <div className="space-y-4">
                        <div className="text-2xl font-bold">Create Event</div>
                        <div className="flex space-x-4">
                            <div className="flex flex-col w-full">
                                <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                    Title
                                </label>
                                <Field
                                    id="title"
                                    name="title"
                                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                    placeholder="Baking Bread with Country Loaf Carrie"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                    url
                                </label>
                                <div className="flex items-center">
                                    <div className="bg-stone-200 p-4 rounded-l-lg">
                                        mogul.run/e/
                                    </div>
                                    <Field
                                        id="id"
                                        name="id"
                                        className="w-full p-4 pr-12 text-sm border-stone-200 rounded-r-lg shadow-sm"
                                        placeholder="country-loaf-bake"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                Hook
                            </label>
                            <Field
                                id="hook"
                                name="hook"
                                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="You ever want to learn how to base jump? Me neither. Let's just bake some bread"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex flex-col w-full">
                                <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                    Location
                                </label>
                                <Field
                                    id="location"
                                    name="location"
                                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                    placeholder="Fremont, CA"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                    Duration
                                </label>
                                <div className="flex items-center">
                                    <Field
                                        id="duration"
                                        name="duration"
                                        className="w-full p-4 pr-12 text-sm border-stone-200 rounded-lg shadow-sm"
                                        placeholder="60 minutes"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                    Date
                                </label>
                                <div className="flex items-center">
                                    <Field
                                        id="date"
                                        name="date"
                                        className="w-full p-4 pr-12 text-sm border-stone-200 rounded-lg shadow-sm"
                                        placeholder="6/9/2022"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-3">
                                Description
                            </label>
                            <div className="h-20">
                                <TextEditor
                                    editorState={descState}
                                    setEditorState={setDescState}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="flex flex-col w-full">
                                <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                    Number of Seats
                                </label>
                                <Field
                                    id="num_seats"
                                    name="num_seats"
                                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                    placeholder="420"
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                    Price per Seat
                                </label>
                                <div className="flex items-center">
                                    <Field
                                        name="seat_price"
                                        id="seat_price"
                                        className="w-full p-4 pr-12 text-sm border-stone-200 rounded-l-lg shadow-sm"
                                        placeholder="0.42"
                                    />
                                    <div className="bg-morange text-white p-4 rounded-r-lg">
                                        ETH
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-3">
                                Add Media
                            </label>
                            <div className="h-20">
                                <UploadButton
                                    multiple={true}
                                    handlePhotoUpload={handleMultiplePhotos}
                                />
                            </div>
                        </div>
                        <button type="submit" className="button-primary">
                            Submit
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default CreateEvent;
