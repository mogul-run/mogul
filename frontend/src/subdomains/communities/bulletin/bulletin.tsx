import "./mogulrun.css";
import { Board } from "../components/social/board";
import { User } from "../components/auth/current-user";

const tags = [
    "surf",
    "climb",
    "ski",
    "snowboard",
    "bikes",
    "gear",
    "fitness",
    "beta",
];

function Bulletin() {
    return (
        <div className="flex flex-col ">
            <div className="topbar">
                <div>
                    <div className="mt-4 text-4xl uppercase italic font-bold tracking-wider">
                        the board
                    </div>
                    <div className="text-sm italic">a place to ask questions, share beta, or just shoot the shit</div>
                </div>
            </div>
            <div className="flex flex-col items-center p-2">
                <Board path={"/the-mogul-run/posts"} tags={tags} />
            </div>
        </div>
    );
}

export default Bulletin;
