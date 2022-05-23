import { useState } from "react";

function UserPopup(props: any) {
    const [open, setOpen] = useState(false);
    const handleOpen = (event: any) => {
        setOpen(true);
    };

    const handleClose = (event: any) => {
        if ("close-modal" === event.target.id) {
            setOpen(false);
        }
    };

    return (
        <div>
            {open && <Popup handleClose={handleClose} user={props.user} />}
            <div
                className="cursor-pointer flex items-center rounded-full hover:-rotate-2 -mx-2 px-2"
                onClick={(e) => handleOpen(e)}
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
            id="close-modal"
            onClick={(e) => props.handleClose(e)}
        >
            <div
                id="inside-modal"
                className="fixed top-1/3 left-1/2 transform -translate-x-1/2 bg-stone-200 rounded p-8 shadow-lg"
            >
                <button
                    onClick={(e) => props.handleClose(e)}
                    id="close-modal"
                    className="absolute p-1 bg-stone-100 border border-stone-300 rounded-full -top-1 -right-1"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        id="close-modal"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            id="close-modal"
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <div className="flex items-center mx-10">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="grid grid-cols-3 gap-4 justify-evenly">
                            <div className="flex flex-col items-center justify-center">
                                {/* <div className="text-3xl font-bold">3</div>{" "}
                                <div className="font-bold">Posts</div> */}
                            </div>
                            <img
                                className="h-48 w-48 object-cover bg-sky-600 -mt-20 p-1 rounded-lg shadow-md"
                                src={
                                    props.user.photoURL
                                        ? props.user.photoURL
                                        : "https://www.hyperui.dev/photos/man-4.jpeg"
                                }
                                alt="profile pic"
                            />
                            <div className="flex flex-col justify-center items-center">
                                {/* <div className="text-3xl font-bold">
                                    34.2 MATIC
                                </div>
                                <div className="font-bold">
                                    Paid to bounties
                                </div> */}
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-between space-y-3">
                            <div className="text-xl font-bold block">
                                {props.user.displayName}
                            </div>
                            {props.user.walletAddr && (
                                <div className="flex items-center space-x-3">
                                    <label className="block uppercase tracking-wide text-stone-700 text-xs font-bold mb-2">
                                        Wallet Address
                                    </label>
                                    <div className="flex flex-col space-y-1">
                                        <div className="text-md wallet">
                                            {props.user.walletAddr}
                                        </div>
                                        <a
                                            href={`https://mumbai.polygonscan.com/address/${props.user.walletAddr}`}
                                            target="__blank"
                                            className="btn-ghost"
                                            onClick={()=> console.log("clicked")}
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
