require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
const key = process.env.KEY;
const url = process.env.URL;

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.4",
  networks: {
    fuji: {
      url: url,
      accounts: [key]
    }
  }
};
