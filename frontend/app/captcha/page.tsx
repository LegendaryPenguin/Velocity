"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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
  | "reset_count";

type Features = Record<FeatureName, number>;

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PATTERN_TYPES: PatternType[] = [
  "circle",
  "triangle",
  "plus",
  "waves",
  "stripes",
  "star",
];

const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const MIN_TARGETS = 4;
const MAX_TARGETS = 7;
const HESITATION_THRESHOLD_MS = 1200;
const BOT_CLICK_INTERVAL_MS = 120;

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
];

const WEIGHTS = [
   1,     // time_ms: humans take longer, positive signal
  -10,    // click_count: more clicks = more indecision
   60,    // unique_tiles_clicked: humans explore more tiles
  -300,   // verify_attempts: multiple attempts = suspicious
  -80,    // mistakes: more mistakes = worse
   2,     // avg_click_delta_ms: humans have longer gaps
   8,     // std_click_delta_ms: humans have variable timing
  150,    // hesitations: humans pause to think
  -500,   // blur_count: tab-switching is suspicious
  -200,   // reset_count: many resets = suspicious
];
const BIAS = -2000;
const THRESHOLD = 0;

const ZERO_FEATURES: Features = {
  time_ms: 0,
  click_count: 0,
  unique_tiles_clicked: 0,
  verify_attempts: 0,
  mistakes: 0,
  avg_click_delta_ms: 0,
  std_click_delta_ms: 0,
  hesitations: 0,
  blur_count: 0,
  reset_count: 0,
};

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
// Helpers
// ---------------------------------------------------------------------------

function clampInt(value: number, min: number, max: number): number {
  return Math.trunc(Math.max(min, Math.min(max, value)));
}

function computeFeatures(
  clickTimestamps: number[],
  uniqueTilesClicked: Set<number>,
  verifyAttempts: number,
  mistakes: number,
  blurCount: number,
  resetCount: number,
  startTime: number | null,
  endTime: number | null,
): Features {
  const safeStart = startTime ?? 0;
  const safeEnd = endTime ?? safeStart;
  const timeMs = clampInt(
    Math.round(Math.max(0, safeEnd - safeStart)),
    ...FEATURE_CLAMPS.time_ms,
  );

  const deltas: number[] = [];
  for (let i = 1; i < clickTimestamps.length; i++) {
    deltas.push(Math.max(0, clickTimestamps[i] - clickTimestamps[i - 1]));
  }

  let avgDelta = 0;
  let stdDelta = 0;
  let hesitations = 0;
  if (deltas.length > 0) {
    avgDelta = deltas.reduce((a, b) => a + b, 0) / deltas.length;
    const variance =
      deltas.reduce((acc, d) => acc + (d - avgDelta) ** 2, 0) / deltas.length;
    stdDelta = Math.sqrt(variance);
    hesitations = deltas.filter((d) => d > HESITATION_THRESHOLD_MS).length;
  }

  return {
    time_ms: timeMs,
    click_count: clampInt(clickTimestamps.length, ...FEATURE_CLAMPS.click_count),
    unique_tiles_clicked: clampInt(
      uniqueTilesClicked.size,
      ...FEATURE_CLAMPS.unique_tiles_clicked,
    ),
    verify_attempts: clampInt(verifyAttempts, ...FEATURE_CLAMPS.verify_attempts),
    mistakes: clampInt(mistakes, ...FEATURE_CLAMPS.mistakes),
    avg_click_delta_ms: clampInt(
      Math.round(avgDelta),
      ...FEATURE_CLAMPS.avg_click_delta_ms,
    ),
    std_click_delta_ms: clampInt(
      Math.round(stdDelta),
      ...FEATURE_CLAMPS.std_click_delta_ms,
    ),
    hesitations: clampInt(hesitations, ...FEATURE_CLAMPS.hesitations),
    blur_count: clampInt(blurCount, ...FEATURE_CLAMPS.blur_count),
    reset_count: clampInt(resetCount, ...FEATURE_CLAMPS.reset_count),
  };
}

function runModel(features: Features): { score: number; label: "HUMAN" | "BOT" } {
  const score = FEATURE_ORDER.reduce(
    (acc, name, i) => acc + WEIGHTS[i] * features[name],
    BIAS,
  );
  return { score, label: score >= THRESHOLD ? "HUMAN" : "BOT" };
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
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
          <circle cx={half} cy={half} r={16} fill="#3b82f6" opacity={0.85} />
        </svg>
      );
    case "triangle":
      return (
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
          <polygon points="24,6 42,42 6,42" fill="#f59e0b" opacity={0.85} />
        </svg>
      );
    case "plus":
      return (
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
          <rect x={18} y={6} width={12} height={36} rx={2} fill="#10b981" opacity={0.85} />
          <rect x={6} y={18} width={36} height={12} rx={2} fill="#10b981" opacity={0.85} />
        </svg>
      );
    case "waves":
      return (
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
          <path d="M6 16 Q14 8 24 16 Q34 24 42 16" fill="none" stroke="#8b5cf6" strokeWidth={3} />
          <path d="M6 26 Q14 18 24 26 Q34 34 42 26" fill="none" stroke="#8b5cf6" strokeWidth={3} />
          <path d="M6 36 Q14 28 24 36 Q34 44 42 36" fill="none" stroke="#8b5cf6" strokeWidth={3} />
        </svg>
      );
    case "stripes":
      return (
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
          {[10, 18, 26, 34].map((y) => (
            <rect key={y} x={6} y={y} width={36} height={4} rx={1} fill="#ef4444" opacity={0.75} />
          ))}
        </svg>
      );
    case "star":
      return (
        <svg viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
          <polygon
            points="24,4 29,18 44,18 32,27 36,42 24,33 12,42 16,27 4,18 19,18"
            fill="#ec4899"
            opacity={0.85}
          />
        </svg>
      );
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

const INITIAL_SEED = 42;

export default function Home() {
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

  const clickTimestampsRef = useRef<number[]>([]);
  const uniqueTilesRef = useRef<Set<number>>(new Set());
  const verifyAttemptsRef = useRef(0);
  const mistakesRef = useRef(0);
  const blurCountRef = useRef(0);
  const resetCountRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const botTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

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
      );
      const m = runModel(f);
      setFeatures(f);
      setModelScore(m.score);
      setModelLabel(m.label);
      return { features: f, model: m };
    },
    [],
  );

  const tileClickRef = useRef<(index: number) => void>(() => {});
  const verifyRef = useRef<() => void>(() => {});

  const clearBotTimers = () => {
    botTimersRef.current.forEach(clearTimeout);
    botTimersRef.current = [];
  };

  const resetTelemetry = () => {
    clickTimestampsRef.current = [];
    uniqueTilesRef.current = new Set();
    verifyAttemptsRef.current = 0;
    mistakesRef.current = 0;
    startTimeRef.current = null;
    activeRef.current = false;
  };

  const newPuzzle = useCallback(() => {
    clearBotTimers();
    const seed = Date.now();
    const p = generatePuzzle(seed);
    setPuzzleSeed(seed);
    setPuzzle(p);
    setSelected(new Set());
    setSolved(false);
    setVerified(false);
    resetCountRef.current += 1;
    resetTelemetry();
    setStatusText(
      "Select all boxes containing the target pattern, then press Verify.",
    );
    refreshFeatures(null);
  }, [refreshFeatures]);

  const handleTileClick = useCallback(
    (index: number) => {
      if (solved && verified) return;

      const now = performance.now();
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
        activeRef.current = true;
      }
      clickTimestampsRef.current.push(now);
      uniqueTilesRef.current.add(index);

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
    [solved, verified, refreshFeatures],
  );

  const handleVerify = useCallback(() => {
    if (solved && verified) return;

    const now = performance.now();
    verifyAttemptsRef.current += 1;

    const fp = [...selected].filter((i) => !puzzle.targetIndices.has(i)).length;
    const fn = [...puzzle.targetIndices].filter((i) => !selected.has(i)).length;
    mistakesRef.current += fp + fn;

    const correct = fp === 0 && fn === 0;
    setSolved(correct);
    setVerified(true);

    const { model } = refreshFeatures(now);

    if (correct) {
      setStatusText(
        model.label === "HUMAN"
          ? "Correct selection — Verified as HUMAN."
          : "Correct selection — but classified as BOT.",
      );
    } else {
      setStatusText(
        `Incorrect: ${fp} extra, ${fn} missing. Try again.`,
      );
      setVerified(false);
    }
  }, [selected, puzzle, solved, verified, refreshFeatures]);

  useEffect(() => {
    tileClickRef.current = handleTileClick;
  }, [handleTileClick]);

  useEffect(() => {
    verifyRef.current = handleVerify;
  }, [handleVerify]);

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
    setStatusText("Running deterministic bot simulation...");
    refreshFeatures(null);

    const botTiles = [0, 1, 2, 3, 4, 5];
    botTiles.forEach((tileIdx, step) => {
      const timer = setTimeout(() => {
        tileClickRef.current(tileIdx);
      }, (step + 1) * BOT_CLICK_INTERVAL_MS);
      botTimersRef.current.push(timer);
    });

    const verifyTimer = setTimeout(() => {
      verifyRef.current();
    }, (botTiles.length + 1) * BOT_CLICK_INTERVAL_MS);
    botTimersRef.current.push(verifyTimer);
  }, [refreshFeatures]);

  const handleSimulationToggle = useCallback(
    (next: boolean) => {
      setSimulateBot(next);
      if (next) {
        startBotSimulation();
      } else {
        clearBotTimers();
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
    contribution: WEIGHTS[i] * features[name],
  }));

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-100 p-4 text-slate-900">
        <main className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-5xl items-center justify-center">
          <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
            <h1 className="text-2xl font-bold">Verification</h1>
            <p className="mt-4 text-sm text-slate-500">Loading puzzle...</p>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-900">
      <main className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-5xl items-center justify-center">
        <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
          {/* Header */}
          <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold">Verification</h1>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-400"
                  checked={simulateBot}
                  onChange={(e) => handleSimulationToggle(e.target.checked)}
                />
                Simulate Bot
              </label>
              <button
                type="button"
                onClick={newPuzzle}
                className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Reset
              </button>
            </div>
          </header>

          {/* Prompt */}
          <div className="mb-4 rounded-lg bg-blue-600 px-4 py-3 text-white">
            <p className="text-sm font-medium">
              Select all boxes containing:{" "}
              <span className="text-lg font-bold capitalize">{puzzle.target}</span>
            </p>
          </div>

          {/* Status */}
          <p className="mb-4 rounded-lg bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
            {statusText}
          </p>

          {/* Puzzle grid */}
          <div className="mx-auto mb-4 grid max-w-md grid-cols-4 gap-2">
            {puzzle.tiles.map((pattern, i) => {
              const isSelected = selected.has(i);
              return (
                <button
                  key={i}
                  type="button"
                  disabled={simulateBot}
                  onClick={() => handleTileClick(i)}
                  className={`relative flex aspect-square items-center justify-center rounded-lg border-2 p-2 transition ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-slate-100"
                  } ${simulateBot ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
                >
                  <PatternIcon type={pattern} />
                  {isSelected && (
                    <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                      ✓
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Verify button */}
          <div className="mb-4 flex justify-center gap-3">
            <button
              type="button"
              onClick={handleVerify}
              disabled={simulateBot}
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Verify
            </button>
          </div>

          {/* Puzzle metadata */}
          <div className="mb-6 text-center text-xs text-slate-400">
            puzzle_id: {puzzle.id} &middot; puzzle_seed: {puzzleSeed}
          </div>

          {/* Model output + contributions table */}
          <div className="grid gap-6 md:grid-cols-[1fr_1.1fr]">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="mb-2 text-lg font-semibold">Model Output</h2>
              <div className="mb-2 text-sm">
                Score: <span className="font-bold">{modelScore}</span>
              </div>
              <div
                className={`inline-flex rounded-full px-4 py-2 text-xl font-bold tracking-wide ${
                  modelLabel === "HUMAN"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {modelLabel}
              </div>
              {verified && solved && (
                <p
                  className={`mt-3 text-sm font-semibold ${
                    modelLabel === "HUMAN"
                      ? "text-emerald-700"
                      : "text-rose-700"
                  }`}
                >
                  {modelLabel === "HUMAN" ? "Verified" : "Try again"}
                </p>
              )}

              {/* Features JSON */}
              <details className="mt-4">
                <summary className="cursor-pointer text-xs font-medium text-slate-500">
                  Feature vector (JSON)
                </summary>
                <pre className="mt-2 max-h-48 overflow-auto rounded-lg bg-white p-2 text-[11px] leading-relaxed text-slate-700">
                  {JSON.stringify(features, null, 2)}
                </pre>
              </details>

              {/* Copy payload */}
              <button
                type="button"
                onClick={handleCopyPayload}
                className="mt-4 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {copied ? "Copied!" : "Copy payload"}
              </button>

              <p className="mt-4 text-xs text-slate-500">
                Privacy note: raw interaction traces never leave the device.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-100 text-left text-slate-700">
                  <tr>
                    <th className="px-3 py-2 font-semibold">Feature</th>
                    <th className="px-3 py-2 font-semibold">Value</th>
                    <th className="px-3 py-2 font-semibold">Weight</th>
                    <th className="px-3 py-2 font-semibold">w*x</th>
                  </tr>
                </thead>
                <tbody>
                  {contributions.map((row) => (
                    <tr key={row.name} className="border-t border-slate-100">
                      <td className="px-3 py-2 font-mono text-xs">{row.name}</td>
                      <td className="px-3 py-2">{row.value}</td>
                      <td className="px-3 py-2">{row.weight}</td>
                      <td className="px-3 py-2">{row.contribution}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-slate-200 bg-slate-50 font-semibold">
                    <td className="px-3 py-2">Bias</td>
                    <td className="px-3 py-2">-</td>
                    <td className="px-3 py-2">-</td>
                    <td className="px-3 py-2">{BIAS}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
