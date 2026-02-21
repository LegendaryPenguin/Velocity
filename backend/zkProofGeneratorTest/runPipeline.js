import fs from "fs";
import { execSync, spawnSync } from "child_process";
import path from "path";

const GENERATOR = path.resolve("./");
const VALIDATOR = path.resolve("../zkProofValidator");

export function runZKProofPipeline(inputScore) {
  console.log("=== ZK Proof Pipeline Started ===");

  if (typeof inputScore !== "number" || Number.isNaN(inputScore)) {
    console.error("❌ Invalid input: score must be a number.");
    return { success: false, message: "Invalid input: score must be a number." };
  }

  const score = Math.round(inputScore);

  if (score < -6000 || score > 6000) {
    console.warn(
      "⚠️ Test failed: score out of valid human range. Data not processed."
    );
    return {
      success: false,
      message: "Test failed: score out of valid human range. Data not processed.",
    };
  }

  try {
    // -------------------------------
    // Step 1: Clean old artifacts
    // -------------------------------
    console.log("Step 1: Cleaning old artifacts...");
    const toDelete = [
      "captcha_js",
      "captcha.r1cs",
      "captcha.sym",
      "captcha_0000.zkey",
      "captcha_final.zkey",
      "verification_key.json",
      "witness.wtns",
      "proof.json",
      "publicSignals.json",
    ];

    for (const f of toDelete) {
      const p = path.join(GENERATOR, f);
      if (fs.existsSync(p)) {
        fs.rmSync(p, { recursive: true, force: true });
        console.log("Deleted:", p);
      }
    }

    // Write score to input.json for the witness generator
    const inputPath = path.join(GENERATOR, "input.json");
    fs.writeFileSync(inputPath, JSON.stringify({ score }, null, 2));

    // -------------------------------
    // Step 2: Compile circuit
    // -------------------------------
    console.log("Step 2: Compiling circuit...");
    execSync(`circom2 captcha.circom --r1cs --wasm --sym`, { stdio: "inherit" });

    const captchaJsDir = path.join(GENERATOR, "captcha_js");
    fs.writeFileSync(
      path.join(captchaJsDir, "package.json"),
      JSON.stringify({ type: "commonjs" }, null, 2)
    );

    // -------------------------------
    // Step 3: Groth16 setup & zkey
    // -------------------------------
    console.log("Step 3: Running Groth16 setup...");
    execSync(
      `snarkjs groth16 setup "${GENERATOR}/captcha.r1cs" "${GENERATOR}/pot12_final.ptau" "${GENERATOR}/captcha_0000.zkey"`,
      { stdio: "inherit" }
    );

    console.log("Step 4: Contributing to zkey...");
    execSync(
      `snarkjs zkey contribute "${GENERATOR}/captcha_0000.zkey" "${GENERATOR}/captcha_final.zkey" --name="hackathon" -v --entropy="debug2026"`,
      { stdio: "inherit" }
    );

    console.log("Step 5: Exporting verification key...");
    execSync(
      `snarkjs zkey export verificationkey "${GENERATOR}/captcha_final.zkey" "${GENERATOR}/verification_key.json"`,
      { stdio: "inherit" }
    );

    // -------------------------------
    // Step 6: Generate witness
    // -------------------------------
    console.log("Step 6: Generating witness...");
    execSync(
      `node "${GENERATOR}/captcha_js/generate_witness.js" "${GENERATOR}/captcha_js/captcha.wasm" "${inputPath}" "${GENERATOR}/witness.wtns"`,
      { stdio: "inherit" }
    );

    // -------------------------------
    // Step 7: Generate proof
    // -------------------------------
    console.log("Step 7: Generating proof...");
    execSync(
      `snarkjs groth16 prove "${GENERATOR}/captcha_final.zkey" "${GENERATOR}/witness.wtns" "${GENERATOR}/proof.json" "${GENERATOR}/publicSignals.json"`,
      { stdio: "inherit" }
    );

    // -------------------------------
    // Step 8: Copy proof files to validator
    // -------------------------------
    console.log("Step 8: Copying proof and public signals to validator...");
    fs.copyFileSync(path.join(GENERATOR, "proof.json"), path.join(VALIDATOR, "proof.json"));
    fs.copyFileSync(
      path.join(GENERATOR, "publicSignals.json"),
      path.join(VALIDATOR, "publicSignals.json")
    );
    fs.copyFileSync(
      path.join(GENERATOR, "verification_key.json"),
      path.join(VALIDATOR, "verification_key.json")
    );

    // -------------------------------
    // Step 9: Verify proof (synchronously, returns control)
    // -------------------------------
    console.log("Step 9: Running validator...");
    const run = spawnSync("node", ["test.js"], {
      cwd: VALIDATOR,
      encoding: "utf-8",
      maxBuffer: 1024 * 1024,
    });
    if (run.stdout) console.log(run.stdout.trim());
    if (run.stderr) console.error(run.stderr.trim());

    const verified = run.stdout && run.stdout.includes("Verification result: true");
    if (!verified) {
      console.error("❌ Validator did not report a successful verification.");
      return {
        success: false,
        message: "Validator failed to verify proof.",
        verified: false,
      };
    }

    console.log("✅ ZK pipeline completed successfully");
    return {
      success: true,
      message: "ZK proof generated and verified successfully.",
      verified: true,
      proofPath: path.join(VALIDATOR, "proof.json"),
      publicSignalsPath: path.join(VALIDATOR, "publicSignals.json"),
    };
  } catch (err) {
    console.error("❌ ZK proof pipeline failed:");
    console.error(err);
    return { success: false, message: "Pipeline failed. See console for details." };
  }
}