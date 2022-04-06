import "./TGOB.css";
import "./homepage.css";

function TGOB() {
    return (
        <div className="TGOB">
            <div className="head-wrapper">
                <div className="head">
                    <div className="title">
                        <a
                            className="bum-link"
                            href="https://www.skimag.com/videos/gnar-movie-0/"
                            target="__blank"
                        >
                            The Game of
                            <div className="title-big">B.U.M</div>
                        </a>
                    </div>
                </div>
                <div className="subtext">
                    <i>🦅 Dedicated to Shane McConkey and Brad Gobright 🦅</i>
                </div>
            </div>
            <div className="info-wrapper">
                <div className="desc-wrapper">
                    <div className="header">Description</div>
                    <div className="desc">
                        The Game of B.U.M (T.G.o.B) is a competition for bums
                        across the world to showcase their mastery of bumsports.{" "}
                    </div>
                </div>
                <div className="desc-wrapper">
                    <div className="header">Rules</div>
                    <div className="desc">
                        The Game of B.U.M (T.G.o.B) is a competition for bums
                        across the world to showcase their mastery of bumsports.{" "}
                    </div>
                </div>
            </div>
            <div className="desc-wrapper">
                <div className="header">Prizes</div>
                <div className="desc">
                    <ul>
                        <li>Bragging Rights</li>
                        <li>Tokens</li>
                        <li>Gear from our sponsors</li>
                        <li>Exclusive access to the Mogul Platform.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TGOB;
