import "./chalet.css";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Menu from "./components/Menu";
import TokenInfo from "./components/TokenInfo";
import { User } from "../../components/navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Stonemasters from "../../img/stonemasters.jpg";
import { ERC20 } from "@maticnetwork/maticjs/dist/ts/pos/erc20";

const tabs = [
    {
        name: "Home",
        url: "home",
    },
    {
        name: "Menu",
        url: "menu",
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
    name: "Da Spot",
    tokenAddr: "0x8531f05D2F69E2591Dac5dFcaBc53b614fc636b4",
    owner: "Lucas",
    tokenTicker: "$LUCAS",
    holdingRequirement: 150,
};

// will create chalet page for mogul.run/c/[creator]
// for now, we are hard coding for /c/lucas
function Chalet(props: any) {
    //sets default selection to tab #1
    const [selected, setSelected] = useState(tabs[0].url);
    const [ERC20Bal, setERC20Bal] = useState("");
    const [ETHBal, setETHBal] = useState("");
    const [userAllowed, setUserAllowed] = useState(false);

    const { getWallet, getUser, getERC20Balance, getETHBalance } = useAuth();

    const handleSelected = (value: string) => {
        setSelected(value);
    };
    useEffect(() => {
        getERC20Balance(exampleChalet.tokenAddr).then((resp: string) => {
            setERC20Bal(resp);
            if (Number(resp) >= exampleChalet.holdingRequirement) {
                setUserAllowed(true);
            }
        });
        getETHBalance(exampleChalet.tokenAddr).then((resp: string) => {
            setETHBal(resp);
        });
    }, []);

    return (
        <div className="chalet-wrapper">
            <div className="chalet-info">
                <div className="chalet-top w-100 flex space-x-4 p-4 ">
                    {/* <div className="text-xl font-bold">Lucas</div> */}
                    <div className="flex space-x-4">
                        {" "}
                        <div className="flex grow flex-col items-start justify-center">
                            <img
                                className="w-60 rounded"
                                src={Stonemasters}
                            ></img>
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <div className="text-4xl">Da Spot</div>
                            <div className="flex space-x-2">
                                <div className="flex justify-center message-primary items-center space-x-2 my-1">
                                    <div>Transacts in</div>
                                    <div className="ticker-primary">
                                    {exampleChalet.tokenTicker}
                                    </div>
                                    <div className="ticker-primary ">$ETH</div>
                                </div>
                                <div className="flex justify-center message-primary items-center space-x-2 my-1 bold">
                                    <div>Holding Requirement of </div>
                                    <div className="ticker-primary">
                                        {exampleChalet.holdingRequirement}{" "}
                                        {exampleChalet.tokenTicker}
                                    </div>
                                </div>
                            </div>
                            <div className="my-1 text-md ">
                                We talk about outdoor cooking, progresssion and
                                training in many different bumsports. Some
                                bumsports I enjoy are surfing, climbing, biking,
                                skiing, and skating.
                            </div>
                        </div>
                    </div>

                    <div className="auth-button">
                        {" "}
                        {getUser() ? (
                            <div className="flex flex-col text-right items-end space-y-4">
                                <User
                                    handleLogout={props.handleLogout}
                                    user={getUser()}
                                    walletAddr={getWallet()}
                                />
                                <div className="space-y-1 flex flex-col">
                                    <div className="flex flex-col items-end">
                                        <div className="font-bold">
                                        Balances{" "}
                                        </div>
                                        <div className={`ticker my-1 text-white ${(Number(ERC20Bal) > exampleChalet.holdingRequirement) ? "bg-green-500" : "bg-red-500"}`}>
                                            {ERC20Bal}{" "}
                                            {exampleChalet.tokenTicker}
                                        </div>
                                        <div className="ticker my-1">
                                            {ETHBal} $ETH
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="button-primary">
                                <Link
                                    to="/login"
                                    className="text-white hover:text-slate-600"
                                >
                                    login
                                </Link>
                            </div>
                        )}
                    </div>
                    {/* <div className="text-xl font-bold">Lucas</div> */}
                </div>
                <div className="chalet-tabs w-100">
                    <div className="tabs-list flex space-x-4 justify-center">
                        {tabs.map((tab) => {
                            return (
                                <div
                                    className={`tab-button text-lg font-bold mx-1 px-1 py-3 ${
                                        selected == tab.url && "selected"
                                    }`}
                                    onClick={() => handleSelected(tab.url)}
                                >
                                    {tab.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="chalet-content">
                <div className="">
                    <ChaletContent
                        selected={selected}
                        userAllowed={userAllowed}
                    />
                </div>
            </div>
        </div>
    );
}

function ChaletContent(props: any) {
    const content = () => {
        switch (props.selected) {
            case "home":
                return <Home userAllowed={props.userAllowed} />;
            case "menu":
                return <Menu />;
            case "token-info":
                return <TokenInfo />;
            case "about":
                return <About />;
        }
    };
    return <div>{content()}</div>;
}

export default Chalet;
