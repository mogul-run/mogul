import { useEffect, useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Menu from "./components/Menu";
import TokenInfo from "./components/TokenInfo";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import Carrots from "../../img/carrots.png";
import { User } from "../../components/auth/current-user";

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
    id: "40404",
    tokenAddr: "0x622D77bF93ef6f33aFa895789318615878754f4f",
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
    const [purchased, setPurchased] = useState(false);

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
        setPurchased(false);
    }, [purchased]);

    return (
        <div className="flex flex-col items-center chalet-wrapper">
            <div className="w-full flex flex-col items-center justify-between">
                <div className="flex w-full justify-center items-center p-4">
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
                                                className={`ticker my-1 text-white ${
                                                    Number(ERC20Bal) >=
                                                    exampleChalet.holdingRequirement
                                                        ? "bg-green-500"
                                                        : "bg-red-500"
                                                }`}
                                            >
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
                                <div className="btn-primary">
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
                        {" "}
                        <div className="flex flex-col md:flex-row space-x-4">
                            {" "}
                            <div className="flex flex-col items-start justify-center">
                                <img
                                    className="w-full rounded"
                                    src={Carrots}
                                ></img>
                            </div>
                            <div className="chalet-header flex flex-col items-start justify-center">
                                <div className="text-3xl">House of B.O.B </div>
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
                                            {exampleChalet.holdingRequirement}{" "}
                                            {exampleChalet.tokenTicker}
                                        </div>
                                    </div>
                                </div>
                                <div className="my-1 text-md chalet-bio">
                                    One part bumsport history class, one part outdoor training camp, one part guidebook to California's most wonderful spots, and whatever else you can fit into the mixing bowl makes Sender Central! 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full border-b-2">
                    <div className="tabs-list flex justify-center">
                        {tabs.map((tab, id) => {
                            return (
                                <div
                                    className={`tab-button cursor-pointer hover:bg-stone-200 rounded text-lg font-bold px-3 py-3 ${
                                        selected == tab.url && "text-sky-700 border-b-4 border-b-sky-700"
                                    }`}
                                    key={id}
                                    onClick={() => handleSelected(tab.url)}
                                >
                                    {tab.name}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center p-3 m-4">
                <div className="w-full md:w-[768px] flex flex-col items-start">
                    <ChaletContent
                        selected={selected}
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
    const content = () => {
        switch (props.selected) {
            case "home":
                return <Home chaletId={props.chaletId} userAllowed={props.userAllowed} ERC20Bal={props.ERC20Bal} holdingRequirement={props.holdingRequirement}/>;
            case "menu":
                return <Menu />;
            case "token-info":
                return <TokenInfo setPurchased={props.setPurchased}/>;
            case "about":
                return <About />;
        }
    };
    return <>{content()}</>;
}

export default Chalet;
