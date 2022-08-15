import { Link } from "react-router-dom";
import "./navbar.css";
import { useAuth } from "../../context/authContext";
import { User } from "../auth/current-user";
import { useAuthModal } from "../../context/modalContext";

export default function Navbar(props: any) {
    const { getUser } = useAuth();
    const { handleModal } = useAuthModal();

    return (
        <div className="navbar">
            <Link to="/" className="nostyle">
                <div className="logo">Mogul</div>
            </Link>
            <div className="navbuttons">
                <div className="navlinks">
                    {/* <div className="navlink" onClick={scrollToContent}>About</div> */}
                    <Link to="/collections" className="nostyle">
                        <div className="navlink uppercase tracking-widest">collections</div>
                    </Link>
                    <Link to="/houses" className="nostyle uppercase tracking-widest">
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
    );
}
