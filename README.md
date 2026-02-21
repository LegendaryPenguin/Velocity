# Faucet Verification -> Mint Human Agent iNFT (0G Testnet)

This demo mints an INFT-like credential NFT ("Human Agent iNFT") after faucet verification passes.

What it does:

- Uses a minimal verification flag (demo toggle) in the Next.js UI.
- Builds credential metadata JSON for the user.
- Encrypts metadata with AES-256-GCM (demo sealing strategy).
- Stores encrypted payload via 0G Storage SDK when available, with a safe fallback URI stub.
- Mints `HumanAgentINFT` on 0G testnet from a server-side API route.
- Returns `tokenId`, `txHash`, `encryptedURI`, and `metadataHash`.
- Reads `getEncryptedURI` and `getMetadataHash` back from chain in the UI.

## Repository Layout

- `contracts/` Hardhat contracts + scripts + tests
- `frontend/` Next.js app router web demo

## Quick Setup

1. Copy envs:

```bash
cp .env.example .env
```

2. Fill required values in `.env`:

- `PRIVATE_KEY`
- `OG_RPC_URL`
- later `NEXT_PUBLIC_INFT_ADDRESS` after deploy

3. Install dependencies:

```bash
cd contracts && npm install
cd ../frontend && npm install
```

4. Deploy contracts:

```bash
cd ../contracts
npx hardhat run scripts/deploy.ts --network og-testnet
```

5. Put printed `HumanAgentINFT` address into `.env` as `NEXT_PUBLIC_INFT_ADDRESS`.

6. Start web app:

```bash
cd ../frontend
npm run dev
```

## 30-Second Demo Script

1. Open app and paste wallet address.
2. Toggle "Verification passed".
3. Click "Mint Human Agent iNFT".
4. Show `txHash` + `tokenId` + onchain readback panel.

## What is Mocked (by design)

- Oracle transfer proofs are mocked (`MockOracle`).
- Sealed key handling is demo-only (`DEMO_SEALING_SECRET` based sealing).
- Verification source is a demo toggle in UI (your captcha/model can replace this input later).
- No zkSNARK transfer-proof workflow is implemented yet.
