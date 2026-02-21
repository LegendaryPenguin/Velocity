/**
 * Test that the verification key and proof in the module verify successfully.
 * Run from repo root: node api/test-validate.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import * as snarkjs from "snarkjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const validatorDir = path.join(__dirname, "..", "backend", "zkProofValidator");

const proof = JSON.parse(fs.readFileSync(path.join(validatorDir, "proof.json")));
const publicSignals = JSON.parse(fs.readFileSync(path.join(validatorDir, "publicSignals.json")));
const vk = JSON.parse(fs.readFileSync(path.join(validatorDir, "verification_key.json")));

const isValid = await snarkjs.groth16.verify(vk, publicSignals, proof);
if (!isValid) throw new Error("Verification failed");
if (publicSignals[0] !== "1") throw new Error("Circuit output isHuman !== 1");

console.log("API verification logic test: OK (proof + VK verify, isHuman=1)");
