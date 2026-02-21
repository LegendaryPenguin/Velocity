import { NextResponse } from "next/server";
import { Contract, JsonRpcProvider } from "ethers";

import { FAUCET_ABI, HUMAN_AGENT_INFT_ABI } from "@/lib/inftAbi";

function isAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const wallet = searchParams.get("wallet") ?? "";
    if (!isAddress(wallet)) {
      return NextResponse.json({ ok: false, error: "Invalid wallet" }, { status: 400 });
    }

    const rpcUrl = process.env.OG_RPC_URL ?? "https://evmrpc-testnet.0g.ai";
    const inftAddress = process.env.NEXT_PUBLIC_INFT_ADDRESS ?? "";
    if (!isAddress(inftAddress)) {
      return NextResponse.json({ ok: false, error: "INFT address missing" }, { status: 500 });
    }

    const provider = new JsonRpcProvider(rpcUrl);
    const inft = new Contract(inftAddress, HUMAN_AGENT_INFT_ABI, provider);
    const tokenId = (await inft.ownerToTokenId(wallet)) as bigint;
    if (tokenId === 0n) {
      return NextResponse.json({ ok: false, error: "No agent minted for wallet." }, { status: 404 });
    }

    const [encryptedURI, metadataHash, verified] = await Promise.all([
      inft.getEncryptedURI(tokenId),
      inft.getMetadataHash(tokenId),
      inft.isVerified(wallet)
    ]);

    let cooldownRemainingSec = 0;
    const faucetAddress = process.env.NEXT_PUBLIC_FAUCET_ADDRESS ?? "";
    if (isAddress(faucetAddress)) {
      const faucet = new Contract(faucetAddress, FAUCET_ABI, provider);
      cooldownRemainingSec = Number(await faucet.cooldownRemaining(wallet));
    }

    return NextResponse.json({
      ok: true,
      tokenId: tokenId.toString(),
      verified: Boolean(verified),
      encryptedURI: String(encryptedURI),
      metadataHash: String(metadataHash),
      cooldownRemainingSec
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
