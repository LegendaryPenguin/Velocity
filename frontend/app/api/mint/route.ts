import { NextResponse } from "next/server";
import { JsonRpcProvider, Wallet, Contract } from "ethers";

export const runtime = "nodejs";

const RPC_URL = "https://testnet-rpc.monad.xyz";
const TOKEN_ADDRESS = process.env.TOKEN_ADDRESS!;
const RELAYER_PK = process.env.RELAYER_PRIVATE_KEY!;

const ABI = ["function mintTestTokens(address to) external"];

function isAddress(addr: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(addr);
}

// demo-level rate limit
const lastByIp = new Map<string, number>();
const MIN_MS = 1000;

export async function POST(req: Request) {
  try {
    console.log(RELAYER_PK, TOKEN_ADDRESS);
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const now = Date.now();
    const last = lastByIp.get(ip) ?? 0;
    if (now - last < MIN_MS) {
      return NextResponse.json({ ok: false, error: "Slow down" }, { status: 429 });
    }
    lastByIp.set(ip, now);

    const { to_address } = await req.json();
    if (!isAddress(to_address) || to_address === "0x0000000000000000000000000000000000000000") {
      return NextResponse.json({ ok: false, error: "Invalid address" }, { status: 400 });
    }

    const provider = new JsonRpcProvider(RPC_URL);
    const relayer = new Wallet(RELAYER_PK, provider);
    const token = new Contract(TOKEN_ADDRESS, ABI, relayer);

    const tx = await token.mintTestTokens(to_address, { gasLimit: 250_000 });
    const receipt = await tx.wait();

    return NextResponse.json({ ok: true, txHash: receipt.hash });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.shortMessage ?? e?.message ?? String(e) },
      { status: 400 }
    );
  }
}