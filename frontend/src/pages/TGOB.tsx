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
                        The Game of B.U.M (T.G.o.B) will be a points based competition where participants can complete challenges to earn points. 
                    </div>
                </div>
                <div className="desc-wrapper">
                    <div className="header">Rules</div>
                    <div className="desc">
                        <ul>
                            <li>
                                be nice 
                            </li>
                            <li>
                                have fun
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="info-wrapper">
                <div className="desc-wrapper">
                    <div className="header">Prizes</div>
                    <div className="desc">
                        <ul>
                            <li>Winners will get exclusive access to the Mogul Creator Platform </li>
                            <li>$MOGUL Tokens -- for both competitors and verifiers </li>
                            <li>Sick gear from our sponsors</li>
                            <li>Bragging Rights</li>
                        </ul>
                    </div>
                </div>
                <div className="desc-wrapper">
                    <div className="header">Sponsors</div>
                    <div className="desc">
                        <div>
                        The sponsors list will be released soon. 
                        </div>

                        Want to be a sponsor? <a href="mailto:lucas@mogul.run"> Reach out</a>
                    </div>
                </div>
            </div>

            <div className="desc-wrapper">
                <div className="submit-header">
                    Questions? Want to know when the T.G.o.B will start?
                    <div>
                        <a
                            href="https://discord.gg/8AXyshRRVM"
                            target="__blank"
                        >
                            {" "}
                            Join the Discord
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TGOB;
