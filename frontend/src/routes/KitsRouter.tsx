import { Route, Routes } from "react-router-dom";
import HomePage from "../subdomains/kits/homepage";

export function KitsRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>} />
            </Routes>
        </>
    );
}