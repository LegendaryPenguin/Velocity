import { NextResponse } from "next/server";
import * as snarkjs from "snarkjs";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

let vkeyCache: object | null = null;

async function getVkey() {
  if (vkeyCache) return vkeyCache;
  const vkeyPath = path.join(process.cwd(), "public", "zk", "verification_key.json");
  const raw = await readFile(vkeyPath, "utf-8");
  vkeyCache = JSON.parse(raw);
  return vkeyCache;
}

export async function POST(req: Request) {
  try {
    const { proof, publicSignals } = await req.json();
    if (!proof || !Array.isArray(publicSignals)) {
      return NextResponse.json(
        { verified: false, error: "Missing proof or publicSignals" },
        { status: 400 }
      );
    }

    const vkey = await getVkey();
    const isValid = await snarkjs.groth16.verify(vkey, publicSignals, proof);
    const verified = isValid && publicSignals[0] === "1";

    return NextResponse.json({ verified });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ verified: false, error: msg }, { status: 500 });
  }
}
