import { useEffect, useState } from "react";
import "./test-sale.css";
import { ethers } from "ethers";

const crowdsaleAddr = "0xc30Ce1484CD5857fdAEDB321e05B7322D145Ec99";
const tokenAddr = "0x8531f05D2F69E2591Dac5dFcaBc53b614fc636b4";
const saleRatio = 1;

const contractABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",

    // Get the account balance
    "function balanceOf(address) view returns (uint)",

    // Send some of your tokens to someone else
    "function transfer(address to, uint amount)",

    // An event triggered whenever anyone transfers to someone else
    "event Transfer(address indexed from, address indexed to, uint amount)",
];

function TestSale(props: any) {
    const [numTokens, setNumTokens] = useState(0);
    const [tokenBalance, setTokenBalance] = useState(0);

    useEffect(() => {
        getTokenBalance();
    });

    const getTokenBalance = async () => {
        try {
            const { ethereum } = window as any;
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const hex_balance = await provider.getBalance(tokenAddr);
                // setTokenBalance(ethers.utils.formatEther(hex_balance));
            } else {
                alert("please install metamask");
            }
        } catch (err) {
            console.log("error while retrieving balance", err);
        }
    };
    const updateInputValue = (event: any) => {
        setNumTokens(event.target.value);
    };

    const handlePurchase = async () => {
        try {
            const { ethereum } = window as any;

            if (ethereum) {
                // provider, signer, then generate nftcontract
                const provider = new ethers.providers.Web3Provider(ethereum);
                const params = [
                    {
                        from: props.userAccount,
                        to: crowdsaleAddr,
                        // value: 1,
                        value: ethers.utils
                            .parseUnits(String(numTokens), "matic")
                            .toHexString(),
                    },
                ];
                console.log("params: ", params)

                const transactionHash = await provider.send(
                    "eth_sendTransaction",
                    params
                );
                console.log("transactionHash is " + transactionHash);
                // provider uses private key to provide signer object to "sign" tx (access balance)
            } else {
                alert("please install metamask");
            }
        } catch (err) {
            console.log("error while handling purchase:", err);
        }
    };
    return (
        <div className="test-sale-wrapper">
            <h1>Token Sale for $LUCAS</h1>
            <div>Token address: 0xc30Ce1484CD5857fdAEDB321e05B7322D145Ec99</div>
            <div> Total $LUCAS that can be sold {tokenBalance}</div>
            <br />
            <div>
                Number of $LUCAS to buy:
                <div>
                    <input
                        value={numTokens}
                        onChange={(event) => updateInputValue(event)}
                    />
                    $LUCAS
                </div>
                <br />
                Total cost: {numTokens * saleRatio} $MATIC
                <div>
                    <button onClick={() => handlePurchase()}> purchase </button>
                </div>
            </div>
        </div>
    );
}

export default TestSale;
