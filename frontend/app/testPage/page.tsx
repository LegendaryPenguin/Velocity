"use client";

import { useMemo, useState } from "react";

function isAddress(addr: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(addr);
}

export default function FaucetPage() {
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canMint = useMemo(() => isAddress(to.trim()), [to]);

  async function onMint() {
    setError(null);
    setTxHash(null);

    const trimmed = to.trim();
    if (!isAddress(trimmed) || trimmed === "0x0000000000000000000000000000000000000000") {
      setError("Please enter a valid EVM address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to_address: trimmed }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `Mint failed (HTTP ${res.status})`);
      }

      setTxHash(data.txHash);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 520, margin: "64px auto", padding: 16, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Testnet Faucet</h1>
      <p style={{ opacity: 0.75, marginBottom: 24 }}>
        Enter an address and click Mint. This calls <code>/api/mint</code>.
      </p>

      <label style={{ display: "block", fontWeight: 600, marginBottom: 8 }}>Recipient address</label>
      <input
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="0xabc...123"
        spellCheck={false}
        autoCapitalize="none"
        autoCorrect="off"
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 12,
          border: "1px solid rgba(0,0,0,0.15)",
          outline: "none",
          marginBottom: 12,
        }}
      />

      <button
        onClick={onMint}
        disabled={!canMint || loading}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 12,
          border: "none",
          cursor: !canMint || loading ? "not-allowed" : "pointer",
          fontWeight: 700,
          opacity: !canMint || loading ? 0.6 : 1,
        }}
      >
        {loading ? "Minting..." : "Mint"}
      </button>

      {error && (
        <div style={{ marginTop: 16, padding: 12, borderRadius: 12, background: "rgba(255,0,0,0.08)" }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Error</div>
          <div style={{ whiteSpace: "pre-wrap" }}>{error}</div>
        </div>
      )}

      {txHash && (
        <div style={{ marginTop: 16, padding: 12, borderRadius: 12, background: "rgba(0,128,0,0.10)" }}>
          <div style={{ fontWeight: 700, marginBottom: 6 }}>Success</div>
          <div style={{ wordBreak: "break-all" }}>{txHash}</div>
        </div>
      )}
    </main>
  );
}