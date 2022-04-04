import Chord from "../components/chord";
import {Link} from "react-router-dom";
import "./WIP.css";

function WIP() {
    return (
        <div className="wip-wrapper">
            <nav> 
            <Link to="/test-sale" className="link"> test sale </Link>
            <Link to="/nyc26" className="link"> nyc26</Link>
            </nav>
            <Chord width={500} height={500} />
        </div>
    );
}

export default WIP;
