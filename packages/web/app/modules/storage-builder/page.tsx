"use client";

import { useCallback, useMemo, useState } from "react";

import { AddToProjectSteps } from "@/components/builders/AddToProjectSteps";
import { CodeOutput } from "@/components/builders/CodeOutput";
import { ConceptCard } from "@/components/builders/ConceptCard";
import { ConfigPanel } from "@/components/builders/ConfigPanel";
import { FlowDiagram } from "@/components/builders/FlowDiagram";
import { IntegrationCodeBlock } from "@/components/builders/IntegrationCodeBlock";
import { PlacementGuide } from "@/components/builders/PlacementGuide";
import { StorageVisualDiagram } from "@/components/builders/StorageVisualDiagram";
import { WorkedExample } from "@/components/builders/WorkedExample";
import Link from "next/link";

export default function StorageBuilderPage() {
  const [namespace, setNamespace] = useState("human-agent");
  const [storeType, setStoreType] = useState<"encrypted" | "public">("encrypted");
  const [returnFormat, setReturnFormat] = useState<"uri-hash" | "uri-rootHash">("uri-hash");
  const [encryptBeforeStore, setEncryptBeforeStore] = useState(true);
  const [issuer, setIssuer] = useState("My App");
  const [expiryDays, setExpiryDays] = useState(30);
  const [policyCooldownSec, setPolicyCooldownSec] = useState(86400);
  const [copyAllFeedback, setCopyAllFeedback] = useState(false);

  const metadataPrefill = useMemo(
    () => ({
      type: "human-agent",
      issuer,
      verified: true,
      verifiedAt: "<<now>>",
      expiresAt: `<<now + ${expiryDays * 24 * 60 * 60 * 1000}>>`,
      policy: { cooldownSec: policyCooldownSec },
      model: { name: "demo-classifier" },
    }),
    [issuer, expiryDays, policyCooldownSec]
  );

  const snippet = useMemo(() => {
    if (encryptBeforeStore) {
      const ret = returnFormat === "uri-hash" ? "{ uri, metadataHash }" : "{ uri, rootHash: metadataHash }";
      return `// lib/ogStorage.ts - storeEncryptedMetadata pattern
// Namespace: ${namespace}
// Store type: ${storeType}

import { storeEncryptedMetadata } from "@/lib/ogStorage";
import { encryptJson } from "@/lib/encrypt";
import { ethers } from "ethers";

export async function storeMetadataForMint(metadata: Record<string, unknown>) {
  const plaintext = JSON.stringify(metadata);
  const encryptedPayload = JSON.stringify(encryptJson(plaintext));
  const uri = await storeEncryptedMetadata(encryptedPayload);
  const metadataHash = ethers.keccak256(ethers.toUtf8Bytes(plaintext));
  return ${ret};
}

// Metadata schema: issuer, expiryAt, policy.cooldownSec, type
// Prefill: ${JSON.stringify(metadataPrefill)}`;
    }

    return `// lib/ogStorage.ts - public store (no encrypt)
// Namespace: ${namespace}

import { storeEncryptedMetadata } from "@/lib/ogStorage";
import { ethers } from "ethers";

export async function storeMetadata(metadata: Record<string, unknown>) {
  const plaintext = JSON.stringify(metadata);
  const uri = await storeEncryptedMetadata(plaintext);
  const hash = ethers.keccak256(ethers.toUtf8Bytes(plaintext));
  return { uri, hash };
}`;
  }, [namespace, storeType, returnFormat, encryptBeforeStore, metadataPrefill]);

  const envSnippet = useMemo(
    () => `# .env.local
OG_STORAGE_URL=your_0g_storage_url
OG_STORAGE_API_KEY=your_api_key`,
    []
  );

  const workedExampleCode = useMemo(
    () => `// In mint API route
const metadata = {
  type: "human-agent",
  issuer: "My App",
  verified: true,
  verifiedAt: Date.now(),
  expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
  policy: { cooldownSec: 86400 },
};
const plaintext = JSON.stringify(metadata);
const encrypted = JSON.stringify(encryptJson(plaintext));
const encryptedURI = await storeEncryptedMetadata(encrypted);
const metadataHash = ethers.keccak256(ethers.toUtf8Bytes(plaintext));
await inft.mint(to, encryptedURI, metadataHash);`,
    []
  );

  const copyAllIntegration = useCallback(() => {
    navigator.clipboard.writeText(snippet);
    setCopyAllFeedback(true);
    setTimeout(() => setCopyAllFeedback(false), 2000);
  }, [snippet]);

  const addToProjectSteps = useMemo(
    () => [
      { num: 1, title: "Set env", body: "Use the copy button above to copy the env vars, then add them to .env.local.", filePath: ".env.local" },
      { num: 2, title: "Add ogStorage and encrypt", body: "Use the copy buttons above to copy ogStorage.ts and encrypt.ts into your project.", filePath: "lib/ogStorage.ts" },
      { num: 3, title: "Add generated helper", body: "Copy the generated helper below (or use the Copy all integration button).", filePath: "lib/ogStorage.ts" },
      { num: 4, title: "Use in mint flow", body: "Store metadata before minting; pass uri and metadataHash to inft.mint.", filePath: "app/api/mint/route.ts" },
    ],
    []
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Link href="/dashboard" className="text-sm text-white/60 hover:text-white/90">
          ← Dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">Storage Builder</h1>
        <p className="mt-1 text-sm text-white/60">
          Generate 0G storage helper code for iNFT metadata and encrypted payloads.
        </p>
      </div>

      <ConceptCard
        title="0G Storage in the iNFT flow"
        learnMore={
          <p>
            The mint API stores encrypted metadata on 0G and passes the resulting URI + hash to the iNFT contract.{" "}
            <code className="rounded bg-white/10 px-1">storeEncryptedMetadata</code> uses{" "}
            <code className="rounded bg-white/10 px-1">createStorageClient</code> and{" "}
            <code className="rounded bg-white/10 px-1">store</code> from the 0G SDK.
          </p>
        }
      >
        0G storage holds iNFT metadata (encrypted or public) before minting. Your mint API calls storeEncryptedMetadata with the payload, gets a URI, and passes it to <code className="rounded bg-white/10 px-1">inft.mint</code>.
      </ConceptCard>

      <div className="flex justify-center w-full">
        <FlowDiagram
          nodes={["Metadata JSON", "Encrypt (optional)", "storeEncryptedMetadata", "URI", "mint(to, uri, hash)"]}
          icons={["📄", "🔒", "☁️", "🔗", "🚀"]}
        />
      </div>
      <StorageVisualDiagram />

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">What you need before integrating</h3>
        <p className="mt-2 text-sm text-white/60">
          Follow these steps to gather everything the storage flow needs.
        </p>
        <ol className="mt-4 space-y-4 text-sm">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/30 text-xs font-semibold text-purple-200">1</span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white/90">Set environment variables</p>
              <p className="mt-1 text-white/60">Add these to .env.local. Use the copy button to copy the snippet.</p>
              <div className="mt-2">
                <CodeOutput title=".env.local" code={envSnippet} />
              </div>
            </div>
          </li>
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/30 text-xs font-semibold text-purple-200">2</span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white/90">Get ogStorage and encrypt helpers</p>
              <p className="mt-1 text-white/60">Copy the code below into your project at the listed paths. Use the copy button for each file.</p>
              <div className="mt-3 space-y-3">
                <IntegrationCodeBlock file="ogStorage" title="lib/ogStorage.ts" />
                <IntegrationCodeBlock file="encrypt" title="lib/encrypt.ts" />
              </div>
            </div>
          </li>
        </ol>
      </section>

      <ConfigPanel
        title="Configure your integration"
        fields={[
          { id: "namespace", label: "Namespace", value: namespace, onChange: setNamespace, placeholder: "human-agent" },
          {
            id: "storeType",
            label: "Store type",
            type: "select",
            value: storeType,
            onChange: setStoreType,
            options: [
              { value: "encrypted", label: "Encrypted (iNFT metadata)" },
              { value: "public", label: "Public" },
            ],
          },
          {
            id: "returnFormat",
            label: "Return format",
            type: "select",
            value: returnFormat,
            onChange: setReturnFormat,
            options: [
              { value: "uri-hash", label: "{ uri, metadataHash }" },
              { value: "uri-rootHash", label: "{ uri, rootHash }" },
            ],
          },
          { id: "issuer", label: "Metadata issuer", value: issuer, onChange: setIssuer },
          { id: "expiryDays", label: "Metadata expiry (days)", type: "number", value: expiryDays, onChange: setExpiryDays },
          { id: "policyCooldown", label: "Metadata policy cooldown (sec)", type: "number", value: policyCooldownSec, onChange: setPolicyCooldownSec },
          {
            id: "encrypt",
            label: "Encrypt before store",
            type: "select",
            value: encryptBeforeStore ? "yes" : "no",
            onChange: (v) => setEncryptBeforeStore(v === "yes"),
            options: [
              { value: "yes", label: "Yes (recommended for iNFT metadata)" },
              { value: "no", label: "No (public store)" },
            ],
            helper: "When on: metadata is encrypted with AES-256-GCM before storing.",
          },
        ]}
      />

      <section>
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Generated helper</h2>
          <button
            type="button"
            onClick={copyAllIntegration}
            className="btn-primary rounded-lg px-3 py-1.5 text-sm font-medium"
          >
            {copyAllFeedback ? "Copied" : "Copy all integration"}
          </button>
        </div>
        <CodeOutput title="Storage helper" code={snippet} />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Where this goes</h2>
        <PlacementGuide
          filePath="lib/ogStorage.ts"
          description="Extend storeEncryptedMetadata or add a wrapper that builds metadata and returns uri + hash. Add to the same file or a new helper."
          code={snippet}
        />
      </section>

      <AddToProjectSteps steps={addToProjectSteps} />

      <WorkedExample title="Show mint flow example" code={workedExampleCode} />
    </div>
  );
}
