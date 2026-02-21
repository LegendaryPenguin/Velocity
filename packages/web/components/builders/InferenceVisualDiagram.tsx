"use client";

export function InferenceVisualDiagram() {
  return (
    <div className="glass-card rounded-2xl p-5 overflow-x-auto w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-white/90 mb-4 text-center">How it works</h3>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">1. Connect</p>
          <div className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-center">
            <span className="text-xs text-white/70">Wallet</span>
            <br />
            <span className="text-xs text-purple-300/90">Deposit 0G</span>
          </div>
        </div>
        <span className="text-purple-400/80 text-lg">→</span>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">2. Choose</p>
          <div className="rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-center">
            <span className="text-xs text-white/70">Chat / Image</span>
            <br />
            <span className="text-xs text-purple-300/90">Speech-to-text</span>
          </div>
        </div>
        <span className="text-purple-400/80 text-lg">→</span>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-white/60">3. Use</p>
          <div className="rounded-lg border border-white/20 bg-emerald-500/20 px-3 py-2">
            <span className="text-xs text-emerald-300">Web / CLI / SDK</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        <span className="rounded-lg border border-white/20 bg-white/5 px-2 py-1 text-xs text-white/80">Chatbot (GPT, DeepSeek)</span>
        <span className="rounded-lg border border-white/20 bg-white/5 px-2 py-1 text-xs text-white/80">Text-to-Image</span>
        <span className="rounded-lg border border-white/20 bg-white/5 px-2 py-1 text-xs text-white/80">Speech-to-Text</span>
      </div>
    </div>
  );
}
