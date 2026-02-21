import { NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

const FILES: Record<string, string> = {
  "captchaModel": "lib/captchaModel.ts",
  "captchaModal": "components/faucet/CaptchaModal.tsx",
  "patternIcon": "components/faucet/PatternIcon.tsx",
  "useReducedMotionPref": "hooks/useReducedMotionPref.ts",
  "ogStorage": "lib/ogStorage.ts",
  "encrypt": "lib/encrypt.ts",
  "claimRoute": "app/api/claim/route.ts",
  "inftAbi": "lib/inftAbi.ts",
  "faucetContract": "../contracts/contracts/Faucet.sol",
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("file");
  if (!file || !FILES[file]) {
    return NextResponse.json({ error: "Invalid file" }, { status: 400 });
  }
  try {
    const base = process.cwd();
    const filePath = path.join(base, FILES[file]);
    const content = await readFile(filePath, "utf-8");
    return NextResponse.json({ content, path: FILES[file] });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
