"use client";

import { useId } from "react";

function ArrowConnector({ gradientId }: { gradientId: string }) {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="shrink-0 hidden sm:block" aria-hidden>
      <path
        d="M2 12h22m0 0l-6-6m6 6l-6 6"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="rgba(159,124,255,0.5)" />
          <stop offset="1" stopColor="rgba(50,209,149,0.6)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const steps = [
  { num: 1, label: "Setup", primary: "Login + Deposit", secondary: "Transfer to provider", accent: "purple" },
  { num: 2, label: "Prepare", primary: "JSONL dataset", secondary: "Config file", accent: "purple" },
  { num: 3, label: "Create task", primary: "create-task", secondary: "Fee auto-calculated", accent: "purple" },
  { num: 4, label: "Monitor", primary: "get-task", secondary: "Delivered → Download", accent: "emerald" },
  { num: 5, label: "Use", primary: "LoRA + base model", secondary: null, accent: "purple" },
];

export function FineTuningVisualDiagram() {
  const baseId = useId().replace(/:/g, "");
  return (
    <div className="glass-card rounded-2xl p-6 overflow-x-auto w-full max-w-3xl mx-auto">
      <h3 className="text-lg font-semibold text-white/90 mb-6 text-center">How it works</h3>
      <div className="flex flex-wrap items-stretch justify-center gap-2 sm:gap-3">
        {steps.map((step, i) => (
          <span key={step.num} className="flex items-center">
            <div
              className={`group flex flex-col rounded-xl border px-4 py-3 min-w-[120px] transition-all duration-200 hover:scale-[1.02] ${
                step.accent === "emerald"
                  ? "border-emerald-500/30 bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 shadow-emerald-500/10"
                  : "border-white/15 bg-gradient-to-br from-white/[0.09] to-white/[0.03] shadow-lg shadow-purple-500/5 hover:border-purple-400/25 hover:shadow-purple-500/10"
              }`}
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    step.accent === "emerald"
                      ? "bg-emerald-500/30 text-emerald-200"
                      : "bg-purple-500/25 text-purple-200"
                  }`}
                >
                  {step.num}
                </span>
                <span className="text-xs font-medium text-white/60">{step.label}</span>
              </div>
              <span className={`text-sm font-medium ${step.accent === "emerald" ? "text-emerald-200" : "text-white/90"}`}>
                {step.primary}
              </span>
              {step.secondary && (
                <span className={`mt-0.5 text-xs ${step.accent === "emerald" ? "text-emerald-300/80" : "text-purple-300/90"}`}>
                  {step.secondary}
                </span>
              )}
            </div>
            {i < steps.length - 1 && <ArrowConnector gradientId={`ft-arrow-${baseId}-${i}`} />}
          </span>
        ))}
      </div>
    </div>
  );
}
