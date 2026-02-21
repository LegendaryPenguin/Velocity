# Web Demo: Faucet -> Human Agent iNFT

Minimal UI to mint a Human Agent iNFT once verification passes.

## Features

- Wallet address input
- Demo verification toggle
- Mint button calling `app/api/mint/route.ts`
- Result panel (`tokenId`, `txHash`, `encryptedURI`, `metadataHash`)
- Onchain readback via `getEncryptedURI` + `getMetadataHash`

## Required Env Vars

From repo root `.env`:

- `PRIVATE_KEY`
- `OG_RPC_URL=https://evmrpc-testnet.0g.ai`
- `NEXT_PUBLIC_OG_RPC_URL=https://evmrpc-testnet.0g.ai`
- `NEXT_PUBLIC_INFT_ADDRESS=0x...`
- `OG_STORAGE_URL` (+ optional `OG_STORAGE_API_KEY`)

## Run

```bash
npm install
npm run dev
```

## API Notes

`POST /api/mint`

- validates wallet format
- requires `verificationPassed=true`
- rate limit: one mint per IP per minute (demo only)
- encrypts metadata, stores encrypted payload URI, mints onchain
