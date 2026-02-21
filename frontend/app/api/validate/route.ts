import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Demo validator route kept for compatibility with older clients.
// Canonical mint path uses /api/mint and server-gated verification.
export async function POST(req: Request) {
  try {
    const { publicSignals } = await req.json();
    if (!Array.isArray(publicSignals)) {
      return NextResponse.json(
        { verified: false, error: "Missing publicSignals array" },
        { status: 400 }
      );
    }
    return NextResponse.json({ verified: publicSignals[0] === "1" });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ verified: false, error: msg }, { status: 500 });
  }
}
