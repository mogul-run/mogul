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
            <div
                onClick={handleFileClick}
                className="cursor-pointer bg-stone-300 hover:bg-sky-600 hover:text-stone-100 text-stone-600 font-bold py-2 px-4 rounded inline-flex items-center"
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
            </div>
            <input
                type="file"
                accept="image/*"
                multiple={props.multiple}
                ref={hiddenFileInput}
                onChange={(e) => props.handlePhotoUpload(e)}
                style={{ display: "none" }}
            />
            {props.selectedImage && !props.multiple && (
                <div>
                    <img
                        alt="not found"
                        className="w-48 h-48 object-cover rounded mt-1"
                        src={URL.createObjectURL(props.selectedImage)}
                    />
                    <br />
                </div>
            )}
            {props.selectedImages && props.multiple && (
                <div className="grid grid-cols-4">
                    {[...props.selectedImages].map((img: File) => {
                        for (let i = 0; i < props.selectedImages.length; i++) {
                            return (
                                <div className="col-span-1">
                                    <img
                                        alt="not found"
                                        className="w-32 rounded mt-1"
                                        src={URL.createObjectURL(img)}
                                    />
                                    <br />
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
}

export default UploadButton;
