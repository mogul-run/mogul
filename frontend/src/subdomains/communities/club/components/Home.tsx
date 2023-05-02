import Morels from "../../../../img/morels.png";
import Feed from "../../feed";

function Home(props: any) {
    return (
        <div className="w-full">
            {props.userAllowed ? (
                <HomeContent chaletId={props.chaletId} />
            ) : (
                <TokenWall
                    holdingRequirement={props.holdingRequirement}
                    ERC20Bal={props.ERC20Bal}
                />
            )}
        </div>
    );
}

function HomeContent(props: any) {
    return (
        <div className="w-full">
            <Feed chaletId={props.chaletId} />
        </div>
    );
}

function TokenWall(props: any) {
    const tokensNeeded = props.holdingRequirement - Number(props.ERC20Bal);
    return (
        <div className="flex flex-col items-center w-full text-xl">
            <div className="text-2xl font-bold">Bummer...</div>
            <img className="w-96 my-4" src={Morels} />
            <div className="my-2 text-sm">
                You don't own enough <span className="ticker">$LUCAS</span>{" "}
                tokens to get into the house.
            </div>
            <div className="my-2 text-sm">
                {" "}
                You need {tokensNeeded} more{" "}
                <span className="ticker">$LUCAS</span> tokens{" "}
            </div>
        </div>
    );
}

export default Home;
