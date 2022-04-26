import { Route, Routes } from "react-router-dom";
import Login from "./components/login";
import Chalet from "./pages/chalet/chalet";

function SubdomainRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Chalet />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}

export default SubdomainRouter;
