import { Logo } from "@/components/faucet/Logo";

type Props = {
  onContinue: () => void;
  animate: boolean;
};

export function LandingHero({ onContinue, animate }: Props) {
  return (
    <div
      className={`glass-card-strong relative z-10 mx-4 flex w-[92vw] max-w-[580px] flex-col items-center px-7 py-10 sm:px-10 sm:py-12 ${
        animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      } transition-all duration-500`}
    >
      <Logo size="text-display" />
      <p className="mt-1 text-body text-[var(--text-muted)]">Faucet</p>

      <div className="mt-10 w-full">
        <button
          type="button"
          onClick={onContinue}
          className="btn-primary min-h-11 flex w-full items-center justify-center gap-3 px-6 py-3.5 text-[15px] font-semibold hover:scale-[1.01]"
        >
          <svg className="h-5 w-5 text-purple-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Request Testnet Tokens
        </button>
      </div>
    </div>
  );
}
