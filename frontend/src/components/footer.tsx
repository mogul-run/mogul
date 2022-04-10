import {Link} from "react-router-dom";
import "../pages/homepage.css";
import "./footer.css";

export default function Footer() {
    return (
        <div className="footer">
            <div className="footer-items">
                <div className="footer-item">
                    <Link className="disabled" to="/">About</Link>
                </div>
                <div className="footer-item">   
                    <Link to="/team">Team</Link>
                </div>
                <div className="footer-item">
                    <Link className="disabled" to="/">FAQ</Link>
                </div>
                <div className="footer-item">
                    <a href="https://discord.gg/8AXyshRRVM">Discord</a>
                </div>
            </div>
            <div className="post-footer">
            Psyched up!
            </div>
        </div>
    );
}
