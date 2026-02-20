"use client";

import Script from "next/script";

export function BackgroundScene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <Script
        type="module"
        src="https://unpkg.com/@splinetool/viewer@1.12.58/build/spline-viewer.js"
        strategy="afterInteractive"
      />

      <spline-viewer
        url="https://prod.spline.design/mMEB6FJWdEa9lcn0/scene.splinecode"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
          filter: "blur(4px) brightness(0.82) saturate(1.05)",
          transform: "scale(1.03)",
        }}
      />

      {/* overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_40%,rgba(168,85,247,0.12),transparent_60%),radial-gradient(60%_50%_at_20%_20%,rgba(59,130,246,0.12),transparent_55%),linear-gradient(to_bottom,rgba(0,0,0,0.65),rgba(0,0,0,0.35),rgba(0,0,0,0.72))]" />
    </div>
  );
}