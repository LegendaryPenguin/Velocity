"use client";

import { useState } from "react";

import { verifyHuman } from "@ogtrust/sdk";

type Props = {
  wallet: string;
  onWalletChange: (value: string) => void;
  onVerified: (token: string) => void;
};

export function VerificationWidget({ wallet, onWalletChange, onVerified }: Props) {
  const [demoPass, setDemoPass] = useState(false);
  const [status, setStatus] = useState<"idle" | "verified" | "failed">("idle");

  const runVerification = () => {
    const result = verifyHuman(demoPass);
    if (!result.verified) {
      setStatus("failed");
      return;
    }
    const token = result.verificationToken;
    setStatus("verified");
    onVerified(token);
  };

  return (
    <div className="glass rounded-2xl p-5">
      <h3 className="text-lg font-semibold">Human Verification</h3>
      <p className="mt-1 text-sm text-white/60">Interaction data never leaves your device.</p>
      <label className="mt-4 block text-sm text-white/80">
        Wallet address
        <input
          value={wallet}
          onChange={(e) => onWalletChange(e.target.value)}
          className="mt-2 w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm outline-none"
          placeholder="0x..."
        />
      </label>
      <label className="mt-3 flex items-center gap-2 text-sm text-white/80">
        <input type="checkbox" checked={demoPass} onChange={(e) => setDemoPass(e.target.checked)} />
        Demo verification pass
      </label>
      <button
        type="button"
        onClick={runVerification}
        className="mt-4 rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold"
      >
        Verify Access
      </button>
      <p className="mt-3 text-sm">
        Status:{" "}
        <span className={status === "verified" ? "text-emerald-300" : status === "failed" ? "text-rose-300" : "text-white/70"}>
          {status === "idle" ? "Not Verified" : status === "verified" ? "Verified" : "Not Verified"}
        </span>
      </p>
    </div>
  );
}
