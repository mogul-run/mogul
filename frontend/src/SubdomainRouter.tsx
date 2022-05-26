import { Route, Routes } from "react-router-dom";
import Chalet from "./pages/chalet/chalet";
import MogulRun from "./pages/bulletin/bulletin";
import AccountSettings from "./pages/account-settings";

function SubdomainRouter(props: any) {
    switch (props.subdomain) {
        case "lucas":
            return <ChaletRouter />;
        case "the":
            return <MogulRunRouter />;
        
    }
    return <div/>
}

function ChaletRouter() {
    return (
    <>
        <Routes>
            <Route path="/" element={<Chalet />} />
            <Route path="/account-settings" element={<AccountSettings/>} />
        </Routes>
    </>
    );
}
function MogulRunRouter() {
    return (
    <>
        <Routes>
            <Route path="/" element={<MogulRun />} />
            <Route path="/account-settings" element={<AccountSettings/>} />
        </Routes>
    </>
    );
}

export default SubdomainRouter;
