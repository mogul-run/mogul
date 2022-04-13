import { Link } from "react-router-dom";
import "./navbar.css";

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
                    <a
                        href="https://discord.gg/8AXyshRRVM"
                        target="__blank"
                        className="nostyle"
                    >
                        <div className="navlink"> discord</div>
                    </a>

                    <Link to="/feed " className="nostyle">
                        <div className="navlink">feed</div>
                    </Link>
                </div>
                <div className="auth-buttons">
                    <div
                        className="connect"
                        onClick={() => props.connectWalletHandler()}
                    >
                        connect
                    </div>
                    <div className="connect">
                        {" "}
                        {props.user ? (
                            <User handleLogout={props.handleLogout} />
                        ) : (
                            <Link to="/login">login</Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function User(props: any) {
    return (
        <div>
            <div onClick={props.handleLogout}>logout</div>
        </div>
    );
}
