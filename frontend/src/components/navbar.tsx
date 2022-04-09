import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar(props: any) {
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
                        <div className="navlink"> Discord</div>
                    </a>

                    <Link to="/tgob" className="nostyle">
                        <div className="navlink">T.G.o.B</div>
                    </Link>
                </div>
                <div
                    className="connect"
                    // onClick={() => props.connectWalletHandler()}
                >
                    connect
                </div>
            </div>
        </div>
    );
}
