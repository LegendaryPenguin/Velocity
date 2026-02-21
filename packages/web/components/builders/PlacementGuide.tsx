"use client";

import { useCallback, useState } from "react";

type Props = {
  filePath: string;
  description: string;
  code: string;
  insertMarker?: string;
  title?: string;
};

export function PlacementGuide({ filePath, description, code, insertMarker, title = "Where this goes" }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    const text = insertMarker ? code.replace(insertMarker, "").trim() : code;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code, insertMarker]);

  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-lg font-semibold text-white/90">{title}</h3>
      <p className="mt-1 text-sm text-white/60">{description}</p>
      <div className="mt-3 flex items-center gap-2">
        <code className="rounded bg-white/10 px-2 py-1 text-xs font-mono text-purple-200">
          {filePath}
        </code>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <pre className="max-h-[220px] flex-1 overflow-x-auto overflow-y-auto rounded-lg border border-white/10 bg-black/20 p-4 text-xs text-emerald-200/90">
          <code>{code}</code>
        </pre>
        <button
          type="button"
          onClick={copy}
          className="btn-secondary shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      {insertMarker && (
        <p className="mt-2 text-xs text-purple-300/90">← insert here</p>
      )}
    </div>
  );
}
