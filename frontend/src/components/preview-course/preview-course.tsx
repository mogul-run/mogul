import { Link } from "react-router-dom";
import UserPopup from "../social/userPopup";

function CoursePreview(props: any) {
    return (
        <>
            {" "}
            <Link
                to={props.course.path}
                className="grid grid-cols-3 items-center bg-stone-100 shadow-md rounded p-3 "
            >
                <img
                    src={props.course.cover_url}
                    className="col-span-1 rounded w-40 h-40 object-cover"
                />
                <div className="col-span-2 text-stone-600">
                    <div className="text-2xl font-bold">
                        {props.course.title}
                    </div>
                    <div className="text-md">{props.course.hook}</div>
                    <div className="flex flex-wrap mt-6 w-full justify-between items-baseline space-y-3">
                        <div className="">
                            <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                hosted by
                            </label>
                            <UserPopup user={props.course.author} />
                        </div>
                        <div className="">
                            <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                location
                            </label>
                            {props.course.location}
                        </div>
                        <div className="">
                            {props.course.duration && (
                                <>
                                    {" "}
                                    <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                        duration
                                    </label>
                                    {props.course.duration}
                                </>
                            )}
                        </div>
                        <div>
                            {" "}
                            <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                Enrollment Type
                            </label>
                            <div className="flex  space-x-2">
                                <div className="outline text-sm rounded-full text-gray-500 px-2">
                                    In Person
                                </div>
                                <div className="outline text-sm rounded-full text-gray-500 px-2">
                                    Virtual
                                </div>
                                <div className="outline text-sm rounded-full text-gray-500 px-2">
                                    Asynchronous
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default CoursePreview;
