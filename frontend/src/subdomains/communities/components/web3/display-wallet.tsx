import { useAuth } from "../../../../context/authContext";

function DisplayWallet(props: any) {
    const { getWallet, connectWallet } = useAuth();
    return (
        <div>
            {getWallet() ? (
                <div className="">
                    <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                        Wallet Address
                    </label>
                    <div
                        className="bg-stone-300 text-stone-500 hover:bg-stone-200 rounded px-4 py-2 my-2 leading-tight"
                        id="grid-first-name"
                        // className="w-full p-4 pr-12 text-sm border-stone-200 rounded-l-lg shadow-sm"
                    >
                        {props.short
                            ? getWallet().substring(0, 6) + "..."
                            : getWallet()}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col">
                    <label className="opacity-0 block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                        Wallet Address
                    </label>
                    <button
                        className="btn-ghost p-4"
                        onClick={() => connectWallet()}
                    >
                        Connect Metamask Wallet
                    </button>
                </div>
            )}
        </div>
    );
}

export default DisplayWallet;
