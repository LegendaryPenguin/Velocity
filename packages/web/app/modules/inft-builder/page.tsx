"use client";

import { useMemo, useState, useRef, useCallback } from "react";

import { AddToProjectSteps } from "@/components/builders/AddToProjectSteps";
import { CodeOutput } from "@/components/builders/CodeOutput";
import { ConceptCard } from "@/components/builders/ConceptCard";
import { ConfigPanel } from "@/components/builders/ConfigPanel";
import { FlowDiagram } from "@/components/builders/FlowDiagram";
import { GetAddressCard } from "@/components/builders/GetAddressCard";
import { PlacementGuide } from "@/components/builders/PlacementGuide";
import { WorkedExample } from "@/components/builders/WorkedExample";
import Link from "next/link";

const INTEGRATION_STEPS = [
  {
    num: 1,
    title: "Configure iNFT",
    body: "Set issuer, expiry, policy below. Use metadata schema in your mint API.",
    filePath: "app/api/mint/route.ts",
  },
  {
    num: 2,
    title: "Deploy iNFT contract",
    body: "Use the card below or packages/contracts to deploy HumanAgentINFT.",
    filePath: "packages/contracts",
  },
  {
    num: 3,
    title: "Add guard to your contract",
    body: "Include onlyVerified() or inline require in functions that require human verification.",
    filePath: "contracts/YourContract.sol",
  },
  {
    num: 4,
    title: "Use the hook in your app",
    body: "Call useIsVerified(wallet) in components that gate UI or API calls.",
    filePath: "hooks/useIsVerified.ts",
  },
];

export default function INFTBuilderPage() {
  const [issuer, setIssuer] = useState("My App");
  const [expiryDays, setExpiryDays] = useState(30);
  const [policyCooldownSec, setPolicyCooldownSec] = useState(86400);
  const [metadataType, setMetadataType] = useState("human-agent");
  const [network, setNetwork] = useState("0G Testnet");
  const [contractAddress, setContractAddress] = useState(
    process.env.NEXT_PUBLIC_INFT_ADDRESS ?? "0x..."
  );
  const [guardStyle, setGuardStyle] = useState<"modifier" | "inline">("modifier");
  const [framework, setFramework] = useState<"wagmi" | "ethers">("wagmi");
  const [includeCanUse, setIncludeCanUse] = useState(false);
  const stepSectionRefs = useRef<(HTMLElement | null)[]>([]);

  const scrollToStep = useCallback((index: number) => {
    stepSectionRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const metadataSchema = useMemo(
    () =>
      JSON.stringify(
        {
          type: metadataType,
          issuer,
          verified: true,
          verifiedAt: "<<now>>",
          expiresAt: `<<now + ${expiryDays * 24 * 60 * 60 * 1000}>>`,
          policy: { cooldownSec: policyCooldownSec },
          model: { name: "demo-classifier" },
        },
        null,
        2
      ),
    [metadataType, issuer, expiryDays, policyCooldownSec]
  );

  const soliditySnippet = useMemo(() => {
    if (guardStyle === "modifier") {
      if (includeCanUse) {
        return `// Guard: require verified human + authorized
// Network: ${network}
// iNFT: ${contractAddress}

IHumanAgentINFT public agent;

modifier onlyVerified() {
    require(agent.isVerified(msg.sender), "Agent not verified");
    uint256 tokenId = agent.ownerToTokenId(msg.sender);
    require(agent.canUse(tokenId, msg.sender), "Action not authorized");
    _;
}

function myGatedAction() external onlyVerified {
    // your logic
}`;
      }
      return `// Guard: require verified human agent
// Network: ${network}
// iNFT: ${contractAddress}

IHumanAgentINFT public agent;

modifier onlyVerified() {
    require(agent.isVerified(msg.sender), "Agent not verified");
    _;
}

function myGatedAction() external onlyVerified {
    // your logic
}`;
    }
    if (includeCanUse) {
      return `// Inline guard
require(agent.isVerified(msg.sender), "Agent not verified");
uint256 tokenId = agent.ownerToTokenId(msg.sender);
require(agent.canUse(tokenId, msg.sender), "Action not authorized");`;
    }
    return `// Inline guard
require(agent.isVerified(msg.sender), "Agent not verified");`;
  }, [network, contractAddress, guardStyle, includeCanUse]);

  const reactSnippet = useMemo(() => {
    if (framework === "wagmi") {
      return `import { useReadContract } from "wagmi";
import { inftAbi } from "./abi";

export function useIsVerified(wallet: \`0x\${string}\`) {
  return useReadContract({
    address: "${contractAddress}",
    abi: inftAbi,
    functionName: "isVerified",
    args: [wallet],
  });
}`;
    }
    return `import { Contract, JsonRpcProvider } from "ethers";
import { inftAbi } from "./abi";

const rpc = process.env.NEXT_PUBLIC_OG_RPC_URL ?? "https://evmrpc-testnet.0g.ai";

export async function isVerified(wallet: string) {
  const provider = new JsonRpcProvider(rpc);
  const contract = new Contract("${contractAddress}", inftAbi, provider);
  return contract.isVerified(wallet);
}`;
  }, [contractAddress, framework]);

  const workedExampleCode = useMemo(
    () => `// Minimal contract
contract MyFaucet {
  IHumanAgentINFT public agent;
  constructor(address _agent) { agent = IHumanAgentINFT(_agent); }
  function claim() external {
    require(agent.isVerified(msg.sender), "Agent not verified");
    // transfer logic
  }
}

// Minimal React component
function ClaimButton() {
  const { address } = useAccount();
  const { data } = useIsVerified(address ?? "0x0");
  return (
    <button disabled={!data}>
      {data ? "Claim" : "Verify first"}
    </button>
  );
}`,
    []
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Link href="/modules" className="text-sm text-white/60 hover:text-white/90">
          ← Modules
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">iNFT Builder</h1>
        <p className="mt-1 text-sm text-white/60">
          Configure your iNFT, then generate Solidity guards and React hooks.
        </p>
      </div>

      <AddToProjectSteps steps={INTEGRATION_STEPS} onStepClick={scrollToStep} />

      {/* Overview */}
      <section className="scroll-mt-8">
        <ConceptCard
          title="What is an iNFT?"
          actionLink={{ href: "/faucet", label: "See it in action" }}
          learnMore={
            <p>
              The iNFT stores encrypted metadata on-chain. Your contract checks{" "}
              <code className="rounded bg-white/10 px-1">isVerified(wallet)</code> before allowing
              gated actions like faucet claims or voting.
            </p>
          }
        >
          An iNFT is an on-chain credential proving a user passed human verification. Your contract
          and frontend use it to gate access (e.g., faucet claim, voting).
        </ConceptCard>

        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold text-white/80">What can you do with it?</h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-white/60">
            <li>Gate faucet claims so only verified humans can claim</li>
            <li>Restrict voting or governance to verified identities</li>
            <li>Gate API access or premium features</li>
          </ul>
        </div>

        <div className="mt-4">
          <FlowDiagram nodes={["Wallet", "isVerified(wallet)", "true/false", "Gate action"]} />
        </div>
      </section>

      {/* Step 1: Configure iNFT */}
      <section
        ref={(el) => { stepSectionRefs.current[0] = el; }}
        className="scroll-mt-8"
      >
        <ConfigPanel
          title="Step 1: Configure iNFT (for mint API)"
          fields={[
            {
              id: "issuer",
              label: "Issuer name",
              value: issuer,
              onChange: setIssuer,
              helper: "Name shown in iNFT metadata. Use your app name or domain.",
            },
            {
              id: "expiryDays",
              label: "Expiry (days)",
              type: "number",
              value: expiryDays,
              onChange: setExpiryDays,
              helper: "Credential validity period. Users must re-verify after expiry.",
            },
            {
              id: "policyCooldown",
              label: "Policy cooldown (sec)",
              type: "number",
              value: policyCooldownSec,
              onChange: setPolicyCooldownSec,
              helper: "Minimum seconds between canUse-style actions (e.g., faucet claims).",
            },
            {
              id: "metadataType",
              label: "Metadata type",
              type: "select",
              value: metadataType,
              onChange: setMetadataType,
              options: [{ value: "human-agent", label: "human-agent" }],
              helper: "Currently only human-agent.",
            },
          ]}
        />
        <div className="mt-4">
          <p className="mb-2 text-sm text-white/60">
            Use this schema in your mint API when issuing iNFTs (e.g. in <code className="rounded bg-white/10 px-1">app/api/mint/route.ts</code>). Your backend sends this structure when minting an iNFT for a verified user.
          </p>
          <CodeOutput title="Metadata schema (for mint API)" code={metadataSchema} />
        </div>
      </section>

      {/* Step 2: Get Address */}
      <section
        ref={(el) => { stepSectionRefs.current[1] = el; }}
        className="scroll-mt-8"
      >
        <h2 className="mb-3 text-lg font-semibold text-white/90">Step 2: Deploy iNFT contract</h2>
        <GetAddressCard
          onSuccess={setContractAddress}
          initialAddress={contractAddress !== "0x..." ? contractAddress : undefined}
        />
      </section>

      {/* Step 3: Code Config + Generated code */}
      <section
        ref={(el) => { stepSectionRefs.current[2] = el; }}
        className="scroll-mt-8"
      >
        <ConfigPanel
          title="Step 3: Configure & generate code"
          fields={[
            {
              id: "network",
              label: "Network",
              type: "select",
              value: network,
              onChange: setNetwork,
              options: [
                { value: "0G Testnet", label: "0G Testnet" },
                { value: "0G Mainnet", label: "0G Mainnet" },
              ],
            },
            {
              id: "contract",
              label: "iNFT contract address",
              value: contractAddress,
              onChange: setContractAddress,
              placeholder: "0x...",
              helper: "Deploy via the card above or paste an existing address.",
            },
            {
              id: "guardStyle",
              label: "Guard style",
              type: "select",
              value: guardStyle,
              onChange: setGuardStyle,
              options: [
                { value: "modifier", label: "Modifier" },
                { value: "inline", label: "Inline require" },
              ],
              helper: "Modifier for functions; inline for one-off checks.",
            },
            {
              id: "framework",
              label: "Frontend framework",
              type: "select",
              value: framework,
              onChange: setFramework,
              options: [
                { value: "wagmi", label: "wagmi" },
                { value: "ethers", label: "ethers" },
              ],
              helper: "wagmi for React; ethers for vanilla JS or Node.",
            },
          ]}
        />
        <div className="mt-4 flex items-center gap-2">
          <input
            type="checkbox"
            id="canUse"
            checked={includeCanUse}
            onChange={(e) => setIncludeCanUse(e.target.checked)}
            className="h-4 w-4 rounded accent-purple-500"
          />
          <label htmlFor="canUse" className="text-sm text-white/70">
            Include canUse check (faucet-style flow)
          </label>
        </div>
        <div className="mt-6">
          <h3 className="mb-3 text-base font-semibold text-white/90">Generated code</h3>
          <div className="space-y-4">
            <CodeOutput title="Solidity guard" code={soliditySnippet} />
            <CodeOutput title="React hook" code={reactSnippet} />
          </div>
        </div>
      </section>

      {/* Step 4: Where this goes */}
      <section
        ref={(el) => { stepSectionRefs.current[3] = el; }}
        className="scroll-mt-8"
      >
        <h2 className="mb-3 text-lg font-semibold text-white/90">Step 4: Use the hook in your app</h2>
        <div className="space-y-4">
          <PlacementGuide
            filePath="contracts/MyContract.sol"
            description="Add the modifier or inline require at the start of gated functions."
            code={soliditySnippet}
          />
          <PlacementGuide
            filePath="hooks/useIsVerified.ts"
            description="Call useIsVerified(wallet) in components that gate UI (e.g. Claim button)."
            code={reactSnippet}
          />
        </div>

        <div className="mt-6">
          <WorkedExample
            title="Show full example"
            code={workedExampleCode}
            description={
              <p>
                This shows a minimal end-to-end setup: a Solidity faucet contract that gates claims with{" "}
                <code className="rounded bg-white/10 px-1">isVerified</code>, plus a React{" "}
                <code className="rounded bg-white/10 px-1">ClaimButton</code> that calls{" "}
                <code className="rounded bg-white/10 px-1">useIsVerified</code> and enables the button only when the user is verified.
              </p>
            }
          />
        </div>
      </section>
    </div>
  );
}
