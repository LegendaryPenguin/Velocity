"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { isAddress } from "ethers";

import { BackgroundScene } from "@/components/faucet/BackgroundScene";
import { CaptchaModal } from "@/components/faucet/CaptchaModal";
import { FaucetCard } from "@/components/faucet/FaucetCard";
import { LandingHero } from "@/components/faucet/LandingHero";
import { ExportedJson } from "@/lib/captchaModel";
import { zIndex } from "@/lib/designSystem";

type VerificationState = "unverified" | "verifying" | "verified" | "requested";
type ToastState = { type: "success" | "info"; message: string } | null;

type ClaimResponse = {
  ok: boolean;
  txHash?: string;
  cooldownRemainingSec?: number;
  error?: string;
};

function formatCooldown(sec: number): string {
  if (sec <= 0) return "";
  const h = Math.floor(sec / 3600);
  const m = Math.ceil((sec % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export default function FaucetPage() {
  const [showFaucet, setShowFaucet] = useState(false);
  const [captchaOpen, setCaptchaOpen] = useState(false);
  const [verificationState, setVerificationState] = useState<VerificationState>("unverified");
  const [walletAddress, setWalletAddress] = useState("");
  const [exportedJson, setExportedJson] = useState<ExportedJson | null>(null);
  const [latestScore, setLatestScore] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [requestLoading, setRequestLoading] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  const isWalletValid = useMemo(() => isAddress(walletAddress.trim()), [walletAddress]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleVerifiedHuman = useCallback(async (payload: ExportedJson, score: number) => {
    setExportedJson(payload);
    setLatestScore(score);
    setCaptchaOpen(false);
    setVerificationState("verifying");
    setToast({ type: "info", message: "Human verification passed. Validating ZK proof..." });

    try {
      const res = await fetch("/api/zk-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        verified?: boolean;
        error?: string;
        pipelineLogs?: string[];
        stderrLogs?: string[];
        proofPath?: string;
        publicSignalsPath?: string;
      };

      if (!res.ok || !data?.ok) {
        if (Array.isArray(data?.pipelineLogs)) {
          console.group("ZK Pipeline Logs");
          data.pipelineLogs.forEach((line: string) => console.log(line));
          if (Array.isArray(data?.stderrLogs) && data.stderrLogs.length > 0) {
            console.group("ZK Pipeline stderr");
            data.stderrLogs.forEach((line: string) => console.warn(String(line ?? "")));
            console.groupEnd();
          }
          console.groupEnd();
        }
        setVerificationState("unverified");
        setToast({ type: "info", message: data?.error || `ZK pipeline failed (HTTP ${res.status})` });
        return;
      }

      if (!data?.verified) {
        setVerificationState("unverified");
        setToast({ type: "info", message: "ZK proof verification did not pass." });
        return;
      }

      if (Array.isArray(data?.pipelineLogs)) {
        console.group("ZK Pipeline Logs");
        data.pipelineLogs.forEach((line: string) => console.log(line));
        if (Array.isArray(data?.stderrLogs) && data.stderrLogs.length > 0) {
          console.group("ZK Pipeline stderr");
          data.stderrLogs.forEach((line: string) => console.warn(String(line ?? "")));
          console.groupEnd();
        }
        console.log("Result:", {
          verified: data?.verified,
          proofPath: data?.proofPath,
          publicSignalsPath: data?.publicSignalsPath,
        });
        console.groupEnd();
      }
      console.log("zk proof validation passed to frontend");

      setVerificationState("verified");
      setToast({ type: "success", message: "ZK proof generated and verified." });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : String(e);
      setVerificationState("unverified");
      setToast({ type: "info", message: `ZK pipeline error: ${message}` });
    }
  }, []);

  const handleRequestTokens = useCallback(async () => {
    const trimmed = walletAddress.trim();
    if (!isAddress(trimmed) || verificationState !== "verified") return;

    setRequestLoading(true);
    setVerificationState("requested");

    try {
      const claimRes = await fetch("/api/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: trimmed, to: trimmed }),
      });
      const claimData = (await claimRes.json()) as ClaimResponse;
      if (!claimRes.ok || !claimData.ok) {
        const sec = claimData.cooldownRemainingSec ?? 0;
        const msg =
          sec > 0 ? `Cooldown active. Claim again in ${formatCooldown(sec)}.` : (claimData.error ?? "Claim failed");
        setVerificationState("verified");
        setToast({ type: "info", message: msg });
        return;
      }
      setToast({ type: "success", message: "Tokens sent successfully." });
    } catch (err) {
      setVerificationState("verified");
      const msg = err instanceof Error ? err.message : String(err);
      setToast({ type: "info", message: msg });
    } finally {
      setRequestLoading(false);
    }
  }, [walletAddress, verificationState]);

  const handleCopyJson = useCallback(() => {
    if (!exportedJson) return;
    navigator.clipboard.writeText(JSON.stringify(exportedJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [exportedJson]);

  return (
    <div data-faucet className="relative z-10 min-h-[calc(100vh-56px)] flex flex-col items-center justify-center overflow-hidden">
      <Link
        href="/dashboard"
        className="absolute left-6 top-4 z-20 text-sm text-white/60 hover:text-white/90"
      >
        ← Dashboard
      </Link>
      <BackgroundScene />
      <div className="relative z-10 flex min-h-[60vh] flex-col items-center justify-center py-12">
        {!showFaucet ? (
          <LandingHero
            onContinue={() => setShowFaucet(true)}
            animate={true}
          />
        ) : (
          <FaucetCard
            verificationState={verificationState}
            walletAddress={walletAddress}
            onWalletAddressChange={setWalletAddress}
            onOpenCaptcha={() => setCaptchaOpen(true)}
            onCopyJson={handleCopyJson}
            onRequestTokens={handleRequestTokens}
            exportedJson={exportedJson}
            copied={copied}
            requestLoading={requestLoading}
            isWalletValid={isWalletValid}
            latestScore={latestScore}
          />
        )}
      </div>
      <CaptchaModal
        isOpen={captchaOpen}
        onClose={() => setCaptchaOpen(false)}
        onVerifiedHuman={handleVerifiedHuman}
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
    </div>
  );
}
