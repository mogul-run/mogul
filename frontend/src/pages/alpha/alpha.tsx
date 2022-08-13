import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useAuthModal } from "../../context/modalContext";
import Cards from "./cards";

function Series1() {
    const { nft_id } = useParams();
    const isMobile = window.innerWidth < 768;
    const { handleModal } = useAuthModal();
    const { getUser } = useAuth();

    const drawing_width = isMobile ? 350 : 550;

    const handleLMK = () => {
        if (getUser()) {
            console.log(getUser())
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
                                    <div className="text-md">
                                        details for this nft have not been
                                        revealed.
                                    </div>
                                </div>
                                <div>
                                    <div
                                        className="btn-ghost cursor-pointer"
                                        onClick={() => handleLMK()}
                                    >
                                        lmk when?
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // <div className={`w-[${drawing_width}px]`}>
                        <div>
                            <div className="text-6xl bold mb-2">α</div>
                            <div className="text-xs small ">
                                our debut series of 10 NFTs. each nft entitles
                                you to a different real world experience, and
                                provides proof of participation after redeemed.
                                minting nfts are on a first come first serve
                                basis, and nft distribution will be random.
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

export default Series1;
