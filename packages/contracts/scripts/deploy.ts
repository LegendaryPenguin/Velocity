import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const MockOracle = await ethers.getContractFactory("MockOracle");
  const oracle = await MockOracle.deploy();
  await oracle.waitForDeployment();

  const HumanAgentINFT = await ethers.getContractFactory("HumanAgentINFT");
  const inft = await HumanAgentINFT.deploy();
  await inft.waitForDeployment();

  const Faucet = await ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy(await inft.getAddress(), 86_400);
  await faucet.waitForDeployment();

  console.log("MockOracle:", await oracle.getAddress());
  console.log("HumanAgentINFT:", await inft.getAddress());
  console.log("Faucet:", await faucet.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
