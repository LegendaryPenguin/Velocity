"use client";

import { useState } from "react";
import { CaptchaModal } from "./components/CaptchaModal";
import type { ExportedJson } from "./lib/captchaModel";
import type { ZKProveOptions } from "./lib/zk/prove";

export type { ExportedJson } from "./lib/captchaModel";
export type { ZKProveOptions } from "./lib/zk/prove";

export interface ZkCaptchaProps {
  /** Called when the user completes the captcha and the ZK proof is verified by your backend. */
  onVerified: (payload: ExportedJson, score: number) => void;
  /** Button label. Default: "Verify" */
  buttonText?: string;
  /** Extra class names for the button. */
  className?: string;
  /** Base URL for WASM and zkey (e.g. "/zk"). Default: "/zk" */
  zkBaseUrl?: string;
  /** Full URL for your validate API (e.g. "/api/validate"). Default: "/api/validate" */
  validateApiUrl?: string;
}

/**
 * Drop-in ZK-proof captcha: a button that opens the challenge. On success,
 * the user sees "ZK proof completed" and the modal closes; onVerified is called
 * with the score payload so your app can proceed.
 *
 * Use PascalCase in JSX: <ZkCaptcha onVerified={...} /> (React requires it for custom components).
 */
export function ZkCaptcha({
  onVerified,
  buttonText = "Verify",
  className = "",
  zkBaseUrl,
  validateApiUrl,
}: ZkCaptchaProps) {
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
