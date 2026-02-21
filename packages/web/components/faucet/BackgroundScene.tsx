"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  { ssr: false }
);

const SCENE_URL = "https://prod.spline.design/mMEB6FJWdEa9lcn0/scene.splinecode";

export function BackgroundScene() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          filter: "blur(4px) brightness(0.82) saturate(1.05)",
          transform: "scale(1.03)",
        }}
      >
        <Spline scene={SCENE_URL} style={{ width: "100%", height: "100%" }} />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(80% 60% at 50% 40%, rgba(168,85,247,0.12), transparent 60%), radial-gradient(60% 50% at 20% 20%, rgba(59,130,246,0.12), transparent 55%), linear-gradient(to bottom, rgba(0,0,0,0.65), rgba(0,0,0,0.35), rgba(0,0,0,0.72))",
        }}
      />
    </div>
  );
}
