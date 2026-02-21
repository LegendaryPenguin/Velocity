"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { DeployOnPage } from "./DeployOnPage";

type Path = "deploy" | "terminal" | "paste";

function isValidAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value.trim());
}

type Props = {
  onSuccess: (address: string) => void;
  initialAddress?: string;
};

export function GetAddressCard({ onSuccess, initialAddress }: Props) {
  const [path, setPath] = useState<Path>("deploy");
  const [pasteValue, setPasteValue] = useState(initialAddress ?? "");
  const [pasteError, setPasteError] = useState<string | null>(null);

  const handlePasteChange = useCallback(
    (value: string) => {
      setPasteValue(value);
      setPasteError(null);
      const trimmed = value.trim();
      if (trimmed && isValidAddress(trimmed)) {
        onSuccess(trimmed);
      }
    },
    [onSuccess]
  );

  const handlePasteBlur = useCallback(() => {
    const trimmed = pasteValue.trim();
    if (!trimmed) {
      setPasteError(null);
      return;
    }
    if (!isValidAddress(trimmed)) {
      setPasteError("Invalid address. Must be 0x followed by 40 hex characters.");
      return;
    }
    setPasteError(null);
    onSuccess(trimmed);
  }, [pasteValue, onSuccess]);

  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-lg font-semibold text-white/90">Get iNFT contract address</h3>
      <p className="mt-1 text-sm text-white/60">
        Choose how you want to obtain the HumanAgentINFT contract address.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {(
          [
            { id: "deploy" as const, label: "Deploy on page" },
            { id: "terminal" as const, label: "Deploy from terminal" },
            { id: "paste" as const, label: "Paste existing address" },
          ] as const
        ).map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => setPath(id)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              path === id
                ? "bg-purple-500 text-white ring-2 ring-purple-300/50"
                : "bg-white/10 text-white/70 hover:bg-white/15 hover:text-white/90"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {path === "deploy" && <DeployOnPage onSuccess={onSuccess} />}
        {path === "terminal" && (
          <div className="rounded-xl border border-white/15 bg-white/5 p-4">
            <p className="mb-3 text-sm text-white/80">
              Run from <code className="rounded bg-white/10 px-1">packages/contracts</code> with Hardhat configured for 0G Testnet. Set <code className="rounded bg-white/10 px-1">PRIVATE_KEY</code> in <code className="rounded bg-white/10 px-1">.env</code> and get testnet OG from the <Link href="/faucet" className="text-purple-300 hover:text-purple-200">Faucet</Link>.
            </p>
            <pre className="overflow-x-auto rounded-lg bg-black/30 px-4 py-3 text-sm text-emerald-200/90">
              npx hardhat run scripts/deploy.ts --network og-testnet
            </pre>
          </div>
        )}
        {path === "paste" && (
          <div className="rounded-xl border border-white/15 bg-white/5 p-4">
            <label className="block text-sm">
              <span className="mb-2 block font-medium text-white/70">Contract address</span>
              <input
                type="text"
                value={pasteValue}
                onChange={(e) => handlePasteChange(e.target.value)}
                onBlur={handlePasteBlur}
                placeholder="0x..."
                className="glass-input w-full px-4 py-2.5 text-white/90 placeholder-white/40"
              />
            </label>
            {pasteError && <p className="mt-2 text-xs text-red-300">{pasteError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
