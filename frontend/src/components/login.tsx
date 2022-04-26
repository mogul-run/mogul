import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';
import "./login.css";
import { useAuth } from "../context/authContext";

function Login(props: any) {
    const {login} = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const handleEmailChange = (value: string) => {
        setEmail(value);
    };
    const handlePasswordChange = (value: string) => {
        setPassword(value);
    };
    const navigate = useNavigate();

    const handleLogin = () => {
        login(email, password)
            .then(() => {
                navigate("/feed");
            })
            .catch((error:Error) => {
                setError(error.message)
                console.log("Error with Login: ", error);
            });
    };

    useEffect(() => {
        if(props.user) {
            // navigate("/");
        }
    })

    return (
        <div className="login-wrapper">
            <div className="login-modal rounded shadow-lg p-8 m-2">
                <div className="text-2xl"> Login </div>
                <input
                    className="user input rounded p-1 m-2"
                    placeholder="Email"
                    onChange={(e) => handleEmailChange(e.target.value)}
                ></input>
                <input
                    className="pw input rounded p-1 m-2"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => handlePasswordChange(e.target.value)}
                ></input>
                <button className="button-primary" onClick={() => handleLogin()}>
                    login
                </button>
                <div className="error">
                    {error}
                </div>
            </div>
        </div>
    );
}

export default Login;
