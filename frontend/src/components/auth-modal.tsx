import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile,
} from "firebase/auth";
import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "../context/authContext";
import { ModalContext } from "../context/modalContext";
import Signup from "../pages/signup";
import Login from "./login";

function LoginModal() {
    const [email, setEmail] = useState("");
    const { login } = useAuth();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let { handleModal } = useContext(ModalContext);
    const handleLogin = () => {
        login(email, password)
            .then(() => {
                handleModal();
            })
            .catch((error: Error) => {
                setError(error.message);
                console.log("Error with Login: ", error);
            });
    };

    return (
        <Login
            setEmail={setEmail}
            setPassword={setPassword}
            error={error}
            handleLogin={handleLogin}
        />
    );
}
function SignupModal() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let { handleModal } = useContext(ModalContext);
    const { login } = useAuth();

    const handleSignup = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: username,
                }).catch((error) => {
                    setError(error.message);
                    // An error happened.
                });
                handleModal();
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <Signup
            setEmail={setEmail}
            setPassword={setPassword}
            setUsername={setUsername}
            setLastName={setLastName}
            setFirstName={setFirstName}
            handleSignup={handleSignup}
            error={error}
        />
    );
}

function AuthModal() {
    const [login, setLogin] = useState(true);
    let { handleModal, modal } = useContext(ModalContext);
    const handleClose = (event: any) => {
        console.log("close");
        if ("close-auth-modal" === event.target.id) {
            handleModal();
        }
    };

    if (modal) {
        return createPortal(
            <div
                id="close-auth-modal"
                onClick={(e) => handleClose(e)}
                className="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg-stone-800 bg-opacity-80"
            >
                <div className="bg-stone-200 rounded">
                    <div>
                        <nav className="flex justify-center text-sm font-medium border-b border-stone-300">
                            <div
                                className={`cursor-pointer p-4 -mb-px border-b ${
                                    !login
                                        ? "border-transparent"
                                        : "text-mblue border-current"
                                } hover:text-mblue`}
                                onClick={() => setLogin(true)}
                            >
                                Login
                            </div>
                            <div
                                className={`cursor-pointer p-4 -mb-px border-b ${
                                    login
                                        ? "border-transparent"
                                        : "text-mblue border-current"
                                } hover:text-mblue`}
                                onClick={() => setLogin(false)}
                            >
                                Signup
                            </div>
                        </nav>
                    </div>
                    {login ? <LoginModal /> : <SignupModal />}
                </div>
            </div>,
            document.querySelector("#modal-root")!
        );
    } else return null;
}

export default AuthModal;
