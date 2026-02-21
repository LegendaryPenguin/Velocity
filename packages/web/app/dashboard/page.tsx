import Link from "next/link";

const modules = [
  {
    href: "/modules/inft-builder",
    title: "iNFT Builder",
    whatYouGet: "Solidity guards + React hooks for verification.",
    useWhen: "You need to gate actions (faucet, voting) to verified humans.",
  },
  {
    href: "/modules/captcha-builder",
    title: "Captcha Builder",
    whatYouGet: "Tile puzzle + behavioral model + ZK proof flow.",
    useWhen: "You want users to prove humanity before minting or claiming.",
  },
  {
    href: "/modules/faucet-builder",
    title: "Faucet Integration",
    whatYouGet: "Contract guard + API template for faucet claims.",
    useWhen: "You're building a faucet that requires Human Agent iNFT.",
  },
  {
    href: "/modules/storage-builder",
    title: "Storage Builder",
    whatYouGet: "0G storage helper for metadata and encrypted payloads.",
    useWhen: "You need to store iNFT metadata before minting.",
  },
  {
    href: "/modules/fine-tuning-builder",
    title: "0G Fine-Tuning",
    whatYouGet: "CLI guide for fine-tuning models on 0G Compute Network.",
    useWhen: "You want to fine-tune LLMs (e.g. Qwen) on decentralized providers.",
  },
  {
    href: "/modules/inference-builder",
    title: "0G Compute Inference",
    whatYouGet: "Decentralized AI inference: chatbots, text-to-image, speech-to-text.",
    useWhen: "You need AI inference via Web UI, CLI, or SDK.",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-fadeIn">
      <section className="glass-card rounded-2xl p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-purple-300">Developer Portal</p>
        <h1 className="mt-2 text-4xl font-semibold title-gradient">0G Velocity Studio</h1>
      </section>

      <section>
        <p className="mb-3 text-center text-sm text-white/70">
          Get started by downloading the CLI to scaffold your project, then use the 0G Faucet to claim testnet tokens for development.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="glass-card flex flex-col items-center rounded-xl p-5 text-center transition-all duration-200 hover:border-purple-400/30 hover:shadow-lg hover:-translate-y-0.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/25 text-xs font-bold text-purple-200">
              1
            </span>
            <p className="mt-2 font-mono text-sm text-white/90">better_tool.sh</p>
            <p className="mt-2 text-xs text-white/50">
              Run <code className="rounded bg-white/10 px-1">chmod +x better_tool.sh</code>, then <code className="rounded bg-white/10 px-1">./better_tool.sh</code> to scaffold your project.
            </p>
            <a
              href="/better_tool.sh"
              download="better_tool.sh"
              className="btn-primary mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
            >
              <span aria-hidden>↓</span>
              Download executable
            </a>
          </div>
          <div className="glass-card flex flex-col items-center rounded-xl p-5 text-center transition-all duration-200 hover:border-purple-400/30 hover:shadow-lg hover:-translate-y-0.5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-purple-500/25 text-xs font-bold text-purple-200">
              2
            </span>
            <p className="mt-2 text-sm font-semibold text-white/90">0G Faucet</p>
            <p className="mt-2 text-xs text-white/50">
              Use the faucet to claim testnet tokens
              <br />
              for your development and testing on 0G testnet.
            </p>
            <Link
              href="/faucet"
              className="btn-primary mt-3 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
            >
              <span aria-hidden>→</span>
              Open Faucet
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="glass-card mb-4 rounded-xl border-purple-400/20 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-purple-300">Code generators</p>
          <h2 className="mt-1 text-xl font-semibold title-gradient">Builders</h2>
          <p className="mt-3 text-sm text-white/80 leading-relaxed">
            Builders generate code tailored to your stack. Each one focuses on a specific part of the 0G ecosystem:
          </p>
          <ul className="mt-3 grid list-none gap-2 text-xs text-white/60 sm:grid-cols-2 sm:gap-x-6">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400/60" />
              <span><strong className="text-white/80">iNFT Builder</strong> — Gate actions (faucet, voting) to verified humans</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400/60" />
              <span><strong className="text-white/80">Captcha Builder</strong> — Prove humanity before mint or claim</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400/60" />
              <span><strong className="text-white/80">Faucet Integration</strong> — Build faucets that require Human Agent iNFT</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400/60" />
              <span><strong className="text-white/80">Storage Builder</strong> — Store iNFT metadata and encrypted payloads before minting</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400/60" />
              <span><strong className="text-white/80">0G Fine-Tuning</strong> — Fine-tune LLMs on decentralized compute</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-purple-400/60" />
              <span><strong className="text-white/80">0G Compute Inference</strong> — Run AI inference (chatbots, text-to-image, etc.)</span>
            </li>
          </ul>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="group glass-card relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] p-5 transition-all duration-300 hover:border-purple-400/25 hover:shadow-[0_0_40px_-12px_rgba(167,139,250,0.25)] hover:-translate-y-0.5"
            >
              <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-purple-400/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-purple-300/90">{m.title}</p>
              <p className="mt-2 text-[13px] font-medium leading-snug text-white/95">{m.whatYouGet}</p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-white/50">{m.useWhen}</p>
              <span className="mt-auto flex items-center gap-1.5 pt-5 text-[13px] font-medium text-purple-300/90 transition-all duration-200 group-hover:gap-2.5 group-hover:text-purple-200">
                Open
                <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
