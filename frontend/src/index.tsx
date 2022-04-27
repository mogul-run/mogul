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

const parsedData = window.location.host.split(".");

// temp hard code route
const subDomain = parsedData[0];
ReactDOM.render(
    <React.StrictMode>
        <AppContextProvider>
            <AuthProvider>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    {/* temporarily hardcode in chalet -- should use from sort of subdomain switch */}
                    {parsedData.length >= 2  ? (
                        <SubDomainRouter subdomain={parsedData[0]}/>
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
