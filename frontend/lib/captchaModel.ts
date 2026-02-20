export type PatternType = "circle" | "triangle" | "plus" | "waves" | "stripes" | "star";

export type FeatureName =
  | "time_ms" | "click_count" | "unique_tiles_clicked" | "verify_attempts"
  | "mistakes" | "avg_click_delta_ms" | "std_click_delta_ms" | "hesitations"
  | "blur_count" | "reset_count" | "path_len_px" | "avg_speed" | "speed_std"
  | "avg_acceleration" | "acc_std" | "curvature" | "direction_changes"
  | "click_precision_px" | "path_straightness" | "movement_efficiency"
  | "micro_corrections" | "velocity_consistency" | "pause_before_click_ms"
  | "angular_velocity_std";

export type Features = Record<FeatureName, number>;
export type MouseSample = { x: number; y: number; t: number };

export type ExportedJson = {
  time_ms: number;
  click_count: number;
  unique_tiles_clicked: number;
  mistakes: number;
  avg_click_delta_ms: number;
  hesitations: number;
  path_straightness: number;
  movement_efficiency: number;
  reset_count: number;
};

export type Puzzle = {
  seed: number;
  id: string;
  target: PatternType;
  tiles: PatternType[];
  targetIndices: Set<number>;
};

export const PATTERN_TYPES: PatternType[] = ["circle", "triangle", "plus", "waves", "stripes", "star"];
export const GRID_SIZE = 4;
export const TILE_COUNT = GRID_SIZE * GRID_SIZE;
export const MIN_TARGETS = 4;
export const MAX_TARGETS = 7;
export const HESITATION_THRESHOLD_MS = 1200;
export const BOT_STEP_INTERVAL_MS = 180;
export const MOUSE_SAMPLE_INTERVAL_MS = 8;
export const INITIAL_SEED = 42;

export const FEATURE_ORDER: FeatureName[] = [
  "time_ms", "click_count", "unique_tiles_clicked", "verify_attempts",
  "mistakes", "avg_click_delta_ms", "std_click_delta_ms", "hesitations",
  "blur_count", "reset_count", "path_len_px", "avg_speed", "speed_std",
  "avg_acceleration", "acc_std", "curvature", "direction_changes",
  "click_precision_px", "path_straightness", "movement_efficiency",
  "micro_corrections", "velocity_consistency", "pause_before_click_ms",
  "angular_velocity_std",
];

export const WEIGHTS: number[] = [
  0.3, -15, 60, -400, -80, 0.8, 2, 200, -500, -250,
  0.05, 0, 0.5, 0, 0, 0, 12, -40, -5, 4,
  40, -5, 1.5, 0,
];

export const BIAS = -1500;
export const THRESHOLD = 0;

export const ZERO_FEATURES: Features = Object.fromEntries(FEATURE_ORDER.map((k) => [k, 0])) as Features;

const FEATURE_CLAMPS: Record<FeatureName, [number, number]> = {
  time_ms: [0, 60000], click_count: [0, 500], unique_tiles_clicked: [0, 16],
  verify_attempts: [0, 50], mistakes: [0, 500], avg_click_delta_ms: [0, 10000],
  std_click_delta_ms: [0, 10000], hesitations: [0, 200], blur_count: [0, 100],
  reset_count: [0, 200], path_len_px: [0, 100000], avg_speed: [0, 50000],
  speed_std: [0, 50000], avg_acceleration: [0, 100000], acc_std: [0, 100000],
  curvature: [0, 100000], direction_changes: [0, 5000], click_precision_px: [0, 200],
  path_straightness: [0, 1000], movement_efficiency: [0, 1000],
  micro_corrections: [0, 2000], velocity_consistency: [0, 1000],
  pause_before_click_ms: [0, 10000], angular_velocity_std: [0, 50000],
};

function clampVal(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function ptDist(a: MouseSample, b: MouseSample) {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

function angleBetween(a: MouseSample, b: MouseSample, c: MouseSample) {
  const v1x = b.x - a.x;
  const v1y = b.y - a.y;
  const v2x = c.x - b.x;
  const v2y = c.y - b.y;
  return Math.abs(Math.atan2(v1x * v2y - v1y * v2x, v1x * v2x + v1y * v2y));
}

function mean(a: number[]) {
  return a.length === 0 ? 0 : a.reduce((s, v) => s + v, 0) / a.length;
}

function stddev(a: number[]) {
  if (a.length < 2) return 0;
  const m = mean(a);
  return Math.sqrt(a.reduce((s, v) => s + (v - m) ** 2, 0) / a.length);
}

function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generatePuzzle(seed: number): Puzzle {
  const rng = mulberry32(seed);
  const target = PATTERN_TYPES[Math.floor(rng() * PATTERN_TYPES.length)];
  const targetCount = MIN_TARGETS + Math.floor(rng() * (MAX_TARGETS - MIN_TARGETS + 1));
  const indices = Array.from({ length: TILE_COUNT }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const targetIndices = new Set(indices.slice(0, targetCount));
  const distractors = PATTERN_TYPES.filter((p) => p !== target);
  const tiles: PatternType[] = [];
  for (let i = 0; i < TILE_COUNT; i++) {
    tiles.push(targetIndices.has(i) ? target : distractors[Math.floor(rng() * distractors.length)]);
  }
  return { seed, id: `pzl_${seed.toString(16).padStart(8, "0")}`, target, tiles, targetIndices };
}

export function computeFeatures(
  clickTs: number[],
  uniqueTiles: Set<number>,
  verifyAttempts: number,
  mistakes: number,
  blurCount: number,
  resetCount: number,
  startTime: number | null,
  endTime: number | null,
  mousePath: MouseSample[],
  clickPos: { x: number; y: number; tileCenterX: number; tileCenterY: number }[],
  pausesBefore: number[],
): Features {
  const t0 = startTime ?? 0;
  const timeMs = Math.round(Math.max(0, (endTime ?? t0) - t0));
  const deltas: number[] = [];
  for (let i = 1; i < clickTs.length; i++) deltas.push(Math.max(0, clickTs[i] - clickTs[i - 1]));
  const avgDelta = mean(deltas);
  const stdDelta = stddev(deltas);
  const hesitations = deltas.filter((d) => d > HESITATION_THRESHOLD_MS).length;

  let pathLen = 0;
  const speeds: number[] = [];
  const accelerations: number[] = [];
  const angles: number[] = [];
  let dirChanges = 0;
  let microCorr = 0;

  for (let i = 1; i < mousePath.length; i++) {
    const d = ptDist(mousePath[i - 1], mousePath[i]);
    pathLen += d;
    speeds.push((d / Math.max(1, mousePath[i].t - mousePath[i - 1].t)) * 1000);
  }
  for (let i = 1; i < speeds.length; i++) {
    const dt = Math.max(1, (mousePath[i + 1]?.t ?? mousePath[i].t) - mousePath[i].t || 1);
    accelerations.push((Math.abs(speeds[i] - speeds[i - 1]) / dt) * 1000);
  }
  for (let i = 1; i < mousePath.length - 1; i++) {
    const ang = angleBetween(mousePath[i - 1], mousePath[i], mousePath[i + 1]);
    angles.push(ang);
    if (ang > Math.PI / 6) dirChanges++;
    if (ang > Math.PI / 4 && ptDist(mousePath[i - 1], mousePath[i]) < 15) microCorr++;
  }
  const angVels: number[] = [];
  for (let i = 0; i < angles.length; i++) {
    angVels.push((angles[i] / Math.max(1, mousePath[i + 1].t - mousePath[i].t)) * 1000);
  }

  let clickPrec = 0;
  if (clickPos.length > 0) {
    clickPrec = mean(clickPos.map((c) => Math.sqrt((c.x - c.tileCenterX) ** 2 + (c.y - c.tileCenterY) ** 2)));
  }

  let pathStr = 0;
  let moveEff = 500;
  if (clickTs.length >= 2 && mousePath.length >= 2) {
    const ratios: number[] = [];
    for (let c = 1; c < clickTs.length; c++) {
      const seg = mousePath.filter((s) => s.t >= clickTs[c - 1] - 50 && s.t <= clickTs[c] + 50);
      if (seg.length >= 2) {
        let segLen = 0;
        for (let j = 1; j < seg.length; j++) segLen += ptDist(seg[j - 1], seg[j]);
        const direct = ptDist(seg[0], seg[seg.length - 1]);
        if (segLen > 0) ratios.push(direct / segLen);
      }
    }
    if (ratios.length > 0) {
      pathStr = Math.round(mean(ratios) * 1000);
      moveEff = Math.round((1 - mean(ratios)) * 1000);
    }
  } else if (mousePath.length >= 2) {
    const dd = ptDist(mousePath[0], mousePath[mousePath.length - 1]);
    if (pathLen > 0) {
      pathStr = Math.round((dd / pathLen) * 1000);
      moveEff = Math.round((1 - dd / pathLen) * 1000);
    }
  }

  const velCon = speeds.length > 1
    ? Math.round((1 - Math.min(1, stddev(speeds) / (mean(speeds) || 1))) * 1000)
    : 500;
  const cl = (n: FeatureName, v: number) => Math.round(clampVal(v, ...FEATURE_CLAMPS[n]));

  return {
    time_ms: cl("time_ms", timeMs),
    click_count: cl("click_count", clickTs.length),
    unique_tiles_clicked: cl("unique_tiles_clicked", uniqueTiles.size),
    verify_attempts: cl("verify_attempts", verifyAttempts),
    mistakes: cl("mistakes", mistakes),
    avg_click_delta_ms: cl("avg_click_delta_ms", avgDelta),
    std_click_delta_ms: cl("std_click_delta_ms", stdDelta),
    hesitations: cl("hesitations", hesitations),
    blur_count: cl("blur_count", blurCount),
    reset_count: cl("reset_count", resetCount),
    path_len_px: cl("path_len_px", pathLen),
    avg_speed: cl("avg_speed", mean(speeds)),
    speed_std: cl("speed_std", stddev(speeds)),
    avg_acceleration: cl("avg_acceleration", mean(accelerations)),
    acc_std: cl("acc_std", stddev(accelerations)),
    curvature: cl("curvature", angles.reduce((a, b) => a + b, 0) * 100),
    direction_changes: cl("direction_changes", dirChanges),
    click_precision_px: cl("click_precision_px", clickPrec),
    path_straightness: cl("path_straightness", pathStr),
    movement_efficiency: cl("movement_efficiency", moveEff),
    micro_corrections: cl("micro_corrections", microCorr),
    velocity_consistency: cl("velocity_consistency", velCon),
    pause_before_click_ms: cl("pause_before_click_ms", mean(pausesBefore)),
    angular_velocity_std: cl("angular_velocity_std", stddev(angVels) * 100),
  };
}

export function runModel(features: Features): { score: number; label: "HUMAN" | "BOT" } {
  const score = FEATURE_ORDER.reduce((acc, name, i) => acc + WEIGHTS[i] * features[name], BIAS);
  return { score: Math.round(score), label: score >= THRESHOLD ? "HUMAN" : "BOT" };
}

export function generateBotPath(
  sx: number,
  sy: number,
  ex: number,
  ey: number,
  dur: number,
): MouseSample[] {
  const steps = Math.max(12, Math.round(dur / MOUSE_SAMPLE_INTERVAL_MS));
  const path: MouseSample[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    path.push({
      x: sx + (ex - sx) * t + (Math.random() - 0.5) * 0.15,
      y: sy + (ey - sy) * t + (Math.random() - 0.5) * 0.15,
      t: i * MOUSE_SAMPLE_INTERVAL_MS,
    });
  }
  return path;
}

export function toExportJson(f: Features): ExportedJson {
  return {
    time_ms: f.time_ms,
    click_count: f.click_count,
    unique_tiles_clicked: f.unique_tiles_clicked,
    mistakes: f.mistakes,
    avg_click_delta_ms: f.avg_click_delta_ms,
    hesitations: f.hesitations,
    path_straightness: f.path_straightness,
    movement_efficiency: f.movement_efficiency,
    reset_count: f.reset_count,
  };
}
