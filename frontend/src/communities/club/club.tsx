import { useEffect, useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Marketplace from "./components/Marketplace";
import TokenInfo from "./components/TokenInfo";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Carrots from "../../img/carrots.png";
import { User } from "../components/auth/current-user";
import UserPopup from "../components/social/userPopup";

const tabs = [
    {
        name: "Home",
        url: "home",
    },
    {
        name: "Marketplace",
        url: "marketplace",
    },
    {
        name: "Token Info",
        url: "token-info",
    },
    {
        name: "About",
        url: "about",
    },
];

const exampleChalet = {
    name: "The House of Bob",
    id: "40404",
    tokenAddr: "0x622D77bF93ef6f33aFa895789318615878754f4f",
    owner: {
        displayName: "lucasxsong",
        photoURL: "https://i.imgur.com/rWcSsf0.jpg",
    },
    tokenTicker: "$LUCAS",
    holdingRequirement: 150,
};

// will create chalet page for mogul.run/c/[creator]
// for now, we are hard coding for /c/lucas
function Chalet(props: any) {
    const [expand, setExpand] = useState(false);
    const [ERC20Bal, setERC20Bal] = useState("");
    const [ETHBal, setETHBal] = useState("");
    const [userAllowed, setUserAllowed] = useState(false);
    const [purchased, setPurchased] = useState(false);

    const { getWallet, getUser, getERC20Balance, getETHBalance } = useAuth();
    const { subpage_id, house_id } = useParams();
    console.log(subpage_id);

    useEffect(() => {
        getERC20Balance(exampleChalet.tokenAddr).then((resp: string) => {
            setERC20Bal(resp);
            if (Number(resp) >= exampleChalet.holdingRequirement && getUser()) {
                setUserAllowed(true);
            }
        });
        getETHBalance(exampleChalet.tokenAddr).then((resp: string) => {
            setETHBal(resp);
        });
        setPurchased(false);
    }, [purchased]);

    return (
        <div className="flex flex-col items-center chalet-wrapper">
            <div className="w-full flex flex-col items-center justify-between bg-stone-200">
                <div className="flex content-container justify-center items-center pt-3">
                    {/* <div className="text-xl font-bold">Lucas</div> */}
                    <div className="flex flex-row-reverse">
                        <div className="auth-button">
                            {" "}
                            {getUser() ? (
                                <div className="flex flex-col text-right items-end space-y-4">
                                    <div className="space-y-1 flex flex-col">
                                        <div className="token-balances flex flex-col items-end">
                                            <div className="font-bold">
                                                Balances{" "}
                                            </div>
                                            <div
                                                className={`ticker my-1 text-sm text-white ${
                                                    Number(ERC20Bal) >=
                                                    exampleChalet.holdingRequirement
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            >
                                                {ERC20Bal}{" "}
                                                {exampleChalet.tokenTicker}
                                            </div>
                                            <div className="ticker text-sm my-1">
                                                {ETHBal} $ETH
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className=""></div>
                            )}
                        </div>
                        <div className="flex flex-col md:flex-row space-x-4">
                            {" "}
                            <div className="flex flex-col items-start justify-center">
                                <img
                                    className="w-32 h-32 object-cover rounded-full"
                                    src={"https://i.imgur.com/c5bDFvw.jpg"}
                                ></img>
                            </div>
                            <div className="chalet-header flex flex-col items-start justify-center">
                                <div>
                                    <div className="text-2xl font-bold uppercase tracking-wider text-gray-900">
                                        {exampleChalet.name}
                                    </div>
                                    <UserPopup user={exampleChalet.owner} />
                                </div>
                            </div>
                            {expand ? (
                                <div className="flex items-between">
                                    <div className="flex flex-col space-x-1 token-info">
                                        <div className="flex justify-center message-primary items-center space-x-2 my-1">
                                            <div>💸 Transact with:</div>
                                            <div className="ticker-primary">
                                                {exampleChalet.tokenTicker}
                                            </div>
                                            <div className="ticker-primary ">
                                                $ETH
                                            </div>
                                        </div>
                                        <div className="flex justify-center message-primary items-center space-x-2 my-1 bold">
                                            <div>🔑 Holding Requirement: </div>
                                            <div className="ticker-primary">
                                                {
                                                    exampleChalet.holdingRequirement
                                                }{" "}
                                                {exampleChalet.tokenTicker}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="my-1 text-md chalet-bio">
                                        One part bumsport history class, one
                                        part outdoor training camp, one part
                                        guidebook to California's most wonderful
                                        spots, and whatever else you can fit
                                        into the mixing bowl makes The House of
                                        B.O.B!
                                    </div>
                                </div>
                            ) : (
                                <div onClick={() => setExpand(!expand)}>
                                    {/* expand */}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full border-b-2">
                    <div className="tabs-list flex justify-center">
                        {tabs.map((tab, id) => {
                            return (
                                <Link to={`/house/${house_id}/${tab.url}`}>
                                    {" "}
                                    <div
                                        className={`tab-button cursor-pointer ${
                                            tab.url === subpage_id
                                                ? "text-sky-700 border-b-4 border-b-sky-700"
                                                : "text-gray-500"
                                        } hover:bg-stone-300 rounded text-lg font-bold px-3 py-3`}
                                        key={id}
                                        onClick={() => tab.url}
                                    >
                                        {tab.name}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center p-3 m-4">
                <div className="w-full md:w-[768px] flex flex-col items-start">
                    <ChaletContent
                        ERC20Bal={ERC20Bal}
                        holdingRequirement={exampleChalet.holdingRequirement}
                        userAllowed={userAllowed}
                        setPurchased={setPurchased}
                        chaletId={exampleChalet.id}
                    />
                </div>
            </div>
        </div>
    );
}

function ChaletContent(props: any) {
    const { subpage_id, house_id } = useParams();
    const content = () => {
        switch (subpage_id) {
            case "home":
                return (
                    <Home
                        chaletId={props.chaletId}
                        userAllowed={props.userAllowed}
                        ERC20Bal={props.ERC20Bal}
                        holdingRequirement={props.holdingRequirement}
                    />
                );
            case "marketplace":
                return <Marketplace/>;
            case "token-info":
                return <TokenInfo setPurchased={props.setPurchased} />;
            case "about":
                return <About />;
        }
    };
    return <>{content()}</>;
}

export default Chalet;
