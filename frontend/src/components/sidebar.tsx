import { useAuth } from "../context/authContext";
import { User } from "./navbar";

function Sidebar() {
    const { getUser } = useAuth();
    return (
        <div className="w-60 h-full shadow-inner bg-stone-200 absolute">
            <div className="flex flex-col h-full justify-between items-start">
                <div className="flex flex-col space-y-3">
                    <div className="pt-4 pb-2 pr-2">
                        <User />
                    </div>
                    <div className="pt-10 space-y-6">
                        <div>
                            <div className="sidebar-link">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 p-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    />
                                </svg>
                                <div className="ml-2">Home</div>
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
                        </div>
                        <div className="">
                            <label className="block uppercase tracking-wide text-gray-600 text-xs font-bold mb-2 ml-2">
                                My Groups
                            </label>
                            <div className="sidebar-link">Sender Central</div>
                            <div className="sidebar-link">Sender Central</div>
                        </div>
                    </div>
                </div>
                <div className="text-center bottom-0">
                    <p className="py-2 text-sm text-gray-700">
                        tailwind-elements.com
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
