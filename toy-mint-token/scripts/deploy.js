const defaultOperators = ["0xdf294464D3fAF933a1d864b6861475ab41B3Cf8F"]

async function main() {
   const LucasToken = await ethers.getContractFactory("LucasToken");

   // Start deployment, returning a promise that resolves to a contract object
   const lucas_token = await LucasToken.deploy(defaultOperators)
   console.log("Contract deployed to address:", lucas_token.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
