import { Logo } from "@/components/faucet/Logo";
import { ExportedJson } from "@/lib/captchaModel";

type VerificationState = "unverified" | "verifying" | "verified" | "requested";

type Props = {
  verificationState: VerificationState;
  walletAddress: string;
  onWalletAddressChange: (value: string) => void;
  onOpenCaptcha: () => void;
  onCopyJson: () => void;
  onRequestTokens: () => void;
  exportedJson: ExportedJson | null;
  copied: boolean;
  requestLoading: boolean;
  isWalletValid: boolean;
  latestScore: number | null;
};

export function FaucetCard({
  verificationState,
  walletAddress,
  onWalletAddressChange,
  onOpenCaptcha,
  onCopyJson,
  onRequestTokens,
  exportedJson,
  copied,
  requestLoading,
  isWalletValid,
  latestScore,
}: Props) {
  const humanVerified = verificationState === "verified" || verificationState === "requested";
  const canRequest = humanVerified && walletAddress.trim().length > 0 && isWalletValid && !requestLoading;

  return (
    <div className="glass-card-strong relative z-10 mx-4 flex w-[92vw] max-w-[620px] flex-col items-center px-7 py-9 sm:px-10 sm:py-11">
      <Logo size="text-display" />
      <p className="mt-1 text-body text-[var(--text-muted)]">Faucet</p>

      <div className="mt-8 w-full space-y-5">
        <div>
          <label className="mb-2 block text-xs font-medium uppercase tracking-wide text-white/60">
            Wallet Address
          </label>
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => onWalletAddressChange(e.target.value)}
            placeholder="Enter your wallet address"
            disabled={!humanVerified}
            className={`glass-input min-h-11 w-full px-4 py-3 text-[15px] text-[var(--text-primary)] placeholder-white/40 ${
              !humanVerified ? "cursor-not-allowed opacity-65" : ""
            } ${
              humanVerified && walletAddress.length > 0 && !isWalletValid
                ? "border-[var(--error)]/60"
                : ""
            }`}
          />
          {humanVerified && walletAddress.length > 0 && !isWalletValid && (
            <p className="mt-2 text-xs text-[var(--error)]">
              Enter a valid EVM wallet address (`0x` + 40 hex characters).
            </p>
          )}
          {!humanVerified && (
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              {exportedJson ? "ZK proof failed. Try verifying again." : "One-time verification to unlock faucet access."}
            </p>
          )}
        </div>

        <div className="stack-at-xs flex items-center gap-3">
          {humanVerified ? (
            <div className="flex min-h-11 flex-1 items-center gap-2.5 rounded-xl border border-emerald-400/30 bg-emerald-500/12 px-4 py-3">
              <svg className="h-5 w-5 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-emerald-200">Access Granted</p>
                <p className="text-xs text-emerald-100/70">Verification complete</p>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenCaptcha}
              className={`btn-secondary min-h-11 flex flex-1 items-center gap-3 px-4 py-3 text-sm ${
                verificationState === "verifying" ? "animate-pulse border-purple-300/50 bg-purple-300/10" : ""
              }`}
            >
              <span className="relative flex h-5 w-5 items-center justify-center rounded border border-white/30">
                {verificationState === "verifying" && (
                  <span className="absolute inline-flex h-5 w-5 animate-ping rounded border border-purple-200/60" />
                )}
              </span>
              {verificationState === "verifying" ? "Verifying..." : "Verify Access"}
            </button>
          )}

          {exportedJson && (
            <button
              type="button"
              onClick={onCopyJson}
              className="btn-secondary min-h-11 rounded-xl px-3 text-xs font-medium text-white/80"
              title="Copy behavioral JSON"
            >
              {copied ? "Copied" : "Copy JSON"}
            </button>
          )}
        </div>

        {verificationState === "requested" ? (
          <div className="rounded-xl border border-emerald-400/25 bg-emerald-500/12 px-4 py-4 text-center shadow-[0_0_36px_rgba(50,209,149,0.22)] animate-pulse">
            <p className="text-sm font-semibold text-emerald-200">✓ Tokens Sent</p>
            <p className="mt-1 text-xs text-emerald-100/75">
              Your request is queued and processing.
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={onRequestTokens}
            disabled={!canRequest}
            className="btn-primary min-h-11 w-full px-6 py-3 text-[15px] font-semibold hover:scale-[1.01]"
          >
            {requestLoading ? "Requesting..." : "Request Testnet Tokens"}
          </button>
        )}

        <div className="space-y-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-wide text-white/55">Why this check?</p>
          <p className="text-xs text-[var(--text-muted)]">
            Social tasks are easy to game. We use interaction behavior to estimate human intent instead.
          </p>
        </div>

        <p className="text-center text-xs text-[var(--text-muted)]">
          Privacy: interaction data never leaves your device.
        </p>

        {exportedJson && (
          <details className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs">
            <summary className="cursor-pointer font-medium text-white/80">Developer Details</summary>
            <div className="mt-2 space-y-2">
              {latestScore !== null && <p className="text-white/70">Score: {latestScore}</p>}
              <pre className="max-h-36 overflow-auto rounded-lg bg-black/20 p-2 text-[11px] text-white/75">
                {JSON.stringify(exportedJson, null, 2)}
              </pre>
            </div>
          </details>
        )}
      </div>
    </div>
  );
}
