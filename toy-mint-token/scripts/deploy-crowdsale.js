// migrations/2_deploy.js
// SPDX-License-Identifier: MIT
// const SimpleToken = artifacts.require("SimpleToken");
const payableWallet = "0xdf294464D3fAF933a1d864b6861475ab41B3Cf8F"

async function main() {
    //   await deployer.deploy(SimpleToken, 'Simple Token', 'SIM', '10000000000000000000000');
    //   const token = await SimpleToken.deployed();
    const SimpleCrowdsale = await ethers.getContractFactory("SimpleCrowdsale");

    const simple_crowdsale = await SimpleCrowdsale.deploy(SimpleCrowdsale, 2*10^-12, payableWallet, token.address);
   console.log("Contract deployed to address:", simple_crowdsale.address);
};

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });