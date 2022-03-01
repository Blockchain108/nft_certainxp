import { ethers } from "hardhat";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { sushiSwapAddress } from "../secrets.json"; // have to change to rinkby sushiswap
import sushiSwapABI from "./sushiSwap.json";
import Contract from "web3-eth-contract";

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

    it("Should mint with some other tokens", async () => {
      const [owner] = await ethers.getSigners();

      const Token = await ethers.getContractFactory("Token");
      const tokenContract = await Token.deploy("100000" + "0".repeat(18));
      const tokenContract1 = await Token.deploy("100000" + "0".repeat(18));
      const tokenAddress = tokenContract.address;
      const tokenAddress1 = tokenContract1.address;

      // @ts-ignore
      const sushiSwapContract = new Contract(sushiSwapABI, sushiSwapAddress);

      console.log(sushiSwapContract.address);

      await tokenContract.approve(sushiSwapAddress, "100000" + "0".repeat(18));
      await tokenContract1.approve(sushiSwapAddress, "100000" + "0".repeat(18));

      await sushiSwapContract.addLiquidity(
        tokenAddress,
        tokenAddress1,
        "100" + "0".repeat(18),
        "100" + "0".repeat(18),
        "0",
        "0",
        owner.address,
        new Date().valueOf() + 86400000,
      );

      const NFT = await ethers.getContractFactory("ElementCrystals");
      const nft = await NFT.deploy(tokenAddress, sushiSwapAddress);
      await nft.deployed();

      await tokenContract.approve(nft.address, "100000" + "0".repeat(18));
      await tokenContract1.approve(nft.address, "100000" + "0".repeat(18));

      const name1 = new Date().valueOf();
      const mint1 = await nft.mintElementCrystal(`nft${name1}`, `ipfs_url${name1}`, tokenAddress1, 1);
      await mint1.wait();

      const ownerBalance11 = await tokenContract.balanceOf(owner.address);
      const ownerBalance12 = await tokenContract1.balanceOf(owner.address);
      console.log(Number(ownerBalance11), Number(ownerBalance12));
    });
  });
  //   it("Should mint with some other tokens", async () => {
  //     const [owner] = await ethers.getSigners();

  //     const Token = await ethers.getContractFactory("Token");
  //     const tokenContract = await Token.deploy("100000" + "0".repeat(18));
  //     const tokenContract1 = await Token.deploy("100000" + "0".repeat(18));
  //     const tokenAddress = tokenContract.address;
  //     const tokenAddress1 = tokenContract1.address;

  //     const WETH9 = await ethers.getContractFactory("WETH9");
  //     const WETH9Contract = await WETH9.deploy();

  //     const UniswapV2Factory = await ethers.getContractFactory("UniswapV2Factory");
  //     const UniswapV2FactoryContract = await UniswapV2Factory.deploy("0xee83E2FB9602E4694184b00C6598139D785f891E");

  //     const SushiSwap = await ethers.getContractFactory("UniswapV2Router02");
  //     console.log(WETH9Contract.address, UniswapV2FactoryContract.address);
  //     const sushiSwapContract = await SushiSwap.deploy(WETH9Contract.address, UniswapV2FactoryContract.address);

  //     console.log(sushiSwapContract.address);

  //     await tokenContract.approve(sushiSwapAddress, "100000" + "0".repeat(18));
  //     await tokenContract1.approve(sushiSwapAddress, "100000" + "0".repeat(18));

  //     await sushiSwapContract.addLiquidity(
  //       tokenAddress,
  //       tokenAddress1,
  //       "100" + "0".repeat(18),
  //       "100" + "0".repeat(18),
  //       "0",
  //       "0",
  //       owner.address,
  //       new Date().valueOf() + 86400000,
  //     );

  //     const NFT = await ethers.getContractFactory("ElementCrystals");
  //     const nft = await NFT.deploy(tokenAddress, sushiSwapContract.address);
  //     await nft.deployed();

  //     await tokenContract.approve(nft.address, "100000" + "0".repeat(18));
  //     await tokenContract1.approve(nft.address, "100000" + "0".repeat(18));

  //     const name1 = new Date().valueOf();
  //     const mint1 = await nft.mintElementCrystal(`nft${name1}`, `ipfs_url${name1}`, tokenAddress1, 1);
  //     await mint1.wait();

  //     const ownerBalance11 = await tokenContract.balanceOf(owner.address);
  //     const ownerBalance12 = await tokenContract1.balanceOf(owner.address);
  //     console.log(Number(ownerBalance11), Number(ownerBalance12));
  //   });
  // });
});
