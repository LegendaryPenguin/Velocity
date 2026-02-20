import fs from "fs";
import * as snarkjs from "snarkjs";

export async function verifyProof({
  proofPath,
  publicSignalsPath,
  verificationKeyPath
}) {
  const proof = JSON.parse(fs.readFileSync(proofPath));
  const publicSignals = JSON.parse(fs.readFileSync(publicSignalsPath));
  const vk = JSON.parse(fs.readFileSync(verificationKeyPath));

  if (publicSignals.length !== vk.nPublic) {
    throw new Error("Public signal count mismatch");
  }

  const isValid = await snarkjs.groth16.verify(
    vk,
    publicSignals,
    proof
  );

  if (!isValid) {
    return false;
  }

  if (publicSignals[0] !== "1") {
    return false;
  }

  return true;
}