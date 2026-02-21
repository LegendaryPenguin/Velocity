# PoW Captcha Module

ZK-proof captcha for any project: one-line import, one "Verify" button, behavioral AI model + proof pipeline. No testnet or app-specific wording—just verification.

## One-line import

```tsx
import { PoWCaptcha } from "./PoW-Captcha-Module";  // or "pow-captcha-module" if installed

<PoWCaptcha
  onVerified={(payload, score) => {
    console.log("Verified", payload, score);
    // Unlock your feature, continue checkout, etc.
  }}
/>
```

That’s it. The user clicks **Verify**, solves the pattern puzzle, and the module runs the AI model and ZK proof; your backend validates the proof and you get `onVerified` only when validation succeeds.

### Optional props

- **buttonText** – Label for the button (default: `"Verify"`).
- **className** – Extra classes for the button.
- **zkBaseUrl** – Base URL for WASM/zkey (default: `"/zk"`). Example: `"/zk"` or `"https://cdn.example.com/zk"`.
- **validateApiUrl** – Your validate endpoint (default: `"/api/validate"`). Must accept `POST` with `{ proof, publicSignals }` and return `{ verified: true }` or `{ verified: false, error?: string }`.

---

## Setup in your app

1. **Dependency**
   ```bash
   npm install snarkjs
   ```
   (React is assumed.)

2. **ZK assets**
   - Build once with the module’s pipeline (see [Backend pipeline](#backend-pipeline)).
   - Put `captcha.wasm` and `captcha_final.zkey` in your app so they are served at **`/zk/captcha.wasm`** and **`/zk/captcha_final.zkey`** (e.g. in Next.js: `public/zk/`).

3. **Validate API**
   - Copy `api/validate-route.ts` into your app as your validate handler (e.g. Next.js: `app/api/validate/route.ts`).
   - **Critical:** The route contains an **inlined verification key**. It must match the zkey you use. If you run the pipeline yourself, copy the generated `verification_key.json` into the route (replace the `VERIFICATION_KEY` object). Otherwise use the module’s route as-is with the module’s built artifacts.

---

## Why validation can fail

Validation fails if the **verification key** in your API route does **not** match the **proving key** (zkey) used in the browser.

- The browser loads `captcha_final.zkey` and generates a proof.
- Your server checks that proof with `verification_key.json` (inlined in the route).
- Those two keys must come from the **same** pipeline run (same circuit, same `pot12_final.ptau`, same zkey contribution).

So: either use the module’s pre-built artifacts and the module’s `api/validate-route.ts` unchanged, or run the pipeline once and then **update the inlined key in the route** with the new `verification_key.json` from that run.

---

## Backend pipeline (build WASM + zkey)

Location: `backend/zkProofGeneratorTest/`

1. Install **circom** 2.x and **snarkjs** (e.g. `npm install -g snarkjs`).
2. Get **pot12_final.ptau** and put it in `backend/zkProofGeneratorTest/` (see that folder’s README for trusted setup).
3. Run:
   ```bash
   cd backend/zkProofGeneratorTest
   node runPipelineRunner.js 500
   ```
4. Copy into your app’s `public/zk/` (or equivalent):
   - `captcha_js/captcha.wasm` → `public/zk/captcha.wasm`
   - `captcha_final.zkey` → `public/zk/captcha_final.zkey`
5. If this was a **new** pipeline run, copy the new `verification_key.json` into your API route (replace the inlined `VERIFICATION_KEY` in `api/validate-route.ts`).

---

## Contents

- **index.tsx** – Single entry; exports `PoWCaptcha`.
- **frontend/** – `PoWCaptcha` component, modal, captcha model, ZK prove/validate helpers, hooks.
- **backend/** – Circuit (`captcha.circom`), pipeline (`runPipeline.js`), Node verifier.
- **api/validate-route.ts** – Next.js (or compatible) API route; copy into your app.

---

## Testing

- **Validator (Node):**  
  `cd backend/zkProofValidator && npm install && node test.js`  
  Expect: `Verification result: true` (requires `proof.json` and `publicSignals.json` from a pipeline run).
- **Model (Node):**  
  `cd frontend && npx tsx test-captcha-model.ts`
- **API logic:**  
  From repo root (with snarkjs installed): `node api/test-validate.mjs`

Full E2E: run pipeline → copy wasm/zkey to app `public/zk/` → use module’s validate route (with matching key) → render `<PoWCaptcha onVerified={...} />` → click Verify, solve puzzle → `onVerified` fires and API returns `{ verified: true }`.
