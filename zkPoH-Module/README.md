# zkPoH-Module

A drop-in **ZK-proof captcha** for any project. One button launches a behavioral challenge; telemetry is scored, a ZK proof is generated in the browser and verified by your backend; the captcha closes with a “ZK proof completed” message.

## Quick start

```jsx
import { ZkCaptcha } from "zkpoh-module";

function App() {
  return (
    <ZkCaptcha
      onVerified={(payload, score) => {
        console.log("Verified", score);
        // Proceed with your flow (e.g. submit form, unlock feature)
      }}
    />
  );
}
```

## Requirements

- **React** 18+
- **snarkjs** (peer dependency)
- **Backend**: serve the ZK assets and provide a validate API (see below)

## Backend setup

1. **Serve WASM and zkey**  
   Expose `captcha.wasm` and `captcha_final.zkey` at a URL your frontend can load (e.g. `/zk/captcha.wasm`, `/zk/captcha_final.zkey`). These come from your circuit build (e.g. Circom + snarkjs).

2. **Validate API**  
   Implement a `POST` endpoint that accepts `{ proof, publicSignals }`, runs Groth16 verification with your verification key, and returns `{ verified: true }` or `{ verified: false, error?: string }`.

   Example (Node with snarkjs):

   ```js
   const snarkjs = require("snarkjs");
   const vk = require("./verification_key.json");

   async function POST(req, res) {
     const { proof, publicSignals } = await req.json();
     const ok = await snarkjs.groth16.verify(vk, publicSignals, proof);
     const valid = ok && publicSignals[0] === "1";
     res.json({ verified: !!valid });
   }
   ```

## Options

| Prop            | Description                                      | Default          |
|-----------------|--------------------------------------------------|------------------|
| `onVerified`    | `(payload, score) => void` when proof is verified | required         |
| `buttonText`    | Button label                                     | `"Verify"`       |
| `className`     | Extra CSS classes for the button                 | default purple   |
| `zkBaseUrl`     | Base URL for WASM/zkey (no trailing slash)        | `"/zk"`          |
| `validateApiUrl`| Full URL for your validate API                   | `"/api/validate"`|

## Flow

1. User clicks the button → captcha modal opens.
2. User completes the grid challenge (select tiles matching the prompt).
3. Behavioral telemetry (timing, mouse path, etc.) is turned into a score.
4. If the score is in the valid range, a ZK proof is generated in the browser (WASM + zkey).
5. The proof is sent to your validate API; if the server returns `verified: true`, the modal shows **“ZK proof completed”** and closes after a short delay.
6. Your `onVerified(payload, score)` runs so you can continue your flow.

No testnet- or app-specific wording is included; the module is generic and reusable.
