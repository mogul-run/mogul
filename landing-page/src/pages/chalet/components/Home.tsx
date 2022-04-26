import Morels from "../../../img/morels.png";

function Home(props: any) {
    return <div>{props.userAllowed ? <HomeContent /> : <TokenWall holdingRequirement={props.holdingRequirement} ERC20Bal={props.ERC20Bal} />}</div>;
}

function HomeContent() {
    return <div>You got in!</div>;
}


function TokenWall(props: any) {
    const tokensNeeded = props.holdingRequirement - Number(props.ERC20Bal);
    return (
        <div className="flex flex-col w-full text-xl token-wall">
            <div className="text-3xl font-bold">Bummer...</div>
            <img className="w-96 my-4" src={Morels}/>
            <div className="my-2">You don't own enough <span className="ticker">$LUCAS</span> tokens to get into the house.</div>
            <div className="my-2"> You need {tokensNeeded} more <span className="ticker">$LUCAS</span> tokens </div>
        </div>
    );
}

export default Home;
