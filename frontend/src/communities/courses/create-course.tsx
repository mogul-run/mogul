import { EditorState } from "draft-js";
import { get, getDatabase, push, ref, set } from "firebase/database";
import {
    getDownloadURL,
    getStorage,
    ref as storageRef,
    uploadBytes,
} from "firebase/storage";
import { ChangeEvent, useState } from "react";
import UploadButton from "../components/upload-button";
import { useAuth } from "../../context/authContext";
import { TextEditor } from "../guides/write";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import DisplayWallet from "../components/web3/display-wallet";
import { Navigate, useNavigate } from "react-router-dom";

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

interface CourseValues {
    title: string;
    hook: string;
    id: string;
    location: string;
    date: string;
    duration: string;
    desc: string;
    seat_price: number;
    num_seats: number;
}

const CourseSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    id: Yup.string()
        .min(2, "Too Short!")
        .max(50, "Too Long!")
        .required("Required"),
    hook: Yup.string()
        .min(2, "Too Short!")
        .max(200, "Too Long!")
        .required("Required"),
    location: Yup.string().max(50, "Too Long!").required("Required"),
    date: Yup.date().required("Required"),
    seat_price: Yup.number().min(0.0005).required("Required"),
    num_seats: Yup.number().min(1).required("Required"),
});

function CreateCourse() {
    // state for event attributes
    const [files, setFiles] = useState<FileList | null>(null);
    const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
    const [descState, setDescState] = useState(() => EditorState.createEmpty());

    const [error, setError] = useState("");
    const { getUser, getWallet } = useAuth();
    const db = getDatabase();
    const navigate = useNavigate();

    // const idValidator = (id: string) => {
    //     get(ref(db, `/event/${id}`)).then((snapshot) => {
    //         if (snapshot.exists()) {
    //             // .reverse() to display posts with most recent on top
    //             return "error";
    //             // setPosts(snapshot.val());
    //         }
    //     });
    // };
    const handleCoverPhoto = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("profile upload");
        if (event.target.files) {
            setCoverPhoto(event.target.files[0]);
        }
    };

    const handleMultiplePhotos = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("profile upload");
        if (event.target.files) {
            setFiles(event.target.files);
        }
    };

    const handleEventSubmit = async (values: CourseValues) => {
        // should add post to user's list of posts as well as global list of posts
        // for now we'll just add to the global list of posts
        const date = new Date(Date.now()).toString();
        const formatted_date = date.split(" GMT")[0];
        const author = {
            displayName: getUser().displayName,
            walletAddr: getWallet(),
            uid: getUser().uid,
            photoURL: getUser().photoURL,
        };

        let media_urls: string[] = [];
        let cover_url: string;
        if (files !== null) {
            const storage = getStorage();
            const postImageRef = storageRef(
                storage,
                `user/${getUser().uid}/course_img/${formatted_date
                    .split(" ")
                    .join("-")}`
            );
            // list of urls user uploaded
            for (let i = 0; i < files.length; i++) {
                await uploadBytes(postImageRef, files[i])
                    .then((snapshot) => {
                        return getDownloadURL(snapshot.ref);
                    })
                    .then((url) => {
                        media_urls.push(url);
                    });
            }
            console.log(media_urls);
        }
        let new_event = {
            ...values,
            author: author,
            media: media_urls,
        };

        set(ref(db, `course/${new_event.id}`), new_event)
            .then((x) => {
                navigate(`/course/${new_event.id}`);
            })
            .catch((error) => {
                console.log("error: ", error);
                setError(error.value());
            });
    };

    return (
        <div className="flex flex-col sidebar-content">
            <Formik
                initialValues={{
                    title: "",
                    id: "",
                    hook: "",
                    location: "",
                    date: "",
                    duration: "",
                    desc: "",
                    seat_price: 0,
                    num_seats: 0,
                }}
                validationSchema={CourseSchema}
                onSubmit={(
                    values: CourseValues,
                    { setSubmitting }: FormikHelpers<CourseValues>
                ) => {
                    setTimeout(() => {
                        console.log("submitting event formik");
                        handleEventSubmit(values).then(() =>
                            setSubmitting(false)
                        );
                        // alert(JSON.stringify(values, null, 2));
                    }, 500);
                }}
            >
                {({ errors, touched, isValid, isSubmitting }) => (
                    <Form>
                        <div className="space-y-4">
                            <div className="text-2xl font-bold">
                                Create Course 
                            </div>
                            <div className="grid grid-cols-3 items-start gap-4 border-b pb-5">
                                <div className="col-span-2 flex flex-col space-y-4">
                                    <div className="flex flex-col w-full h-20 justify-start">
                                        <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                            Title
                                        </label>
                                        <Field
                                            id="title"
                                            name="title"
                                            className="w-full p-4  text-sm border-gray-200 rounded-lg shadow-sm"
                                            placeholder="Baking Bread with Country Loaf Carrie"
                                        />
                                        {errors.title && touched.title ? (
                                            <div className="text-xs text-red-500 mt-1">
                                                {errors.title}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col w-full h-20 justify-start">
                                        <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                            url
                                        </label>
                                        <div className="flex items-center">
                                            <div className="bg-stone-200 p-4 rounded-l-lg text-stone-500 font-bold text-sm">
                                                mogul.run/course/
                                            </div>
                                            <Field
                                                id="id"
                                                name="id"
                                                className="w-full p-4  text-sm border-stone-200 rounded-r-lg shadow-sm"
                                                placeholder="country-loaf-bake"
                                            />
                                        </div>
                                        {errors.id && touched.id ? (
                                            <div className="text-xs text-red-500 mt-1">
                                                {errors.id}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col w-full h-20 justify-start">
                                        <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                            Hook
                                        </label>
                                        <Field
                                            id="hook"
                                            name="hook"
                                            className="w-full p-4  text-sm border-gray-200 rounded-lg shadow-sm"
                                            placeholder="You ever want to learn how to base jump? Me neither. Let's just bake some bread"
                                        />
                                        {errors.hook && touched.hook ? (
                                            <div className="text-xs text-red-500 mt-1">
                                                {errors.hook}
                                            </div>
                                        ) : null}
                                    </div>
                                </div>
                                <div>
                                <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                   Cover Photo 
                                </label>
                                    <UploadButton
                                        handlePhotoUpload={handleCoverPhoto}
                                        selectedImage={coverPhoto}
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <div className="flex flex-col w-full">
                                    <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                        Location
                                    </label>
                                    <Field
                                        id="location"
                                        name="location"
                                        className="w-full p-4  text-sm border-gray-200 rounded-lg shadow-sm"
                                        placeholder="Fremont, CA"
                                    />
                                    {errors.location && touched.location ? (
                                        <div className="text-xs text-red-500 mt-1">
                                            {errors.location}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col w-full">
                                    <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                        Date
                                    </label>
                                    <div className="flex items-center">
                                        <Field
                                            id="date"
                                            name="date"
                                            className="w-full p-4  text-sm border-stone-200 rounded-lg shadow-sm"
                                            placeholder="6/9/2022"
                                        />
                                    </div>
                                    {errors.date && touched.date ? (
                                        <div className="text-xs text-red-500 mt-1">
                                            {errors.date}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col w-full h-24 justify-start">
                                    <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                        Duration
                                    </label>
                                    <div className="flex items-center">
                                        <Field
                                            id="duration"
                                            name="duration"
                                            className="w-full p-4  text-sm border-stone-200 rounded-lg shadow-sm"
                                            placeholder="60 minutes"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-3">
                                   Curriculum 
                                </label>
                                <div className="h-16">
                                    <Field
                                        id="curriculum"
                                        name="curriculum"
                                        className="w-full min-h-96 p-4  text-sm border-gray-200 rounded-lg shadow-sm"
                                        placeholder="What should your students expect?"
                                    />
                                </div>
                            </div>
                            <div className="flex space-x-4 items-center">
                                <div className="flex flex-col w-full h-28 justify-start">
                                    <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                        # of Seats
                                    </label>
                                    <Field
                                        id="num_seats"
                                        name="num_seats"
                                        className="w-full p-4  text-sm border-gray-200 rounded-lg shadow-sm"
                                        placeholder="420"
                                    />
                                    {errors.num_seats && touched.num_seats ? (
                                        <div className="text-xs text-red-500 mt-1">
                                            {errors.num_seats}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col w-full h-28 justify-start">
                                    <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                        Price per Seat
                                    </label>
                                    <div className="flex items-center">
                                        <Field
                                            name="seat_price"
                                            id="seat_price"
                                            className="w-full p-4  text-sm border-stone-200 rounded-l-lg shadow-sm"
                                            placeholder="0.42"
                                        />
                                        <div className="bg-sky-800 text-stone-100 font-bold p-4 text-sm rounded-r-lg">
                                            ETH
                                        </div>
                                    </div>
                                    {errors.seat_price && touched.seat_price ? (
                                        <div className="text-xs text-red-500 mt-1">
                                            {errors.seat_price}
                                        </div>
                                    ) : null}
                                </div>
                                <div className="flex flex-col h-28 justify-start">
                                    <DisplayWallet short />
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <div className="h-full">
                                    <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-3">
                                        Additional Media
                                    </label>
                                    <div className="h-20">
                                        <UploadButton
                                            handlePhotoUpload={
                                                handleMultiplePhotos
                                            }
                                            selectedImages={files}
                                            multiple={true}
                                        />
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <button
                                        className={`relative inline-flex items-center px-8 py-3 overflow-hidden ${
                                            touched.title &&
                                            isValid &&
                                            !isSubmitting
                                                ? "btn-submit"
                                                : "btn-disabled"
                                        } rounded group focus:outline-none focus:ring`}
                                        type="submit"
                                    >
                                        {isSubmitting ? (
                                            <span className="absolute right-0 mr-10 transition-transform translate-x-full">
                                                <svg
                                                    role="status"
                                                    className="w-5 h-5 mx-2 my-0 text-stone-200 animate-spin dark:text-stone-200 fill-amber-500"
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
                                            </span>
                                        ) : (
                                            <span className="absolute right-0 transition-transform translate-x-full group-hover:-translate-x-4">
                                                <svg
                                                    className="w-5 h-5"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                                    />
                                                </svg>
                                            </span>
                                        )}

                                        <span
                                            className={`text-sm font-medium transition-all mx-2 ${
                                                !isSubmitting
                                                    ? "group-hover:mr-4"
                                                    : "-translate-x-3"
                                            }`}
                                        >
                                            Create
                                        </span>
                                    </button>
                                </div>
                                {error && <div>{error}</div>}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default CreateCourse;
