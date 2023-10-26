require("@nomiclabs/hardhat-etherscan");

async function main() {
   const PostBounty = await ethers.getContractFactory("PostBounty");

   // Start deployment, returning a promise that resolves to a contract object
   const post_bounty = await PostBounty.deploy()
   console.log("Contract deployed to address:", post_bounty.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
