import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { User } from "./navbar";
import UserPopup from "./userPopup";

function Sidebar(props: any) {
    const { getUser, signOut } = useAuth();
    return (
        <div className="w-60 h-full shadow-inner bg-stone-200 fixed">
            <div className="flex flex-col h-full justify-between items-start">
                <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-center">
                        <div className="p-2 m-2">
                            <UserPopup user={getUser()} />
                        </div>
                        <div
                            className="mr-2 cursor-pointer hover:bg-stone-300 rounded"
                            onClick={props.handleOpen}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 p-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="relative">
                            <input
                                className="h-8 m-1 px-2 pr-14 text-sm bg-stone-100 placeholder-stone-300 border-stone-200 rounded-lg focus:z-10"
                                placeholder="Search"
                                type="text"
                            />

                            <button
                                className="absolute inset-y-0 right-2 p-2 mr-px text-stone-400 rounded-r-lg"
                                type="submit"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        fillRule="evenodd"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                        <div>
                            <Link to="/" className="nostyle">
                                <div className="sidebar-link">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 p-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                        />
                                    </svg>
                                    <div className="ml-2">Home</div>
                                </div>
                            </Link>
                            <Link to="/questions" className="nostyle">
                                <div className="sidebar-link">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 p-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                                        />
                                    </svg>
                                    <div className="ml-2">Question Board</div>
                                </div>
                            </Link>
                            <div className="sidebar-link">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 p-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                    />
                                </svg>
                                <div className="ml-2">Alerts</div>
                            </div>
                            <div className="sidebar-link">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 p-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                    />
                                </svg>{" "}
                                <div className="ml-2">Saved</div>
                            </div>
                            <Link
                                to={`/${getUser().uid}/posts`}
                                className="nostyle"
                            >
                                <div className="sidebar-link">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 p-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                    <div className="ml-2">Your Posts</div>
                                </div>
                            </Link>
                        </div>
                        <div className="">
                            <label className="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-1 ml-2">
                                My Groups
                            </label>
                            <div className="cursor-not-allowed sidebar-link">
                                Sender Central
                            </div>
                        </div>
                        <div className="">
                            <label className="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-1 ml-2">
                                Events
                            </label>
                            <Link to="/e/create" className="sidebar-link">
                                <div className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 p-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                                <div className="ml-1">

                                Create Event
                                </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="text-center w-full">
                    <Link to="/write" className="nostyle">
                        <div className="sidebar-link">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 p-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                            <div className="ml-2">Create Entry</div>
                        </div>
                    </Link>
                    <Link to="/settings" className="nostyle">
                        <div className="sidebar-link">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 p-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                            <div className="ml-2">Settings</div>
                        </div>
                    </Link>
                    <div className="sidebar-link" onClick={signOut}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 p-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        <div className="ml-2">Logout</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
