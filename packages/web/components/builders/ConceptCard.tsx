"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  title?: string;
  children: React.ReactNode;
  learnMore?: React.ReactNode;
  actionLink?: { href: string; label: string };
};

export function ConceptCard({ title = "What this does", children, learnMore, actionLink }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-lg font-semibold text-white/90">{title}</h3>
      <div className="mt-3 text-sm text-white/70 leading-relaxed">{children}</div>
      {actionLink && (
        <Link
          href={actionLink.href}
          className="mt-3 inline-block text-sm font-medium text-purple-300 hover:text-purple-200 transition"
        >
          {actionLink.label} →
        </Link>
      )}
      {learnMore && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="text-xs font-medium text-purple-300 hover:text-purple-200 transition"
          >
            {expanded ? "Hide details" : "Learn more"}
          </button>
          {expanded && <div className="mt-2 text-sm text-white/60">{learnMore}</div>}
        </div>
      )}
    </div>
  );
}
