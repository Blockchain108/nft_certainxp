import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { TestToken__factory } from "../typechain";
const { sushiSwapAddress } = require("../secrets.json");

chai.use(solidity);
const { expect } = chai;

describe("Token, Deploy", () => {
  describe("Mint", async () => {
    it("Should mint with some tokens", async () => {
      const [owner] = await ethers.getSigners();

      const Token = await ethers.getContractFactory("Token");
      const tokenContract = await Token.deploy("100000" + "0".repeat(18));
      const tokenAddress = tokenContract.address;
      const ownerBalance = await tokenContract.balanceOf(owner.address);

      console.log(Number(ownerBalance));
      expect(ownerBalance).to.equal("100000" + "0".repeat(18));

      const NFT = await ethers.getContractFactory("ElementCrystals");
      const nft = await NFT.deploy(tokenAddress, sushiSwapAddress);
      await nft.deployed();

      await tokenContract.approve(nft.address, "100000" + "0".repeat(18));

      const name1 = new Date().valueOf();
      const mint1 = await nft.mintElementCrystal(`nft${name1}`, `ipfs_url${name1}`, tokenAddress, 10);
      await mint1.wait();

      const ownerBalance1 = await tokenContract.balanceOf(owner.address);
      console.log(Number(ownerBalance1));
    });

    // it("Should mint with some other tokens", async () => {
    //   const [owner] = await ethers.getSigners();

    //   const Token = await ethers.getContractFactory("Token");
    //   const tokenContract = await Token.deploy("100000" + "0".repeat(18));
    //   const tokenContract1 = await Token.deploy("100000" + "0".repeat(18));
    //   const tokenAddress = tokenContract.address;
    //   const tokenAddress1 = tokenContract1.address;
    //   const ownerBalance = await tokenContract.balanceOf(owner.address);

    //   console.log(Number(ownerBalance));
    //   expect(ownerBalance).to.equal("100000" + "0".repeat(18));

    //   const NFT = await ethers.getContractFactory("ElementCrystals");
    //   nft = await NFT.deploy(tokenAddress, sushiSwapAddress);
    //   await nft.deployed();

    //   await tokenContract.approve(nft.address, "100000" + "0".repeat(18));

    //   const name1 = new Date().valueOf();
    //   const mint1 = await nft.mintElementCrystal(`nft${name1}`, `ipfs_url${name1}`, tokenAddress, 1);
    //   await mint1.wait();

    //   const ownerBalance1 = await tokenContract.balanceOf(owner.address);
    //   console.log(Number(ownerBalance1));
    // });
  });
});
