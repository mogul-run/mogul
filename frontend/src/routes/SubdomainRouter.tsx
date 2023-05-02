import { Route, Routes } from "react-router-dom";
import Chalet from "../communities/club/club";
import MogulRun from "../communities/bulletin/bulletin";
import AccountSettings from "../communities/account-settings";
import { WithNavFooter } from "../App";
import CommunitiesHomePage from "../communities/homepage";
import { CommunitiesRouter } from "./CommunitiesRouter";
import { TeaRouter } from "./TeaRouter";

function SubdomainRouter(props: any) {
    switch (props.subdomain) {
        case "communities":
            return <CommunitiesRouter/>;
        case "tea":
            return <TeaRouter/>;
    }
    return <div />;
}


export default SubdomainRouter;
