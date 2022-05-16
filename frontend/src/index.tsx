import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "@fontsource/dm-mono";
import "@fontsource/alegreya";
import { AppContext, AppContextProvider } from "./context/appContext";
import SubDomainRouter from "./SubdomainRouter";
import { AuthProvider } from "./context/authContext";
import ReactGA from "react-ga4";
import { ModalProvider } from "./context/modalContext";

const parsedData = window.location.host.split(".");
ReactGA.initialize("G-WGSG8KJ0Z1");
ReactGA.send("pageview");

// temp hard code route
const subDomain = parsedData[0];
ReactDOM.render(
    <React.StrictMode>
        <AppContextProvider>
            <AuthProvider>
                    <BrowserRouter basename={process.env.PUBLIC_URL}>
                        {/* temporarily hardcode in chalet -- should use from sort of subdomain switch */}
                        {(parsedData.length >= 2 && subDomain === "the") ||
                        subDomain === "lucas" ? (
                            <SubDomainRouter subdomain={parsedData[0]} />
                        ) : (
                            <App />
                        )}
                    </BrowserRouter>
            </AuthProvider>
        </AppContextProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
