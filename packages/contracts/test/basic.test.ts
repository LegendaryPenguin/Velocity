import { expect } from "chai";
import { ethers } from "hardhat";

describe("0G Trust Studio contracts", () => {
  it("deploys all contracts", async () => {
    const Inft = await ethers.getContractFactory("HumanAgentINFT");
    const inft = await Inft.deploy();
    await inft.waitForDeployment();
    expect(await inft.getAddress()).to.match(/^0x[a-fA-F0-9]{40}$/);
  });

  it("mints agent with metadata", async () => {
    const [, user] = await ethers.getSigners();
    const Inft = await ethers.getContractFactory("HumanAgentINFT");
    const inft = await Inft.deploy();
    await inft.waitForDeployment();

    const uri = "demo://encrypted/test";
    const hash = ethers.keccak256(ethers.toUtf8Bytes("payload"));
    await inft.mint(user.address, uri, hash);

    const tokenId = await inft.ownerToTokenId(user.address);
    expect(tokenId).to.equal(1n);
    expect(await inft.getEncryptedURI(tokenId)).to.equal(uri);
    expect(await inft.getMetadataHash(tokenId)).to.equal(hash);
  });

  it("authorizes usage and faucet claim respects cooldown", async () => {
    const [, user] = await ethers.getSigners();
    const Inft = await ethers.getContractFactory("HumanAgentINFT");
    const inft = await Inft.deploy();
    await inft.waitForDeployment();

    const hash = ethers.keccak256(ethers.toUtf8Bytes("agent"));
    await inft.mint(user.address, "demo://agent", hash);
    const tokenId = await inft.ownerToTokenId(user.address);

    expect(await inft.canUse(tokenId, user.address)).to.equal(true);
    await inft.connect(user).authorizeUsage(tokenId, user.address, true);

    const Faucet = await ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy(await inft.getAddress(), 60);
    await faucet.waitForDeployment();

    await expect(faucet.connect(user).claim(user.address, user.address)).to.emit(faucet, "Claimed");
    await expect(faucet.connect(user).claim(user.address, user.address)).to.be.revertedWith("Cooldown active");
  });
});
