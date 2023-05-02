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
