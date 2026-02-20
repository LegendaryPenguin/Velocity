import fs from "fs";

const model = JSON.parse(fs.readFileSync("./model.json", "utf8"));
const sampleFeatures = JSON.parse(fs.readFileSync("./features.json", "utf8"));

function infer(features) {
  let score = model.bias;
  const details = [];

  for (let i = 0; i < model.feature_order.length; i++) {
    const name = model.feature_order[i];
    const x = Number(features[name] || 0);
    const w = model.weights[i];
    const wx = w * x;
    score += wx;
    details.push({ feature: name, x, w, wx });
  }

  const human = score >= model.threshold ? 1 : 0;
  return { score, human, details };
}

const result = infer(sampleFeatures);

console.log("Score:", result.score);
console.log("Label:", result.human ? "HUMAN" : "BOT");
console.log("\nFeature contributions:");
result.details.forEach((d) => {
  const sign = d.wx >= 0 ? "+" : "";
  console.log(`  ${d.feature.padEnd(24)} x=${String(d.x).padStart(6)}  w=${String(d.w).padStart(7)}  w*x=${sign}${Math.round(d.wx)}`);
});
console.log(`  ${"bias".padEnd(24)} ${" ".repeat(24)}  w*x=${model.bias}`);
console.log(`\n  TOTAL: ${Math.round(result.score)}`);
