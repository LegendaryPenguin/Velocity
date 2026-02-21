import * as snarkjs from "snarkjs";

const WASM_URL = "/zk/captcha.wasm";
const ZKEY_URL = "/zk/captcha_final.zkey";

const SCORE_MIN = -6000;
const SCORE_MAX = 6000;

export interface ZKProofResult {
  success: true;
  proof: snarkjs.Groth16Proof;
  publicSignals: string[];
}

export interface ZKProofError {
  success: false;
  message: string;
}

export async function generateProof(
  inputScore: number,
): Promise<ZKProofResult | ZKProofError> {
  if (typeof inputScore !== "number" || Number.isNaN(inputScore)) {
    return { success: false, message: "Invalid input: score must be a number." };
  }

  const raw = Math.round(inputScore);
  const score = Math.max(SCORE_MIN, Math.min(SCORE_MAX, raw));

  try {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      { score },
      WASM_URL,
      ZKEY_URL,
    );

    return { success: true, proof, publicSignals };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `ZK proof generation failed: ${msg}` };
  }
}

export async function submitProofForValidation(
  proof: snarkjs.Groth16Proof,
  publicSignals: string[],
): Promise<{ ok: boolean; verified: boolean; error?: string }> {
  try {
    const res = await fetch("/api/validate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ proof, publicSignals }),
    });

    const data = await res.json();
    if (!res.ok) {
      return { ok: false, verified: false, error: data.error ?? "Validation request failed" };
    }
    return { ok: true, verified: !!data.verified };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { ok: false, verified: false, error: msg };
  }
}
