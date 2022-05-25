import { getDatabase, onValue, push, ref } from "firebase/database";
import { toArray } from "lodash";
import { useEffect, useRef, useState } from "react";
import { text } from "stream/consumers";
import { User } from "../../components/navbar";
import { useAuth } from "../../context/authContext";
import { TextPost } from "./components/post";
import "./mogulrun.css";
import UploadButton from "../../components/upload-button";
import { Board } from "../../components/board";


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
                    The Mogul Run
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
