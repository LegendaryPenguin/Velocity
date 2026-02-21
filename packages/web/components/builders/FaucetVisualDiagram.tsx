"use client";

export function FaucetVisualDiagram() {
  return (
    <div className="glass-card rounded-2xl p-5 overflow-x-auto w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-white/90 mb-4 text-center">How it works</h3>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">1. Verify</p>
          <div className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-center">
            <span className="text-xs text-white/70">Captcha + ZK</span>
            <br />
            <span className="text-xs text-purple-300/90">Human Agent iNFT</span>
          </div>
        </div>
        <span className="text-purple-400/80 text-lg">→</span>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">2. Mint</p>
          <div className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-center">
            <span className="text-xs text-white/70">Mint iNFT</span>
            <br />
            <span className="text-xs text-purple-300/90">inft.mint(to, uri, hash)</span>
          </div>
        </div>
        <span className="text-purple-400/80 text-lg">→</span>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">3. Claim</p>
          <div className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-center">
            <span className="text-xs text-white/70">POST /api/claim</span>
            <br />
            <span className="text-xs text-purple-300/90">Faucet.claim(caller, to)</span>
          </div>
        </div>
        <span className="text-purple-400/80 text-lg">→</span>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">4. Contract checks</p>
          <div className="rounded-lg border border-white/20 bg-emerald-500/20 px-3 py-2">
            <span className="text-xs text-emerald-300">isVerified</span>
            <br />
            <span className="text-xs text-emerald-300/90">canUse + cooldown</span>
          </div>
        </div>
        <span className="text-purple-400/80 text-lg">→</span>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">5. Transfer</p>
          <div className="rounded-lg border border-white/20 bg-white/5 px-3 py-2">
            <span className="text-xs text-white/70">Tokens sent</span>
          </div>
        </div>
      </div>
    </div>
  );
}
