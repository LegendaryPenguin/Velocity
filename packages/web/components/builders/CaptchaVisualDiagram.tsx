"use client";

export function CaptchaVisualDiagram() {
  return (
    <div className="glass-card rounded-2xl p-5 overflow-x-auto w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-white/90 mb-4 text-center">How it works</h3>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">Tile puzzle</p>
          <div
            className="grid grid-cols-4 gap-1 rounded-lg border border-white/20 bg-white/5 p-2"
            style={{ width: 88, height: 88 }}
          >
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="rounded bg-purple-500/30 border border-white/10"
                style={{ width: 18, height: 18 }}
              />
            ))}
          </div>
        </div>
        <span className="text-purple-400/80 text-lg">→</span>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">Behavioral model</p>
          <div className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-center">
            <span className="text-xs text-white/70">24 features</span>
            <br />
            <span className="text-xs text-purple-300/90">path, speed, timing</span>
          </div>
        </div>
        <span className="text-purple-400/80 text-lg">→</span>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">Score</p>
          <div className="rounded-lg border border-white/20 bg-emerald-500/20 px-3 py-2">
            <span className="text-sm font-medium text-emerald-300">Human / Bot</span>
          </div>
        </div>
        <span className="text-purple-400/80 text-lg">→</span>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">ZK (optional)</p>
          <div className="rounded-lg border border-white/20 bg-white/5 px-3 py-2">
            <span className="text-xs text-white/70">Proof</span>
          </div>
        </div>
      </div>
    </div>
  );
}
