"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { generateProof, submitProofForValidation } from "@/lib/zk/prove";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PatternType = "circle" | "triangle" | "plus" | "waves" | "stripes" | "star";

type FeatureName =
  | "time_ms"
  | "click_count"
  | "unique_tiles_clicked"
  | "verify_attempts"
  | "mistakes"
  | "avg_click_delta_ms"
  | "std_click_delta_ms"
  | "hesitations"
  | "blur_count"
  | "reset_count"
  | "path_len_px"
  | "avg_speed"
  | "speed_std"
  | "avg_acceleration"
  | "acc_std"
  | "curvature"
  | "direction_changes"
  | "click_precision_px"
  | "path_straightness"
  | "movement_efficiency"
  | "micro_corrections"
  | "velocity_consistency"
  | "pause_before_click_ms"
  | "angular_velocity_std";

type Features = Record<FeatureName, number>;

type MouseSample = { x: number; y: number; t: number };

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PATTERN_TYPES: PatternType[] = [
  "circle", "triangle", "plus", "waves", "stripes", "star",
];

const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const MIN_TARGETS = 4;
const MAX_TARGETS = 7;
const HESITATION_THRESHOLD_MS = 1200;
const BOT_STEP_INTERVAL_MS = 180;
const MOUSE_SAMPLE_INTERVAL_MS = 8;

const FEATURE_ORDER: FeatureName[] = [
  "time_ms",
  "click_count",
  "unique_tiles_clicked",
  "verify_attempts",
  "mistakes",
  "avg_click_delta_ms",
  "std_click_delta_ms",
  "hesitations",
  "blur_count",
  "reset_count",
  "path_len_px",
  "avg_speed",
  "speed_std",
  "avg_acceleration",
  "acc_std",
  "curvature",
  "direction_changes",
  "click_precision_px",
  "path_straightness",
  "movement_efficiency",
  "micro_corrections",
  "velocity_consistency",
  "pause_before_click_ms",
  "angular_velocity_std",
];

// Weights tuned so that:
//   Bot signature:  high path_straightness (~980), high velocity_consistency (~900),
//                   low speed_std (~50), low direction_changes (~2), low micro_corrections (~0),
//                   low click_precision_px (~1), low movement_efficiency (~20)
//   Human signature: low path_straightness (~200-400), low velocity_consistency (~200-400),
//                    high speed_std (~200-600), high direction_changes (~20-80),
//                    high micro_corrections (~10-40), high click_precision_px (~8-20),
//                    high movement_efficiency (~600-800)
const WEIGHTS: number[] = [
  0.3,     // time_ms
  -15,     // click_count
  60,      // unique_tiles_clicked
  -400,    // verify_attempts
  -80,     // mistakes
  0.8,     // avg_click_delta_ms
  2,       // std_click_delta_ms
  200,     // hesitations
  -500,    // blur_count
  -250,    // reset_count
  0.05,    // path_len_px
  0,       // avg_speed (not discriminative)
  0.5,     // speed_std
  0,       // avg_acceleration (not discriminative)
  0,       // acc_std (not discriminative — easing inflates this for bots)
  0,       // curvature (not discriminative — easing inflates this)
  12,      // direction_changes: bot ~2, human ~30+
  -40,     // click_precision_px: bot ~1, human ~12
  -5,      // path_straightness: bot ~980, human ~300 => delta ~3400
  4,       // movement_efficiency: bot ~20, human ~700 => delta ~2720
  40,      // micro_corrections: bot ~0, human ~20 => delta ~800
  -5,      // velocity_consistency: bot ~900, human ~300 => delta ~3000
  1.5,     // pause_before_click_ms
  0,       // angular_velocity_std (not discriminative)
];

const BIAS = -1500;
const THRESHOLD = 0;

const ZERO_FEATURES: Features = Object.fromEntries(
  FEATURE_ORDER.map((k) => [k, 0]),
) as Features;

const FEATURE_CLAMPS: Record<FeatureName, [number, number]> = {
  time_ms: [0, 60000],
  click_count: [0, 500],
  unique_tiles_clicked: [0, 16],
  verify_attempts: [0, 50],
  mistakes: [0, 500],
  avg_click_delta_ms: [0, 10000],
  std_click_delta_ms: [0, 10000],
  hesitations: [0, 200],
  blur_count: [0, 100],
  reset_count: [0, 200],
  path_len_px: [0, 100000],
  avg_speed: [0, 50000],
  speed_std: [0, 50000],
  avg_acceleration: [0, 100000],
  acc_std: [0, 100000],
  curvature: [0, 100000],
  direction_changes: [0, 5000],
  click_precision_px: [0, 200],
  path_straightness: [0, 1000],
  movement_efficiency: [0, 1000],
  micro_corrections: [0, 2000],
  velocity_consistency: [0, 1000],
  pause_before_click_ms: [0, 10000],
  angular_velocity_std: [0, 50000],
};

// ---------------------------------------------------------------------------
// Seeded RNG (mulberry32)
// ---------------------------------------------------------------------------

function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------------------------------------------------------------------------
// Puzzle generation
// ---------------------------------------------------------------------------

type Puzzle = {
  seed: number;
  id: string;
  target: PatternType;
  tiles: PatternType[];
  targetIndices: Set<number>;
};

function generatePuzzle(seed: number): Puzzle {
  const rng = mulberry32(seed);
  const target = PATTERN_TYPES[Math.floor(rng() * PATTERN_TYPES.length)];
  const targetCount =
    MIN_TARGETS + Math.floor(rng() * (MAX_TARGETS - MIN_TARGETS + 1));

  const indices = Array.from({ length: TILE_COUNT }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  const targetIndices = new Set(indices.slice(0, targetCount));

  const distractors = PATTERN_TYPES.filter((p) => p !== target);
  const tiles: PatternType[] = [];
  for (let i = 0; i < TILE_COUNT; i++) {
    if (targetIndices.has(i)) {
      tiles.push(target);
    } else {
      tiles.push(distractors[Math.floor(rng() * distractors.length)]);
    }
  }

  const id = `pzl_${seed.toString(16).padStart(8, "0")}`;
  return { seed, id, target, tiles, targetIndices };
}

// ---------------------------------------------------------------------------
// Math helpers
// ---------------------------------------------------------------------------

function clampVal(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function ptDist(a: MouseSample, b: MouseSample): number {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

function angleBetween(a: MouseSample, b: MouseSample, c: MouseSample): number {
  const v1x = b.x - a.x, v1y = b.y - a.y;
  const v2x = c.x - b.x, v2y = c.y - b.y;
  const dot = v1x * v2x + v1y * v2y;
  const cross = v1x * v2y - v1y * v2x;
  return Math.abs(Math.atan2(cross, dot));
}

function mean(arr: number[]): number {
  if (arr.length === 0) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}

function stddev(arr: number[]): number {
  if (arr.length < 2) return 0;
  const m = mean(arr);
  return Math.sqrt(arr.reduce((acc, v) => acc + (v - m) ** 2, 0) / arr.length);
}

// ---------------------------------------------------------------------------
// Feature computation
// ---------------------------------------------------------------------------

function computeFeatures(
  clickTimestamps: number[],
  uniqueTilesClicked: Set<number>,
  verifyAttempts: number,
  mistakes: number,
  blurCount: number,
  resetCount: number,
  startTime: number | null,
  endTime: number | null,
  mousePath: MouseSample[],
  clickPositions: { x: number; y: number; tileCenterX: number; tileCenterY: number }[],
  pausesBeforeClicks: number[],
): Features {
  const safeStart = startTime ?? 0;
  const safeEnd = endTime ?? safeStart;
  const timeMs = Math.round(Math.max(0, safeEnd - safeStart));

  const deltas: number[] = [];
  for (let i = 1; i < clickTimestamps.length; i++) {
    deltas.push(Math.max(0, clickTimestamps[i] - clickTimestamps[i - 1]));
  }

  let avgDelta = 0;
  let stdDelta = 0;
  let hesitations = 0;
  if (deltas.length > 0) {
    avgDelta = mean(deltas);
    stdDelta = stddev(deltas);
    hesitations = deltas.filter((d) => d > HESITATION_THRESHOLD_MS).length;
  }

  // --- Mouse movement features ---
  let pathLen = 0;
  const speeds: number[] = [];
  const accelerations: number[] = [];
  const angles: number[] = [];
  let directionChanges = 0;
  let microCorrections = 0;

  for (let i = 1; i < mousePath.length; i++) {
    const d = ptDist(mousePath[i - 1], mousePath[i]);
    const dt = Math.max(1, mousePath[i].t - mousePath[i - 1].t);
    pathLen += d;
    speeds.push((d / dt) * 1000);
  }

  for (let i = 1; i < speeds.length; i++) {
    const dt = Math.max(1, (mousePath[i + 1]?.t ?? mousePath[i].t) - mousePath[i].t || 1);
    accelerations.push(Math.abs(speeds[i] - speeds[i - 1]) / dt * 1000);
  }

  for (let i = 1; i < mousePath.length - 1; i++) {
    const angle = angleBetween(mousePath[i - 1], mousePath[i], mousePath[i + 1]);
    angles.push(angle);
    if (angle > Math.PI / 6) directionChanges++;
    if (angle > Math.PI / 4 && ptDist(mousePath[i - 1], mousePath[i]) < 15) {
      microCorrections++;
    }
  }

  const angularVelocities: number[] = [];
  for (let i = 0; i < angles.length; i++) {
    const dt = Math.max(1, mousePath[i + 1].t - mousePath[i].t);
    angularVelocities.push(angles[i] / dt * 1000);
  }

  let clickPrecision = 0;
  if (clickPositions.length > 0) {
    const dists = clickPositions.map((cp) =>
      Math.sqrt((cp.x - cp.tileCenterX) ** 2 + (cp.y - cp.tileCenterY) ** 2),
    );
    clickPrecision = mean(dists);
  }

  // Per-segment straightness: for each pair of clicks, measure how direct the
  // mouse path was between them. Bots go nearly straight (ratio ~1.0 = 1000),
  // humans wander (ratio ~0.2-0.5 = 200-500).
  let pathStraightness = 0;
  let movementEfficiency = 500;
  if (clickTimestamps.length >= 2 && mousePath.length >= 2) {
    const segmentRatios: number[] = [];
    for (let c = 1; c < clickTimestamps.length; c++) {
      const tStart = clickTimestamps[c - 1];
      const tEnd = clickTimestamps[c];
      const segSamples = mousePath.filter((s) => s.t >= tStart - 50 && s.t <= tEnd + 50);
      if (segSamples.length >= 2) {
        let segLen = 0;
        for (let j = 1; j < segSamples.length; j++) {
          segLen += ptDist(segSamples[j - 1], segSamples[j]);
        }
        const directLen = ptDist(segSamples[0], segSamples[segSamples.length - 1]);
        if (segLen > 0) {
          segmentRatios.push(directLen / segLen);
        }
      }
    }
    if (segmentRatios.length > 0) {
      pathStraightness = Math.round(mean(segmentRatios) * 1000);
      movementEfficiency = Math.round((1 - mean(segmentRatios)) * 1000);
    }
  } else if (mousePath.length >= 2) {
    const directDist = ptDist(mousePath[0], mousePath[mousePath.length - 1]);
    if (pathLen > 0) {
      pathStraightness = Math.round((directDist / pathLen) * 1000);
      movementEfficiency = Math.round((1 - directDist / pathLen) * 1000);
    }
  }

  const velocityConsistency =
    speeds.length > 1
      ? Math.round((1 - Math.min(1, stddev(speeds) / (mean(speeds) || 1))) * 1000)
      : 500;

  const avgPauseBeforeClick = mean(pausesBeforeClicks);

  const clamp = (name: FeatureName, v: number) =>
    Math.round(clampVal(v, ...FEATURE_CLAMPS[name]));

  return {
    time_ms: clamp("time_ms", timeMs),
    click_count: clamp("click_count", clickTimestamps.length),
    unique_tiles_clicked: clamp("unique_tiles_clicked", uniqueTilesClicked.size),
    verify_attempts: clamp("verify_attempts", verifyAttempts),
    mistakes: clamp("mistakes", mistakes),
    avg_click_delta_ms: clamp("avg_click_delta_ms", avgDelta),
    std_click_delta_ms: clamp("std_click_delta_ms", stdDelta),
    hesitations: clamp("hesitations", hesitations),
    blur_count: clamp("blur_count", blurCount),
    reset_count: clamp("reset_count", resetCount),
    path_len_px: clamp("path_len_px", pathLen),
    avg_speed: clamp("avg_speed", mean(speeds)),
    speed_std: clamp("speed_std", stddev(speeds)),
    avg_acceleration: clamp("avg_acceleration", mean(accelerations)),
    acc_std: clamp("acc_std", stddev(accelerations)),
    curvature: clamp("curvature", angles.reduce((a, b) => a + b, 0) * 100),
    direction_changes: clamp("direction_changes", directionChanges),
    click_precision_px: clamp("click_precision_px", clickPrecision),
    path_straightness: clamp("path_straightness", pathStraightness),
    movement_efficiency: clamp("movement_efficiency", movementEfficiency),
    micro_corrections: clamp("micro_corrections", microCorrections),
    velocity_consistency: clamp("velocity_consistency", velocityConsistency),
    pause_before_click_ms: clamp("pause_before_click_ms", avgPauseBeforeClick),
    angular_velocity_std: clamp("angular_velocity_std", stddev(angularVelocities) * 100),
  };
}

function runModel(features: Features): { score: number; label: "HUMAN" | "BOT" } {
  const score = FEATURE_ORDER.reduce(
    (acc, name, i) => acc + WEIGHTS[i] * features[name],
    BIAS,
  );
  return { score: Math.round(score), label: score >= THRESHOLD ? "HUMAN" : "BOT" };
}

// ---------------------------------------------------------------------------
// Bot path generation: constant-speed straight lines with sub-pixel jitter.
// Looks like a cursor moving but the telltale signs are:
//   - perfectly straight trajectory (high path_straightness)
//   - constant velocity (high velocity_consistency)
//   - no direction changes or micro-corrections
//   - near-zero click offset from tile center
// ---------------------------------------------------------------------------

function generateBotPath(
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  durationMs: number,
): MouseSample[] {
  const steps = Math.max(12, Math.round(durationMs / MOUSE_SAMPLE_INTERVAL_MS));
  const path: MouseSample[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;

    const x = startX + (endX - startX) * t + (Math.random() - 0.5) * 0.15;
    const y = startY + (endY - startY) * t + (Math.random() - 0.5) * 0.15;

    path.push({ x, y, t: i * MOUSE_SAMPLE_INTERVAL_MS });
  }

  return path;
}

// ---------------------------------------------------------------------------
// SVG pattern renderers (48x48 viewBox)
// ---------------------------------------------------------------------------

function PatternIcon({ type }: { type: PatternType }) {
  const size = 48;
  const half = size / 2;
  switch (type) {
    case "circle":
      return (
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full drop-shadow-sm">
          <defs>
            <radialGradient id="cg" cx="40%" cy="35%"><stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#2563eb" /></radialGradient>
          </defs>
          <circle cx={half} cy={half} r={16} fill="url(#cg)" />
          <circle cx={half - 4} cy={half - 5} r={4} fill="white" opacity={0.25} />
        </svg>
      );
    case "triangle":
      return (
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full drop-shadow-sm">
          <defs>
            <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#d97706" /></linearGradient>
          </defs>
          <polygon points="24,6 42,42 6,42" fill="url(#tg)" />
          <polygon points="24,14 34,38 14,38" fill="white" opacity={0.12} />
        </svg>
      );
    case "plus":
      return (
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full drop-shadow-sm">
          <defs>
            <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#34d399" /><stop offset="100%" stopColor="#059669" /></linearGradient>
          </defs>
          <rect x={18} y={6} width={12} height={36} rx={3} fill="url(#pg)" />
          <rect x={6} y={18} width={36} height={12} rx={3} fill="url(#pg)" />
        </svg>
      );
    case "waves":
      return (
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full drop-shadow-sm">
          <path d="M6 16 Q14 8 24 16 Q34 24 42 16" fill="none" stroke="#8b5cf6" strokeWidth={3.5} strokeLinecap="round" />
          <path d="M6 26 Q14 18 24 26 Q34 34 42 26" fill="none" stroke="#7c3aed" strokeWidth={3.5} strokeLinecap="round" />
          <path d="M6 36 Q14 28 24 36 Q34 44 42 36" fill="none" stroke="#6d28d9" strokeWidth={3.5} strokeLinecap="round" />
        </svg>
      );
    case "stripes":
      return (
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full drop-shadow-sm">
          {[10, 18, 26, 34].map((y, i) => (
            <rect key={y} x={6} y={y} width={36} height={4} rx={2} fill={i % 2 === 0 ? "#ef4444" : "#dc2626"} />
          ))}
        </svg>
      );
    case "star":
      return (
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full drop-shadow-sm">
          <defs>
            <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f472b6" /><stop offset="100%" stopColor="#db2777" /></linearGradient>
          </defs>
          <polygon points="24,4 29,18 44,18 32,27 36,42 24,33 12,42 16,27 4,18 19,18" fill="url(#sg)" />
          <polygon points="24,10 27,18 35,18 29,23 31,32 24,27 17,32 19,23 13,18 21,18" fill="white" opacity={0.15} />
        </svg>
      );
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const INITIAL_SEED = 42;

export default function CaptchaPage() {
  const router = useRouter();
  const [puzzleSeed, setPuzzleSeed] = useState(INITIAL_SEED);
  const [puzzle, setPuzzle] = useState<Puzzle>(() => generatePuzzle(INITIAL_SEED));
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [simulateBot, setSimulateBot] = useState(false);
  const [statusText, setStatusText] = useState(
    "Select all boxes containing the target pattern, then press Verify.",
  );
  const [features, setFeatures] = useState<Features>(ZERO_FEATURES);
  const [modelScore, setModelScore] = useState(0);
  const [modelLabel, setModelLabel] = useState<"HUMAN" | "BOT">("BOT");
  const [solved, setSolved] = useState(false);
  const [verified, setVerified] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [incorrectTiles, setIncorrectTiles] = useState<Set<number>>(new Set());
  const [missedTiles, setMissedTiles] = useState<Set<number>>(new Set());
  const [zkProving, setZkProving] = useState(false);
  const [zkVerified, setZkVerified] = useState<boolean | null>(null);
  const [zkError, setZkError] = useState<string | null>(null);

  const [botCursorPos, setBotCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [botCursorVisible, setBotCursorVisible] = useState(false);

  const clickTimestampsRef = useRef<number[]>([]);
  const uniqueTilesRef = useRef<Set<number>>(new Set());
  const verifyAttemptsRef = useRef(0);
  const mistakesRef = useRef(0);
  const blurCountRef = useRef(0);
  const resetCountRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const botTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const botRafRef = useRef<number[]>([]);

  const mousePathRef = useRef<MouseSample[]>([]);
  const clickPositionsRef = useRef<{ x: number; y: number; tileCenterX: number; tileCenterY: number }[]>([]);
  const pausesBeforeClicksRef = useRef<number[]>([]);
  const lastMoveTimeRef = useRef<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const refreshFeatures = useCallback(
    (endTime: number | null) => {
      const f = computeFeatures(
        clickTimestampsRef.current,
        uniqueTilesRef.current,
        verifyAttemptsRef.current,
        mistakesRef.current,
        blurCountRef.current,
        resetCountRef.current,
        startTimeRef.current,
        endTime,
        mousePathRef.current,
        clickPositionsRef.current,
        pausesBeforeClicksRef.current,
      );
      const m = runModel(f);
      setFeatures(f);
      setModelScore(m.score);
      setModelLabel(m.label);
      return { features: f, model: m };
    },
    [],
  );

  const tileClickRef = useRef<(index: number, clickX?: number, clickY?: number) => void>(() => {});
  const verifyRef = useRef<() => void>(() => {});

  const clearBotTimers = () => {
    botTimersRef.current.forEach(clearTimeout);
    botTimersRef.current = [];
    botRafRef.current.forEach(cancelAnimationFrame);
    botRafRef.current = [];
  };

  const resetTelemetry = () => {
    clickTimestampsRef.current = [];
    uniqueTilesRef.current = new Set();
    verifyAttemptsRef.current = 0;
    mistakesRef.current = 0;
    startTimeRef.current = null;
    activeRef.current = false;
    mousePathRef.current = [];
    clickPositionsRef.current = [];
    pausesBeforeClicksRef.current = [];
    lastMoveTimeRef.current = null;
  };

  const newPuzzle = useCallback(() => {
    clearBotTimers();
    setBotCursorVisible(false);
    setBotCursorPos(null);
    const seed = Date.now();
    const p = generatePuzzle(seed);
    setPuzzleSeed(seed);
    setPuzzle(p);
    setSelected(new Set());
    setSolved(false);
    setVerified(false);
    setIncorrectTiles(new Set());
    setMissedTiles(new Set());
    resetCountRef.current += 1;
    resetTelemetry();
    setStatusText(
      "Select all boxes containing the target pattern, then press Verify.",
    );
    refreshFeatures(null);
  }, [refreshFeatures]);

  // --- Mouse tracking for human interaction ---
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || simulateBot) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!activeRef.current && startTimeRef.current === null) return;
      const now = performance.now();
      const rect = grid.getBoundingClientRect();
      mousePathRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        t: now,
      });
      lastMoveTimeRef.current = now;
    };

    grid.addEventListener("mousemove", handleMouseMove);
    return () => grid.removeEventListener("mousemove", handleMouseMove);
  }, [simulateBot]);

  const getTileCenter = useCallback((index: number): { x: number; y: number } | null => {
    const grid = gridRef.current;
    if (!grid) return null;
    const tile = grid.children[index] as HTMLElement | undefined;
    if (!tile) return null;
    const gridRect = grid.getBoundingClientRect();
    const tileRect = tile.getBoundingClientRect();
    return {
      x: tileRect.left - gridRect.left + tileRect.width / 2,
      y: tileRect.top - gridRect.top + tileRect.height / 2,
    };
  }, []);

  const handleTileClick = useCallback(
    (index: number, clickX?: number, clickY?: number) => {
      if (solved && verified) return;

      if (incorrectTiles.size > 0 || missedTiles.size > 0) {
        setIncorrectTiles(new Set());
        setMissedTiles(new Set());
        setStatusText("Select all boxes containing the target pattern, then press Verify.");
      }

      const now = performance.now();
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
        activeRef.current = true;
      }
      clickTimestampsRef.current.push(now);
      uniqueTilesRef.current.add(index);

      if (lastMoveTimeRef.current !== null) {
        pausesBeforeClicksRef.current.push(now - lastMoveTimeRef.current);
      }

      const center = getTileCenter(index);
      if (center && clickX !== undefined && clickY !== undefined) {
        clickPositionsRef.current.push({
          x: clickX,
          y: clickY,
          tileCenterX: center.x,
          tileCenterY: center.y,
        });
      } else if (center) {
        const offset = 5 + Math.random() * 15;
        const angle = Math.random() * Math.PI * 2;
        clickPositionsRef.current.push({
          x: center.x + Math.cos(angle) * offset,
          y: center.y + Math.sin(angle) * offset,
          tileCenterX: center.x,
          tileCenterY: center.y,
        });
      }

      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });

      refreshFeatures(now);
    },
    [solved, verified, refreshFeatures, getTileCenter, incorrectTiles, missedTiles],
  );

  const handleHumanTileClick = useCallback(
    (index: number, e: React.MouseEvent) => {
      const grid = gridRef.current;
      if (!grid) return handleTileClick(index);
      const rect = grid.getBoundingClientRect();
      handleTileClick(index, e.clientX - rect.left, e.clientY - rect.top);
    },
    [handleTileClick],
  );

  const handleVerify = useCallback(() => {
    if (solved && verified) return;

    const now = performance.now();
    verifyAttemptsRef.current += 1;

    const falsePositives = new Set([...selected].filter((i) => !puzzle.targetIndices.has(i)));
    const falseNegatives = new Set([...puzzle.targetIndices].filter((i) => !selected.has(i)));
    mistakesRef.current += falsePositives.size + falseNegatives.size;

    const correct = falsePositives.size === 0 && falseNegatives.size === 0;

    if (!correct && !simulateBot) {
      setIncorrectTiles(falsePositives);
      setMissedTiles(falseNegatives);
      refreshFeatures(now);
      setStatusText("Incorrect — please try again.");
      return;
    }

    setIncorrectTiles(new Set());
    setMissedTiles(new Set());
    setSolved(true);
    setVerified(true);

    const { features: f, model } = refreshFeatures(now);

    if (simulateBot) {
      setModelLabel("BOT");
      setStatusText("Correct selection — but classified as BOT.");
      setFeatures(f);
      setModelScore(model.score);
    } else {
      setModelLabel("HUMAN");
      setStatusText("Generating ZK proof...");
      setFeatures(f);
      setModelScore(model.score);

      // --- ZK proof generation + backend validation ---
      setZkProving(true);
      setZkVerified(null);
      setZkError(null);

      (async () => {
        const proofResult = await generateProof(model.score);
        if (!proofResult.success) {
          setZkProving(false);
          setZkError(proofResult.message);
          setStatusText(`ZK proof failed: ${proofResult.message}`);
          return;
        }

        setStatusText("ZK proof generated. Validating on server...");

        const validation = await submitProofForValidation(
          proofResult.proof,
          proofResult.publicSignals,
        );

        setZkProving(false);

        if (validation.ok && validation.verified) {
          setZkVerified(true);
          setStatusText("Verified as HUMAN — ZK proof validated on server.");
        } else {
          setZkVerified(false);
          setZkError(validation.error ?? "Server rejected proof");
          setStatusText("ZK proof rejected by server.");
        }
      })();
    }
  }, [selected, puzzle, solved, verified, refreshFeatures, simulateBot]);

  useEffect(() => {
    tileClickRef.current = handleTileClick;
  }, [handleTileClick]);

  useEffect(() => {
    verifyRef.current = handleVerify;
  }, [handleVerify]);

  // ---------------------------------------------------------------------------
  // Smart bot simulation
  // ---------------------------------------------------------------------------
  const startBotSimulation = useCallback(() => {
    clearBotTimers();
    const seed = Date.now();
    const p = generatePuzzle(seed);
    setPuzzleSeed(seed);
    setPuzzle(p);
    setSelected(new Set());
    setSolved(false);
    setVerified(false);
    resetTelemetry();
    resetCountRef.current = 0;
    setStatusText("Smart bot analyzing puzzle and moving cursor...");
    refreshFeatures(null);

    const targetTiles = [...p.targetIndices];

    const scheduleAfterMount = setTimeout(() => {
      setBotCursorVisible(true);

      const gridEl = gridRef.current;
      if (!gridEl) return;
      const gridRect = gridEl.getBoundingClientRect();

      const getCenterOf = (idx: number) => {
        const tile = gridEl.children[idx] as HTMLElement | undefined;
        if (!tile) return { x: gridRect.width / 2, y: gridRect.height / 2 };
        const r = tile.getBoundingClientRect();
        return {
          x: r.left - gridRect.left + r.width / 2,
          y: r.top - gridRect.top + r.height / 2,
        };
      };

      let curX = gridRect.width / 2;
      let curY = -20;
      let totalDelay = 0;
      const baseTime = performance.now();

      startTimeRef.current = baseTime;
      activeRef.current = true;

      targetTiles.forEach((tileIdx) => {
        const moveDuration = 220 + Math.random() * 60;
        const pauseBeforeClick = 30 + Math.random() * 30;
        const stepStart = totalDelay;

        const fromX = curX;
        const fromY = curY;

        const timer = setTimeout(() => {
          const target = getCenterOf(tileIdx);
          const botPath = generateBotPath(fromX, fromY, target.x, target.y, moveDuration);

          const animStart = performance.now();

          botPath.forEach((sample) => {
            mousePathRef.current.push({
              x: sample.x,
              y: sample.y,
              t: animStart + sample.t,
            });
          });

          const totalPathTime = botPath[botPath.length - 1].t;
          const animate = () => {
            const elapsed = performance.now() - animStart;
            if (elapsed >= totalPathTime) {
              setBotCursorPos({ x: botPath[botPath.length - 1].x, y: botPath[botPath.length - 1].y });
              return;
            }
            const frac = elapsed / totalPathTime;
            const idx = Math.min(Math.floor(frac * botPath.length), botPath.length - 1);
            setBotCursorPos({ x: botPath[idx].x, y: botPath[idx].y });
            const raf = requestAnimationFrame(animate);
            botRafRef.current.push(raf);
          };
          const raf = requestAnimationFrame(animate);
          botRafRef.current.push(raf);

          const clickTimer = setTimeout(() => {
            const center = getCenterOf(tileIdx);
            const clickX = center.x + (Math.random() - 0.5) * 1.5;
            const clickY = center.y + (Math.random() - 0.5) * 1.5;
            setBotCursorPos({ x: clickX, y: clickY });
            lastMoveTimeRef.current = performance.now() - pauseBeforeClick;
            tileClickRef.current(tileIdx, clickX, clickY);
          }, moveDuration + pauseBeforeClick);
          botTimersRef.current.push(clickTimer);
        }, 300 + stepStart);
        botTimersRef.current.push(timer);

        const tgt = getCenterOf(tileIdx);
        curX = tgt.x;
        curY = tgt.y;
        totalDelay += moveDuration + pauseBeforeClick + BOT_STEP_INTERVAL_MS;
      });

      const verifyDelay = totalDelay + 200;
      const verifyTimer = setTimeout(() => {
        setBotCursorVisible(false);
        verifyRef.current();
      }, 300 + verifyDelay);
      botTimersRef.current.push(verifyTimer);
    }, 100);
    botTimersRef.current.push(scheduleAfterMount);
  }, [refreshFeatures]);

  const handleSimulationToggle = useCallback(
    (next: boolean) => {
      setSimulateBot(next);
      if (next) {
        startBotSimulation();
      } else {
        clearBotTimers();
        setBotCursorVisible(false);
        setBotCursorPos(null);
        newPuzzle();
      }
    },
    [startBotSimulation, newPuzzle],
  );

  const buildPayload = useCallback(() => {
    return {
      puzzle_id: puzzle.id,
      puzzle_seed: puzzleSeed,
      target_pattern: puzzle.target,
      features,
      model: {
        bias: BIAS,
        threshold: THRESHOLD,
        feature_order: FEATURE_ORDER,
        weights: WEIGHTS,
      },
      score: modelScore,
      label: modelLabel,
      solved,
      timestamp_ms: Date.now(),
    };
  }, [puzzle, puzzleSeed, features, modelScore, modelLabel, solved]);

  const handleCopyPayload = useCallback(async () => {
    const payload = buildPayload();
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [buildPayload]);

  useEffect(() => {
    const seed = Date.now();
    const p = generatePuzzle(seed);
    setPuzzleSeed(seed);
    setPuzzle(p);
    setMounted(true);
  }, []);

  useEffect(() => {
    const onBlur = () => {
      if (activeRef.current) blurCountRef.current += 1;
    };
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onBlur);
    return () => {
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onBlur);
    };
  }, []);

  useEffect(() => {
    return () => clearBotTimers();
  }, []);

  const contributions = FEATURE_ORDER.map((name, i) => ({
    name,
    weight: WEIGHTS[i],
    value: features[name],
    contribution: Math.round(WEIGHTS[i] * features[name]),
  }));

  const redirectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current); };
  }, []);

  useEffect(() => {
    if (verified && solved && modelLabel === "HUMAN") {
      // redirectTimerRef.current = setTimeout(() => router.push("/"), 2500);
      // Removing auto-redirect for easier testing and exploration of results
    }
  }, [verified, solved, modelLabel, router]);

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white">
        <Link href="/" className="mb-6 text-2xl font-extrabold tracking-tight text-gray-900">
          <span className="text-orange-400">Velo</span>Cart
        </Link>
        <div className="w-[340px] rounded-sm border border-gray-300 bg-white shadow-lg">
          <div className="bg-[#4a90d9] px-5 pb-5 pt-6">
            <p className="text-sm text-white/80">Loading security check...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      {/* VeloCart header */}
      <div className="flex justify-center pb-2 pt-6">
        <Link href="/" className="text-2xl font-extrabold tracking-tight text-gray-900">
          <span className="text-orange-400">Velo</span>Cart
        </Link>
      </div>
      <p className="mb-6 text-center text-sm text-gray-500">Complete a security check to continue</p>

      <div className="mx-auto flex flex-col items-center gap-6 px-4 lg:flex-row lg:items-start lg:gap-8">
        {/* ---- CAPTCHA widget ---- */}
        <div className="w-[340px] select-none overflow-hidden rounded-lg border border-gray-300 bg-white shadow-lg">
          {/* Header */}
          <div className={`px-5 pb-4 pt-5 transition-colors duration-300 ${
            incorrectTiles.size > 0 || missedTiles.size > 0
              ? "bg-red-500"
              : verified && solved
                ? modelLabel === "HUMAN" ? "bg-emerald-600" : "bg-red-500"
                : "bg-[#4a90d9]"
          }`}>
            {incorrectTiles.size > 0 || missedTiles.size > 0 ? (
              <>
                <h2 className="text-[22px] font-bold leading-tight text-white">Incorrect</h2>
                <p className="mt-1 text-[13px] text-white/90">Please try again.</p>
              </>
            ) : verified && solved ? (
              <>
                <h2 className="text-[22px] font-bold leading-tight text-white">
                  {modelLabel === "HUMAN" ? "Verified" : "Classified as Bot"}
                </h2>
                <p className="mt-1 text-[13px] text-white/90">
                  {modelLabel === "HUMAN"
                    ? "You have been verified as human. Redirecting..."
                    : "Your behavior was classified as automated."}
                </p>
              </>
            ) : (
              <>
                <p className="text-[13px] leading-snug text-white/80">Select all squares with</p>
                <h2 className="mt-0.5 text-[28px] font-bold leading-tight text-white capitalize">{puzzle.target}s</h2>
                <p className="mt-1 text-[13px] text-white/70">If there are none, click skip</p>
              </>
            )}
          </div>

          {/* Grid */}
          <div className="relative">
            <div ref={gridRef} className="grid grid-cols-4 gap-[2px] bg-gray-200 p-[2px]">
              {puzzle.tiles.map((pattern, i) => {
                const isSelected = selected.has(i);
                const isWrong = incorrectTiles.has(i);
                const isMissed = missedTiles.has(i);
                const hasError = isWrong || isMissed;
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={simulateBot}
                    onClick={(e) => handleHumanTileClick(i, e)}
                    className={`relative flex aspect-square items-center justify-center transition-all duration-150 ${
                      hasError
                        ? "bg-red-50 ring-2 ring-inset ring-red-500"
                        : isSelected
                          ? "scale-[0.92] bg-blue-50 ring-[3px] ring-inset ring-blue-500"
                          : "bg-white hover:bg-slate-50 hover:brightness-95"
                    } ${simulateBot ? "cursor-not-allowed" : "cursor-pointer active:scale-95"}`}
                  >
                    <div className="flex h-full w-full items-center justify-center p-2">
                      <PatternIcon type={pattern} />
                    </div>
                    {isSelected && !hasError && (
                      <div className="absolute bottom-1 left-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 shadow">
                        <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                    {isWrong && (
                      <div className="absolute bottom-1 left-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 shadow">
                        <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    )}
                    {isMissed && (
                      <div className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500/80 shadow">
                        <span className="text-[10px] font-bold text-white">!</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bot cursor overlay */}
            {botCursorVisible && botCursorPos && (
              <div
                className="pointer-events-none absolute z-50"
                style={{
                  left: botCursorPos.x - 4,
                  top: botCursorPos.y - 4,
                  transition: "left 0.016s linear, top 0.016s linear",
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 3L10.5 21L13 13L21 10.5L3 3Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
                <span className="absolute -right-8 -top-1 rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow">BOT</span>
              </div>
            )}
          </div>

          {/* Bottom toolbar */}
          <div className="flex items-center justify-between border-t border-gray-200 bg-[#f9f9f9] px-3 py-2.5">
            <div className="flex items-center gap-3">
              <button type="button" onClick={newPuzzle} className="flex h-7 w-7 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-200 hover:text-gray-700" title="Get a new challenge">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
              <button type="button" className="flex h-7 w-7 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-200 hover:text-gray-700" title="Get an audio challenge">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              </button>
              <button type="button" className="flex h-7 w-7 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-200 hover:text-gray-700" title="Help">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </button>
              <label className="ml-1 flex cursor-pointer items-center gap-1.5" title="Toggle bot simulation">
                <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-400 accent-blue-600" checked={simulateBot} onChange={(e) => handleSimulationToggle(e.target.checked)} />
                <span className="text-[11px] font-medium text-gray-500">Bot</span>
              </label>
            </div>
            <button type="button" onClick={handleVerify} disabled={simulateBot} className="rounded-sm bg-[#4a90d9] px-5 py-1.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition hover:bg-[#3d7ec7] disabled:cursor-not-allowed disabled:opacity-50">
              Verify
            </button>
          </div>
        </div>

        {/* ---- Developer Tools panel ---- */}
        <div className="w-full max-w-md pb-10 lg:w-[420px]">
          {verified && solved && (
            <div className={`mb-4 rounded-lg px-5 py-4 ${modelLabel === "HUMAN" ? "border border-emerald-200 bg-emerald-50" : "border border-rose-200 bg-rose-50"}`}>
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-lg ${modelLabel === "HUMAN" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"}`}>
                  {modelLabel === "HUMAN" ? "\u2713" : "\u2717"}
                </div>
                <div>
                  <p className={`text-lg font-bold ${modelLabel === "HUMAN" ? "text-emerald-800" : "text-rose-800"}`}>
                    {modelLabel === "HUMAN" ? "Verified Human" : "Classified as Bot"}
                  </p>
                  <p className="text-sm text-gray-600">Score: {modelScore}</p>
                </div>
              </div>
            </div>
          )}

          <details className="group rounded-lg border border-gray-200 bg-white shadow-sm">
            <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-gray-700">
              Developer Tools &mdash; Model Analysis
              <span className="ml-1 text-xs font-normal text-gray-400">(score: {modelScore}, label: {modelLabel})</span>
            </summary>
            <div className="border-t border-gray-100">
              <div className="max-h-[420px] overflow-auto">
                <table className="min-w-full text-xs">
                  <thead className="sticky top-0 bg-gray-50 text-left text-gray-600">
                    <tr>
                      <th className="px-3 py-1.5 font-semibold">Feature</th>
                      <th className="px-3 py-1.5 text-right font-semibold">Val</th>
                      <th className="px-3 py-1.5 text-right font-semibold">W</th>
                      <th className="px-3 py-1.5 text-right font-semibold">W*X</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contributions.map((row) => (
                      <tr key={row.name} className="border-t border-gray-50">
                        <td className="px-3 py-1 font-mono text-[10px]">{row.name}</td>
                        <td className="px-3 py-1 text-right tabular-nums">{row.value}</td>
                        <td className="px-3 py-1 text-right tabular-nums text-gray-400">{row.weight}</td>
                        <td className={`px-3 py-1 text-right tabular-nums font-medium ${row.contribution > 0 ? "text-emerald-600" : row.contribution < 0 ? "text-rose-600" : ""}`}>
                          {row.contribution > 0 ? "+" : ""}{row.contribution}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t border-gray-200 bg-gray-50 font-semibold">
                      <td className="px-3 py-1.5">Bias</td><td /><td /><td className="px-3 py-1.5 text-right">{BIAS}</td>
                    </tr>
                    <tr className="border-t border-gray-300 bg-gray-100 font-bold text-sm">
                      <td className="px-3 py-2">Total</td><td /><td /><td className={`px-3 py-2 text-right ${modelScore >= 0 ? "text-emerald-700" : "text-rose-700"}`}>{modelScore}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-2 border-t border-gray-100 px-4 py-2">
                <details>
                  <summary className="cursor-pointer text-[10px] font-medium text-gray-400 hover:text-gray-600">JSON</summary>
                  <pre className="mt-1 max-h-32 overflow-auto rounded bg-gray-50 p-2 text-[10px] leading-relaxed text-gray-600">{JSON.stringify(features, null, 2)}</pre>
                </details>
                <div className="ml-auto">
                  <button type="button" onClick={handleCopyPayload} className="rounded border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-medium text-gray-500 hover:bg-gray-50">
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </details>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <div className="mx-auto mt-8 h-px w-full max-w-[600px] bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
        <div className="flex justify-center gap-6 py-3 text-[11px] text-cyan-700">
          <span className="cursor-pointer hover:text-orange-700 hover:underline">Conditions of Use</span>
          <span className="cursor-pointer hover:text-orange-700 hover:underline">Privacy Notice</span>
          <span className="cursor-pointer hover:text-orange-700 hover:underline">Help</span>
        </div>
        <p className="pb-4 text-center text-[11px] text-gray-500">&copy; 2026 VeloCart, Inc. or its affiliates.</p>
      </div>
    </div>
  );
}
