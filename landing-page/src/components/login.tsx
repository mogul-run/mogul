import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';
import "./login.css";

function Login(props: any) {
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
    const auth = getAuth();

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("/feed");
                sessionStorage.setItem("Auth Token", user.refreshToken)
            })
            .catch((error) => {
                setError(error.message)
                console.log("Error with Login: ", error);
            });
    };

    useEffect(() => {
        if(props.user) {
            navigate("/");
        }
    })

    return (
        <div className="login-wrapper">
            <div className="login-modal rounded shadow-lg p-8">
                <div className="text-2xl"> Login </div>
                <input
                    className="user input rounded p-1"
                    placeholder="Email"
                    onChange={(e) => handleEmailChange(e.target.value)}
                ></input>
                <input
                    className="pw input rounded p-1"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => handlePasswordChange(e.target.value)}
                ></input>
                <button className="bg-indigo-500 text-white p-2 m-2 rounded hover:bg-indigo-800" onClick={handleLogin}>
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
