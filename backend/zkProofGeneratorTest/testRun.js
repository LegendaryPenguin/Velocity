import { runZKProofPipeline } from "./runPipeline.js";

const score = -1000; // or -5000 for out-of-range test
const result = runZKProofPipeline(score);

console.log("Pipeline output:", result);