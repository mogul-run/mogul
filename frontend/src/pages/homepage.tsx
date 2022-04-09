import "./homepage.css";
import Stonemasters from "../img/stonemasters.jpg";
import Gnar from "../img/shane.jpg";
import Camp4 from "../img/camp4.jpg";
import NorthShore from "../img/north-shore.jpg";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar";
import "./homepage.css";

function HomePage(props: any) {
    return (
        <div className="homepage">
            <div className="content">
                <ContentUno />
                <ContentDos />
                <ContentTres />
                <Content4 />
                <Content5 />
                <Footer />
            </div>
        </div>
    );
}

function ContentUno() {
    return (
        <div className="content-container uno">
            <div className="content-left uno-left">
                {" "}
                <div className="content-header header-block">
                            Mogul provides the tools for{" "}
                            creatives to participate in intimate
                            digital communities.
                </div>
                <div className="content-desc">
                    <div className="content-block">
                        <b>
                            Mint tokens, transact, and interact with your favorite creators all on one platform.
                        </b>
                    </div>
                    <div className="content-block">
                        Powered by public smart contracts on{" "}
                        <a href="https://ethereum.org" target="__blank">
                            {" "}
                            Ethereum
                        </a>
                        <br />
                    </div>
                    <div className="content-block">
                        <div className="emphasis">Built for:</div>
                        <ul className="built">
                            <li>Beach Bums and Derelicts</li>
                            <li>Diehard Dirtbags and Weekend Warriors</li>
                            <li>
                                Vanlifers: From shiny new Sprinters to your
                                mom's old Sienna
                            </li>
                            <li>
                                Lovers of the Mountains, the Sea and Mother
                                Earth
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="content-right uno-right">
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
                        practitioners are bums.
                    </span>
                </div>
            </div>
            <div className="examples-wrapper">
                <div className="blurb examples">
                    <div>
                        <i>
                            {" "}
                            <b> Let's practice using these words:</b>{" "}
                        </i>
                        <br />
                        <br />
                    </div>
                    <span className="highlight">Bums</span> come in all
                    different varieties: ski bums, surf bums, rock climbing
                    bums, kayaking bums, skate bums and more!
                    <br />
                    <br />
                    <span className="highlight">Bumsports</span> were once niche
                    activites overshadowed by conventional sports (think
                    basketball or football), but have seen recent growth of
                    unprecedented rates.
                    <br />
                    <br />3 out of the 5 sports introduced in the 2022 Tokyo
                    Olympics were <span className="highlight">bumsports</span>:
                    Surfing, Rock Climbing, and Skateboarding.
                    <br />
                    <br />
                    <b>Mogul</b> wants to help{" "}
                    <span className="highlight">bums</span> make a living doing
                    what they love.
                    <br />
                    <br />
                </div>
            </div>
        </div>
    );
}

function ContentTres() {
    return (
        <div className="content-container tres">
            <div className="community-grid">
                <div className="community-text">
                    <div className="community-header">
                        Tight-knit communities have always been a vital part of
                        Bumsports 
                    </div>
                    <div className="">
                        Ragtag bands of bums have pushed the physical limits in
                        bumsports like skiing, climbing, and surfing.
                    </div>
                </div>
                <div className="community-item">
                    <div className="community-img-wrap">
                        <img className="community-img" src={Gnar} />
                    </div>
                    <div className="community-cap">
                        Shane McConkey and Squallywood's finest dropping in at
                        Squaw Valley, CA
                    </div>
                </div>
                <div className="community-item">
                    <div className="community-img-wrap">
                        <img
                            className="community-img"
                            src={Camp4}
                        />
                    </div>
                    <div className="community-cap">
                        Royal Robbins and T.M. Herbert racking up for the
                        Salathé Wall in Camp 4, Yosemite Valley, CA
                    </div>
                </div>
                <div className="community-item">
                    <div className="community-img-wrap">
                        <img
                            className="community-img"
                            src={NorthShore}
                        />
                    </div>
                    <div className="community-cap">
                        Gerry Lopez and Derek Ho share a barrel at Pipeline,
                        North Shore Oahu
                    </div>
                </div>
                {/* The Platform */}
            </div>
        </div>
    );
}

function Content4() {
    return (
        <div className="content-container four">
            <div className="content-left four-left">
                <div className="header">
                    How can we nurture these communities online?
                </div>
            </div>
            <div className="content-right four-wrap">
                <div className="four-right">
                    {" "}
                    <div className="sub-block">
                        <div className="subheader">
                            🏠 Creator-Centric Houses
                        </div>
                        <div className="sub-desc">
                            Give creators the tools to curate quality content
                            and services for their houses.
                        </div>
                    </div>
                    <div className="sub-block">
                        <div className="subheader">🪙 House Tokens</div>
                        <div className="sub-desc">
                            Provide members a sense of stake in the house. Can
                            be used to regulate membership in a house or
                            exchanged for goods and services.
                        </div>
                    </div>
                    <div className="sub-block">
                        <div className="subheader">
                            💸 More Value for Creators
                        </div>
                        <div className="sub-desc">
                            Lower the barrier of entry for creators to start
                            making a living off their craft.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Content5() {
    return (
        <div className="content-container five">
            <div className="tgob-pitch">
                <div className="pitch-header">
                    Want to be one of the first creators on Mogul?
                </div>
                You've got to earn your spot in...
                <div className="tgob-script">
                    <Link to="/tgob" className="tgob-link">
                        The Game of B.U.M.
                    </Link>
                </div>
            </div>
        </div>
    );
}

function Footer() {
    return (
        <div className="footer">
            <div className="footer-items">
                <div className="footer-item">
                    <Link to="/">About</Link>
                </div>
                <div className="footer-item">
                    <Link to="/">Team</Link>
                </div>
                <div className="footer-item">
                    <Link to="/">FAQ</Link>
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

export default HomePage;
