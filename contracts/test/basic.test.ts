import { expect } from "chai";
import { ethers } from "hardhat";

describe("HumanAgentINFT", function () {
  it("deploys and mints with encrypted URI/hash", async function () {
    const [owner, addr1] = await ethers.getSigners();

    const MockOracle = await ethers.getContractFactory("MockOracle");
    const oracle = await MockOracle.deploy();
    await oracle.waitForDeployment();

    const INFT = await ethers.getContractFactory("HumanAgentINFT");
    const inft = await INFT.deploy(
      "Human Agents",
      "HUMAN",
      await oracle.getAddress()
    );
    await inft.waitForDeployment();

    const encryptedURI = "demo://encrypted/agent-1";
    const metadataHash = ethers.keccak256(
      ethers.toUtf8Bytes('{"verified":true}')
    );

    await inft.connect(owner).mint(addr1.address, encryptedURI, metadataHash);

    expect(await inft.ownerOf(1n)).to.equal(addr1.address);
    expect(await inft.getEncryptedURI(1n)).to.equal(encryptedURI);
    expect(await inft.getMetadataHash(1n)).to.equal(metadataHash);
  });
});
