import { verifyProof } from "./verify.js";

const run = async () => {
  try {
    const result = await verifyProof({
      proofPath: "./proof.json",
      publicSignalsPath: "./publicSignals.json",
      verificationKeyPath: "./verification_key.json"
    });

    console.log("Verification result:", result);
    process.exit(result === true ? 0 : 1);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};

run();