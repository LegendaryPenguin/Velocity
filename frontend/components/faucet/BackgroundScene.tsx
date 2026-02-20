"use client";

import { useEffect, useState } from "react";

import { useReducedMotionPref } from "@/hooks/useReducedMotionPref";

type Props = {
  imageUrl?: string;
};

export function BackgroundScene({ imageUrl }: Props) {
  const reducedMotion = useReducedMotionPref();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 18;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-vignette">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #180b2b 0%, #2b1750 32%, #47256e 50%, #69357f 70%, #91527f 86%, #ab6a86 100%)",
        }}
      />
      {imageUrl && (
        <div
          className="absolute inset-0 opacity-20 mix-blend-screen"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <div className="noise-overlay" />
      <div
        className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-400/16 blur-3xl"
        style={{ transform: `translate(${offset.x * -0.7}px, ${offset.y * -0.7}px)` }}
      />
      <div
        className="absolute -bottom-52 -right-44 h-[520px] w-[520px] rounded-full bg-pink-400/16 blur-3xl"
        style={{ transform: `translate(${offset.x * 0.5}px, ${offset.y * 0.5}px)` }}
      />
      <div
        className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-300/10 blur-3xl"
        style={{ transform: `translate(${offset.x * 0.28}px, ${offset.y * 0.28}px)` }}
      />
    </div>
  );
}
