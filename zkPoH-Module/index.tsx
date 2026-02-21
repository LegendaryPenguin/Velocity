/**
 * zkPoH-Module – ZK-proof captcha for any project.
 *
 * Usage:
 *   import { ZkCaptcha } from "zkpoh-module";
 *   <ZkCaptcha onVerified={(payload, score) => { console.log("Verified", score); }} />
 *
 * Requires: React, snarkjs. Serve captcha.wasm and captcha_final.zkey (e.g. at /zk/)
 * and provide a POST validate endpoint that verifies the proof (see README).
 */

export { ZkCaptcha } from "./zkCaptcha";
export type { ZkCaptchaProps, ExportedJson, ZKProveOptions } from "./zkCaptcha";
