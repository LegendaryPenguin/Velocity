/**
 * POST proof to /api/validate and assert verified.
 * Usage: node api/post-validate-test.mjs [baseUrl]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseUrl = process.argv[2] || "http://localhost:3000";
const validatorDir = path.join(__dirname, "..", "backend", "zkProofValidator");

const proof = JSON.parse(fs.readFileSync(path.join(validatorDir, "proof.json")));
const publicSignals = JSON.parse(fs.readFileSync(path.join(validatorDir, "publicSignals.json")));

const res = await fetch(`${baseUrl}/api/validate`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ proof, publicSignals }),
});
const data = await res.json();

if (!res.ok) {
  console.error("HTTP", res.status, data);
  process.exit(1);
}
if (!data.verified) {
  console.error("Response:", data);
  process.exit(1);
}
console.log("POST /api/validate: OK (verified:", data.verified + ")");
process.exit(0);
