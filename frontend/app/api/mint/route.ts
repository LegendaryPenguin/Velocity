import { NextResponse } from "next/server";
import { Contract, JsonRpcProvider, Wallet, ethers } from "ethers";

import { encryptMetadata } from "@/lib/encrypt";
import { HUMAN_AGENT_INFT_ABI } from "@/lib/inftAbi";
import { storeEncryptedPayload } from "@/lib/ogStorage";

export const runtime = "nodejs";

const RPC_URL = process.env.OG_RPC_URL ?? "https://evmrpc-testnet.0g.ai";
const INFT_ADDRESS = process.env.NEXT_PUBLIC_INFT_ADDRESS ?? "";
const DEPLOYER_PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";

function isAddress(addr: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(addr);
}

// demo-level rate limit
const lastByIp = new Map<string, number>();
const MIN_MS = 60_000;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const now = Date.now();
    const last = lastByIp.get(ip) ?? 0;
    if (now - last < MIN_MS) {
      return NextResponse.json(
        { ok: false, error: "Rate limit: one mint per minute (demo)." },
        { status: 429 }
      );
    }
    lastByIp.set(ip, now);

    const { to_address, verificationPassed } = await req.json();
    if (verificationPassed !== true) {
      return NextResponse.json(
        { ok: false, error: "Verification gate not satisfied." },
        { status: 403 }
      );
    }
    if (!isAddress(to_address) || to_address === "0x0000000000000000000000000000000000000000") {
      return NextResponse.json({ ok: false, error: "Invalid address" }, { status: 400 });
    }
    if (!isAddress(INFT_ADDRESS)) {
      return NextResponse.json(
        { ok: false, error: "NEXT_PUBLIC_INFT_ADDRESS is missing/invalid." },
        { status: 500 }
      );
    }
    if (!DEPLOYER_PRIVATE_KEY.startsWith("0x")) {
      return NextResponse.json(
        { ok: false, error: "PRIVATE_KEY is missing/invalid." },
        { status: 500 }
      );
    }

    const metadata = {
      type: "human-verification-agent",
      version: "1.0",
      issuer: "ProofofHuman Faucet",
      verified: true,
      verifiedAt: now,
      expiresAt: now + 30 * 24 * 60 * 60 * 1000,
      policy: { cooldownSec: 86400, maxClaims: 1 },
      model: {
        name: "demo-linear-classifier",
        feature_order: ["time_ms", "click_count", "mistakes", "path_straightness"],
        weights: [0.3, -15, -80, -5],
        bias: 500,
        threshold: 0,
      },
    };
    const plaintextJson = JSON.stringify(metadata);
    const encrypted = encryptMetadata(plaintextJson);
    const encryptedPayload = JSON.stringify({
      algorithm: encrypted.algorithm,
      iv: encrypted.ivB64,
      authTag: encrypted.authTagB64,
      ciphertext: encrypted.ciphertextB64,
      sealedKey: encrypted.sealedKeyB64,
    });
    const storage = await storeEncryptedPayload(encryptedPayload);
    const metadataHash = ethers.keccak256(ethers.toUtf8Bytes(plaintextJson));

    const provider = new JsonRpcProvider(RPC_URL);
    const signer = new Wallet(DEPLOYER_PRIVATE_KEY, provider);
    const inft = new Contract(INFT_ADDRESS, HUMAN_AGENT_INFT_ABI, signer);

    const tx = await inft.mint(to_address, storage.uri, metadataHash, {
      gasLimit: 400_000,
    });
    const receipt = await tx.wait();
    const parsed = receipt?.logs
      .map((log: { topics: readonly string[]; data: string }) => {
        try {
          return inft.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find((entry: { name: string; args: { tokenId: bigint } } | null) => entry?.name === "Minted");
    const tokenId = parsed?.args?.tokenId?.toString() ?? null;

    return NextResponse.json({
      ok: true,
      txHash: receipt.hash,
      tokenId,
      encryptedURI: storage.uri,
      storageProvider: storage.provider,
      metadataHash,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { ok: false, error: message },
      { status: 400 }
    );
  }
}