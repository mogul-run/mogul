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

const parsedData = window.location.host.split(".");
ReactGA.initialize("G-WGSG8KJ0Z1");
ReactGA.send("pageview");

// temp hard code route
const subDomain = parsedData[0];
ReactDOM.render(
    <React.StrictMode>
        <AppContextProvider>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    {/* temporarily hardcode in chalet -- should use from sort of subdomain switch */}
                    {(parsedData.length >= 2 && subDomain === "tea") ||
                    subDomain === "communities" ? (
                        <SubdomainRouter subdomain={parsedData[0]} />
                    ) : (
                        <App />
                    )}
                </BrowserRouter>
        </AppContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
