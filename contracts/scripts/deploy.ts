import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const MockOracle = await ethers.getContractFactory("MockOracle");
  const oracle = await MockOracle.deploy();
  await oracle.waitForDeployment();
  const oracleAddress = await oracle.getAddress();

  const INFT = await ethers.getContractFactory("HumanAgentINFT");
  const inft = await INFT.deploy("Human Agents", "HUMAN", oracleAddress);
  await inft.waitForDeployment();
  const inftAddress = await inft.getAddress();

  console.log("MockOracle:", oracleAddress);
  console.log("HumanAgentINFT:", inftAddress);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
