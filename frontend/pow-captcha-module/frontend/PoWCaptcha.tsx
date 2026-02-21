"use client";

import { useState } from "react";
import { CaptchaModal } from "./components/CaptchaModal";
import type { ExportedJson } from "./lib/captchaModel";
import type { ZKProveOptions } from "./lib/zk/prove";

export type { ExportedJson } from "./lib/captchaModel";
export type { ZKProveOptions } from "./lib/zk/prove";

export interface PoWCaptchaProps {
  /** Called when the user completes verification and the ZK proof is accepted by your backend. */
  onVerified: (payload: ExportedJson, score: number) => void;
  /** Optional: label for the trigger button. Default: "Verify" */
  buttonText?: string;
  /** Optional: extra class names for the button. */
  className?: string;
  /** Optional: base URL for WASM and zkey (e.g. "/zk"). Default: "/zk" */
  zkBaseUrl?: string;
  /** Optional: full URL for your validate API (e.g. "/api/validate"). Default: "/api/validate" */
  validateApiUrl?: string;
}

/**
 * One-line captcha gate: a "Verify" button that opens the ZK-proof captcha.
 * On success, calls onVerified with the score payload.
 */
export function PoWCaptcha({
  onVerified,
  buttonText = "Verify",
  className = "",
  zkBaseUrl,
  validateApiUrl,
}: PoWCaptchaProps) {
  const [open, setOpen] = useState(false);

  const zkOptions: ZKProveOptions | undefined =
    zkBaseUrl !== undefined || validateApiUrl !== undefined
      ? { zkBaseUrl, validateApiUrl }
      : undefined;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          className ||
          "rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-purple-500"
        }
      >
        {buttonText}
      </button>
      <CaptchaModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onVerified={onVerified}
        zkOptions={zkOptions}
      />
    </>
  );
}
