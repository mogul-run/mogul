import "./team.css";
import lucas from "../../img/lucas.jpg";

function Team() {
    return (
        <div className="team-wrapper">
            <div className="team-header">Team</div>
            <div className="members">
                <div className="member">
                    <div className="member-img-wrap">
                        <img className="member-img" src={lucas} />{" "}
                    </div>
                    <div className="member-name"> Lucas Song </div>
                    <div className="member-bio">
                        {" "}
                        On the pursuit of creativity in motion. Rides bikes, surfcraft, skis, rocks, and more.
                    </div>
                    <div className="member-links">
                        {" "}
                        <a className="member-link" href="https://twitter.com/tacoboyxd" target="_blank">
                            twit
                        </a>
                        <a className="member-link" href="https://instagram.com/lucasxsong" target="_blank">
                           insta  
                        </a>
                        <a className="member-link" href="https://linkedin.com/in/lucasxsong" target="_blank">
                           linkedin 
                        </a>
                        <a className="member-link" href="https://github.com/lucasxsong" target="_blank">
                           github 
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team;
