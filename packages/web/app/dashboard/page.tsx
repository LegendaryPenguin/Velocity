import Link from "next/link";

const moduleLinks = [
  { href: "/modules/inft-builder", label: "iNFT Builder" },
  { href: "/modules/captcha-builder", label: "Captcha Builder" },
  { href: "/modules/faucet-builder", label: "Faucet Integration" },
  { href: "/modules/storage-builder", label: "Storage Builder" },
  { href: "/modules/fine-tuning-builder", label: "0G Fine-Tuning" },
  { href: "/modules/inference-builder", label: "0G Compute Inference" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="glass-card rounded-2xl p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-purple-300">Developer Portal</p>
        <h1 className="mt-2 text-3xl font-semibold title-gradient">0G Trust Studio</h1>
        <p className="mt-2 max-w-xl text-sm text-white/70">
          Build flows: Verify Access → Mint Human Agent → Claim Faucet.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Module Builders</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {moduleLinks.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="glass-card flex items-center justify-between rounded-xl px-5 py-4 transition hover:border-white/25"
            >
              <span className="font-medium text-white/90">{m.label}</span>
              <span className="text-xs text-purple-300">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="glass-card rounded-xl p-5">
          <p className="text-xs font-medium text-white/60">0G Scaffold Wizard (Premium TUI)</p>
          <p className="mt-1 font-mono text-sm text-white/90">better_tool.sh</p>
          <a
            href="/better_tool.sh"
            download="better_tool.sh"
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#3b82f6] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2563eb]"
          >
            <span aria-hidden>↓</span>
            Download executable
          </a>
        </div>
      </section>

      <section>
        <Link
          href="/faucet"
          className="glass-card flex items-center justify-between rounded-xl px-5 py-4 transition hover:border-purple-400/40"
        >
          <div>
            <p className="font-semibold text-white/90">Faucet Demo</p>
            <p className="text-xs text-white/60">3D background, captcha, ZK proof, mint iNFT, claim tokens</p>
          </div>
          <span className="text-sm font-medium text-purple-300">Open →</span>
        </Link>
      </section>
    </div>
  );
}
