import { ethers } from "hardhat";
import "dotenv/config";

function getArgValue(flag: string): string | undefined {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return undefined;
  return process.argv[idx + 1];
}

async function main() {
  const to = getArgValue("--to");
  const encryptedURI =
    getArgValue("--uri") ?? "demo://human-agent/encrypted-metadata-placeholder";
  const metadataHashHex =
    getArgValue("--hash") ??
    ethers.keccak256(ethers.toUtf8Bytes('{"demo":"metadata"}'));
  const inftAddress = process.env.NEXT_PUBLIC_INFT_ADDRESS;

  if (!to || !ethers.isAddress(to)) {
    throw new Error("Pass a valid recipient: --to 0x...");
  }
  if (!inftAddress || !ethers.isAddress(inftAddress)) {
    throw new Error("NEXT_PUBLIC_INFT_ADDRESS env var is missing/invalid.");
  }

  const contract = await ethers.getContractAt("HumanAgentINFT", inftAddress);
  const tx = await contract.mint(
    to,
    encryptedURI,
    metadataHashHex as `0x${string}`
  );
  const receipt = await tx.wait();
  const event = receipt?.logs
    .map((l) => {
      try {
        return contract.interface.parseLog(l);
      } catch {
        return null;
      }
    })
    .find((e) => e?.name === "Minted");

  console.log("txHash:", receipt?.hash);
  console.log("tokenId:", event?.args?.tokenId?.toString() ?? "unknown");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
