export type Model = {
  version: number;
  feature_order: string[];
  bias: number;
  weights: number[];
  threshold: number;
};

export type Inference = {
  score: number;
  label: 0 | 1;
  details: { feature: string; x: number; w: number; wx: number }[];
};

function clampInt(x: unknown, lo: number, hi: number): number {
  const n = typeof x === "number" ? x : Number(x);
  if (!Number.isFinite(n)) return lo;
  const v = Math.trunc(n);
  return Math.max(lo, Math.min(hi, v));
}

const FEATURE_BOUNDS: Record<string, { lo: number; hi: number }> = {
  time_ms: { lo: 0, hi: 60000 },
  click_count: { lo: 0, hi: 500 },
  unique_tiles_clicked: { lo: 0, hi: 16 },
  verify_attempts: { lo: 0, hi: 50 },
  mistakes: { lo: 0, hi: 500 },
  avg_click_delta_ms: { lo: 0, hi: 10000 },
  std_click_delta_ms: { lo: 0, hi: 10000 },
  hesitations: { lo: 0, hi: 200 },
  blur_count: { lo: 0, hi: 100 },
  reset_count: { lo: 0, hi: 200 },
  path_len_px: { lo: 0, hi: 100000 },
  avg_speed: { lo: 0, hi: 50000 },
  speed_std: { lo: 0, hi: 50000 },
  avg_acceleration: { lo: 0, hi: 100000 },
  acc_std: { lo: 0, hi: 100000 },
  curvature: { lo: 0, hi: 100000 },
  direction_changes: { lo: 0, hi: 5000 },
  click_precision_px: { lo: 0, hi: 200 },
  path_straightness: { lo: 0, hi: 1000 },
  movement_efficiency: { lo: 0, hi: 1000 },
  micro_corrections: { lo: 0, hi: 2000 },
  velocity_consistency: { lo: 0, hi: 1000 },
  pause_before_click_ms: { lo: 0, hi: 10000 },
  angular_velocity_std: { lo: 0, hi: 50000 },
};

export function infer(model: Model, features: Record<string, unknown>): Inference {
  if (model.feature_order.length !== model.weights.length) {
    throw new Error("Model invalid: feature_order and weights length mismatch");
  }

  let score = model.bias;
  const details: Inference["details"] = [];

  for (let i = 0; i < model.feature_order.length; i++) {
    const f = model.feature_order[i];
    const b = FEATURE_BOUNDS[f] ?? { lo: -1_000_000, hi: 1_000_000 };
    const x = clampInt(features[f], b.lo, b.hi);

    const w = model.weights[i];
    const wx = w * x;

    score += wx;

    details.push({ feature: f, x, w, wx });
  }

  const label: 0 | 1 = score >= model.threshold ? 1 : 0;
  return { score, label, details };
}
