import "./chalet.css";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import About from "./components/About";
import Menu from "./components/Menu";
import TokenInfo from "./components/TokenInfo";
import { User } from "../../components/navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";

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
    tokenAddr: "",
    owner: "Lucas",
};

// will create chalet page for mogul.run/c/[creator]
// for now, we are hard coding for /c/lucas
function Chalet(props: any) {
    //sets default selection to tab #1
    const [selected, setSelected] = useState(tabs[0].url);
    const { getWallet, getUser } = useAuth();


    const handleSelected = (value: string) => {
        setSelected(value);
    };

    return (
        <div className="chalet-wrapper">
            <div className="chalet-info">
                <div className="chalet-top w-100 flex space-x-4 p-4 ">
                    <div className="text-xl font-bold">Lucas</div>
                    <div className="text-4xl ">Da Spot</div>

                    <div className="auth-button">
                        {" "}
                        {getUser() ? (
                            <User
                                handleLogout={props.handleLogout}
                                user={getUser()}
                                walletAddr={getWallet()}
                            />
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
                    <ChaletContent selected={selected} />
                </div>
            </div>
        </div>
    );
}

function ChaletContent(props: any) {
    const content = () => {
        switch (props.selected) {
            case "home":
                return <Home />;
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
