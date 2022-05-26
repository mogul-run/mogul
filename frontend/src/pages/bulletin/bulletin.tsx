import "./mogulrun.css";
import { Board } from "../../components/social/board";
import { User } from "../../components/auth/current-user";


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

function MogulRun() {
    return (
        <div className="flex flex-col ">
            <div className="topbar">
                <div className="mogul-header text-3xl font-bold">
                   the bulletin 
                </div>
                <div className="">
                    <User />
                </div>
            </div>
            <div className="flex flex-col items-center p-2">
                <Board path={"/the-mogul-run/posts"} tags={tags}/>
            </div>
        </div>
    );
}



export default MogulRun;
