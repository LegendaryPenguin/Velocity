/**
 * Test captcha model (run with: npx tsx test-captcha-model.ts)
 */
import {
  generatePuzzle,
  computeFeatures,
  runModel,
  toExportJson,
  ZERO_FEATURES,
  FEATURE_ORDER,
  INITIAL_SEED,
  generateBotPath,
} from "./lib/captchaModel";

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg);
}

console.log("Testing captchaModel...");

const puzzle = generatePuzzle(INITIAL_SEED);
assert(puzzle.seed === INITIAL_SEED, "seed");
assert(puzzle.tiles.length === 16, "16 tiles");
assert(puzzle.targetIndices.size >= 4 && puzzle.targetIndices.size <= 7, "target count");
assert(puzzle.id.startsWith("pzl_"), "id format");
console.log("  generatePuzzle: OK");

assert(Object.keys(ZERO_FEATURES).length === FEATURE_ORDER.length, "ZERO_FEATURES keys");
console.log("  ZERO_FEATURES: OK");

const clickTs = [0, 500, 1000];
const uniqueTiles = new Set([0, 1, 2]);
const mousePath = [
  { x: 0, y: 0, t: 0 },
  { x: 10, y: 5, t: 10 },
  { x: 20, y: 15, t: 25 },
];
const features = computeFeatures(
  clickTs,
  uniqueTiles,
  1, 0, 0, 0,
  null, 1500,
  mousePath,
  [{ x: 5, y: 5, tileCenterX: 0, tileCenterY: 0 }],
  [100]
);
assert(typeof features.time_ms === "number", "time_ms");
assert(features.click_count === 3, "click_count");
assert(features.unique_tiles_clicked === 3, "unique_tiles");
console.log("  computeFeatures: OK");

const result = runModel(features);
assert(typeof result.score === "number", "score number");
assert(result.label === "HUMAN" || result.label === "BOT", "label");
console.log("  runModel: OK (score=%s, label=%s)", result.score, result.label);

const exported = toExportJson(result.score);
assert(exported.score === result.score, "exported score");
console.log("  toExportJson: OK");

const path = generateBotPath(0, 0, 100, 50, 200);
assert(Array.isArray(path), "path array");
assert(path.length >= 2, "path length");
assert(Math.abs(path[0].x) < 1 && Math.abs(path[0].y) < 1, "path start near origin");
assert(path[path.length - 1].x >= 98 && path[path.length - 1].y >= 48, "path end near (100,50)");
console.log("  generateBotPath: OK");

console.log("\nAll captchaModel tests passed.");
