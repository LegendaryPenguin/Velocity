"use client";

import { useMemo, useState } from "react";

function isValidAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value.trim());
}

type AgentStatus = {
  ok: boolean;
  tokenId?: string;
  verified?: boolean;
  encryptedURI?: string;
  metadataHash?: string;
  cooldownRemainingSec?: number;
  error?: string;
};

export default function AgentPage() {
  const [wallet, setWallet] = useState("");
  const [status, setStatus] = useState<AgentStatus | null>(null);

  const validWallet = useMemo(() => isValidAddress(wallet), [wallet]);

  const loadStatus = async () => {
    if (!validWallet) return;
    const res = await fetch(`/api/agent-status?wallet=${encodeURIComponent(wallet.trim())}`);
    const data = (await res.json()) as AgentStatus;
    setStatus(data);
  };

  return (
    <div className="space-y-6">
      <section className="glass rounded-2xl p-6">
        <h1 className="text-2xl font-semibold">Agent Console</h1>
        <p className="mt-1 text-sm text-white/65">View token identity, status, expiry context and action controls.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <input
            placeholder="Wallet 0x..."
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            className="min-w-[320px] flex-1 rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm"
          />
          <button
            onClick={loadStatus}
            disabled={!validWallet}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Refresh Status
          </button>
        </div>
      </section>

      <section className="glass rounded-2xl p-6 text-sm">
        {!status && <p className="text-white/60">No agent status loaded yet.</p>}
        {status?.ok && (
          <div className="space-y-2">
            <p>Token ID: {status.tokenId}</p>
            <p>Status: {status.verified ? "Agent Active" : "Not Verified"}</p>
            <p>Expires: policy-driven (from metadata payload)</p>
            <p>Encrypted URI: {status.encryptedURI}</p>
            <p>Metadata Hash: {status.metadataHash}</p>
            <p>Cooldown remaining: {status.cooldownRemainingSec}s</p>
          </div>
        )}
        {status && !status.ok && <p className="text-rose-300">Error: {status.error}</p>}
      </section>
    </div>
  );
}
