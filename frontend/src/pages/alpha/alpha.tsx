import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useAuthModal } from "../../context/modalContext";
import Cards from "./cards";

// to do: add sign up for rsvp list
// to do: add nft entries in db

function Alpha() {
    const { nft_id } = useParams();
    const isMobile = window.innerWidth < 768;
    const { handleModal } = useAuthModal();
    const { getUser } = useAuth();
    let navigate = useNavigate();

    const drawing_width = isMobile ? 350 : 550;

    const handleLMK = () => {
        if (getUser()) {
            // add user to rsvp list

            console.log(getUser());
        } else {
            handleModal(true);
        }
    };
    const handleWant = () => {
        if (getUser()) {
            // add user to rsvp list
            console.log(getUser());
        } else {
            handleModal(true);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-100 w-full">
            <div className="bg-stone-100 rounded mt-3 px-4 py-4">
                <div className="flex">
                    <Cards width={drawing_width} height={550} />
                </div>
                <div className={`-mt-10 w-[500px]`}>
                    {nft_id ? (
                        <div>
                            <div className="text-6xl font-bold script mb-2">
                                α<span>[{nft_id}]</span>
                            </div>
                            <div className="flex space-x-2">
                                <div>
                                    <div className="text-2xl font-bold cursor-pointer">
                                        ???
                                    </div>
                                    <div className="text-xs">
                                        details for this nft have not been
                                        revealed.
                                    </div>
                                </div>
                                <div className="flex flex-col content-start">
                                    <div
                                        className="btn-ghost cursor-pointer"
                                        onClick={() => handleWant()}
                                    >
                                        i want
                                    </div>
                                    <div
                                        className="text-xs text-orange-600 mx-2 cursor-pointer"
                                        onClick={() => navigate(`/alpha/`)}
                                    >
                                        bring me home
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // <div className={`w-[${drawing_width}px]`}>
                        <div className="flex space-y-2 items-center">
                            <div>
                                <div className="text-6xl bold mb-2">α</div>
                                <div className="text-xs">
                                    our debut series of 10 nfts. each nft
                                    entitles you to a guided outdoor 
                                    experience: surfing lessons in santa
                                    cruz, bouldering at mortar rock,
                                    biking around san francisco and more. experiences
                                    come with equipment provided and curated food and beverage
                                    pairings.
                                    <br/>
                                    <br/>
                                     minting nfts are on a first come
                                    first serve basis, and minting entitles you
                                    to one randomly selected nft. nfts can be
                                    transferred or sold after minting, but can only be
                                    redeemed once.
                                </div>
                            </div>
                            <div>
                                <div
                                    className="btn-ghost font-bold cursor-pointer"
                                    onClick={() => handleLMK()}
                                >
                                    lmk when
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {nft_id && <div className="cursor-pointer"></div>}

                {/* <div className="btn-primary my-10">Keep me in the loop!</div> */}
            </div>
        </div>
    );
}

export default Alpha;
