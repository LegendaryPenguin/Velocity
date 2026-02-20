import { Logo } from "@/components/faucet/Logo";

export function BottomBranding() {
  return (
    <div className="absolute bottom-4 left-0 right-0 px-4 sm:bottom-7 sm:px-8">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between text-xs font-medium text-white/50 sm:text-sm">
        <span>Proof</span>
        <div className="flex items-center gap-2">
          <span className="text-white/30">(</span>
          <Logo size="text-base sm:text-lg" />
          <span className="text-white/30">)</span>
        </div>
        <span>of Human</span>
      </div>
    </div>
  );
}
