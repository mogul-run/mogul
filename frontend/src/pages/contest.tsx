import { useContext, useEffect, useState } from "react";
import { AppContext } from "../appContext"


export const ContestPage: React.FC = () => {
    const context = useContext(AppContext)!
    const [data, setData] = useState<string>();

    useEffect(() => {
        context.invokeFunction('canIGetIt', {})
        .then(resp => setData(resp.data));
    }, []);

    return <>
        Hello world: {data}

        <div>
        </div>
    </>
}