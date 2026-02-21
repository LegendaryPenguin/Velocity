import type { Metadata } from "next";
import Link from "next/link";

import { TopNav } from "@/components/TopNav";
import { WagmiProvider } from "@/components/providers/WagmiProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "0G Trust Studio",
  description: "Developer tooling suite for human verification + iNFT identity on 0G."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiProvider>
          <TopNav />
          <main className="min-h-[calc(100vh-56px)] [&:has([data-faucet])]:max-w-none [&:has([data-faucet])]:p-0 [&:has([data-faucet])]:bg-transparent mx-auto max-w-6xl px-6 py-8">{children}</main>
          <footer className="mx-auto max-w-6xl px-6 pb-8 text-xs text-white/50">
            Built for 0G hackathon · <Link href="/faucet" className="underline">Faucet Demo</Link>
          </footer>
        </WagmiProvider>
      </body>
    </html>
  );
}
