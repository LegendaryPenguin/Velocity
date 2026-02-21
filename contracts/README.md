# Human Agent iNFT Contracts (Hardhat)

This directory now includes a minimal Hardhat project for the faucet demo:

- `contracts/MockOracle.sol`
- `contracts/HumanAgentINFT.sol`
- `scripts/deploy.ts`
- `scripts/mint.ts`
- `test/basic.test.ts`

## Setup

```bash
cd contracts
npm install
```

Create `.env` in repo root (or export envs in shell):

```bash
PRIVATE_KEY=0x...
OG_RPC_URL=https://evmrpc-testnet.0g.ai
```

## Test

```bash
npx hardhat test
```

## Deploy to 0G Testnet

```bash
npx hardhat run scripts/deploy.ts --network og-testnet
```

The script prints:

- `MockOracle` address
- `HumanAgentINFT` address

Use the `HumanAgentINFT` address as `NEXT_PUBLIC_INFT_ADDRESS` in the web app.

## Mint manually

```bash
npx hardhat run scripts/mint.ts --network og-testnet -- --to 0xYourWallet
```

Optional flags:

- `--uri demo://...`
- `--hash 0x...`
