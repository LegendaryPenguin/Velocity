"use client";

import { useCallback, useMemo, useState } from "react";

import { AddToProjectSteps } from "@/components/builders/AddToProjectSteps";
import { CodeOutput } from "@/components/builders/CodeOutput";
import { ConceptCard } from "@/components/builders/ConceptCard";
import { ConfigPanel } from "@/components/builders/ConfigPanel";
import { FaucetVisualDiagram } from "@/components/builders/FaucetVisualDiagram";
import { FlowDiagram } from "@/components/builders/FlowDiagram";
import { IntegrationCodeBlock } from "@/components/builders/IntegrationCodeBlock";
import { PlacementGuide } from "@/components/builders/PlacementGuide";
import { WorkedExample } from "@/components/builders/WorkedExample";
import Link from "next/link";

export default function FaucetBuilderPage() {
  const [faucetAddress, setFaucetAddress] = useState(
    process.env.NEXT_PUBLIC_FAUCET_ADDRESS ?? "0x..."
  );
  const [cooldownSec, setCooldownSec] = useState(86400);
  const [agentAddress, setAgentAddress] = useState(
    process.env.NEXT_PUBLIC_INFT_ADDRESS ?? "0x..."
  );
  const [contractStyle, setContractStyle] = useState<"full" | "minimal">("full");
  const [apiFramework, setApiFramework] = useState<"app" | "pages">("app");
  const [includeTransferLogic, setIncludeTransferLogic] = useState(false);
  const [copyAllFeedback, setCopyAllFeedback] = useState(false);

  const contractSnippet = useMemo(() => {
    if (contractStyle === "full") {
      return `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IHumanAgentINFT {
    function isVerified(address wallet) external view returns (bool);
    function ownerToTokenId(address owner) external view returns (uint256);
    function canUse(uint256 tokenId, address executor) external view returns (bool);
}

contract Faucet {
    IHumanAgentINFT public immutable agent;
    uint256 public immutable cooldownSec;
    mapping(address => uint256) public lastClaimedAt;

    event Claimed(address indexed caller, address indexed recipient, uint256 claimedAt);

    constructor(address agentAddress, uint256 cooldownSeconds) {
        agent = IHumanAgentINFT(agentAddress);
        cooldownSec = cooldownSeconds;
    }

    function claim(address caller, address recipient) external {
        require(caller != address(0), "Invalid caller");
        require(recipient != address(0), "Invalid recipient");
        require(agent.isVerified(caller), "Agent not verified");

        uint256 tokenId = agent.ownerToTokenId(caller);
        require(tokenId != 0, "No agent token");
        require(agent.canUse(tokenId, caller), "Action not authorized");

        uint256 nowTs = block.timestamp;
        uint256 unlockAt = lastClaimedAt[caller] + cooldownSec;
        require(nowTs >= unlockAt, "Cooldown active");

        lastClaimedAt[caller] = nowTs;
        emit Claimed(caller, recipient, nowTs);
        ${includeTransferLogic ? "// TODO: ERC20 transfer to recipient" : "// TODO: add transfer logic"}
    }

    function cooldownRemaining(address wallet) external view returns (uint256) {
        uint256 unlockAt = lastClaimedAt[wallet] + cooldownSec;
        if (block.timestamp >= unlockAt) return 0;
        return unlockAt - block.timestamp;
    }
}`;
    }
    return `// Minimal guard (use Faucet.sol for full pattern)
require(agent.isVerified(caller), "Agent not verified");
uint256 tokenId = agent.ownerToTokenId(caller);
require(agent.canUse(tokenId, caller), "Action not authorized");
require(block.timestamp >= lastClaimedAt[caller] + cooldownSec, "Cooldown active");`;
  }, [contractStyle, cooldownSec, agentAddress, includeTransferLogic]);

  const apiRoutePath = apiFramework === "app" ? "app/api/claim/route.ts" : "pages/api/claim.ts";

  const apiSnippet = useMemo(() => {
    return `// ${apiRoutePath}
// Env: NEXT_PUBLIC_FAUCET_ADDRESS, PRIVATE_KEY, OG_RPC_URL

import { NextResponse } from "next/server";
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import { FAUCET_ABI } from "@/lib/inftAbi";

function isAddress(v: string) { return /^0x[a-fA-F0-9]{40}$/.test(v); }

export async function POST(req: Request) {
  const { wallet, to } = await req.json();
  if (!isAddress(wallet) || !isAddress(to)) {
    return NextResponse.json({ ok: false, error: "Invalid wallet input." }, { status: 400 });
  }

  const rpc = process.env.OG_RPC_URL ?? "https://evmrpc-testnet.0g.ai";
  const pk = process.env.PRIVATE_KEY ?? "";
  const faucetAddress = process.env.NEXT_PUBLIC_FAUCET_ADDRESS ?? "";
  if (!pk.startsWith("0x") || !isAddress(faucetAddress)) {
    return NextResponse.json({ ok: false, error: "Faucet env missing." }, { status: 500 });
  }

  const provider = new JsonRpcProvider(rpc);
  const signer = new Wallet(pk, provider);
  const faucet = new Contract(faucetAddress, FAUCET_ABI, signer);

  const tx = await faucet.claim(wallet, to);
  const receipt = await tx.wait();
  const cooldownRemaining = Number(await faucet.cooldownRemaining(wallet));

  return NextResponse.json({
    ok: true,
    txHash: receipt?.hash,
    cooldownRemainingSec: cooldownRemaining,
  });
}`;
  }, [apiFramework]);

  const envSnippet = useMemo(
    () => `# .env.local - Faucet integration
NEXT_PUBLIC_FAUCET_ADDRESS=${faucetAddress || "0x..."}
NEXT_PUBLIC_INFT_ADDRESS=${agentAddress || "0x..."}
OG_RPC_URL=https://evmrpc-testnet.0g.ai
PRIVATE_KEY=0x...`,
    [faucetAddress, agentAddress]
  );

  const workedExampleCode = useMemo(
    () => `// Frontend: call claim after mint + verification
// User must have completed captcha → ZK proof → mint iNFT first
const claimRes = await fetch("/api/claim", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ wallet: userWallet, to: userWallet }),
});
const { ok, txHash, cooldownRemainingSec, error } = await claimRes.json();
if (ok) {
  console.log("Claim tx:", txHash);
  console.log("Next claim in:", cooldownRemainingSec, "seconds");
}`,
    []
  );

  const copyAllIntegration = useCallback(() => {
    const all = `// Contract: contracts/Faucet.sol\n\n${contractSnippet}\n\n// API: ${apiRoutePath}\n\n${apiSnippet}\n\n// Env:\n${envSnippet}`;
    navigator.clipboard.writeText(all);
    setCopyAllFeedback(true);
    setTimeout(() => setCopyAllFeedback(false), 2000);
  }, [contractSnippet, apiSnippet, envSnippet, apiRoutePath]);

  const addToProjectSteps = useMemo(
    () => [
      {
        num: 1,
        title: "Complete prerequisites",
        body: "Deploy Human Agent iNFT. Implement Captcha Builder flow (verify → ZK). Implement Storage Builder (mint API). Users must mint an iNFT before they can claim.",
        filePath: "See prerequisites above",
      },
      {
        num: 2,
        title: "Add lib/inftAbi.ts",
        body: "Use the copy button above to copy inftAbi.ts. It exports FAUCET_ABI required by the claim API.",
        filePath: "lib/inftAbi.ts",
      },
      {
        num: 3,
        title: "Set environment variables",
        body: "Use the copy button above to copy the env snippet. Add to .env.local.",
        filePath: ".env.local",
      },
      {
        num: 4,
        title: "Deploy Faucet contract",
        body: "Use the Faucet.sol code from this project (or the generated contract). Deploy with constructor(agentAddress, cooldownSeconds). Update NEXT_PUBLIC_FAUCET_ADDRESS.",
        filePath: "contracts/Faucet.sol",
      },
      {
        num: 5,
        title: "Add claim API route",
        body: "Use the copy button above to copy the claim route, or use the generated snippet below.",
        filePath: apiRoutePath,
      },
      {
        num: 6,
        title: "Wire frontend",
        body: "After mint + verification, call POST /api/claim with { wallet, to }. See the worked example below.",
        filePath: "app/faucet/page.tsx",
      },
    ],
    [apiRoutePath]
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Link href="/dashboard" className="text-sm text-white/60 hover:text-white/90">
          ← Dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">Faucet Integration Builder</h1>
        <p className="mt-1 text-sm text-white/60">
          Generate contract and API code for faucet claims gated by Human Agent iNFT. Users must verify (captcha + ZK), mint an iNFT, then claim.
        </p>
      </div>

      <ConceptCard
        title="Faucet depends on iNFT"
        learnMore={
          <p>
            The faucet contract uses <code className="rounded bg-white/10 px-1">agent.isVerified</code>,{" "}
            <code className="rounded bg-white/10 px-1">agent.ownerToTokenId</code>, and{" "}
            <code className="rounded bg-white/10 px-1">agent.canUse</code> to ensure only verified humans can claim.
            Your API signs the claim transaction and returns cooldown status. The user flow is: captcha → ZK proof → mint iNFT → claim faucet.
          </p>
        }
      >
        The faucet gates claims to users who hold a verified Human Agent iNFT. Users must complete captcha → mint iNFT first. The contract enforces isVerified + canUse + cooldown; your API proxies the claim transaction.
      </ConceptCard>

      <div className="flex justify-center w-full">
        <FlowDiagram
          nodes={["User (verified)", "API /api/claim", "Faucet.claim(caller, to)", "Cooldown check", "Transfer"]}
          icons={["👤", "🔌", "📜", "⏱️", "💸"]}
        />
      </div>
      <FaucetVisualDiagram />

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">Prerequisites</h3>
        <p className="mt-2 text-sm text-white/60">
          The faucet flow requires these to be in place first. Complete them in order.
        </p>
        <ol className="mt-4 space-y-3 text-sm list-decimal list-inside text-white/80">
          <li>
            <strong>Captcha Builder</strong> – Users verify via tile puzzle. Use the{" "}
            <Link href="/modules/captcha-builder" className="text-purple-300 hover:text-purple-200 underline">
              Captcha Builder
            </Link>{" "}
            to add VerifyButton, ZK proof, and /api/validate.
          </li>
          <li>
            <strong>Storage Builder</strong> – Metadata is stored on 0G before minting. Use the{" "}
            <Link href="/modules/storage-builder" className="text-purple-300 hover:text-purple-200 underline">
              Storage Builder
            </Link>{" "}
            for ogStorage and /api/mint.
          </li>
          <li>
            <strong>Human Agent iNFT deployed</strong> – Deploy the iNFT contract. Users mint after verification.
          </li>
          <li>
            <strong>Mint API</strong> – /api/mint stores metadata, mints iNFT, and requires verificationPassed.
          </li>
        </ol>
      </section>

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">What you need before integrating</h3>
        <p className="mt-2 text-sm text-white/60">
          Copy the code below into your project at the listed paths. Use the copy button for each.
        </p>
        <ol className="mt-4 space-y-4 text-sm">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/30 text-xs font-semibold text-purple-200">1</span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white/90">Add lib/inftAbi.ts</p>
              <p className="mt-1 text-white/60">The claim API needs FAUCET_ABI. Copy the full file below.</p>
              <div className="mt-2">
                <IntegrationCodeBlock file="inftAbi" title="lib/inftAbi.ts" />
              </div>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/30 text-xs font-semibold text-purple-200">2</span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white/90">Set environment variables</p>
              <p className="mt-1 text-white/60">Add to .env.local. Replace placeholders with your deployed addresses.</p>
              <div className="mt-2">
                <CodeOutput title=".env.local" code={envSnippet} />
              </div>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/30 text-xs font-semibold text-purple-200">3</span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white/90">Get Faucet.sol contract</p>
              <p className="mt-1 text-white/60">Copy the contract and deploy with Hardhat. Constructor: (agentAddress, cooldownSeconds).</p>
              <div className="mt-2">
                <IntegrationCodeBlock file="faucetContract" title="contracts/Faucet.sol" />
              </div>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/30 text-xs font-semibold text-purple-200">4</span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white/90">Add claim API route</p>
              <p className="mt-1 text-white/60">Create the route at {apiRoutePath}. Copy the code below.</p>
              <div className="mt-2">
                <IntegrationCodeBlock file="claimRoute" title={apiRoutePath} />
              </div>
            </div>
          </li>
        </ol>
      </section>

      <ConfigPanel
        title="Configure your integration"
        fields={[
          {
            id: "faucet",
            label: "Faucet contract address",
            value: faucetAddress,
            onChange: setFaucetAddress,
            placeholder: "0x...",
            helper: "After deploying Faucet.sol, set this and NEXT_PUBLIC_FAUCET_ADDRESS.",
          },
          {
            id: "agent",
            label: "iNFT agent address",
            value: agentAddress,
            onChange: setAgentAddress,
            placeholder: "0x...",
            helper: "The Human Agent iNFT contract address.",
          },
          {
            id: "cooldown",
            label: "Cooldown (seconds)",
            type: "number",
            value: cooldownSec,
            onChange: setCooldownSec,
            helper: "Minimum seconds between claims per wallet.",
          },
          {
            id: "contractStyle",
            label: "Contract style",
            type: "select",
            value: contractStyle,
            onChange: setContractStyle,
            options: [
              { value: "full", label: "Full Faucet.sol (isVerified + canUse + cooldown)" },
              { value: "minimal", label: "Minimal guard (snippet only)" },
            ],
            helper: "Use Full for deployment. Minimal is a reference snippet.",
          },
          {
            id: "apiFramework",
            label: "API framework",
            type: "select",
            value: apiFramework,
            onChange: setApiFramework,
            options: [
              { value: "app", label: "Next.js App Router (app/api/claim/route.ts)" },
              { value: "pages", label: "Next.js Pages (pages/api/claim.ts)" },
            ],
          },
          {
            id: "transfer",
            label: "Include transfer logic skeleton",
            type: "select",
            value: includeTransferLogic ? "yes" : "no",
            onChange: (v) => setIncludeTransferLogic(v === "yes"),
            options: [
              { value: "yes", label: "Yes (TODO for ERC20 transfer)" },
              { value: "no", label: "No" },
            ],
            helper: "Adds a placeholder comment for ERC20 transfer in the contract.",
          },
        ]}
      />

      <section>
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Generated code</h2>
          <button
            type="button"
            onClick={copyAllIntegration}
            className="btn-primary rounded-lg px-3 py-1.5 text-sm font-medium"
          >
            {copyAllFeedback ? "Copied" : "Copy all integration"}
          </button>
        </div>
        <div className="space-y-4">
          <CodeOutput title="Contract (contracts/Faucet.sol)" code={contractSnippet} />
          <CodeOutput title={`API route (${apiRoutePath})`} code={apiSnippet} />
          <CodeOutput title="Env snippet" code={envSnippet} />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Where this goes</h2>
        <div className="space-y-4">
          <PlacementGuide
            filePath="contracts/Faucet.sol"
            description="Deploy with constructor(agentAddress, cooldownSeconds). Use Hardhat from packages/contracts. Set PRIVATE_KEY in .env."
            code={contractSnippet}
          />
          <PlacementGuide
            title="Claim API route"
            filePath={apiRoutePath}
            description="Implement POST handler. Expects { wallet, to } in body. Call faucet.claim(wallet, to) and return txHash + cooldownRemainingSec."
            code={apiSnippet}
          />
        </div>
      </section>

      <AddToProjectSteps steps={addToProjectSteps} />

      <WorkedExample title="Frontend: call claim after mint" code={workedExampleCode} />
    </div>
  );
}
