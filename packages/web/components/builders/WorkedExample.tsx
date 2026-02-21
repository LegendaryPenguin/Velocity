"use client";

import { useState } from "react";
import { useCallback } from "react";

type Props = {
  title?: string;
  code: string;
  language?: string;
  description?: React.ReactNode;
};

export function WorkedExample({ title = "Full example", code, description }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      {description && (
        <div className="border-b border-white/10 px-5 py-3 text-sm text-white/70">
          {description}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-white/5"
      >
        <span className="text-sm font-semibold text-white/90">{title}</span>
        <span className="text-purple-300 text-sm">{open ? "▼" : "▶"}</span>
      </button>
      {open && (
        <div className="border-t border-white/10">
          <div className="flex items-center justify-end gap-2 px-4 py-2">
            <button
              type="button"
              onClick={copy}
              className="btn-secondary rounded-lg px-3 py-1.5 text-xs font-medium"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <pre className="overflow-x-auto p-4 text-xs text-emerald-200/90">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
