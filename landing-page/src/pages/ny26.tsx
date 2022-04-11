import { useEffect } from "react";
import strava from "strava-v3";

function NY26() {
    const getStravaEvent = async () => {
        /// TODO: Fix errors with strava api?
        // console.log(process.env);
        // strava.config({
        //     access_token: process.env.REACT_APP_STRAVA_ACCESS_TOKEN || "",
        //     client_id: process.env.REACT_APP_STRAVA_CLIENT_ID || "",
        //     client_secret: process.env.REACT_APP_STRAVA_CLIENT_SECRET || "",
        //     redirect_uri: "https://www.strava.com/oauth/authorize",
        // });
        // const payload = await strava.athlete.get({})
        // console.log(payload)
    };

    return (
        <div>
            <h1> New York Marathon NFT </h1>
            <button onClick={() => getStravaEvent()}> get event</button>
        </div>
    );
}

export default NY26;
