/**
 * PoW Captcha Module – one-line import for ZK-proof captcha.
 *
 * Usage:
 *   import { PoWCaptcha } from "./PoW-Captcha-Module";
 *   <PoWCaptcha onVerified={(payload, score) => console.log("Verified", score)} />
 *
 * Or with path/package:
 *   import { PoWCaptcha } from "pow-captcha-module";
 *
 * Requires: React, snarkjs. Serve captcha.wasm and captcha_final.zkey at /zk/
 * and provide a POST /api/validate endpoint (see api/validate-route.ts).
 */

export { PoWCaptcha } from "./frontend/PoWCaptcha";
export type { PoWCaptchaProps, ExportedJson, ZKProveOptions } from "./frontend/PoWCaptcha";
