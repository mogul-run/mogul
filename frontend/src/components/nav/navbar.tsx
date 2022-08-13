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
                    {/* <Link to="/feed " className="nostyle">
                        {getUser() && <div className="navlink">feed</div>}
                    </Link> */}
                    {/* <a
                        href="https://discord.gg/8AXyshRRVM"
                        target="__blank"
                        className="nostyle"
                    >
                        <div className="navlink"> discord</div>
                    </a> */}

                    {/* <Link to="/tgob" className="nostyle">
                        <div className="navlink">T.G.o.B</div>
                    </Link> */}
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

