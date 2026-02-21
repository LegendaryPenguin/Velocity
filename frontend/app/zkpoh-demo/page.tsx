"use client";

import { useState } from "react";
import { CaptchaModal } from "../../../zkPoH-Module/components/CaptchaModal";

export default function ZkPohDemoPage() {
  const [result, setResult] = useState<{ score: number; payload: { score: number } } | null>(null);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#0f0a1a] p-8">
      <h1 className="text-2xl font-bold text-white">ZK proof captcha</h1>
      <p className="text-center text-white/70">
        Click the button, complete the challenge, and see the flow through to verification.
      </p>

      <CaptchaModal
        isOpen={true}
        onClose={() => {}}
        onVerified={(payload, score) => {
          setResult({ payload, score });
        }}
      />

      {result && (
        <div className="w-full max-w-md rounded-xl border border-emerald-500/50 bg-emerald-500/10 p-6 text-left">
          <p className="font-semibold text-emerald-400">ZK proof completed</p>
          <p className="mt-2 text-white">Score: {result.score}</p>
          <pre className="mt-2 overflow-auto rounded bg-black/30 p-2 text-xs text-white/90">
            {JSON.stringify(result.payload, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
