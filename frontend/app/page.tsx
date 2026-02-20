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
  const [animateIn, setAnimateIn] = useState(false);
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
    const t = setTimeout(() => setAnimateIn(true), 30);
    return () => clearTimeout(t);
  }, []);

  const handleContinueToFaucet = () => {
    setStep("faucet");
    setAnimateIn(false);
    setTimeout(() => setAnimateIn(true), reducedMotion ? 0 : motion.fast);
  };

  const handleOpenCaptcha = () => {
    setVerificationState("verifying");
    setShowCaptcha(true);
  };

  const handleVerifiedHuman = (payload: ExportedJson, score: number) => {
    setExportedJson(payload);
    setLatestScore(score);
    setVerificationState("verified");
    setToast({ type: "success", message: "Human verification passed. Wallet entry unlocked." });
  };

  const handleCopyJson = async () => {
    if (!exportedJson) return;
    await navigator.clipboard.writeText(JSON.stringify(exportedJson, null, 2));
    setCopied(true);
    setToast({ type: "info", message: "Behavioral JSON copied." });
    setTimeout(() => setCopied(false), 1600);
  };

  const handleRequestTokens = () => {
    setRequestLoading(true);
    setToast(null);
    const timer = setTimeout(() => {
      setRequestLoading(false);
      setVerificationState("requested");
      const requestId = `req_${Math.random().toString(16).slice(2, 10)}`;
      setToast({ type: "success", message: `Faucet request sent (${requestId}).` });
    }, 900);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
      <BackgroundScene />

      {step === "landing" ? (
        <LandingHero onContinue={handleContinueToFaucet} animate={animateIn || reducedMotion} />
      ) : (
        <div
          className={`relative z-10 transition-all duration-500 ${
            animateIn || reducedMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
        >
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
          />
          <p className="mt-3 text-center text-xs text-white/55">
            Privacy note: only behavior metrics and score are used to gate faucet access.
            {latestScore !== null ? ` Last score: ${latestScore}.` : ""}
          </p>
        </div>
      )}

      <BottomBranding />

      <CaptchaModal
        isOpen={showCaptcha}
        onClose={() => {
          setShowCaptcha(false);
          if (verificationState === "verifying") setVerificationState("unverified");
        }}
        onVerifiedHuman={(payload, score) => {
          handleVerifiedHuman(payload, score);
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
