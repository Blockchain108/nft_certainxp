const hre = require("hardhat");
const { usdcAddress, sushiSwapAddress } = require('../secrets.json');

async function main() {

  const NFT = await hre.ethers.getContractFactory("ElementCrystals");
  const nft = await NFT.deploy(usdcAddress, sushiSwapAddress);

  await nft.deployed();

  console.log("NFT contract deployed to:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
