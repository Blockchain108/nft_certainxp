require("@nomiclabs/hardhat-waffle");
const { mnemonic } = require('./secrets.json');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  // solidity: "0.8.4",


  defaultNetwork: "testnet",
  networks: {
    testnet: {
      url: "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      chainId: 3,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic }
    },
    mainnet: {
      url: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
      chainId: 1,
      gasPrice: 20000000000,
      accounts: { mnemonic: mnemonic }
    }
  },
  solidity: {
    version: "0.7.6",
    settings: {
      optimizer: {
        enabled: true
      }
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 20000
  }

};
