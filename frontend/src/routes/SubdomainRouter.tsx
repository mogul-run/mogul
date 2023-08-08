import App from "../App";
import { CommunitiesRouter } from "./CommunitiesRouter";
import { KitsRouter } from "./KitsRouter";

function SubdomainRouter(props: any) {
    switch (props.subdomain) {
        case "communities":
            return <CommunitiesRouter/>;
        case "kits":
            return <KitsRouter/>;
        default:
            return <App/>
    }
}


export default SubdomainRouter;
