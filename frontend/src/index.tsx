import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/dm-mono";
import "@fontsource/inter";
import "@fontsource/alegreya";
import { AppContextProvider } from "./context/appContext";
import SubdomainRouter from "./routes/SubdomainRouter";
import ReactGA from "react-ga4";

ReactGA.initialize("G-WGSG8KJ0Z1");
ReactGA.send("pageview");

const parsedData = window.location.host.split(".");
const subDomain = parsedData[0];

ReactDOM.render(
    <React.StrictMode>
        <AppContextProvider>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <SubdomainRouter subdomain={subDomain} />
                </BrowserRouter>
        </AppContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
