import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/appContext"
import User from "../models";
import {doc, setDoc} from "firebase/firestore"; 


export const ContestPage: React.FC = () => {
    const context = useContext(AppContext)!
    const [data, setData] = useState<string>();

    useEffect(() => {
        context.invokeFunction('myFirstHandler', {})
        .then(resp => setData(resp.data));
    }, []);

    const createuser = async () => {
        const user = new User("charles", "yu");
        const db = context.firestore;

        const target = doc(db, "users", user.id);
        const resp = await setDoc(target, user);
        console.log("Success!", resp);
    
    }

    return <div>
        <h1 className='text-xl'>Welcome to the Contest ... </h1>
        <div>
            <div className='border border-black border-solid h-48 w-96'>
                Drag and drop a file to upload
            </div>
        </div>

        <div>
            <button onClick={createuser}>Click me to create a user</button>
        </div>

        <div className='text-green-500'>
            This is the data fetched from the function: {data}
        </div>
    </div>
}