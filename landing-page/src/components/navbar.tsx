import { Link } from "react-router-dom";
import "./navbar.css";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

export default function Navbar(props: any) {
    const openLogin = () => {
        props.setLogin(!props.login);
    };
    return (
        <div className="navbar">
            <Link to="/" className="nostyle">
                <div className="logo">Mogul</div>
            </Link>
            <div className="navbuttons">
                <div className="navlinks">
                    {/* <div className="navlink" onClick={scrollToContent}>About</div> */}
                    <Link to="/feed " className="nostyle">
                        {props.user && <div className="navlink">feed</div>}
                    </Link>
                    {/* <a
                        href="https://discord.gg/8AXyshRRVM"
                        target="__blank"
                        className="nostyle"
                    >
                        <div className="navlink"> discord</div>
                    </a> */}

                    <Link to="/tgob" className="nostyle">
                        <div className="navlink">T.G.o.B</div>
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
                        {" "}
                        {props.user ? (
                            <User
                                handleLogout={props.handleLogout}
                                user={props.user}
                            />
                        ) : (
                            <div className="button-primary">
                                <Link to="/login" className="text-white hover:text-slate-600">login</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

function User(props: any) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ">
                    {props.user.displayName && props.user.displayName}
                    <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <Link
                                    to="/account-settings"
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                    )}
                                >
                                    Account settings
                                </Link>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    type="submit"
                                    className={classNames(
                                        active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                        "block w-full text-left px-4 py-2 text-sm"
                                    )}
                                    onClick={props.handleLogout}
                                >
                                    Sign out
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
