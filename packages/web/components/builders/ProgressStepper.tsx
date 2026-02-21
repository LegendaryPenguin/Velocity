"use client";

type Step = {
  id: string;
  label: string;
};

type Props = {
  steps: Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
};

export function ProgressStepper({ steps, currentStep, onStepClick }: Props) {
  return (
    <nav
      className="flex flex-wrap items-center gap-2"
      aria-label="Progress"
    >
      {steps.map((step, i) => {
        const isActive = i === currentStep;
        const isPast = i < currentStep;
        return (
          <div key={step.id} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onStepClick?.(i)}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition ${
                isActive
                  ? "bg-purple-500 text-white ring-2 ring-purple-300/50"
                  : isPast
                    ? "bg-emerald-500/30 text-emerald-200"
                    : "bg-white/10 text-white/60 hover:bg-white/15"
              }`}
              aria-current={isActive ? "step" : undefined}
            >
              {isPast ? "✓" : i + 1}
            </button>
            <span
              className={`text-sm ${
                isActive ? "text-white font-medium" : isPast ? "text-white/70" : "text-white/50"
              }`}
            >
              {step.label}
            </span>
            {i < steps.length - 1 && (
              <span className="mx-1 hidden text-white/30 sm:inline">→</span>
            )}
          </div>
        );
      })}
    </nav>
  );
}
