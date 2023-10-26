/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");

const { API_URL, PRIVATE_KEY, POLYGONSCAN_API_KEY } = process.env;

module.exports = {
   solidity: "0.8.1",
   // solidity: {
   //    compilers: [
   //       {
   //          version: "^0.8.1"
   //       },
   //       {
   //          version: "^0.8.0"
   //       },
   //       // {
   //       //    version: "0.5.5"
   //       // }
   //    ]
   // },
   defaultNetwork: "polygon_mumbai",
   networks: {
      hardhat: {},
      polygon_mumbai: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },

   etherscan: {
      apiKey: POLYGONSCAN_API_KEY,
   }
}
