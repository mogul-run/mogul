import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import "./login.css";
import { useAuth } from "../context/authContext";
import GoogleButton from "./google-button";
import { Link } from "react-router-dom";

export function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { getUser } = useAuth();

    useEffect(() => {
        if (getUser()) {
            navigate("/");
        }
    }, []);

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
    return (
        <Login
            handleLogin={handleLogin}
            setEmail={setEmail}
            setPassword={setPassword}
            error={error}
            page={true}
        />
    );
}

function Login(props: any) {
    return (
        <div className="login-wrapper">
            <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">
                        🛹 Yew!!! You're almost there
                    </h1>

                    <h2 className="mt-4 text-stone-500">
                        We're just gonna need to check some credentials...
                    </h2>
                </div>

                <div className="max-w-md mx-auto mt-8 mb-0 space-y-4">
                    <div>
                        <label id="email" className="sr-only">
                            Email
                        </label>

                        <div className="relative">
                            <input
                                type="email"
                                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                                placeholder="Enter email"
                                onChange={(e) => props.setEmail(e.target.value)}
                            />

                            <span className="absolute inset-y-0 inline-flex items-center right-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-stone-400"
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
                                    props.setPassword(e.target.value)
                                }
                            />

                            <span className="absolute inset-y-0 inline-flex items-center right-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-5 h-5 text-stone-400"
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
                            {props.page ? (
                                <p className="text-sm text-stone-500">
                                    No account?{" "}
                                    <Link to="/signup" className="">
                                        Sign up
                                    </Link>
                                </p>
                            ) : (
                                <div />
                            )}

                            <button
                                className="inline-block ml-3 text-sm btn-primary rounded-lg"
                                onClick={() => props.handleLogin()}
                            >
                                Sign in
                            </button>
                        </div>
                        <div className="mt-3 flex justify-center">
                            <span className="bg-stone-200 h-px flex-grow t-2 relative top-2"></span>
                            <span className="flex-none uppercase text-xs text-stone-600 font-semibold px-2">
                                or
                            </span>
                            <span className="bg-stone-200 h-px flex-grow t-2 relative top-2"></span>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <GoogleButton text={"Sign in"} />
                        </div>
                        {props.error && (
                            <div className="mt-4 error text-red message-error">
                                {props.error}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
