import { useRef } from "react";


//Upload Button with Hidden File 
// Currently only accepts photos
function UploadButton(props: any) {
    const hiddenFileInput = useRef<HTMLInputElement | null>(null);
    const handleFileClick = () => {
        hiddenFileInput.current && hiddenFileInput.current.click();
    };

    return (
        <div>
            <button
                onClick={handleFileClick}
                className="bg-stone-300 hover:bg-morange hover:text-white text-stone-600 font-bold py-2 px-4 rounded inline-flex items-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 pr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                    />
                </svg>
                <span>Upload</span>
            </button>
            <input
                type="file"
                accept="image/*"
                ref={hiddenFileInput}
                onChange={(e) => props.handlePhotoUpload(e)}
                style={{ display: "none" }}
            />
            {props.selectedImage && (
                <div>
                    <img
                        alt="not found"
                        className="w-64 rounded mt-1"
                        src={URL.createObjectURL(props.selectedImage)}
                    />
                    <br />
                </div>
            )}
        </div>
    )
    ;
}

export default UploadButton;
