import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
import GoogleButton from "../components/google-button";

function Login(props: any) {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [error, setError] = useState("");
    const handleEmailChange = (value: string) => {
        setEmail(value);
        console.log("setemail");
    };
    const handlePasswordChange = (value: string) => {
        setPassword(value);
        console.log("setpassword");
    };
    const navigate = useNavigate();

    const { getUser } = useAuth();

    const handleLogin = () => {
        login(email, password)
            .then(() => {
                navigate(-1);
            })
            .catch((error: Error) => {
                setError(error.message);
                console.log("Error with Login: ", error);
            });
    };

    useEffect(() => {
        if (getUser()) {
            // navigate("/");
        }
    }, []);

    return (
        <div className="login-wrapper">
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">
                        🧗 Welcome, it's very nice to meet you
                    </h1>

                    <h2 className="mt-4 text-gray-500">
                        This should be quick!
                    </h2>
                </div>

                <div className="max-w-md mx-auto mt-8 mb-0 space-y-4">
                    <div>
                        <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                            Username
                        </label>

                        <div className="relative">
                            <input
                                type="email"
                                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="countryloafcarrie"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between space-x-2">
                        <div>
                            <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                First Name
                            </label>

                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                    placeholder="Carrie"
                                    onChange={(e) =>
                                        handleEmailChange(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                                Last Name
                            </label>

                            <div className="relative">
                                <input
                                    type="email"
                                    className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                    placeholder="Cornstow"
                                    onChange={(e) =>
                                        handleEmailChange(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1">
                            Email
                        </label>

                        <div className="relative">
                            <input
                                type="email"
                                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Enter email"
                                onChange={(e) =>
                                    handleEmailChange(e.target.value)
                                }
                            />

                            <span className="absolute inset-y-0 inline-flex items-center right-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div>
                        <label
                            id="password"
                            className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-1"
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Enter password"
                                onChange={(e) =>
                                    handlePasswordChange(e.target.value)
                                }
                            />

                            <span className="absolute inset-y-0 inline-flex items-center right-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                                Got an account?{" "}
                                <Link className="underline" to="/login">
                                    Log in
                                </Link>
                            </p>

                            <button
                                className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-mblue rounded-lg"
                                onClick={() => handleLogin()}
                            >
                                Sign up
                            </button>
                        </div>
                        <div className="error">{error}</div>
                    </div>
                    <div className="flex justify-center">
                        <span className="bg-stone-200 h-px flex-grow t-2 relative top-2"></span>
                        <span className="flex-none uppercase text-xs text-stone-600 font-semibold px-2">
                            or
                        </span>
                        <span className="bg-stone-200 h-px flex-grow t-2 relative top-2"></span>
                    </div>
                    <div className="flex justify-center">
                        <GoogleButton text="Sign up" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
