import { updateProfile } from "@firebase/auth";
import { useAuth } from "../../context/authContext";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import UploadButton from "./components/upload-button";
import DisplayWallet from "./components/web3/display-wallet";
import { useNavigate } from "react-router-dom";

function AccountSettings() {
    const { getWallet, connectWallet } = useAuth();
    const [username, setUsername] = useState("");
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [error, setError] = useState("");
    const { getUser } = useAuth();
    const hiddenFileInput = useRef<HTMLInputElement | null>(null);

    const handleUsername = (username: string) => {
        setUsername(username);
    };

    const handleProfileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        console.log("profile upload");
        if (event.target.files) {
            setSelectedImage(event.target.files[0]);
        }
    };

    const handleSubmit = () => {
        // case where user updates image
        if (selectedImage) {
            const storage = getStorage();
            const profileRef = ref(
                storage,
                `user/${getUser().uid}/profile_img`
            );
            uploadBytes(profileRef, selectedImage);
            // no error catching for now, need to update
            getDownloadURL(profileRef).then((url) => {
                updateProfile(getUser(), {
                    displayName: username ? username : getUser().displayName,
                    photoURL: url,
                }).catch((error: Error) => {
                    console.log(error);
                });
            });
        }
        // non image profile update
        // for now, just update displayName
        else {
            updateProfile(getUser(), {
                displayName: username,
            }).catch((error: Error) => {
                console.log(error);
            });
        }
    };

    const connectWalletHandler = async () => {
        connectWallet().catch((err: Error) => {
            setError(err.message);
        });
    };

    return (
        <div className="m-4 w-90">
            <div className="flex flex-col items-center justify-center p-8 m-2 ">
                <div className="text-xl block uppercase font-bold">
                    Account Settings
                </div>
                <div className="flex space-x-5">
                    <div className="">
                        {" "}
                        <div className="w-full mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-2">
                                UserName
                            </label>
                            <input
                                className="appearance-none block w-full bg-stone-300 text-stone-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-first-name"
                                type="text"
                                placeholder={getUser().displayName}
                                onChange={(e) => handleUsername(e.target.value)}
                            />
                        </div>
                        {/* <div className="w-full mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-stone-600 text-xs font-bold mb-2">
                                Bio
                            </label>
                            <input
                                className="appearance-none block w-full bg-stone-300 text-stone-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                id="grid-first-name"
                                type="text"
                                // placeholder={getUser().displayName}
                                // onChange={(e) => handleUsername(e.target.value)}
                            />
                        </div> */}
                        <DisplayWallet />
                    </div>
                    <div className="">
                        <label className="block uppercase tracking-wide text-stone-700 text-xs font-bold mb-2">
                            Profile Photo
                        </label>
                        <UploadButton
                            selectedImage={selectedImage}
                            handlePhotoUpload={handleProfileUpload}
                        />
                    </div>
                </div>
                <button className="btn-primary" onClick={() => handleSubmit()}>
                    Save Changes{" "}
                </button>
                <div className="error text-red-500 my-2">{error}</div>
            </div>
        </div>
    );
}

export default AccountSettings;
