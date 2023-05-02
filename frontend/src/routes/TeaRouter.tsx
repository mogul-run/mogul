import { Route, Routes } from "react-router-dom";
import HomePage from "../tea/homepage";

export function TeaRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>} />
            </Routes>
        </>
    );
}