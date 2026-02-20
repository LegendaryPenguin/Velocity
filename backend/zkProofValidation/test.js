import { verifyProof } from "./verify.js";

const run = async () => {
  try {
    const result = await verifyProof({
      proofPath: "./exampleProof.json",
      publicSignalsPath: "./examplePublicSignals.json",
      verificationKeyPath: "./verification_key.json"
    });

    console.log("Verification result:", result);
  } catch (err) {
    console.error("Error:", err.message);
  }
};

run();