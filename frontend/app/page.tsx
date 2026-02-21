"use client";

import { useEffect, useMemo, useState } from "react";

import { BackgroundScene } from "@/components/faucet/BackgroundScene";
import { BottomBranding } from "@/components/faucet/BottomBranding";
import { CaptchaModal } from "@/components/faucet/CaptchaModal";
import { FaucetCard } from "@/components/faucet/FaucetCard";
import { LandingHero } from "@/components/faucet/LandingHero";
import { useReducedMotionPref } from "@/hooks/useReducedMotionPref";
import { ExportedJson } from "@/lib/captchaModel";
import { motion, zIndex } from "@/lib/designSystem";

type Step = "landing" | "faucet";
type VerificationState = "unverified" | "verifying" | "verified" | "requested";
type ToastState = { type: "success" | "info"; message: string } | null;

function isValidEvmAddress(value: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(value.trim());
}

export default function Page() {
  const reducedMotion = useReducedMotionPref();
  const [step, setStep] = useState<Step>("landing");
  const [animateIn, setAnimateIn] = useState(true);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [verificationState, setVerificationState] = useState<VerificationState>("unverified");
  const [walletAddress, setWalletAddress] = useState("");
  const [requestLoading, setRequestLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [exportedJson, setExportedJson] = useState<ExportedJson | null>(null);
  const [latestScore, setLatestScore] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  const isWalletValid = useMemo(() => isValidEvmAddress(walletAddress), [walletAddress]);

  useEffect(() => {
    if (animateIn) return;
    const t = setTimeout(() => setAnimateIn(true), 30);
    return () => clearTimeout(t);
  }, [animateIn]);

  const handleContinueToFaucet = () => {
    setStep("faucet");
    setAnimateIn(false);
    setTimeout(() => setAnimateIn(true), reducedMotion ? 0 : motion.fast);
  };

  const handleOpenCaptcha = () => {
    setVerificationState("verifying");
    setShowCaptcha(true);
  };

  const handleVerifiedHuman = async (payload: ExportedJson, score: number) => {
    setExportedJson(payload);
    setLatestScore(score);
    setVerificationState("verified");
    setToast({ type: "success", message: "Human verification passed. Wallet entry unlocked." });

    try {
      const res = await fetch("/api/zk-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.ok) {
        if (Array.isArray(data?.pipelineLogs)) {
          console.group("ZK Pipeline Logs");
          data.pipelineLogs.forEach((line: string) => console.log(line));
          if (Array.isArray(data?.stderrLogs) && data.stderrLogs.length > 0) {
            console.group("ZK Pipeline stderr");
            data.stderrLogs.forEach((line: string) => console.error(line));
            console.groupEnd();
          }
          console.groupEnd();
        }
        throw new Error(data?.error || `ZK pipeline failed (HTTP ${res.status})`);
      }
      if (Array.isArray(data?.pipelineLogs)) {
        console.group("ZK Pipeline Logs");
        data.pipelineLogs.forEach((line: string) => console.log(line));
        if (Array.isArray(data?.stderrLogs) && data.stderrLogs.length > 0) {
          console.group("ZK Pipeline stderr");
          data.stderrLogs.forEach((line: string) => console.error(line));
          console.groupEnd();
        }
        console.log("Result:", {
          verified: data?.verified,
          proofPath: data?.proofPath,
          publicSignalsPath: data?.publicSignalsPath,
        });
        console.groupEnd();
      }
      setToast({ type: "success", message: "ZK proof generated and verified." });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setToast({ type: "info", message: `ZK pipeline error: ${message}` });
    }
  };

  const handleCopyJson = async () => {
    if (!exportedJson) return;
    await navigator.clipboard.writeText(JSON.stringify(exportedJson, null, 2));
    setCopied(true);
    setToast({ type: "info", message: "Behavioral JSON copied." });
    setTimeout(() => setCopied(false), 1600);
  };

  const handleRequestTokens = async () => {
    setRequestLoading(true);
    setToast(null);
    try {
      const res = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to_address: walletAddress.trim() }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || `Mint failed (HTTP ${res.status})`);
      }
      setToast({ type: "success", message: "Tokens requested successfully!" });

    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setToast({ type: "info", message: `Error: ${message}` });
    } finally {
      setRequestLoading(false);
    }
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <BackgroundScene />

      {step === "landing" ? (
        <LandingHero onContinue={handleContinueToFaucet} animate={animateIn || reducedMotion} />
      ) : (
        <div
          className={`relative z-10 transition-all duration-500 ${
            animateIn || reducedMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.14em] text-white/70">
            Connect • Verify • Claim
          </p>
          <FaucetCard
            verificationState={verificationState}
            walletAddress={walletAddress}
            onWalletAddressChange={setWalletAddress}
            onOpenCaptcha={handleOpenCaptcha}
            onCopyJson={handleCopyJson}
            onRequestTokens={handleRequestTokens}
            exportedJson={exportedJson}
            copied={copied}
            requestLoading={requestLoading}
            isWalletValid={isWalletValid}
            latestScore={latestScore}
          />
        </div>
      )}

      <BottomBranding />

      <CaptchaModal
        isOpen={showCaptcha}
        onClose={() => {
          setShowCaptcha(false);
          if (verificationState === "verifying") {
            setVerificationState("unverified");
            setToast({ type: "info", message: "Try Again" });
          }
        }}
        onVerifiedHuman={(payload, score) => {
          void handleVerifiedHuman(payload, score);
          setShowCaptcha(false);
        }}
      />

      {toast && (
        <div
          className="fixed left-1/2 top-5 -translate-x-1/2 rounded-xl border border-white/15 bg-[#2a1846]/90 px-4 py-2.5 text-sm text-white shadow-xl backdrop-blur-md"
          style={{ zIndex: zIndex.toast }}
          role="status"
          aria-live="polite"
        >
          <span className={toast.type === "success" ? "text-emerald-300" : "text-purple-200"}>
            {toast.message}
          </span>
        </div>
      )}
    </main>
  );
}
