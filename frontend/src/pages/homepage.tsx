import "./homepage.css";
import Stonemasters from "../img/stonemasters.jpg";
import { useRef } from "react";
import {Link} from "react-router-dom";
import Navbar from "../components/navbar";


function HomePage(props:any) {
    const myRef = useRef(document.createElement("div"));
    const scrollToContent = () => myRef.current.scrollIntoView();

    return (
        <div className="homepage">
            <div className="content" ref={myRef}>

                <ContentUno />
                <ContentDos />
                <ContentTres />
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
                    Live the life you want to live. Be your own Mogul.
                </div>
                <div className="content-desc">
                    {/* <div className="content-block">
                        <i>
                    ⛷️ Skiing your first{" "}
                        <a
                            href="https://en.wikipedia.org/wiki/Mogul_skiing"
                            target="__blank"
                        >
                            {" "}
                            mogul run
                        </a>{" "}
                        can be a pretty bumpy experience.
                        <br />
                        <br />
                        But just as in life, the satisfaction comes with pushing
                        through the difficulties, getting up when you fall, and
                        finding your own line.
                        </i>
                    </div> */}
                    <div className="content-block"> 
                        <b>
                        Mogul provides the tools for{" "}
                        <span className="highlight">bumsport</span> enthusiasts to
                        build and participate in intimate digital communities.
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
            <div>
                <div className="blurb">
                    <div>
                        <i>
                            {" "}
                            <b> Let's practice using these words</b>{" "}
                        </i>
                        <br />
                        <br />
                    </div>
                    <span className="highlight">Bums</span> come in all different varieties:
                    ski bums, surf bums, rock climbing bums, kayaking bums,
                    skate bums and more!
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
        <div className="content-container">
            <div className="header">
                The Platform
                </div>
            {/* <div className="content-left">picture</div>
            <div className="content-right">content</div> */}
        </div>
    );
}

export default HomePage;
