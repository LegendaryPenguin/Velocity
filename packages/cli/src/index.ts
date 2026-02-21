#!/usr/bin/env node
import { spawn } from "child_process";
import { Command } from "commander";
import "dotenv/config";
import { Contract, JsonRpcProvider, Wallet, ethers } from "ethers";

import { checkAgentStatus } from "../../sdk/src";

const INFT_ABI = [
  "function mint(address to, string encryptedURI, bytes32 metadataHash) returns (uint256)"
] as const;
const FAUCET_ABI = [
  "function claim(address caller, address recipient)",
  "function cooldownRemaining(address wallet) view returns (uint256)"
] as const;

function mustEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

async function run() {
  const program = new Command();
  program.name("ogtrust").description("0G Trust Studio CLI");

  program
    .command("init")
    .description("print bootstrap checklist")
    .action(() => {
      console.log("0G Trust Studio CLI initialized.");
      console.log("Next steps:");
      console.log("1) Fill .env");
      console.log("2) ogtrust deploy");
      console.log("3) ogtrust mint-agent --to 0x...");
    });

  program
    .command("deploy")
    .description("deploy contracts to 0G testnet")
    .action(async () => {
      await new Promise<void>((resolve, reject) => {
        const child = spawn(
          "npm",
          ["--workspace", "@ogtrust/contracts", "run", "deploy:og"],
          { stdio: "inherit", shell: true }
        );
        child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error("Deploy failed"))));
      });
    });

  program
    .command("mint-agent")
    .requiredOption("--to <wallet>")
    .description("mint human agent iNFT")
    .action(async (opts: { to: string }) => {
      const rpc = mustEnv("OG_RPC_URL");
      const pk = mustEnv("PRIVATE_KEY");
      const inftAddress = mustEnv("NEXT_PUBLIC_INFT_ADDRESS");
      const provider = new JsonRpcProvider(rpc);
      const signer = new Wallet(pk, provider);
      const inft = new Contract(inftAddress, INFT_ABI, signer);
      const metadata = JSON.stringify({
        type: "human-agent",
        issuer: "0G Trust Studio",
        verified: true,
        verifiedAt: Date.now()
      });
      const metadataHash = ethers.keccak256(ethers.toUtf8Bytes(metadata));
      const tx = await inft.mint(opts.to, "demo://encrypted/cli", metadataHash);
      const receipt = await tx.wait();
      console.log("Agent minted.");
      console.log("txHash:", receipt?.hash);
    });

  const agent = program.command("agent").description("agent commands");
  agent
    .command("status")
    .requiredOption("--wallet <wallet>")
    .action(async (opts: { wallet: string }) => {
      const result = await checkAgentStatus(
        mustEnv("OG_RPC_URL"),
        mustEnv("NEXT_PUBLIC_INFT_ADDRESS"),
        opts.wallet
      );
      console.log("Agent status");
      console.log(result);
    });

  const faucet = program.command("faucet").description("faucet commands");
  faucet
    .command("claim")
    .requiredOption("--to <wallet>")
    .action(async (opts: { to: string }) => {
      const provider = new JsonRpcProvider(mustEnv("OG_RPC_URL"));
      const signer = new Wallet(mustEnv("PRIVATE_KEY"), provider);
      const faucetAddress = mustEnv("NEXT_PUBLIC_FAUCET_ADDRESS");
      const contract = new Contract(faucetAddress, FAUCET_ABI, signer);
      const tx = await contract.claim(opts.to, opts.to);
      const receipt = await tx.wait();
      console.log("Faucet claim action submitted.");
      console.log("txHash:", receipt?.hash);
    });

  program
    .command("generate")
    .description("print integration scaffold")
    .action(() => {
      console.log("Generated integration snippet:");
      console.log("Connect Wallet -> Verify -> Mint Agent -> Claim Faucet");
      console.log("Use @ogtrust/sdk verifyHuman(), mintAgent(), checkAgentStatus().");
    });

  await program.parseAsync(process.argv);
}

run().catch((err) => {
  console.error("ogtrust error:", err.message);
  process.exit(1);
});
