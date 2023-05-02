import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/authContext";
import UserPopup from "../social/userPopup";

function Transfer(props: any) {
    const [error, setError] = useState("");
    const [wallet, setWallet] = useState(false);
    const { sendTransaction, getNetwork } = useAuth();
    const { getUser, getWallet, connectWallet } = useAuth();

    useEffect(() => {
        // 0x13881 is the chainid for the polygon mumbai testnet
        if (getWallet()) {
            setWallet(true);
            if (getNetwork() !== "0x13881") {
                setError("Change network to Polygon Mumbai to purchase");
            }
        }
    }, []);

    const connectWalletHandler = async () => {
        connectWallet().catch((err: Error) => {
            setError(err.message);
        });
    };

    const handleTransfer = () => {
        console.log("transfer");
        sendTransaction(props.to.walletAddr, props.amount).then(() => {
            // temp frontend only validation of tx,
            // TODO: validate in backend e.g.: https://ethereum.stackexchange.com/questions/91274/verify-a-metamask-transaction-has-happened-on-nodejs
            props.handleSuccess();
        });
    };
    return (
        <div className="card">
            <div className="flex space-x-5 items-center">
                <div>
                    <label className="block uppercase tracking-wide text-stone-600 text-sm font-bold mb-1">
                        From
                    </label>
                    {wallet ? (
                        <UserPopup user={getUser()} />
                    ) : (
                        <button
                            className="btn-ghost"
                            onClick={() => connectWalletHandler()}
                        >
                            Connect Metamask Wallet
                        </button>
                    )}
                </div>
                <div>
                    <label className="block uppercase tracking-wide text-stone-600 text-sm font-bold mb-1">
                        To
                    </label>
                    <UserPopup user={props.to} />
                </div>
            </div>
            {props.note && (
                <div className="mt-2 p-2 bg-stone-200 rounded">
                    <label className="block uppercase tracking-wide text-stone-600 text-sm font-bold mb-1">
                        Note
                    </label>
                    {props.note}
                </div>
            )}
            <div className="flex space-x-5 justify-between items-center mt-4">
                <div className="">
                    <label className="block uppercase tracking-wide text-stone-600 text-sm font-bold mb-1">
                        Amount
                    </label>
                    {props.amount} ETH
                </div>
                <div className="flex space-x-4 items-center">
                    <button
                        className={`${
                            error || !wallet ? "btn-primary" : "btn-primary"
                        }`}
                        onClick={handleTransfer}
                    >
                        Transfer
                    </button>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-stone-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
            </div>
            {error && <div className="mt-4 message-error">Error: {error}</div>}
            {/* {success && (
                        <div className="message-success">{success}</div>
                    )} */}
            {/* <div>transfer network: {props.network}</div> */}
        </div>
    );
}

export default Transfer;
