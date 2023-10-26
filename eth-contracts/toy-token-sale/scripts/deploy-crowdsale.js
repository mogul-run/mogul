// migrations/2_deploy.js
// SPDX-License-Identifier: MIT
// const SimpleToken = artifacts.require("SimpleToken");
const payableWallet = "0xCe4E67E407aB231925DF614a5e72687fD597324B"
const tokenAddr = "0x622D77bF93ef6f33aFa895789318615878754f4f"

async function main() {
    //   await deployer.deploy(SimpleToken, 'Simple Token', 'SIM', '10000000000000000000000');
    //   const token = await SimpleToken.deployed();
    const SimpleCrowdsale = await ethers.getContractFactory("SimpleCrowdsale");

    const simple_crowdsale = await SimpleCrowdsale.deploy(3000, payableWallet, tokenAddr);
   console.log("Contract deployed to address:", simple_crowdsale.address);
};

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });