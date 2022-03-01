const hre = require("hardhat");
const { usdcAddress, otherCoinAddress, sushiSwapAddress } = require('../secrets.json');

describe("ElementCrystals", function () {
  it("start", async function () {
    const NFT = await hre.ethers.getContractFactory("ElementCrystals");
    const nft = await NFT.deploy(usdcAddress, sushiSwapAddress);

    await nft.deployed();

    console.log("NFT contract deployed to:", nft.address);

    const name1 = new Date().valueOf()

    const mint1 = await nft.mintElementCrystal(
      `nft${name1}`, `ipfs_url${name1}`, usdcAddress, 10
    );
    await mint1.wait();
    console.log("NFT mint success with virtual usdc coin")

    const name2 = new Date().valueOf()
    const mint2 = await nft.mintElementCrystal(
      `nft${name2}`, `ipfs_url${name2}`, otherCoinAddress, 10
    );
    await mint2.wait();
    console.log("NFT mint success with virtual coin that is not usdc")

    console.log("unit test done")

  });
});
