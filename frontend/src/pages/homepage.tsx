import "./homepage.css";
import Stonemasters from "../img/stonemasters.jpg";

function HomePage() {
    return (
        <div className="homepage">
            <div className="navbar">
                <div className="logo">Mogul</div>
                <div className="navbuttons">
                    <div className="navlinks">
                        <div className="navlink">about</div>
                        <div className="navlink">discord</div>
                        <div className="navlink">????</div>
                    </div>
                    <div className="connect">connect</div>
                </div>
            </div>
            <div className="content">
                <ContentUno />
                <ContentDos />
                <ContentTres />
            </div>
        </div>
    );
}

function ContentUno() {
    return (
        <div className="content-container">
            <div className="content-left">
                {" "}
                <div className="content-header header-block">
                    Bringing the bum out of everyone
                </div>
                <div className="content-desc">
                    <div className="content-block">
                        Living the bum life is a good life. We're trying to help
                        more people pursue the things they want to do in life
                        and make a living doing so.
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

// this block will provide basic content of what the platform will stand for
function ContentDos() {
    return (
        <div className="content-container dos">
            <div className="definition-header">
                ✍️ It's time to learn some new words!
            </div>
            <div className="definition-container">
                <div className="content-left">
                    <div className="definition-word">
                        <b> Bum </b> <i> noun</i>:
                    </div>
                </div>
                <div className="content-right">
                    <span className="definition">
                        1. a person who devotes a great deal of time to a
                        recreational activity.
                        <br />
                        2. to spend time unemployed and often wandering
                    </span>
                </div>
            </div>
            <div className="definition-container">
                <div className="content-left">
                    <div className="definition-word">
                        <b> Bumsport </b> <i> noun</i>:
                    </div>
                </div>
                <div className="content-right">
                    <span className="definition">
                        Any sport in which a significant percentage of
                        practitioners are bums of definition (1.)
                    </span>
                </div>
            </div>
            <div>
                <div className="blurb">
                    <div>
                        <i>
                            {" "}
                            <b> Let's practice using these words... </b>{" "}
                        </i>
                        <br />
                        <br />
                    </div>
                    <span className="highlight">Bums</span> across history have tapped into intimate communities to further their skills.  
                    <br />
                    <br />
                    <span className="highlight">Bumsports</span> have long been
                    overshadowed by conventional sports (think 
                    basketball, football).
                    <br />
                    <br />
                    <span className="highlight">Bumsports</span> are experiencing unprecedented growth and popularity. 
                </div>
            </div>
        </div>
    );
}

function ContentTres() {
    return (
        <div className="content-container">
            <div className="content-left">picture</div>
            <div className="content-right">content</div>
        </div>
    );
}

export default HomePage;
