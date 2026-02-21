"use client";

import { useId } from "react";

type Props = {
  /** Optional: array of node labels for a simple left-to-right flow */
  nodes?: string[];
  /** Optional: emoji or icon string per node (1:1 with nodes) */
  icons?: (string | null)[];
  /** Custom content (e.g. description or custom diagram) */
  children?: React.ReactNode;
};

function ArrowConnector({ gradientId }: { gradientId: string }) {
  return (
    <svg width="28" height="24" viewBox="0 0 28 24" fill="none" className="shrink-0 flex-shrink-0" aria-hidden>
      <path
        d="M2 12h18m0 0l-5-5m5 5l-5 5"
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="rgba(159,124,255,0.4)" />
          <stop offset="1" stopColor="rgba(124,58,237,0.8)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FlowDiagram({ nodes, icons, children }: Props) {
  const baseId = useId().replace(/:/g, "");
  return (
    <div className="glass-card rounded-2xl p-6 overflow-x-auto w-full max-w-2xl mx-auto">
      <h3 className="text-lg font-semibold text-white/90 mb-4 text-center">Flow</h3>
      {nodes && nodes.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
          {nodes.map((node, i) => {
            const icon = icons?.[i];
            return (
              <span key={i} className="flex items-center">
                <span
                  className="group flex items-center gap-2 rounded-xl border border-white/15 bg-gradient-to-br from-white/[0.09] to-white/[0.03] px-4 py-2.5 font-medium text-white/95 shadow-lg shadow-purple-500/5 transition-all duration-200 hover:border-purple-400/30 hover:shadow-purple-500/10"
                >
                  {icon && (
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-500/20 text-base" aria-hidden>
                      {icon}
                    </span>
                  )}
                  {node}
                </span>
                {i < nodes.length - 1 && <ArrowConnector gradientId={`flow-arrow-${baseId}-${i}`} />}
              </span>
            );
          })}
        </div>
      ) : (
        <div className="text-sm text-white/70 leading-relaxed">{children}</div>
      )}
    </div>
  );
}
