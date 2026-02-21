import { Contract, JsonRpcProvider } from "ethers";

export type VerifyResult = { verificationToken: string; verified: boolean };
export type MintResult = {
  ok: boolean;
  txHash?: string;
  tokenId?: string | null;
  encryptedURI?: string;
  metadataHash?: string;
  error?: string;
};

const INFT_ABI = [
  "function ownerToTokenId(address owner) view returns (uint256)",
  "function getEncryptedURI(uint256 tokenId) view returns (string)",
  "function getMetadataHash(uint256 tokenId) view returns (bytes32)",
  "function authorizeUsage(uint256 tokenId, address executor, bool allowed)"
] as const;

export function verifyHuman(passed: boolean): VerifyResult {
  return {
    verified: passed,
    verificationToken: passed ? `verified-${Date.now()}` : "unverified"
  };
}

export async function mintAgent(baseUrl: string, wallet: string): Promise<MintResult> {
  const res = await fetch(`${baseUrl}/api/mint`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ to_address: wallet, verificationPassed: true })
  });
  return (await res.json()) as MintResult;
}

export async function checkAgentStatus(
  rpcUrl: string,
  inftAddress: string,
  wallet: string
): Promise<{
  tokenId: string;
  encryptedURI: string;
  metadataHash: string;
}> {
  const provider = new JsonRpcProvider(rpcUrl);
  const contract = new Contract(inftAddress, INFT_ABI, provider);
  const tokenId = await contract.ownerToTokenId(wallet);
  if (tokenId === 0n) {
    throw new Error("No agent for wallet");
  }
  const [encryptedURI, metadataHash] = await Promise.all([
    contract.getEncryptedURI(tokenId),
    contract.getMetadataHash(tokenId)
  ]);
  return {
    tokenId: tokenId.toString(),
    encryptedURI: String(encryptedURI),
    metadataHash: String(metadataHash)
  };
}

export async function authorizeAction(
  contract: Contract,
  tokenId: bigint,
  executor: string
): Promise<string> {
  const tx = await contract.authorizeUsage(tokenId, executor, true);
  const receipt = await tx.wait();
  return receipt?.hash ?? "";
}
