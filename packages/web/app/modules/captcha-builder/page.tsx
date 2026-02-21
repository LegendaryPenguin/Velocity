"use client";

import { useCallback, useMemo, useState } from "react";

import { AddToProjectSteps } from "@/components/builders/AddToProjectSteps";
import { CaptchaVisualDiagram } from "@/components/builders/CaptchaVisualDiagram";
import { CodeOutput } from "@/components/builders/CodeOutput";
import { ConceptCard } from "@/components/builders/ConceptCard";
import { IntegrationCodeBlock } from "@/components/builders/IntegrationCodeBlock";
import { ConfigPanel } from "@/components/builders/ConfigPanel";
import { FlowDiagram } from "@/components/builders/FlowDiagram";
import { PlacementGuide } from "@/components/builders/PlacementGuide";
import { WorkedExample } from "@/components/builders/WorkedExample";
import { CaptchaModal } from "@/components/faucet/CaptchaModal";
import Link from "next/link";

export default function CaptchaBuilderPage() {
  const [theme, setTheme] = useState("dark");
  const [gridSize, setGridSize] = useState(4);
  const [includeZKFlow, setIncludeZKFlow] = useState(true);
  const [language, setLanguage] = useState<"ts" | "js">("ts");
  const [framework, setFramework] = useState<"app" | "pages" | "react">("app");
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoResult, setDemoResult] = useState<{ isHuman: boolean } | null>(null);
  const [copyAllFeedback, setCopyAllFeedback] = useState(false);

  const apiRouteHint = useMemo(() => {
    if (framework === "app") return "app/api/validate/route.ts";
    if (framework === "pages") return "pages/api/validate.ts";
    return "your API route for validation";
  }, [framework]);

  const validateRouteSnippet = useMemo(
    () => `import { NextResponse } from "next/server";
import * as snarkjs from "snarkjs";
import { readFile } from "fs/promises";
import path from "path";

export const runtime = "nodejs";

let vkeyCache: object | null = null;

async function getVkey() {
  if (vkeyCache) return vkeyCache;
  const vkeyPath = path.join(process.cwd(), "public", "zk", "verification_key.json");
  const raw = await readFile(vkeyPath, "utf-8");
  vkeyCache = JSON.parse(raw);
  return vkeyCache;
}

export async function POST(req: Request) {
  try {
    const { proof, publicSignals } = await req.json();
    if (!proof || !Array.isArray(publicSignals)) {
      return NextResponse.json(
        { verified: false, error: "Missing proof or publicSignals" },
        { status: 400 }
      );
    }

    const vkey = await getVkey();
    const isValid = await snarkjs.groth16.verify(vkey, publicSignals, proof);
    const verified = isValid && publicSignals[0] === "1";

    return NextResponse.json({ verified });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ verified: false, error: msg }, { status: 500 });
  }
}`,
    []
  );

  const snippet = useMemo(() => {
    const cb = language === "ts" ? "(payload: ExportedJson, score: number)" : "(payload, score)";
    const typeImports = language === "ts" ? `\nimport type { ExportedJson } from "@/lib/captchaModel";` : "";
    const zkImports = includeZKFlow
      ? `\nimport { generateProof, submitProofForValidation } from "@/lib/zk/prove";`
      : "";

    const onVerified = includeZKFlow
      ? `  const onVerifiedHuman = async ${cb} => {
    setOpen(false);
    setVerifying(true);
    try {
      const proofResult = await generateProof(score);
      if (!proofResult.success) {
        setVerifying(false);
        return;
      }
      const { ok, verified } = await submitProofForValidation(
        proofResult.proof,
        proofResult.publicSignals
      );
      setVerificationState(verified ? "verified" : "unverified");
    } finally {
      setVerifying(false);
    }
  };`
      : `  const onVerifiedHuman = ${cb} => {
    setOpen(false);
    // handle verification (e.g. call mint API)
  };`;

    const verifyState = includeZKFlow
      ? `\n  const [verifying, setVerifying] = useState(false);
  const [verificationState, setVerificationState] = useState("unverified");`
      : "";

    const btnDisabled = includeZKFlow ? " disabled={verifying}" : "";
    const btnText = includeZKFlow ? "{verifying ? \"Verifying...\" : \"Verify Access\"}" : '"Verify Access"';

    const imports = `import { useState } from "react";
import { CaptchaModal } from "@/components/faucet/CaptchaModal";${typeImports}${zkImports}`;

    const gridNote = gridSize !== 4 ? `\n  // CaptchaModal uses 4x4; grid ${gridSize}x${gridSize} may need future support\n` : "";

    return `${imports}

export function VerifyButton() {
  const [open, setOpen] = useState(false);${verifyState}
${gridNote}
  ${onVerified}

  return (
    <>
      <button onClick={() => setOpen(true)}${btnDisabled}>
        ${btnText}
      </button>
      <div data-theme="${theme}" className="contents">
        <CaptchaModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onVerifiedHuman={onVerifiedHuman}
        />
      </div>
    </>
  );
}`;
  }, [theme, gridSize, includeZKFlow, language, framework]);

  const zkFlowSnippet = useMemo(
    () => `// In onVerifiedHuman callback (see generated component above)
const proofResult = await generateProof(score);
if (!proofResult.success) return;
const { ok, verified } = await submitProofForValidation(
  proofResult.proof,
  proofResult.publicSignals
);
// verified === true → proceed to mint/claim`,
    []
  );

  const workedExampleCode = useMemo(() => {
    if (includeZKFlow) {
      return `// Minimal page: VerifyButton + ZK + mint
"use client";
import { useState } from "react";
import { VerifyButton } from "@/components/VerifyButton";

export default function FaucetPage() {
  const [wallet] = useState("0x..."); // from useAccount etc.

  return (
    <div>
      <VerifyButton />
      {/* After verification passes, call your mint API: */}
      {/* fetch("/api/mint", { method: "POST", body: JSON.stringify({ to_address: wallet }) }); */}
    </div>
  );
}`;
    }
    return `// Minimal page: VerifyButton (no ZK)
"use client";
import { VerifyButton } from "@/components/VerifyButton";

export default function ProtectedPage() {
  return (
    <div>
      <VerifyButton />
      {/* onVerifiedHuman receives (payload, score) — use score threshold or call your API */}
    </div>
  );
}`;
  }, [includeZKFlow]);

  const copyAllIntegration = useCallback(() => {
    const header = `// Paste into components/VerifyButton.tsx\n\n`;
    navigator.clipboard.writeText(header + snippet);
    setCopyAllFeedback(true);
    setTimeout(() => setCopyAllFeedback(false), 2000);
  }, [snippet]);

  const addToProjectSteps = useMemo(() => {
    const steps: { num: number; title: string; body: string; filePath?: string }[] = [
      { num: 1, title: "Get CaptchaModal", body: "Use the copy buttons above to copy each file (captchaModel, useReducedMotionPref, PatternIcon, CaptchaModal) into your project.", filePath: "components/faucet/CaptchaModal.tsx" },
    ];
    let n = 2;
    if (includeZKFlow) {
      steps.push({ num: n++, title: "Add ZK assets", body: "Use the copy button above to copy the asset paths, then place the files in public/zk/.", filePath: "public/zk/" });
      steps.push({ num: n++, title: "Add validate API route", body: "Use the copy button above to copy the validate route code.", filePath: apiRouteHint });
    }
    steps.push({ num: n++, title: "Create VerifyButton", body: "Add the generated component below to your project.", filePath: "components/VerifyButton.tsx" });
    steps.push({ num: n++, title: "Use VerifyButton", body: "Add VerifyButton to any page that requires verification before mint or claim.", filePath: framework === "app" ? "app/faucet/page.tsx" : framework === "pages" ? "pages/faucet.tsx" : "your-page.tsx" });
    return steps;
  }, [includeZKFlow, apiRouteHint, framework]);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Link href="/dashboard" className="text-sm text-white/60 hover:text-white/90">
          ← Dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">Captcha Builder</h1>
        <p className="mt-1 text-sm text-white/60">
          Generate a tile-puzzle verification widget with behavioral scoring and optional ZK proof.
        </p>
      </div>

      <ConceptCard
        title="What this captcha does"
        learnMore={
          <p>
            Users solve a tile puzzle; behavioral features (clicks, path, speed, etc.) are scored. Optionally, a ZK proof proves the score passed the threshold without revealing it. Your API validates the proof and mints the iNFT.
          </p>
        }
      >
        <p className="mb-2">
          Users select tiles matching a pattern. Mouse movement and timing are analyzed to distinguish humans from bots. Optionally, a ZK proof proves the score passed without revealing it.
        </p>
        <ul className="list-inside list-disc space-y-1 text-white/70">
          <li><strong className="text-white/90">Tile puzzle:</strong> 4x4 grid, select matching pattern</li>
          <li><strong className="text-white/90">Behavioral model:</strong> 24 features (clicks, path, speed, etc.)</li>
          <li><strong className="text-white/90">Human/Bot score:</strong> threshold-based</li>
          <li><strong className="text-white/90">ZK proof:</strong> optional, proves score range without revealing value</li>
        </ul>
      </ConceptCard>

      <div className="flex justify-center w-full">
        <FlowDiagram
          nodes={["User", "Tile puzzle", "Behavior score", "ZK proof (optional)", "onVerifiedHuman(score)", "Your API (mint/claim)"]}
          icons={["👤", "🧩", "🧠", "🔒", "✓", "🚀"]}
        />
      </div>
      <CaptchaVisualDiagram />

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">What you need before integrating</h3>
        <p className="mt-2 text-sm text-white/60">Follow these steps to gather everything the captcha needs. You only need steps 2–3 if you use the ZK proof flow.</p>
        <ol className="mt-4 space-y-4 text-sm">
          <li className="flex gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/30 text-xs font-semibold text-purple-200">1</span>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-white/90">Get the CaptchaModal component and dependencies</p>
              <p className="mt-1 text-white/60">Copy the code below into your project at the listed paths. Use the copy button for each file.</p>
              <div className="mt-3 space-y-3">
                <IntegrationCodeBlock file="captchaModel" title="lib/captchaModel.ts" />
                <IntegrationCodeBlock file="useReducedMotionPref" title="hooks/useReducedMotionPref.ts" />
                <IntegrationCodeBlock file="patternIcon" title="components/faucet/PatternIcon.tsx" />
                <IntegrationCodeBlock file="captchaModal" title="components/faucet/CaptchaModal.tsx" />
              </div>
            </div>
          </li>
          {includeZKFlow && (
            <>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/30 text-xs font-semibold text-purple-200">2</span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white/90">Add ZK proof assets</p>
                  <p className="mt-1 text-white/60">Create a public/zk folder and place these files. Use the copy button to copy the asset paths.</p>
                  <div className="mt-2">
                    <CodeOutput
                      title="Asset paths"
                      code={`public/zk/captcha.wasm\npublic/zk/captcha_final.zkey\npublic/zk/verification_key.json`}
                    />
                  </div>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-500/30 text-xs font-semibold text-purple-200">3</span>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-white/90">Add the validate API route</p>
                  <p className="mt-1 text-white/60">Create the route at {apiRouteHint}. Use the copy button to copy the code below.</p>
                  <div className="mt-2">
                    <CodeOutput
                      title={`${apiRouteHint}`}
                      code={validateRouteSnippet}
                    />
                  </div>
                </div>
              </li>
            </>
          )}
        </ol>
      </section>

      <ConfigPanel
        title="Configure your integration"
        fields={[
          {
            id: "language",
            label: "Language",
            type: "select",
            value: language,
            onChange: setLanguage,
            options: [
              { value: "ts", label: "TypeScript" },
              { value: "js", label: "JavaScript" },
            ],
            helper: "Changes generated types and function signatures.",
          },
          {
            id: "framework",
            label: "Framework",
            type: "select",
            value: framework,
            onChange: setFramework,
            options: [
              { value: "app", label: "Next.js App Router" },
              { value: "pages", label: "Next.js Pages" },
              { value: "react", label: "Plain React" },
            ],
            helper: "Affects import paths and API route hints.",
          },
          {
            id: "zk",
            label: "Include ZK proof flow",
            type: "select",
            value: includeZKFlow ? "yes" : "no",
            onChange: (v) => setIncludeZKFlow(v === "yes"),
            options: [
              { value: "yes", label: "Yes (generateProof + submitProofForValidation)" },
              { value: "no", label: "No (onVerifiedHuman receives score; you decide)" },
            ],
            helper: "When off: you handle verification in onVerifiedHuman. When on: snippet wires ZK.",
          },
          {
            id: "theme",
            label: "Theme",
            type: "select",
            value: theme,
            onChange: setTheme,
            options: [
              { value: "dark", label: "Dark" },
              { value: "light", label: "Light" },
            ],
            helper: "Passed to wrapper; CaptchaModal styling may vary.",
          },
          {
            id: "grid",
            label: "Grid size",
            type: "number",
            value: gridSize,
            onChange: setGridSize,
            helper: "CaptchaModal uses 4x4; future versions may support 3x3.",
          },
        ]}
      />

      <section>
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Generated component</h2>
          <button
            type="button"
            onClick={copyAllIntegration}
            className="btn-primary rounded-lg px-3 py-1.5 text-sm font-medium"
          >
            {copyAllFeedback ? "Copied" : "Copy all integration"}
          </button>
        </div>
        <CodeOutput title="Copy this component" code={snippet} />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Where this goes</h2>
        <div className="space-y-4">
          <PlacementGuide
            filePath="components/VerifyButton.tsx"
            description="Add this component to any page that needs verification before mint or claim."
            code={snippet}
          />
          {includeZKFlow && (
            <PlacementGuide
              title="ZK wiring"
              filePath="components/VerifyButton.tsx (inside onVerifiedHuman)"
              description="The ZK wiring lives in the onVerifiedHuman callback. The generated component above includes it. You also need lib/zk/prove.ts and the /api/validate route."
              code={zkFlowSnippet}
            />
          )}
        </div>
      </section>

      <AddToProjectSteps steps={addToProjectSteps} />

      <WorkedExample title="Show full integration example" code={workedExampleCode} />

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">Try the captcha</h3>
        <p className="mt-2 text-sm text-white/60">
          Solve the tile puzzle below. No ZK, no API—just the behavioral model. See your score and human/bot result.
        </p>
        <div className="mt-4 flex flex-col items-start gap-3">
          <button
            type="button"
            onClick={() => {
              setDemoResult(null);
              setDemoOpen(true);
            }}
            className="btn-primary rounded-lg px-4 py-2 text-sm font-medium"
          >
            Open captcha demo
          </button>
          {demoResult && (
            <div
              className={`rounded-lg border px-4 py-3 ${
                demoResult.isHuman
                  ? "border-emerald-500/40 bg-emerald-500/10"
                  : "border-amber-500/40 bg-amber-500/10"
              }`}
            >
              <span className="text-sm font-medium text-white/90">
                {demoResult.isHuman ? "Human verified" : "Bot"}
              </span>
            </div>
          )}
        </div>
        <CaptchaModal
          isOpen={demoOpen}
          onClose={() => setDemoOpen(false)}
          onVerifiedHuman={(_, _score, options) => {
            setDemoResult({ isHuman: !options?.simulatedBot });
            setDemoOpen(false);
          }}
        />
      </section>
    </div>
  );
}
