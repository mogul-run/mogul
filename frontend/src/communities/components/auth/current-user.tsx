import { useAuth } from "../../../context/authContext";
import { useAuthModal } from "../../../context/modalContext";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

export function User(props: any) {
    const { getUser, getWallet, signOut } = useAuth();
    const { handleModal } = useAuthModal();
    return (
        <div>
            {getUser() ? (
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex items-center justify-center w-full rounded-md border border-stone-300 shadow-sm px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-200">
                            {getUser().photoURL && (
                                <img
                                    className="object-cover w-6 h-6 rounded-full mr-2.5"
                                    src={getUser().photoURL}
                                    alt="profile pic"
                                />
                            )}
                            {getUser().displayName && getUser().displayName}
                            {getWallet() && (
                                <div className="display-wallet wallet mx-2">
                                    {" "}
                                    {getWallet().substring(0, 6)}{" "}
                                </div>
                            )}
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
                                            to="/settings"
                                            className={classNames(
                                                active
                                                    ? "bg-stone-100 text-stone-900"
                                                    : "text-stone-700",
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
                                                    ? "bg-stone-100 text-stone-900"
                                                    : "text-stone-700",
                                                "block w-full text-left px-4 py-2 text-sm"
                                            )}
                                            onClick={() => signOut()}
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            ) : (
                <div className="flex space-x-1">
                    <div
                        className="cursor-pointer px-5 py-2 text-sm font-medium text-stone-600 bg-stone-200 hover:bg-stone-300 rounded-lg"
                        onClick={() => handleModal(true)}
                    >
                        Log in
                    </div>
                    <div
                        className="cursor-pointer px-5 py-2 text-sm font-medium text-white bg-sky-600 hover:opacity-80 rounded-lg"
                        onClick={() => handleModal(false)}
                    >
                        Sign up
                    </div>
                </div>
            )}
        </div>
    );
}
