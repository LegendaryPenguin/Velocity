# 0G Trust Studio - Developer Tooling Suite

0G Trust Studio is a hackathon-ready monorepo that helps developers compose:

- human verification workflows
- iNFT (Intelligent NFT) agent identity
- faucet protection with cooldown and authorization
- encrypted metadata via 0G Storage (with fallback)
- CLI automation for deployment and scripted operations

## Architecture

```text
┌────────────────────────────────────────────────────────┐
│                     packages/web                       │
│ Dashboard | DevTools Builder | Agent Console | Faucet │
│   └─ calls API routes for mint, status, and claim     │
└───────────────┬────────────────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────────────────┐
│                     packages/sdk                       │
│ verifyHuman | mintAgent | checkAgentStatus            │
│ authorizeAction (shared helpers for web + CLI)        │
└───────────────┬────────────────────────────────────────┘
                │
                ▼
┌────────────────────────────────────────────────────────┐
│                   packages/contracts                   │
│ MockOracle | HumanAgentINFT | Faucet                  │
│ Hardhat deploy/test/mint scripts                       │
└───────────────┬────────────────────────────────────────┘
                │
                ▼
               0G Testnet (EVM RPC + Storage)
```

## Monorepo Layout

```text
/packages
  /contracts
  /web
  /cli
  /sdk
/.env.example
/README.md
```

## Setup

1) Install dependencies

```bash
npm install
```

2) Configure environment

```bash
cp .env.example .env
```

Fill:
- `PRIVATE_KEY`
- `OG_RPC_URL=https://evmrpc-testnet.0g.ai`
- `OG_STORAGE_URL=https://storage-testnet.0g.ai`
- `NEXT_PUBLIC_RPC_URL=https://evmrpc-testnet.0g.ai`

3) Run contract tests

```bash
npm run test
```

4) Deploy contracts

```bash
npm run deploy:contracts
```

Copy deployed addresses into `.env`:
- `NEXT_PUBLIC_INFT_ADDRESS=...`
- `NEXT_PUBLIC_FAUCET_ADDRESS=...`

5) Run web app

```bash
npm run dev
```

## Demo Script (judges)

1. Open `/faucet`
2. Enter wallet, complete verification toggle
3. Mint Human Agent iNFT
4. Claim faucet action
5. Show cooldown enforcement + agent status panel
6. Open `/devtools` and generate integration snippet
7. Run CLI command showing same workflow

## CLI Usage

```bash
npm run cli -- init
npm run cli -- deploy
npm run cli -- mint-agent --to 0xYourWallet
npm run cli -- agent status --wallet 0xYourWallet
npm run cli -- faucet claim --to 0xYourWallet
npm run cli -- generate
```

## Module Summary

- **Visual Builder**: select Verification -> Mint Agent -> Faucet Claim, configure params, generate snippet
- **Verification Widget**: wallet + verify flow with privacy note
- **Human Agent iNFT**: encrypted metadata URI + metadata hash onchain
- **Faucet Demo**: claim action gated by verified agent + cooldown
- **CLI Toolkit**: repeat deploy/mint/status/claim from terminal
- **SDK Layer**: shared methods across UI and CLI

## 0G Integration Notes

- **0G Chain**: contract deploy + mint + faucet claim checks
- **0G Storage**: encrypted metadata storage attempt via SDK
- **0G Compute**: optional placeholder hook only (not required for MVP)

## What is Mocked

- Oracle transfer proofs (`MockOracle`)
- Real model inference and zk proof pipelines
- Storage fallback URI when 0G storage auth/client is unavailable
