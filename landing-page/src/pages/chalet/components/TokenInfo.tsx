import { useEffect, useState } from "react";
import "../chalet.css";
import { useAuth } from "../../../context/authContext";

function TokenInfo() {
    return (
        <div className="flex flex-row  flex-wrap space-x-4 token-wrapper">
            <div className="m-2 token-blurb flex flex-col items-center content-center p-4 rounded outline">
                <div className="text-xl font-bold">$LUCAS Token Info</div>
                <a
                    href="https://mumbai.polygonscan.com/address/0x8531f05D2F69E2591Dac5dFcaBc53b614fc636b4"
                    target="__blank"
                >
                    View Token Contract
                </a>
            </div>
            <div className="token-sale m-2 divide-y outline-nopad">
                <TokenSale />
            </div>
        </div>
    );
}

function TokenSale() {
    const [numTokens, setNumTokens] = useState(0);
    const [cost, setCost] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // for each eth/matic in, you get 3000 lucastokens
    const PurchaseRatio = 3000;
    const NetworkToken = "MATIC";
    const ERC20Token = "LUCAS";
    const tokenSaleAddr = "0x7d38Bc69529690eF742F8C6141215C5e63516267";
    const { sendTransaction } = useAuth();

    const handleNumTokens = (value: number) => {
        setNumTokens(value);
    };

    useEffect(() => {
        setCost(numTokens / PurchaseRatio);
    }, [numTokens]);

    const handleTokenPurchase = () => {
        console.log(typeof(String(cost)))
        sendTransaction(tokenSaleAddr, String(cost))
            .then((resp: string) => {
                setSuccess(resp);
            })
            .catch((err: Error) => {
                setError(err.message);
            });

        // should we be doing the calculations here? or in the functions/ folder?
    };

    return (
        <div className="flex flex-col space-y-4">
            <div className="p-4 bg-gray-800 text-white">
                {" "}
                <div className="text-xl font-bold">Token Sale</div>
                <a
                    href={`https://mumbai.polygonscan.com/address/${tokenSaleAddr}`}
                    target="__blank"
                >
                    View Token Sale Contract on polygonscan
                </a>
            </div>
            <div className="token-sale-content">
                <div className="p-4 text-xl bg-gray-300">
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
                            onClick={() => handleTokenPurchase()}
                            className="button-primary"
                        >
                            {" "}
                            Purchase {numTokens} $LUCAS{" "}
                        </button>
                    </div>
                    <div className="font-bold">
                        Cost: {String(cost).substring(0, 8)} {NetworkToken} +
                        gas
                    </div>
                    <div className="text-red-500">{error && error}</div>
                    <div className="text-green-500">{success && success}</div>
                </div>
            </div>
        </div>
    );
}

export default TokenInfo;
