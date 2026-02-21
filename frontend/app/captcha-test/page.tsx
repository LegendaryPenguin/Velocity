"use client";

import { useState } from "react";
import { CaptchaModal } from "@/components/faucet/CaptchaModal";
import { ExportedJson } from "@/lib/captchaModel";

export default function CaptchaTestPage() {
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [result, setResult] = useState<{ status: string; score?: number; payload?: ExportedJson } | null>(null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#0f0a1a] p-8">
      <h1 className="text-2xl font-bold text-white">PoW Captcha – Test</h1>
      <p className="text-white/70">Click Verify, complete the captcha, then see proof result below.</p>

      <button
        type="button"
        onClick={() => setShowCaptcha(true)}
        className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-purple-500"
      >
        Verify
      </button>

      <CaptchaModal
        isOpen={showCaptcha}
        onClose={() => setShowCaptcha(false)}
        onVerifiedHuman={(payload, score) => {
          setResult({ status: "Proof generated and verified.", score, payload });
          setShowCaptcha(false);
        }}
      />

      {result && (
        <div className="w-full max-w-md rounded-xl border border-emerald-500/50 bg-emerald-500/10 p-6 text-left">
          <p className="font-semibold text-emerald-400">{result.status}</p>
          {result.score !== undefined && (
            <p className="mt-2 text-white">Score: {result.score}</p>
          )}
          {result.payload != null ? (
            <pre className="mt-2 overflow-auto rounded bg-black/30 p-2 text-xs text-white/90">
              {JSON.stringify(result.payload, null, 2)}
            </pre>
          ) : null}
        </div>
      )}
    </div>
  );
}
