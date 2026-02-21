import { runZKProofPipeline } from "./runPipeline.js";

const score = Number(process.argv[2]);

if (!Number.isFinite(score)) {
  console.log(JSON.stringify({ success: false, message: "Invalid score argument." }));
  process.exit(2);
}

const result = runZKProofPipeline(score);
console.log(JSON.stringify(result));
process.exit(result.success ? 0 : 1);
