import "./homepage.css";
import Stonemasters from "../img/stonemasters.jpg";

function HomePage() {
    return (
        <div className="homepage">
            <div className="navbar">
                <div className="logo">Mogul</div>
                <div className="navbuttons">
                    <div className="navlinks">
                        <div className="navlink">link1</div>
                        <div className="navlink">link2</div>
                        <div className="navlink">link3</div>
                    </div>
                    <div className="connect">connect</div>
                </div>
            </div>
            <div className="content">
                <HomePageContent />
            </div>
        </div>
    );
}

function HomePageContent() {
    return (
        <div className="content-container">
            <div className="content-left">
                {" "}
                <div className="content-header">
                    Bringing the bum out of everyone
                </div>
                <div className="content-desc">
                    <div className="content-block">
                        Living the bum life is a good life. We're trying to help more people 
                        pursue the things they want to do in life and make a living doing so.
                    </div>
                    <div className="content-block">
                        Powered by public smart contracts on{" "}
                        <a href="https://ethereum.org"> Ethereum</a>
                        <br />
                    </div>
                    <div className="content-block">
                        <div className="emphasis">Built for:</div>
                        <ul>
                            <li>Beach Bums</li>
                            <li>Dirtbags</li>
                            <li>Vanlifers</li>
                            <li>Anti-capitalistic rebels</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="content-right">
                <div className="stonemasters-wrap">
                    <img className="stonemasters" src={Stonemasters} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
