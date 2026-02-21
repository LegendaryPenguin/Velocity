import * as snarkjs from "snarkjs";

const SCORE_MIN = -4000;
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

export interface ZKProveOptions {
  /** Base URL for WASM and zkey (no trailing slash). e.g. "/zk" or "https://cdn.example.com/zk" */
  zkBaseUrl?: string;
  /** Full URL for the validate API. e.g. "/api/validate" or "https://api.example.com/validate" */
  validateApiUrl?: string;
}

const defaultZkBase = "/zk";
const defaultValidateUrl = "/api/validate";

/**
 * Generate a Groth16 ZK proof for a given captcha score (browser).
 * Uses zkBaseUrl + "/captcha.wasm" and zkBaseUrl + "/captcha_final.zkey".
 */
export async function generateProof(
  inputScore: number,
  options: ZKProveOptions = {},
): Promise<ZKProofResult | ZKProofError> {
  const base = (options.zkBaseUrl ?? defaultZkBase).replace(/\/$/, "");
  const wasmUrl = `${base}/captcha.wasm`;
  const zkeyUrl = `${base}/captcha_final.zkey`;

  if (typeof inputScore !== "number" || Number.isNaN(inputScore)) {
    return { success: false, message: "Invalid input: score must be a number." };
  }

  const score = Math.round(inputScore);
  if (score < SCORE_MIN || score > SCORE_MAX) {
    return {
      success: false,
      message: "Score out of valid range. Proof not generated.",
    };
  }

  try {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      { score },
      wasmUrl,
      zkeyUrl,
    );
    return { success: true, proof, publicSignals };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, message: `ZK proof generation failed: ${msg}` };
  }
}

/**
 * Submit proof + publicSignals to the validate API.
 */
export async function submitProofForValidation(
  proof: snarkjs.Groth16Proof,
  publicSignals: string[],
  options: ZKProveOptions = {},
): Promise<{ ok: boolean; verified: boolean; error?: string }> {
  const url = options.validateApiUrl ?? defaultValidateUrl;

  try {
    const res = await fetch(url, {
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
