import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";


export const ContestPage: React.FC = () => {
    const context = useContext(AppContext)!
    const [data, setData] = useState<string>();

    useEffect(() => {
        context.invokeFunction('myFirstHandler', {})
        .then(resp => setData(resp.data));
    }, []);

    return <div>
        <h1 className='text-xl'>Welcome to the Contest ... </h1>
        <div>
            <div className='border border-black border-solid h-48 w-96'>
                Drag and drop a file to upload
            </div>
        </div>

        <div className='text-green-500'>
            This is the data fetched from the function: {data}
        </div>
    </div>
}