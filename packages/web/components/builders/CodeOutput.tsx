"use client";

import { useCallback, useState } from "react";

type Props = {
  title?: string;
  code: string;
  language?: string;
};

export function CodeOutput({ title = "Generated code", code, language = "typescript" }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="text-sm font-medium text-white/70">{title}</span>
        <button
          type="button"
          onClick={copy}
          className="btn-secondary rounded-lg px-3 py-1.5 text-xs font-medium"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-h-[220px] overflow-x-auto overflow-y-auto p-4 text-sm text-emerald-200/90">
        <code>{code}</code>
      </pre>
    </div>
  );
}
