"use client";

import { useMemo, useState } from "react";
import { Contract, JsonRpcProvider, isAddress } from "ethers";

import { HUMAN_AGENT_INFT_ABI } from "@/lib/inftAbi";

type MintResponse = {
  ok: boolean;
  txHash?: string;
  tokenId?: string | null;
  encryptedURI?: string;
  metadataHash?: string;
  error?: string;
};

type Readback = {
  encryptedURI: string;
  metadataHash: string;
} | null;

export default function Page() {
  const [walletAddress, setWalletAddress] = useState("");
  const [verificationPassed, setVerificationPassed] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [result, setResult] = useState<MintResponse | null>(null);
  const [readback, setReadback] = useState<Readback>(null);

  const validWallet = useMemo(() => isAddress(walletAddress.trim()), [walletAddress]);

  const canMint = verificationPassed && validWallet && !isMinting;

  const fetchTokenReadback = async (tokenId: string) => {
    const rpc = process.env.NEXT_PUBLIC_OG_RPC_URL ?? "https://evmrpc-testnet.0g.ai";
    const address = process.env.NEXT_PUBLIC_INFT_ADDRESS;
    if (!address || !isAddress(address)) return;

    const provider = new JsonRpcProvider(rpc);
    const contract = new Contract(address, HUMAN_AGENT_INFT_ABI, provider);
    const [encryptedURI, metadataHash] = await Promise.all([
      contract.getEncryptedURI(tokenId),
      contract.getMetadataHash(tokenId),
    ]);

    setReadback({
      encryptedURI: String(encryptedURI),
      metadataHash: String(metadataHash),
    });
  };

  const handleMint = async () => {
    setIsMinting(true);
    setResult(null);
    setReadback(null);
    try {
      const res = await fetch("/api/mint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to_address: walletAddress.trim(),
          verificationPassed,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as MintResponse;
      if (!res.ok || !data.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
      setResult(data);

      if (data.tokenId) {
        await fetchTokenReadback(data.tokenId);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setResult({ ok: false, error: message });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-6 px-6 py-12 text-white">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Faucet Portal</h1>
        <p className="text-sm text-white/70">Mint a Human Agent iNFT after verification.</p>
        <p className="text-xs text-white/50">Privacy: encrypted credential stored decentralized.</p>
      </header>

      <section className="space-y-4 rounded-2xl border border-white/15 bg-white/5 p-5">
        <label className="block text-sm">
          Wallet address
          <input
            type="text"
            value={walletAddress}
            onChange={(e) => setWalletAddress(e.target.value)}
            placeholder="0x..."
            className="mt-2 w-full rounded-lg border border-white/20 bg-black/20 px-3 py-2 text-sm outline-none"
          />
        </label>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={verificationPassed}
            onChange={(e) => setVerificationPassed(e.target.checked)}
          />
          Verification passed (demo toggle)
        </label>

        <button
          type="button"
          onClick={handleMint}
          disabled={!canMint}
          className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isMinting ? "Minting Human Agent iNFT..." : "Mint Human Agent iNFT"}
        </button>
      </section>

      <section className="space-y-2 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm">
        <h2 className="font-medium">Result</h2>
        {!result && <p className="text-white/60">No mint yet.</p>}
        {result && !result.ok && <p className="text-red-300">Error: {result.error}</p>}
        {result?.ok && (
          <>
            <p>Token ID: {result.tokenId ?? "N/A"}</p>
            <p>Tx Hash: {result.txHash}</p>
            <p>Encrypted URI: {result.encryptedURI}</p>
            <p>Metadata Hash: {result.metadataHash}</p>
          </>
        )}
      </section>

      <section className="space-y-2 rounded-2xl border border-white/15 bg-white/5 p-5 text-sm">
        <h2 className="font-medium">Onchain Readback</h2>
        {!readback && <p className="text-white/60">No onchain readback yet.</p>}
        {readback && (
          <>
            <p>Encrypted URI (contract): {readback.encryptedURI}</p>
            <p>Metadata Hash (contract): {readback.metadataHash}</p>
          </>
        )}
      </section>
    </main>
  );
}
