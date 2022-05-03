import { useState } from "react";

function UserPopup(props: any) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
    };
    return (
        <div>
            {open && <Popup handleOpen={handleOpen} user={props.user} />}
            <div
                className="cursor-pointer flex items-center"
                onClick={handleOpen}
            >
                <img
                    className="object-cover w-6 h-6 rounded-full mr-2.5"
                    src={
                        props.user.photoURL
                            ? props.user.photoURL
                            : "https://www.hyperui.dev/photos/man-4.jpeg"
                    }
                    alt="profile pic"
                />

                <span className="">
                    <b> {props.user.displayName}</b>{" "}
                </span>
            </div>
        </div>
    );
}

function Popup(props: any) {
    return (
        <div
            className="fixed left-0 top-0 h-full w-full bg-stone-300 bg-opacity-30"
            onClick={() => props.handleOpen()}
        >
            <div className="fixed top-1/3 left-1/3 bg-stone-200 rounded p-8 shadow-lg">
                <button className="absolute p-1 bg-gray-100 border border-gray-300 rounded-full -top-1 -right-1">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
                <div className="flex items-center mx-10">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="grid grid-cols-3 gap-4 justify-evenly">
                            <div className="flex flex-col items-center">
                                <div className="text-3xl font-bold">3</div>{" "}
                                Posts
                            </div>
                            <img
                                className="h-48 w-48 object-cover bg-mblue -mt-20 p-1 rounded-lg shadow-md"
                                src={
                                    props.user.photoURL
                                        ? props.user.photoURL
                                        : "https://www.hyperui.dev/photos/man-4.jpeg"
                                }
                                alt="profile pic"
                            />
                            <div className="flex flex-col items-center">
                                <div className="text-3xl font-bold">
                                    34.2 MATIC
                                </div>
                                Paid to bounties
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-between space-y-3">
                            <div className="text-xl font-bold block">
                                {props.user.displayName}
                            </div>
                            {props.user.walletAddr && (
                                <div className="flex items-center space-x-3">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                        Wallet Address
                                    </label>
                                    <div className="flex flex-col space-y-1">
                                        <div className="text-md wallet">
                                            {props.user.walletAddr}
                                        </div>
                                        <a
                                            href={`https://mumbai.polygonscan.com/address/${props.user.walletAddr}`}
                                            target="__blank"
                                            className="button-ghost"
                                        >
                                            View on Polygonscan
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserPopup;
