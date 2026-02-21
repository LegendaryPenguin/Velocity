"use client";

import { useMemo, useState } from "react";

import { AddToProjectSteps } from "@/components/builders/AddToProjectSteps";
import { CodeOutput } from "@/components/builders/CodeOutput";
import { ConceptCard } from "@/components/builders/ConceptCard";
import { InferenceVisualDiagram } from "@/components/builders/InferenceVisualDiagram";
import { FlowDiagram } from "@/components/builders/FlowDiagram";
import Link from "next/link";

type InterfaceChoice = "webui" | "cli" | "sdk";

export default function InferenceBuilderPage() {
  const [interfaceChoice, setInterfaceChoice] = useState<InterfaceChoice>("webui");

  const installSnippet = useMemo(
    () => `# Install CLI (Node >= 22.0.0 required)
pnpm add @0glabs/0g-serving-broker -g`,
    []
  );

  const webUISnippet = useMemo(
    () => `# Launch Web UI locally
0g-compute-cli ui start-web

# Open http://localhost:3090 in your browser

# If port 3090 is in use:
0g-compute-cli ui start-web --port 3091`,
    []
  );

  const depositSnippet = useMemo(
    () => `# Deposit to main account
0g-compute-cli deposit --amount 5

# Transfer to provider sub-account (for inference)
0g-compute-cli transfer-fund --provider <PROVIDER_ADDRESS> --amount 5`,
    []
  );

  const acknowledgeSnippet = useMemo(
    () => `# Acknowledge provider before using
0g-compute-cli inference acknowledge-provider --provider <PROVIDER_ADDRESS>`,
    []
  );

  const checkBalanceSnippet = useMemo(
    () => `# Check account balance
0g-compute-cli get-account

# View sub-account for a provider
0g-compute-cli get-sub-account --provider <PROVIDER_ADDRESS>`,
    []
  );

  const sdkInstallSnippet = useMemo(
    () => `# Install SDK
pnpm add @0glabs/0g-serving-broker`,
    []
  );

  const sdkDepositSnippet = useMemo(
    () => `// Deposit to main account
await broker.ledger.depositFund(1);

// Transfer to provider (amount in 0G)
await broker.ledger.transferFund(providerAddress, amount);`,
    []
  );

  const sdkAcknowledgeSnippet = useMemo(
    () => `// Acknowledge provider before first use
await broker.inference.acknowledgeProviderSigner(providerAddress);`,
    []
  );

  const sdkBasicSnippet = useMemo(
    () => `// Initialize broker (Node >= 22)
import { createBroker } from "@0glabs/0g-serving-broker";

const broker = await createBroker({
  privateKey: process.env.PRIVATE_KEY,
});

// Then use ledger, inference APIs for direct API access`,
    []
  );

  const addToProjectSteps = useMemo(
    () => [
      { num: 1, title: "Install CLI", body: "Node >= 22. pnpm add @0glabs/0g-serving-broker -g", filePath: "Terminal" },
      { num: 2, title: "Connect & fund", body: "Use Web UI or CLI: setup-network, login, deposit, transfer-fund to provider.", filePath: "Web UI / CLI" },
      { num: 3, title: "Acknowledge provider", body: "Run acknowledge-provider before first use.", filePath: "Terminal" },
      { num: 4, title: "Use services", body: "Web UI: Chat or Build. CLI/SDK: for automation and app integration.", filePath: "Web UI / CLI / SDK" },
    ],
    []
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Link href="/dashboard" className="text-sm text-white/60 hover:text-white/90">
          ← Dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">0G Compute Inference</h1>
        <p className="mt-1 text-sm text-white/60">
          Decentralized AI inference: chatbots (GPT, DeepSeek), text-to-image (Stable Diffusion), speech-to-text (Whisper). Use Web UI, CLI, or SDK.
        </p>
      </div>

      <ConceptCard
        title="0G Compute Inference"
        learnMore={
          <div className="space-y-2">
            <p>
              The 0G Compute Network offers decentralized AI inference. Connect your wallet, deposit 0G tokens, transfer to a provider, then use Chat (interactive), Build (API integration), or SDK for automation.
            </p>
            <p><strong>Testnet:</strong> 2 services. <strong>Mainnet:</strong> 6 services. Visit the marketplace to browse models and pricing.</p>
          </div>
        }
      >
        0G Compute Network provides decentralized AI inference: chatbots, text-to-image, and speech-to-text. Connect a wallet, deposit 0G, and use the Web UI, CLI, or SDK. Best for quick testing (Web) or app integration (SDK).
      </ConceptCard>

      <div className="flex justify-center w-full">
        <FlowDiagram
          nodes={["Connect wallet", "Deposit 0G", "Transfer to provider", "Use AI services"]}
          icons={["👛", "💳", "🔄", "🤖"]}
        />
      </div>
      <InferenceVisualDiagram />

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">Supported services</h3>
        <ul className="mt-3 space-y-2 text-sm text-white/80">
          <li><strong>Chatbot:</strong> GPT, DeepSeek, and other conversational models</li>
          <li><strong>Text-to-Image:</strong> Stable Diffusion and similar models</li>
          <li><strong>Speech-to-Text:</strong> Whisper and other transcription models</li>
        </ul>
      </section>

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">Prerequisites</h3>
        <ul className="mt-3 space-y-2 text-sm text-white/80 list-disc list-inside">
          <li><strong>Node.js</strong> &gt;= 22.0.0</li>
          <li><strong>Wallet</strong> with 0G tokens (testnet or mainnet)</li>
          <li><strong>EVM-compatible wallet</strong> (MetaMask) for Web UI</li>
        </ul>
      </section>

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">Choose your interface</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/20">
                <th className="py-2 pr-4 text-left font-medium text-white/90">Feature</th>
                <th className="py-2 px-4 text-left font-medium text-white/90">Web UI</th>
                <th className="py-2 px-4 text-left font-medium text-white/90">CLI</th>
                <th className="py-2 px-4 text-left font-medium text-white/90">SDK</th>
              </tr>
            </thead>
            <tbody className="text-white/70">
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Setup time</td>
                <td className="py-2 px-4">~1 min</td>
                <td className="py-2 px-4">~2 min</td>
                <td className="py-2 px-4">~5 min</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Interactive chat</td>
                <td className="py-2 px-4">✅</td>
                <td className="py-2 px-4">❌</td>
                <td className="py-2 px-4">❌</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Automation</td>
                <td className="py-2 px-4">❌</td>
                <td className="py-2 px-4">✅</td>
                <td className="py-2 px-4">✅</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">App integration</td>
                <td className="py-2 px-4">❌</td>
                <td className="py-2 px-4">❌</td>
                <td className="py-2 px-4">✅</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 pr-4">Direct API access</td>
                <td className="py-2 px-4">❌</td>
                <td className="py-2 px-4">❌</td>
                <td className="py-2 px-4">✅</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-white/60">Web UI: Quick testing. CLI: Scripts. SDK: Build into your app.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {(["webui", "cli", "sdk"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setInterfaceChoice(opt)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                interfaceChoice === opt
                  ? "bg-purple-500/40 text-white border border-purple-400/50"
                  : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white/90"
              }`}
            >
              {opt === "webui" ? "Web UI" : opt === "cli" ? "CLI" : "SDK"}
            </button>
          ))}
        </div>
      </section>

      {interfaceChoice === "webui" && (
        <section className="glass-card rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-white/90">Web UI</h3>
          <p className="mt-2 text-sm text-white/60">
            Best for quick testing and experimentation. Interactive chat, no install required (hosted) or run locally.
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-white/90">Option 1: Hosted (no install)</p>
              <a
                href="https://compute-marketplace.0g.ai/inference"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg border border-purple-400/40 bg-purple-500/20 px-4 py-2 text-sm font-medium text-purple-200 hover:bg-purple-500/30 transition"
              >
                Open 0G Compute Marketplace →
              </a>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-white/90">Option 2: Run locally</p>
              <CodeOutput title="Install" code={installSnippet} />
              <div className="mt-2">
                <CodeOutput title="Launch Web UI" code={webUISnippet} />
              </div>
              <p className="mt-2 text-xs text-white/60">Open http://localhost:3090</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-white/90">Getting started</p>
            <ol className="mt-2 space-y-2 text-sm text-white/70 list-decimal list-inside">
              <li>Connect wallet (MetaMask)</li>
              <li>Deposit 0G via account dashboard</li>
              <li>Click <strong>Chat</strong> for interactive use, or <strong>Build</strong> for integration guides</li>
            </ol>
          </div>
        </section>
      )}

      {interfaceChoice === "cli" && (
        <section className="glass-card rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-white/90">CLI</h3>
          <p className="mt-2 text-sm text-white/60">
            Best for scripts and automation. Setup in ~2 min.
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-white/90">Install</p>
              <CodeOutput title="Terminal" code={installSnippet} />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-white/90">Setup &amp; fund</p>
              <CodeOutput title="Terminal" code={`# Setup network\n0g-compute-cli setup-network\n\n# Login\n0g-compute-cli login\n\n${depositSnippet}`} />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-white/90">Acknowledge provider</p>
              <CodeOutput title="Terminal" code={acknowledgeSnippet} />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-white/90">Launch Web UI (optional)</p>
              <CodeOutput title="Terminal" code={webUISnippet} />
            </div>
          </div>
        </section>
      )}

      {interfaceChoice === "sdk" && (
        <section className="glass-card rounded-2xl p-5">
          <h3 className="text-lg font-semibold text-white/90">SDK</h3>
          <p className="mt-2 text-sm text-white/60">
            Best for app integration and direct API access. Build inference into your Node.js app.
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <p className="mb-2 text-sm font-medium text-white/90">Install</p>
              <CodeOutput title="Terminal" code={sdkInstallSnippet} />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-white/90">Initialize broker</p>
              <CodeOutput title="JavaScript/TypeScript" code={sdkBasicSnippet} />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-white/90">Deposit &amp; transfer funds</p>
              <CodeOutput title="JavaScript/TypeScript" code={sdkDepositSnippet} />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-white/90">Acknowledge provider</p>
              <CodeOutput title="JavaScript/TypeScript" code={sdkAcknowledgeSnippet} />
            </div>
          </div>
        </section>
      )}

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">Getting started (all interfaces)</h3>
        <ol className="mt-4 space-y-3 text-sm text-white/80">
          <li><strong className="text-white/90">1. Connect &amp; fund</strong> — Deposit 0G, transfer to provider sub-account</li>
          <li><strong className="text-white/90">2. Acknowledge provider</strong> — Required before first use</li>
          <li><strong className="text-white/90">3. Start using</strong> — Chat (Web), scripts (CLI), or API (SDK)</li>
        </ol>
        {(interfaceChoice === "cli" || interfaceChoice === "webui") && (
          <div className="mt-4 space-y-2">
            <CodeOutput title="CLI: Deposit & transfer" code={depositSnippet} />
            <CodeOutput title="CLI: Acknowledge" code={acknowledgeSnippet} />
          </div>
        )}
      </section>

      <AddToProjectSteps steps={addToProjectSteps} />

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">Troubleshooting</h3>
        <div className="mt-4 space-y-4">
          <div>
            <p className="font-medium text-white/90">Insufficient balance</p>
            <p className="mt-1 text-sm text-white/60">Deposit more. Transfer to provider sub-account.</p>
            <div className="mt-2">
              <CodeOutput title="CLI" code={depositSnippet} />
            </div>
          </div>
          <div>
            <p className="font-medium text-white/90">Provider not acknowledged</p>
            <p className="mt-1 text-sm text-white/60">Acknowledge the provider before using their service.</p>
            <div className="mt-2">
              <CodeOutput title="CLI" code={acknowledgeSnippet} />
            </div>
          </div>
          <div>
            <p className="font-medium text-white/90">No funds in provider sub-account</p>
            <p className="mt-1 text-sm text-white/60">Transfer funds to the provider. Check balance.</p>
            <div className="mt-2">
              <CodeOutput title="CLI" code={checkBalanceSnippet} />
            </div>
          </div>
          <div>
            <p className="font-medium text-white/90">Web UI not starting</p>
            <p className="mt-1 text-sm text-white/60">Port 3090 in use? Use --port 3091. Ensure global install.</p>
            <div className="mt-2">
              <CodeOutput title="CLI" code={webUISnippet} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
