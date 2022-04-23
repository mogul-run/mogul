function TokenInfo() {
    return (
        <div className="flex flex-row  flex-wrap space-x-4 token-wrapper">
            <div className="m-2 ">
                <div className="text-xl font-bold">$LUCAS Token Info</div>
                <a href="https://mumbai.polygonscan.com/address/0x8531f05D2F69E2591Dac5dFcaBc53b614fc636b4" target="__blank">View Token Contract</a>
            </div>
            <div className="m-2">
                <div className="text-xl font-bold">Token Sale</div>
                <a href="https://mumbai.polygonscan.com/address/0xc30Ce1484CD5857fdAEDB321e05B7322D145Ec99#events" target="__blank">View Token Sale Contract</a>
            </div>
        </div>
    );
}

export default TokenInfo;
