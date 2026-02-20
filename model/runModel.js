import fs from "fs";

const model = JSON.parse(fs.readFileSync("./model.json", "utf8"));

function infer(features) {
  let score = model.bias;

  for (let i = 0; i < model.feature_order.length; i++) {
    const name = model.feature_order[i];
    const x = Number(features[name] || 0);
    const w = model.weights[i];

    score += w * x;
  }

  const human = score >= model.threshold ? 1 : 0;

  return { score, human };
}


// Example feature input
const features = {
  time_ms: 8000,
  mistakes: 1,
  path_len_px: 15000,
  curvature: 7000,
  avg_speed: 300,
  speed_std: 80,
  avg_acc: 400,
  acc_std: 120,
  hesitations: 3,
  blur_count: 0
};

const result = infer(features);

console.log(result);
