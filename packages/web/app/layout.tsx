import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";

import { TopNav } from "@/components/TopNav";
import { WagmiProvider } from "@/components/providers/WagmiProvider";
import "./globals.css";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  title: "0G Velocity Studio",
  description: "Developer tooling suite for human verification + iNFT identity on 0G."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <WagmiProvider>
          <TopNav />
          <main className="min-h-[calc(100vh-56px)] [&:has([data-faucet])]:max-w-none [&:has([data-faucet])]:p-0 [&:has([data-faucet])]:bg-transparent mx-auto max-w-6xl px-6 py-8">{children}</main>
        </WagmiProvider>
      </body>
    </html>
  );
}
