"use client";

import { useEffect, useState } from "react";
import { CodeOutput } from "./CodeOutput";

type Props = {
  file:
    | "captchaModel"
    | "captchaModal"
    | "patternIcon"
    | "useReducedMotionPref"
    | "ogStorage"
    | "encrypt"
    | "claimRoute"
    | "inftAbi"
    | "faucetContract";
  title: string;
};

export function IntegrationCodeBlock({ file, title }: Props) {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/captcha-integration?file=${file}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setContent(data.content);
      })
      .catch((e) => setError(e.message));
  }, [file]);

  if (error) {
    return (
      <div className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
        Could not load code: {error}
      </div>
    );
  }
  if (!content) {
    return (
      <div className="rounded-lg border border-white/10 bg-black/20 px-3 py-4 text-xs text-white/50">
        Loading…
      </div>
    );
  }
  return <CodeOutput title={title} code={content} />;
}
