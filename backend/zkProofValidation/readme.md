# ZK Proof Verifier (POC)

## Requirements
- Node.js >= 18

## Install
npm install

## Usage
```js
import { verifyProof } from "./verify.js";

const isHuman = await verifyProof({
  proofPath: "./proof.json",
  publicSignalsPath: "./publicSignals.json",
  verificationKeyPath: "./verification_key.json"
});