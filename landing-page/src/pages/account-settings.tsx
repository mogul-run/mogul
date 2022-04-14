import { updateProfile } from "@firebase/auth";
import { useState } from "react";

function AccountSettings(props: any) {
    const [username, setUsername] = useState("");

    const handleUsername = (username: string) => {
        setUsername(username);
    };

    const handleSubmit = () => {
        updateProfile(props.user, {displayName: username}).catch(
            (error:Error) => {
                console.log(error);
            }
        );
    }

    return (
        <div className="">
            <input
                className="user input rounded p-1 "
                placeholder="Username"
                onChange={(e) => handleUsername(e.target.value)}
            ></input>
            <button className="button-ghost" onClick={() => handleSubmit()}>set </button>
        </div>
    );
}

export default AccountSettings;
