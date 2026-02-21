import path from "path";
import { config as loadEnv } from "dotenv";

loadEnv({ path: path.resolve(__dirname, "../../.env") });

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { task } from "hardhat/config";

const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";
const OG_RPC_URL = process.env.OG_RPC_URL ?? "https://evmrpc-testnet.0g.ai";

task("deploy", "Deploy MockOracle, HumanAgentINFT, and Faucet").setAction(async (_, hre) => {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const MockOracle = await hre.ethers.getContractFactory("MockOracle");
  const oracle = await MockOracle.deploy();
  await oracle.waitForDeployment();

  const HumanAgentINFT = await hre.ethers.getContractFactory("HumanAgentINFT");
  const inft = await HumanAgentINFT.deploy();
  await inft.waitForDeployment();

  const Faucet = await hre.ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy(await inft.getAddress(), 86_400);
  await faucet.waitForDeployment();

  console.log("MockOracle:", await oracle.getAddress());
  console.log("HumanAgentINFT:", await inft.getAddress());
  console.log("Faucet:", await faucet.getAddress());
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: { enabled: true, runs: 200 }
    }
  },
  networks: {
    hardhat: {},
    "og-testnet": {
      url: OG_RPC_URL,
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : []
    }
  }
};

export default config;
