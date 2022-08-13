import { useEffect, useState } from "react";
import { useAuth } from "../../../context/authContext";
import Carrots  from "../../../img/carrots.png";

function TokenInfo(props: any) {
    return (
        <div className="grid md:grid-cols-3 md:grid-rows-3 md:grid-flow-row-dense gap-2 justify-around">
            <div className="col-span-2 row-span-2 token-sale divide-y outline-nopad">
                <TokenSale setPurchased={props.setPurchased} />
            </div>
            <div className="col-span-1 token-blurb flex flex-col items-center content-center p-4 rounded outline">
                <div className="text-xl font-bold">Where's $LUCAS?</div>
                <a
                    href="https://mumbai.polygonscan.com/address/0x622D77bF93ef6f33aFa895789318615878754f4f"
                    target="__blank"
                >
                    View Token Contract
                </a>
            </div>
            <div className="token-blurb col-span-1">

            <AddToken/>
            </div>
        </div>
    );
}

function AddToken(props: any) {
    async function handleAddToken() {
        const tokenAddress = "0x622D77bF93ef6f33aFa895789318615878754f4f";
        const tokenSymbol = "LUCAS";
        const tokenDecimals = 18;
        const tokenImage = "http://assets.stickpng.com/images/58e8fce5eb97430e819064b9.png";
        const {ethereum} = window as any;

        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await ethereum.request({
                method: "wallet_watchAsset",
                params: {
                    type: "ERC20", // Initially only supports ERC20, but eventually more!
                    options: {
                        address: tokenAddress, // The address that the token is at.
                        symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                        decimals: tokenDecimals, // The number of decimals in the token
                        image: tokenImage, // A string url of the token logo
                    },
                },
            });

            if (wasAdded) {
                console.log("Token Added");
            } else {
                console.log("Token not added");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="outline p-4 flex flex-col items-center space-y-4">
            <div className="text-lg font-bold">
                Add $LUCAS to your Wallet
            </div>
            <button className="btn-primary" onClick={() => handleAddToken()}>Add $LUCAS</button>
        </div>
    );
}

export function TokenSale(props: any) {
    const [numTokens, setNumTokens] = useState(0);
    const [cost, setCost] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // for each eth/matic in, you get 3000 lucastokens
    const PurchaseRatio = 3000;
    const NetworkToken = "MATIC";
    const ERC20Token = "LUCAS";
    const tokenSaleAddr = "0x7d38Bc69529690eF742F8C6141215C5e63516267";
    const { sendTransaction, getNetwork } = useAuth();
    const canBuy = getNetwork() === "0x13881" && numTokens > 0;

    const handleNumTokens = (value: number) => {
        setNumTokens(value);
    };

    useEffect(() => {
        // 0x13881 is the chainid for the polygon mumbai testnet
        if (getNetwork() !== "0x13881") {
            setError("Change network to Polygon Mumbai to purchase");
        }
    }, []);

    useEffect(() => {
        setCost(numTokens / PurchaseRatio);
    }, [numTokens]);

    const handleTokenPurchase = () => {
        if (numTokens > 0) {
            sendTransaction(tokenSaleAddr, String(cost))
                .then((resp: any) => {
                    setError("");
                    console.log(resp);
                    setSuccess(
                        "Transaction sent successfully! You're token balance should update once the transaction is confirmed."
                    );
                    props.setPurchased(true);
                })
                .catch((err: Error) => {
                    setError(err.message);
                });
        } else {
            setError("Token quantity must be more than zero");
        }

        // should we be doing the calculations here? or in the functions/ folder?
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="rounded-t-md p-4 bg-gray-800 text-white">
                {" "}
                <div className="text-xl font-bold">Token Sale</div>
                <a
                    href={`https://mumbai.polygonscan.com/address/${tokenSaleAddr}`}
                    target="__blank"
                >
                    View Token Sale Contract
                </a>
            </div>
            <div className="token-sale-content">
                <div className="p-4 text-xl bg-gray-300 ">
                    <input
                        className="w-20 rounded-lg p-2"
                        placeholder={String(numTokens)}
                        onChange={(e) =>
                            handleNumTokens(Number(e.target.value))
                        }
                    />{" "}
                    <span className="ticker">${ERC20Token}</span>
                </div>
                <div className="p-4 space-y-2 flex flex-col w-100 items-center">
                    <div>
                        <button
                            onClick={() => canBuy && handleTokenPurchase()}
                            className={`${
                                canBuy ? "btn-primary" : "btn-primary"
                            } `}
                        >
                            {" "}
                            Purchase {numTokens} $LUCAS{" "}
                        </button>
                    </div>
                    <div className="font-bold">
                        Cost: {String(cost).substring(0, 8)} {NetworkToken} +
                        gas
                    </div>
                    {error && (
                        <div className="message-error">Error: {error}</div>
                    )}
                    {success && (
                        <div className="message-success">{success}</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TokenInfo;
