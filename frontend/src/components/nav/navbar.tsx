import { Link } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../../context/authContext";
import { User } from "../auth/current-user";
import { useAuthModal } from "../../context/modalContext";
import { useState } from "react";

export default function Navbar(props: any) {
    const { getUser } = useAuth();
    const { handleModal } = useAuthModal();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isMobile = window.innerWidth < 768;

    return (
        <div className="navbar">
            {isMobile ? (
                <div className="flex flex-col w-full">
                    <div
                        className="flex items-center justify-between w-full"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <Link to="/" className="nostyle">
                            <div className="logo">Mogul</div>
                        </Link>
                        <div className="cursor-pointer">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 mr-4 mt-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </div>
                    </div>
                    {mobileMenuOpen ? (
                        <div className="float-left px-2">
                            <div className="w-full flex flex-col sticky top-0 left-0 h-72">
                                <Link to="/collections" className="nostyle">
                                    <div className="navlink uppercase tracking-wider font-normal">
                                        collections
                                    </div>
                                </Link>
                                <Link
                                    to="/houses"
                                    className="nostyle uppercase tracking-wider"
                                >
                                    <div className="navlink ">houses</div>
                                </Link>
                                <div className="auth-buttons">
                                    <div className="auth-button">
                                        <User />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            ) : (
                <div className="flex items-center justify-between w-full">
                    <Link to="/" className="nostyle">
                        <div className="logo">Mogul</div>
                    </Link>
                    <div className="navbuttons">
                        <div className="navlinks">
                            {/* <div className="navlink" onClick={scrollToContent}>About</div> */}
                            <Link to="/collections" className="nostyle">
                                <div className="navlink uppercase tracking-wider">
                                    collections
                                </div>
                            </Link>
                            <Link
                                to="/houses"
                                className="nostyle uppercase tracking-wider"
                            >
                                <div className="navlink ">houses</div>
                            </Link>
                        </div>
                        <div className="auth-buttons">
                            {/* <div
                        className="connect auth-button"
                        onClick={() => props.connectWalletHandler()}
                    >
                        connect
                    </div> */}
                            <div className="auth-button">
                                <User />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
