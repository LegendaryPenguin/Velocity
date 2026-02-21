import { NextResponse } from "next/server";
import { Contract, JsonRpcProvider, Wallet, ethers } from "ethers";

import { encryptJson } from "@/lib/encrypt";
import { HUMAN_AGENT_INFT_ABI } from "@/lib/inftAbi";
import { storeEncryptedMetadata } from "@/lib/ogStorage";

export const runtime = "nodejs";

const lastByIp = new Map<string, number>();
const MIN_MS = 15_000;

function isAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "local";
    const now = Date.now();
    const last = lastByIp.get(ip) ?? 0;
    if (now - last < MIN_MS) {
      return NextResponse.json({ ok: false, error: "Rate limit: wait a few seconds." }, { status: 429 });
    }
    lastByIp.set(ip, now);

    const { to_address, verificationPassed } = await req.json();
    if (verificationPassed !== true) {
      return NextResponse.json({ ok: false, error: "Verification required." }, { status: 403 });
    }
    if (!isAddress(to_address)) {
      return NextResponse.json({ ok: false, error: "Invalid wallet address." }, { status: 400 });
    }

    const rpcUrl = process.env.OG_RPC_URL ?? "https://evmrpc-testnet.0g.ai";
    const pk = process.env.PRIVATE_KEY ?? "";
    const inftAddress = process.env.NEXT_PUBLIC_INFT_ADDRESS ?? "";
    if (!pk.startsWith("0x") || !isAddress(inftAddress)) {
      return NextResponse.json({ ok: false, error: "Missing deployment env vars." }, { status: 500 });
    }

    const metadata = {
      type: "human-agent",
      issuer: "0G Trust Studio",
      verified: true,
      verifiedAt: now,
      expiresAt: now + 30 * 24 * 60 * 60 * 1000,
      policy: { cooldownSec: 86400 },
      model: { name: "demo-classifier" }
    };
    const plaintext = JSON.stringify(metadata);
    const encryptedPayload = JSON.stringify(encryptJson(plaintext));
    const encryptedURI = await storeEncryptedMetadata(encryptedPayload);
    const metadataHash = ethers.keccak256(ethers.toUtf8Bytes(plaintext));

    const provider = new JsonRpcProvider(rpcUrl);
    const signer = new Wallet(pk, provider);
    const inft = new Contract(inftAddress, HUMAN_AGENT_INFT_ABI, signer);
    const tx = await inft.mint(to_address, encryptedURI, metadataHash, { gasLimit: 500_000 });
    const receipt = await tx.wait();
    const parsed = receipt?.logs
      .map((log: { topics: readonly string[]; data: string }) => {
        try {
          return inft.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find((v: { name: string; args: { tokenId: bigint } } | null) => v?.name === "Minted");
    const tokenId = parsed?.args?.tokenId?.toString() ?? null;

    return NextResponse.json({
      ok: true,
      tokenId,
      txHash: receipt?.hash,
      encryptedURI,
      metadataHash
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
