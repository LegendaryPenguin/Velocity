import { NextResponse } from "next/server";
import { Contract, JsonRpcProvider, Wallet } from "ethers";

import { TOKEN_FAUCET_ABI } from "@/lib/inftAbi";

function isAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const to = body?.wallet ?? body?.to;
  const rpc = process.env.OG_RPC_URL ?? "https://evmrpc-testnet.0g.ai";
  const pk = process.env.PRIVATE_KEY ?? "";
  const tokenAddress = process.env.TOKEN_ADDRESS ?? "";

  try {
    if (!isAddress(to)) {
      return NextResponse.json({ ok: false, error: "Invalid wallet input." }, { status: 400 });
    }
    if (!pk.startsWith("0x") || !isAddress(tokenAddress)) {
      return NextResponse.json({ ok: false, error: "Token env missing." }, { status: 500 });
    }

    const provider = new JsonRpcProvider(rpc);
    const signer = new Wallet(pk, provider);
    const token = new Contract(tokenAddress, TOKEN_FAUCET_ABI, signer);

    const tx = await token.mintTestTokens(to);
    const receipt = await tx.wait();

    let cooldownRemainingSec: number | undefined;
    try {
      const [lastMintAt, cooldownSec] = await Promise.all([
        token.lastMintAt(to),
        token.cooldown()
      ]);
      const unlockAt = Number(lastMintAt) + Number(cooldownSec);
      const now = Math.floor(Date.now() / 1000);
      cooldownRemainingSec = Math.max(0, unlockAt - now);
    } catch {
      /* ignore */
    }

    return NextResponse.json({
      ok: true,
      txHash: receipt?.hash,
      cooldownRemainingSec
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    const isCooldown = /cooldown active/i.test(message);
    let cooldownRemainingSec: number | undefined;
    if (isCooldown && isAddress(to) && pk.startsWith("0x") && isAddress(tokenAddress)) {
      try {
        const provider = new JsonRpcProvider(rpc);
        const token = new Contract(tokenAddress, TOKEN_FAUCET_ABI, new Wallet(pk, provider));
        const [lastMintAt, cooldownSec] = await Promise.all([
          token.lastMintAt(to),
          token.cooldown()
        ]);
        const unlockAt = Number(lastMintAt) + Number(cooldownSec);
        const now = Math.floor(Date.now() / 1000);
        cooldownRemainingSec = Math.max(0, unlockAt - now);
      } catch {
        /* ignore */
      }
    }
    return NextResponse.json(
      { ok: false, error: message, ...(cooldownRemainingSec != null && { cooldownRemainingSec }) },
      { status: 400 }
    );
  }
}
