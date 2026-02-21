import { ethers } from "hardhat";
import "dotenv/config";

function getArg(flag: string): string | undefined {
  const i = process.argv.indexOf(flag);
  if (i < 0) return undefined;
  return process.argv[i + 1];
}

async function main() {
  const to = getArg("--to");
  const inftAddress = process.env.NEXT_PUBLIC_INFT_ADDRESS ?? "";
  if (!to || !ethers.isAddress(to)) {
    throw new Error("Pass --to 0x...");
  }
  if (!ethers.isAddress(inftAddress)) {
    throw new Error("NEXT_PUBLIC_INFT_ADDRESS is missing/invalid");
  }

  const metadata = JSON.stringify({
    type: "human-agent",
    issuer: "0G Trust Studio",
    verified: true,
    verifiedAt: Date.now()
  });
  const metadataHash = ethers.keccak256(ethers.toUtf8Bytes(metadata));

  const inft = await ethers.getContractAt("HumanAgentINFT", inftAddress);
  const tx = await inft.mint(to, "demo://encrypted/placeholder", metadataHash);
  const receipt = await tx.wait();
  console.log("txHash:", receipt?.hash);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
