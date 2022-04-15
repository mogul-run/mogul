import { updateProfile } from "@firebase/auth";
import { useEffect, useState } from "react";

function AccountSettings(props: any) {
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
        const { ethereum } = window as any;
        if (!ethereum) {
            alert("please install metamask");
        } else {
            try {
                const accounts = await ethereum
                    .request({
                        method: "wallet_requestPermissions",
                        params: [
                            {
                                eth_accounts: {},
                            },
                        ],
                    })
                    .then(() =>
                        ethereum.request({ method: "eth_requestAccounts" })
                    );
                console.log("Received accounts", accounts);
                props.setWalletAddr(accounts[0]);
            } catch (err: any) {
                setError(err.message);
                console.log("Error while retrieving account address: ", err);
            }
        }
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
                    {props.walletAddr ? (
                        <div>
                            <div className="font-bold">
                                {" "}
                                Connected to address:
                            </div>
                            <div className="bg-gray-200 p-2 rounded">
                                {" "}
                                {props.walletAddr}{" "}
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
