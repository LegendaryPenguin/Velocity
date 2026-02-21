"use client";

export function StorageVisualDiagram() {
  return (
    <div className="glass-card rounded-2xl p-5 overflow-x-auto w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-white/90 mb-4 text-center">How it works</h3>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">Metadata</p>
          <div className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-center">
            <span className="text-xs text-white/70">JSON</span>
            <br />
            <span className="text-xs text-purple-300/90">issuer, expiry, policy</span>
          </div>
        </div>
        <span className="text-purple-400/80 text-lg">→</span>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">Encrypt</p>
          <div className="rounded-lg border border-white/20 bg-white/5 px-3 py-2">
            <span className="text-xs text-white/70">AES-256-GCM</span>
          </div>
        </div>
        <span className="text-purple-400/80 text-lg">→</span>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">0G Store</p>
          <div className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-center">
            <span className="text-xs text-white/70">storeEncryptedMetadata</span>
          </div>
        </div>
        <span className="text-purple-400/80 text-lg">→</span>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">URI + Hash</p>
          <div className="rounded-lg border border-white/20 bg-emerald-500/20 px-3 py-2">
            <span className="text-sm font-medium text-emerald-300">0g://...</span>
          </div>
        </div>
        <span className="text-purple-400/80 text-lg">→</span>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">iNFT.mint</p>
          <div className="rounded-lg border border-white/20 bg-white/5 px-3 py-2">
            <span className="text-xs text-white/70">mint(to, uri, hash)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
