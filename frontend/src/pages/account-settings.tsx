import { updateProfile } from "@firebase/auth";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";

function AccountSettings(props: any) {
    const { getWallet, connectWallet } = useAuth();
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const handleUsername = (username: string) => {
        setUsername(username);
    };

    const handleSubmit = () => {
        updateProfile(props.user, { displayName: username }).catch(
            (error: Error) => {
                console.log(error);
            }
        );
    };

    const connectWalletHandler = async () => {
        connectWallet().catch((err: Error) => {
            setError(err.message);
        });
    };

    return (
        <div className="m-4 w-90">
            <div className="flex flex-col items-center justify-center p-8 m-2 ">
                <div className="text-xl">Account Settings</div>
                <div className="my-4">
                    <input
                        className="user input rounded p-1 "
                        placeholder="Username"
                        onChange={(e) => handleUsername(e.target.value)}
                    ></input>
                </div>

                <div className="my-4">
                    {getWallet() ? (
                        <div>
                            <div className="font-bold">
                                {" "}
                                Connected to address:
                            </div>
                            <div className="bg-gray-200 p-2 rounded">
                                {" "}
                                {getWallet()}{" "}
                            </div>
                        </div>
                    ) : (
                        <button
                            className="button-ghost"
                            onClick={() => connectWalletHandler()}
                        >
                            Connect Metamask Wallet
                        </button>
                    )}
                </div>
                <button
                    className="button-primary"
                    onClick={() => handleSubmit()}
                >
                    Save Changes{" "}
                </button>
                <div className="error text-red-500 my-2">{error}</div>
            </div>
        </div>
    );
}

export default AccountSettings;
