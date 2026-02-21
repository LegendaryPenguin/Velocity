import Link from "next/link";

import { ConceptCard } from "@/components/builders/ConceptCard";
import { FlowDiagram } from "@/components/builders/FlowDiagram";

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

export default function ModulesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Link href="/dashboard" className="text-sm text-white/60 hover:text-white/90">
          ← Dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">Module Builders</h1>
        <p className="mt-1 text-sm text-white/60">
          Configure options and generate code snippets for each module.
        </p>
      </div>

      <ConceptCard
        title="Start here"
        actionLink={{ href: "/faucet", label: "Try the Faucet Demo first" }}
      >
        New? Run the Faucet Demo to see the full flow (captcha → ZK proof → mint iNFT → claim), then use the builders below to generate code for your own project.
      </ConceptCard>

      <FlowDiagram
        nodes={[
          "User",
          "Captcha",
          "ZK proof",
          "Mint iNFT",
          "Claim",
        ]}
      />

      <section>
        <h2 className="mb-3 text-lg font-semibold text-white/90">Builders</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="glass-card flex flex-col rounded-2xl p-5 transition hover:border-white/25"
            >
              <h3 className="font-semibold text-white/90">{m.title}</h3>
              <p className="mt-1.5 text-sm text-white/80">{m.whatYouGet}</p>
              <p className="mt-2 text-xs text-white/50">
                Use when: {m.useWhen}
              </p>
              <span className="mt-3 text-xs font-medium text-purple-300">Open builder →</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
