"use client";

import { useMemo, useState } from "react";

const blocks = ["Verification", "Mint Agent", "Faucet Claim"];

export default function DevtoolsPage() {
  const [selected, setSelected] = useState<string[]>(blocks);
  const [faucetAddress, setFaucetAddress] = useState(process.env.NEXT_PUBLIC_FAUCET_ADDRESS ?? "");
  const [cooldownSec, setCooldownSec] = useState(86400);
  const [policy, setPolicy] = useState("human-agent");

  const snippet = useMemo(() => {
    return `// Generated integration snippet
const flow = ${JSON.stringify(selected)};
const config = {
  network: "0G Testnet",
  faucetAddress: "${faucetAddress}",
  cooldownSec: ${cooldownSec},
  verificationPolicy: "${policy}"
};

// React widget:
<VerificationWidget onVerified={onVerified} />

// Contract guard:
require(agent.isVerified(msg.sender), "Agent not verified");`;
  }, [selected, faucetAddress, cooldownSec, policy]);

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="glass rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Flow Canvas</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {blocks.map((block) => {
            const active = selected.includes(block);
            return (
              <button
                key={block}
                onClick={() =>
                  setSelected((prev) => (active ? prev.filter((v) => v !== block) : [...prev, block]))
                }
                className={`rounded-xl border px-4 py-4 text-left text-sm transition ${
                  active ? "border-indigo-300 bg-indigo-500/20" : "border-white/15 bg-white/5"
                }`}
              >
                {block}
              </button>
            );
          })}
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Config Panel</h2>
        <p className="mt-1 text-sm text-white/60">Network: 0G Testnet</p>
        <label className="mt-4 block text-sm">
          Faucet address
          <input
            className="mt-2 w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2"
            value={faucetAddress}
            onChange={(e) => setFaucetAddress(e.target.value)}
          />
        </label>
        <label className="mt-3 block text-sm">
          Cooldown seconds
          <input
            type="number"
            className="mt-2 w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2"
            value={cooldownSec}
            onChange={(e) => setCooldownSec(Number(e.target.value) || 0)}
          />
        </label>
        <label className="mt-3 block text-sm">
          Verification policy
          <input
            className="mt-2 w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2"
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
          />
        </label>
      </section>

      <section className="glass rounded-2xl p-6 lg:col-span-2">
        <h2 className="text-xl font-semibold">Generate Integration</h2>
        <pre className="mt-3 overflow-x-auto rounded-xl bg-black/30 p-4 text-xs text-emerald-200">{snippet}</pre>
      </section>
    </div>
  );
}
