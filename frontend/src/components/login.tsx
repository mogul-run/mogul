import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./login.css";
import { useAuth } from "../context/authContext";

function Login(props: any) {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleEmailChange = (value: string) => {
        setEmail(value);
        console.log("setemail")
    };
    const handlePasswordChange = (value: string) => {
        setPassword(value);
        console.log("setpassword")
    };
    const navigate = useNavigate();

    const {getUser} = useAuth();

    const handleLogin = () => {
        login(email, password)
            .then(() => {
                navigate("/");
            })
            .catch((error: Error) => {
                setError(error.message);
                console.log("Error with Login: ", error);
            });
    };

    useEffect(() => {
        if (getUser()) {
            navigate("/");
            window.location.reload();
        }
    });

    return (
        <div className="login-wrapper">
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">
                        🛹 Yew!!! You're almost there
                    </h1>

                    <h2 className="mt-4 text-gray-500">
                        We're just gonna need to check some credentials...
                    </h2>
                </div>

                <div
                    className="max-w-md mx-auto mt-8 mb-0 space-y-4"
                >
                    <div>
                        <label id="email" className="sr-only">
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
                        <label id="password" className="sr-only">
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
                                No account?{" "}
                                <a className="underline cursor-not-allowed">
                                    Sign up
                                </a>
                            </p>

                            <button
                                className="inline-block px-5 py-3 ml-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
                                onClick={() => handleLogin()}
                            >
                                Sign in
                            </button>
                        </div>
                        <div className="error">{error}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
