"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// ============================================================================
// Types
// ============================================================================

type PatternType = "circle" | "triangle" | "plus" | "waves" | "stripes" | "star";

type FeatureName =
  | "time_ms" | "click_count" | "unique_tiles_clicked" | "verify_attempts"
  | "mistakes" | "avg_click_delta_ms" | "std_click_delta_ms" | "hesitations"
  | "blur_count" | "reset_count" | "path_len_px" | "avg_speed" | "speed_std"
  | "avg_acceleration" | "acc_std" | "curvature" | "direction_changes"
  | "click_precision_px" | "path_straightness" | "movement_efficiency"
  | "micro_corrections" | "velocity_consistency" | "pause_before_click_ms"
  | "angular_velocity_std";

type Features = Record<FeatureName, number>;
type MouseSample = { x: number; y: number; t: number };

type ExportedJson = {
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

// ============================================================================
// Constants
// ============================================================================

const PATTERN_TYPES: PatternType[] = ["circle", "triangle", "plus", "waves", "stripes", "star"];
const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;
const MIN_TARGETS = 4;
const MAX_TARGETS = 7;
const HESITATION_THRESHOLD_MS = 1200;
const BOT_STEP_INTERVAL_MS = 180;
const MOUSE_SAMPLE_INTERVAL_MS = 8;

const FEATURE_ORDER: FeatureName[] = [
  "time_ms", "click_count", "unique_tiles_clicked", "verify_attempts",
  "mistakes", "avg_click_delta_ms", "std_click_delta_ms", "hesitations",
  "blur_count", "reset_count", "path_len_px", "avg_speed", "speed_std",
  "avg_acceleration", "acc_std", "curvature", "direction_changes",
  "click_precision_px", "path_straightness", "movement_efficiency",
  "micro_corrections", "velocity_consistency", "pause_before_click_ms",
  "angular_velocity_std",
];

const WEIGHTS: number[] = [
  0.3, -15, 60, -400, -80, 0.8, 2, 200, -500, -250,
  0.05, 0, 0.5, 0, 0, 0, 12, -40, -5, 4,
  40, -5, 1.5, 0,
];

const BIAS = -1500;
const THRESHOLD = 0;

const ZERO_FEATURES: Features = Object.fromEntries(FEATURE_ORDER.map((k) => [k, 0])) as Features;

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

// ============================================================================
// Seeded RNG
// ============================================================================

function mulberry32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ============================================================================
// Puzzle
// ============================================================================

type Puzzle = { seed: number; id: string; target: PatternType; tiles: PatternType[]; targetIndices: Set<number> };

function generatePuzzle(seed: number): Puzzle {
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

// ============================================================================
// Math helpers
// ============================================================================

function clampVal(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }
function ptDist(a: MouseSample, b: MouseSample) { return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2); }
function angleBetween(a: MouseSample, b: MouseSample, c: MouseSample) {
  const v1x = b.x - a.x, v1y = b.y - a.y, v2x = c.x - b.x, v2y = c.y - b.y;
  return Math.abs(Math.atan2(v1x * v2y - v1y * v2x, v1x * v2x + v1y * v2y));
}
function mean(a: number[]) { return a.length === 0 ? 0 : a.reduce((s, v) => s + v, 0) / a.length; }
function stddev(a: number[]) { if (a.length < 2) return 0; const m = mean(a); return Math.sqrt(a.reduce((s, v) => s + (v - m) ** 2, 0) / a.length); }

// ============================================================================
// Feature computation
// ============================================================================

function computeFeatures(
  clickTs: number[], uniqueTiles: Set<number>, verifyAttempts: number, mistakes: number,
  blurCount: number, resetCount: number, startTime: number | null, endTime: number | null,
  mousePath: MouseSample[], clickPos: { x: number; y: number; tileCenterX: number; tileCenterY: number }[],
  pausesBefore: number[],
): Features {
  const t0 = startTime ?? 0;
  const timeMs = Math.round(Math.max(0, (endTime ?? t0) - t0));
  const deltas: number[] = [];
  for (let i = 1; i < clickTs.length; i++) deltas.push(Math.max(0, clickTs[i] - clickTs[i - 1]));
  const avgDelta = mean(deltas), stdDelta = stddev(deltas);
  const hesitations = deltas.filter((d) => d > HESITATION_THRESHOLD_MS).length;

  let pathLen = 0;
  const speeds: number[] = [], accelerations: number[] = [], angles: number[] = [];
  let dirChanges = 0, microCorr = 0;
  for (let i = 1; i < mousePath.length; i++) {
    const d = ptDist(mousePath[i - 1], mousePath[i]);
    pathLen += d;
    speeds.push((d / Math.max(1, mousePath[i].t - mousePath[i - 1].t)) * 1000);
  }
  for (let i = 1; i < speeds.length; i++) {
    const dt = Math.max(1, (mousePath[i + 1]?.t ?? mousePath[i].t) - mousePath[i].t || 1);
    accelerations.push(Math.abs(speeds[i] - speeds[i - 1]) / dt * 1000);
  }
  for (let i = 1; i < mousePath.length - 1; i++) {
    const ang = angleBetween(mousePath[i - 1], mousePath[i], mousePath[i + 1]);
    angles.push(ang);
    if (ang > Math.PI / 6) dirChanges++;
    if (ang > Math.PI / 4 && ptDist(mousePath[i - 1], mousePath[i]) < 15) microCorr++;
  }
  const angVels: number[] = [];
  for (let i = 0; i < angles.length; i++) angVels.push(angles[i] / Math.max(1, mousePath[i + 1].t - mousePath[i].t) * 1000);

  let clickPrec = 0;
  if (clickPos.length > 0) clickPrec = mean(clickPos.map((c) => Math.sqrt((c.x - c.tileCenterX) ** 2 + (c.y - c.tileCenterY) ** 2)));

  let pathStr = 0, moveEff = 500;
  if (clickTs.length >= 2 && mousePath.length >= 2) {
    const ratios: number[] = [];
    for (let c = 1; c < clickTs.length; c++) {
      const seg = mousePath.filter((s) => s.t >= clickTs[c - 1] - 50 && s.t <= clickTs[c] + 50);
      if (seg.length >= 2) {
        let sl = 0;
        for (let j = 1; j < seg.length; j++) sl += ptDist(seg[j - 1], seg[j]);
        const dl = ptDist(seg[0], seg[seg.length - 1]);
        if (sl > 0) ratios.push(dl / sl);
      }
    }
    if (ratios.length > 0) { pathStr = Math.round(mean(ratios) * 1000); moveEff = Math.round((1 - mean(ratios)) * 1000); }
  } else if (mousePath.length >= 2) {
    const dd = ptDist(mousePath[0], mousePath[mousePath.length - 1]);
    if (pathLen > 0) { pathStr = Math.round((dd / pathLen) * 1000); moveEff = Math.round((1 - dd / pathLen) * 1000); }
  }
  const velCon = speeds.length > 1 ? Math.round((1 - Math.min(1, stddev(speeds) / (mean(speeds) || 1))) * 1000) : 500;
  const cl = (n: FeatureName, v: number) => Math.round(clampVal(v, ...FEATURE_CLAMPS[n]));

  return {
    time_ms: cl("time_ms", timeMs), click_count: cl("click_count", clickTs.length),
    unique_tiles_clicked: cl("unique_tiles_clicked", uniqueTiles.size),
    verify_attempts: cl("verify_attempts", verifyAttempts), mistakes: cl("mistakes", mistakes),
    avg_click_delta_ms: cl("avg_click_delta_ms", avgDelta), std_click_delta_ms: cl("std_click_delta_ms", stdDelta),
    hesitations: cl("hesitations", hesitations), blur_count: cl("blur_count", blurCount),
    reset_count: cl("reset_count", resetCount), path_len_px: cl("path_len_px", pathLen),
    avg_speed: cl("avg_speed", mean(speeds)), speed_std: cl("speed_std", stddev(speeds)),
    avg_acceleration: cl("avg_acceleration", mean(accelerations)), acc_std: cl("acc_std", stddev(accelerations)),
    curvature: cl("curvature", angles.reduce((a, b) => a + b, 0) * 100),
    direction_changes: cl("direction_changes", dirChanges), click_precision_px: cl("click_precision_px", clickPrec),
    path_straightness: cl("path_straightness", pathStr), movement_efficiency: cl("movement_efficiency", moveEff),
    micro_corrections: cl("micro_corrections", microCorr), velocity_consistency: cl("velocity_consistency", velCon),
    pause_before_click_ms: cl("pause_before_click_ms", mean(pausesBefore)),
    angular_velocity_std: cl("angular_velocity_std", stddev(angVels) * 100),
  };
}

function runModel(features: Features): { score: number; label: "HUMAN" | "BOT" } {
  const score = FEATURE_ORDER.reduce((acc, name, i) => acc + WEIGHTS[i] * features[name], BIAS);
  return { score: Math.round(score), label: score >= THRESHOLD ? "HUMAN" : "BOT" };
}

function generateBotPath(sx: number, sy: number, ex: number, ey: number, dur: number): MouseSample[] {
  const steps = Math.max(12, Math.round(dur / MOUSE_SAMPLE_INTERVAL_MS));
  const path: MouseSample[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    path.push({ x: sx + (ex - sx) * t + (Math.random() - 0.5) * 0.15, y: sy + (ey - sy) * t + (Math.random() - 0.5) * 0.15, t: i * MOUSE_SAMPLE_INTERVAL_MS });
  }
  return path;
}

function toExportJson(f: Features): ExportedJson {
  return {
    time_ms: f.time_ms, click_count: f.click_count, unique_tiles_clicked: f.unique_tiles_clicked,
    mistakes: f.mistakes, avg_click_delta_ms: f.avg_click_delta_ms, hesitations: f.hesitations,
    path_straightness: f.path_straightness, movement_efficiency: f.movement_efficiency, reset_count: f.reset_count,
  };
}

// ============================================================================
// Pattern icons
// ============================================================================

function PatternIcon({ type }: { type: PatternType }) {
  const s = 48, h = s / 2;
  switch (type) {
    case "circle": return (<svg viewBox={`0 0 ${s} ${s}`} className="h-full w-full drop-shadow-sm"><defs><radialGradient id="cg" cx="40%" cy="35%"><stop offset="0%" stopColor="#c4b5fd" /><stop offset="100%" stopColor="#7c3aed" /></radialGradient></defs><circle cx={h} cy={h} r={16} fill="url(#cg)" /><circle cx={h - 4} cy={h - 5} r={4} fill="white" opacity={0.3} /></svg>);
    case "triangle": return (<svg viewBox={`0 0 ${s} ${s}`} className="h-full w-full drop-shadow-sm"><defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#f0abfc" /><stop offset="100%" stopColor="#a855f7" /></linearGradient></defs><polygon points="24,6 42,42 6,42" fill="url(#tg)" /></svg>);
    case "plus": return (<svg viewBox={`0 0 ${s} ${s}`} className="h-full w-full drop-shadow-sm"><defs><linearGradient id="pg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#67e8f9" /><stop offset="100%" stopColor="#06b6d4" /></linearGradient></defs><rect x={18} y={6} width={12} height={36} rx={3} fill="url(#pg)" /><rect x={6} y={18} width={36} height={12} rx={3} fill="url(#pg)" /></svg>);
    case "waves": return (<svg viewBox={`0 0 ${s} ${s}`} className="h-full w-full drop-shadow-sm"><path d="M6 16 Q14 8 24 16 Q34 24 42 16" fill="none" stroke="#c084fc" strokeWidth={3.5} strokeLinecap="round" /><path d="M6 26 Q14 18 24 26 Q34 34 42 26" fill="none" stroke="#a855f7" strokeWidth={3.5} strokeLinecap="round" /><path d="M6 36 Q14 28 24 36 Q34 44 42 36" fill="none" stroke="#7c3aed" strokeWidth={3.5} strokeLinecap="round" /></svg>);
    case "stripes": return (<svg viewBox={`0 0 ${s} ${s}`} className="h-full w-full drop-shadow-sm">{[10, 18, 26, 34].map((y, i) => (<rect key={y} x={6} y={y} width={36} height={4} rx={2} fill={i % 2 === 0 ? "#e879f9" : "#c026d3"} />))}</svg>);
    case "star": return (<svg viewBox={`0 0 ${s} ${s}`} className="h-full w-full drop-shadow-sm"><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#fbbf24" /><stop offset="100%" stopColor="#f59e0b" /></linearGradient></defs><polygon points="24,4 29,18 44,18 32,27 36,42 24,33 12,42 16,27 4,18 19,18" fill="url(#sg)" /></svg>);
  }
}

// ============================================================================
// Logo
// ============================================================================

function Logo({ size = "text-3xl" }: { size?: string }) {
  return (
    <span className={`${size} font-bold tracking-tight text-white`}>
      <span className="text-purple-300">Proof</span>
      <span className="mx-1 text-white/40">of</span>
      <span className="text-white">Human</span>
    </span>
  );
}

// ============================================================================
// Main Page
// ============================================================================

const INITIAL_SEED = 42;

export default function FaucetPage() {
  const [step, setStep] = useState<"landing" | "faucet">("landing");
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [humanVerified, setHumanVerified] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [requestSent, setRequestSent] = useState(false);
  const [exportedJson, setExportedJson] = useState<ExportedJson | null>(null);
  const [jsonCopied, setJsonCopied] = useState(false);

  // Captcha state
  const [puzzle, setPuzzle] = useState<Puzzle>(() => generatePuzzle(INITIAL_SEED));
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [simulateBot, setSimulateBot] = useState(false);
  const [features, setFeatures] = useState<Features>(ZERO_FEATURES);
  const [modelScore, setModelScore] = useState(0);
  const [modelLabel, setModelLabel] = useState<"HUMAN" | "BOT">("BOT");
  const [solved, setSolved] = useState(false);
  const [verified, setVerified] = useState(false);
  const [incorrectTiles, setIncorrectTiles] = useState<Set<number>>(new Set());
  const [missedTiles, setMissedTiles] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);

  const [botCursorPos, setBotCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [botCursorVisible, setBotCursorVisible] = useState(false);

  const clickTsRef = useRef<number[]>([]);
  const uniqueTilesRef = useRef<Set<number>>(new Set());
  const verifyAttRef = useRef(0);
  const mistakesRef = useRef(0);
  const blurCountRef = useRef(0);
  const resetCountRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const botTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const botRafRef = useRef<number[]>([]);
  const mousePathRef = useRef<MouseSample[]>([]);
  const clickPosRef = useRef<{ x: number; y: number; tileCenterX: number; tileCenterY: number }[]>([]);
  const pausesRef = useRef<number[]>([]);
  const lastMoveRef = useRef<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tileClickRef = useRef<(index: number, cx?: number, cy?: number) => void>(() => {});
  const verifyRef = useRef<() => void>(() => {});

  useEffect(() => { setMounted(true); const s = Date.now(); setPuzzle(generatePuzzle(s)); }, []);

  useEffect(() => {
    const onBlur = () => { if (activeRef.current) blurCountRef.current += 1; };
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onBlur);
    return () => { window.removeEventListener("blur", onBlur); window.removeEventListener("focus", onBlur); };
  }, []);

  const clearBotTimers = () => { botTimersRef.current.forEach(clearTimeout); botTimersRef.current = []; botRafRef.current.forEach(cancelAnimationFrame); botRafRef.current = []; };
  useEffect(() => () => clearBotTimers(), []);

  const resetTelemetry = () => {
    clickTsRef.current = []; uniqueTilesRef.current = new Set(); verifyAttRef.current = 0;
    mistakesRef.current = 0; startTimeRef.current = null; activeRef.current = false;
    mousePathRef.current = []; clickPosRef.current = []; pausesRef.current = []; lastMoveRef.current = null;
  };

  const refreshFeatures = useCallback((endTime: number | null) => {
    const f = computeFeatures(clickTsRef.current, uniqueTilesRef.current, verifyAttRef.current, mistakesRef.current, blurCountRef.current, resetCountRef.current, startTimeRef.current, endTime, mousePathRef.current, clickPosRef.current, pausesRef.current);
    const m = runModel(f);
    setFeatures(f); setModelScore(m.score); setModelLabel(m.label);
    return { features: f, model: m };
  }, []);

  const newPuzzle = useCallback(() => {
    clearBotTimers(); setBotCursorVisible(false); setBotCursorPos(null);
    const s = Date.now(); setPuzzle(generatePuzzle(s)); setSelected(new Set());
    setSolved(false); setVerified(false); setIncorrectTiles(new Set()); setMissedTiles(new Set());
    resetCountRef.current += 1; resetTelemetry(); refreshFeatures(null);
  }, [refreshFeatures]);

  // Mouse tracking
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || simulateBot) return;
    const onMove = (e: MouseEvent) => {
      if (!activeRef.current && startTimeRef.current === null) return;
      const now = performance.now(); const r = grid.getBoundingClientRect();
      mousePathRef.current.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: now });
      lastMoveRef.current = now;
    };
    grid.addEventListener("mousemove", onMove);
    return () => grid.removeEventListener("mousemove", onMove);
  }, [simulateBot, showCaptcha]);

  const getTileCenter = useCallback((idx: number) => {
    const grid = gridRef.current; if (!grid) return null;
    const tile = grid.children[idx] as HTMLElement | undefined; if (!tile) return null;
    const gr = grid.getBoundingClientRect(), tr = tile.getBoundingClientRect();
    return { x: tr.left - gr.left + tr.width / 2, y: tr.top - gr.top + tr.height / 2 };
  }, []);

  const handleTileClick = useCallback((index: number, cx?: number, cy?: number) => {
    if (solved && verified) return;
    if (incorrectTiles.size > 0 || missedTiles.size > 0) { setIncorrectTiles(new Set()); setMissedTiles(new Set()); }
    const now = performance.now();
    if (startTimeRef.current === null) { startTimeRef.current = now; activeRef.current = true; }
    clickTsRef.current.push(now); uniqueTilesRef.current.add(index);
    if (lastMoveRef.current !== null) pausesRef.current.push(now - lastMoveRef.current);
    const center = getTileCenter(index);
    if (center && cx !== undefined && cy !== undefined) clickPosRef.current.push({ x: cx, y: cy, tileCenterX: center.x, tileCenterY: center.y });
    else if (center) { const off = 5 + Math.random() * 15, ang = Math.random() * Math.PI * 2; clickPosRef.current.push({ x: center.x + Math.cos(ang) * off, y: center.y + Math.sin(ang) * off, tileCenterX: center.x, tileCenterY: center.y }); }
    setSelected((prev) => { const n = new Set(prev); n.has(index) ? n.delete(index) : n.add(index); return n; });
    refreshFeatures(now);
  }, [solved, verified, refreshFeatures, getTileCenter, incorrectTiles, missedTiles]);

  const handleHumanTileClick = useCallback((index: number, e: React.MouseEvent) => {
    const grid = gridRef.current; if (!grid) return handleTileClick(index);
    const r = grid.getBoundingClientRect(); handleTileClick(index, e.clientX - r.left, e.clientY - r.top);
  }, [handleTileClick]);

  const handleVerify = useCallback(() => {
    if (solved && verified) return;
    const now = performance.now(); verifyAttRef.current += 1;
    const fp = new Set([...selected].filter((i) => !puzzle.targetIndices.has(i)));
    const fn = new Set([...puzzle.targetIndices].filter((i) => !selected.has(i)));
    mistakesRef.current += fp.size + fn.size;
    const correct = fp.size === 0 && fn.size === 0;
    if (!correct && !simulateBot) { setIncorrectTiles(fp); setMissedTiles(fn); refreshFeatures(now); return; }
    setIncorrectTiles(new Set()); setMissedTiles(new Set()); setSolved(true); setVerified(true);
    const { features: f, model } = refreshFeatures(now);
    if (simulateBot) { setModelLabel("BOT"); setFeatures(f); setModelScore(model.score); }
    else { setModelLabel("HUMAN"); setFeatures(f); setModelScore(model.score); setExportedJson(toExportJson(f)); }
  }, [selected, puzzle, solved, verified, refreshFeatures, simulateBot]);

  useEffect(() => { tileClickRef.current = handleTileClick; }, [handleTileClick]);
  useEffect(() => { verifyRef.current = handleVerify; }, [handleVerify]);

  // Bot simulation
  const startBotSim = useCallback(() => {
    clearBotTimers(); const s = Date.now(); const p = generatePuzzle(s); setPuzzle(p);
    setSelected(new Set()); setSolved(false); setVerified(false); resetTelemetry(); resetCountRef.current = 0; refreshFeatures(null);
    const targets = [...p.targetIndices];
    const t = setTimeout(() => {
      setBotCursorVisible(true); const g = gridRef.current; if (!g) return;
      const gr = g.getBoundingClientRect();
      const getC = (idx: number) => { const el = g.children[idx] as HTMLElement | undefined; if (!el) return { x: gr.width / 2, y: gr.height / 2 }; const r = el.getBoundingClientRect(); return { x: r.left - gr.left + r.width / 2, y: r.top - gr.top + r.height / 2 }; };
      let cx = gr.width / 2, cy = -20, delay = 0;
      startTimeRef.current = performance.now(); activeRef.current = true;
      targets.forEach((ti) => {
        const md = 220 + Math.random() * 60, pc = 30 + Math.random() * 30, ss = delay, fx = cx, fy = cy;
        const tm = setTimeout(() => {
          const tgt = getC(ti); const bp = generateBotPath(fx, fy, tgt.x, tgt.y, md);
          const as2 = performance.now();
          bp.forEach((s2) => mousePathRef.current.push({ x: s2.x, y: s2.y, t: as2 + s2.t }));
          const tpt = bp[bp.length - 1].t;
          const anim = () => { const el = performance.now() - as2; if (el >= tpt) { setBotCursorPos({ x: bp[bp.length - 1].x, y: bp[bp.length - 1].y }); return; } const fr = el / tpt; const idx = Math.min(Math.floor(fr * bp.length), bp.length - 1); setBotCursorPos({ x: bp[idx].x, y: bp[idx].y }); botRafRef.current.push(requestAnimationFrame(anim)); };
          botRafRef.current.push(requestAnimationFrame(anim));
          botTimersRef.current.push(setTimeout(() => { const c = getC(ti); const clx = c.x + (Math.random() - 0.5) * 1.5, cly = c.y + (Math.random() - 0.5) * 1.5; setBotCursorPos({ x: clx, y: cly }); lastMoveRef.current = performance.now() - pc; tileClickRef.current(ti, clx, cly); }, md + pc));
        }, 300 + ss);
        botTimersRef.current.push(tm);
        const tgt = getC(ti); cx = tgt.x; cy = tgt.y; delay += md + pc + BOT_STEP_INTERVAL_MS;
      });
      botTimersRef.current.push(setTimeout(() => { setBotCursorVisible(false); verifyRef.current(); }, 300 + delay + 200));
    }, 100);
    botTimersRef.current.push(t);
  }, [refreshFeatures]);

  const handleBotToggle = useCallback((next: boolean) => {
    setSimulateBot(next);
    if (next) startBotSim(); else { clearBotTimers(); setBotCursorVisible(false); setBotCursorPos(null); newPuzzle(); }
  }, [startBotSim, newPuzzle]);

  const handleCaptchaVerified = useCallback(() => {
    if (modelLabel === "HUMAN") {
      setHumanVerified(true);
      setTimeout(() => setShowCaptcha(false), 800);
    }
  }, [modelLabel]);

  useEffect(() => { if (verified && solved && modelLabel === "HUMAN") handleCaptchaVerified(); }, [verified, solved, modelLabel, handleCaptchaVerified]);

  const handleCopyJson = useCallback(async () => {
    if (!exportedJson) return;
    await navigator.clipboard.writeText(JSON.stringify(exportedJson, null, 2));
    setJsonCopied(true); setTimeout(() => setJsonCopied(false), 2000);
  }, [exportedJson]);

  const handleRequestTokens = () => { setRequestSent(true); };

  const openCaptchaModal = () => {
    newPuzzle(); resetTelemetry(); resetCountRef.current = 0;
    setSolved(false); setVerified(false); setSimulateBot(false);
    setIncorrectTiles(new Set()); setMissedTiles(new Set());
    setShowCaptcha(true);
  };

  if (!mounted) return (
    <div className="flex min-h-screen items-center justify-center" style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 30%, #4a2c6e 50%, #6b3a7d 70%, #8b4a6e 85%, #a0607a 100%)" }}>
      <div className="animate-pulse text-white/50 text-lg">Loading...</div>
    </div>
  );

  // ========== LANDING ==========
  if (step === "landing") return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 30%, #4a2c6e 50%, #6b3a7d 70%, #8b4a6e 85%, #a0607a 100%)" }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-400/8 blur-2xl" />
      </div>

      <div className="glass-card relative z-10 mx-4 flex w-full max-w-[480px] flex-col items-center px-10 py-12">
        <Logo />
        <p className="mt-2 text-sm text-white/40">Faucet</p>

        <div className="mt-10 w-full">
          <button
            type="button"
            onClick={() => setStep("faucet")}
            className="glass-btn flex w-full items-center justify-center gap-3 px-6 py-4 text-[15px] font-medium text-white"
          >
            <svg className="h-5 w-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
            Request Testnet Tokens
          </button>
        </div>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-8 flex w-full items-center justify-between px-8 text-sm font-medium text-white/50">
        <span>Proof</span>
        <div className="flex items-center gap-2">
          <span className="text-white/30">(</span>
          <Logo size="text-lg" />
          <span className="text-white/30">)</span>
        </div>
        <span>of Human</span>
      </div>
    </div>
  );

  // ========== FAUCET ==========
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 30%, #4a2c6e 50%, #6b3a7d 70%, #8b4a6e 85%, #a0607a 100%)" }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute -bottom-48 -right-48 h-[500px] w-[500px] rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      <div className="glass-card relative z-10 mx-4 flex w-full max-w-[480px] flex-col items-center px-10 py-12">
        <Logo />
        <p className="mt-2 text-sm text-white/40">Faucet</p>

        <div className="mt-8 w-full space-y-5">
          {/* Wallet input */}
          <div>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="Enter your wallet address"
              disabled={!humanVerified}
              className={`glass-input w-full px-4 py-3.5 text-[15px] text-white placeholder-white/30 outline-none transition ${!humanVerified ? "cursor-not-allowed opacity-40" : "focus:border-purple-400/40"}`}
            />
          </div>

          {/* Verify / Status row */}
          <div className="flex items-center gap-3">
            {humanVerified ? (
              <div className="flex flex-1 items-center gap-2.5 rounded-xl bg-emerald-500/10 border border-emerald-400/20 px-4 py-3">
                <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                <span className="text-sm font-medium text-emerald-300">Verified Human</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={openCaptchaModal}
                className="flex flex-1 items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white/70 transition hover:bg-white/10 hover:border-white/20 cursor-pointer"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded border border-white/20 bg-white/5">
                  <div className="h-3 w-3 rounded-sm" />
                </div>
                I am human
              </button>
            )}

            {exportedJson && (
              <button
                type="button"
                onClick={handleCopyJson}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-3 text-xs font-medium text-white/50 transition hover:bg-white/10 hover:text-white/70"
                title="Copy behavioral JSON"
              >
                {jsonCopied ? (
                  <svg className="h-4 w-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                )}
              </button>
            )}
          </div>

          {/* Request button */}
          {requestSent ? (
            <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-4 text-center">
              <p className="text-sm font-medium text-emerald-300">Tokens requested successfully!</p>
              <p className="mt-1 text-xs text-emerald-300/60">Testnet tokens will arrive in your wallet shortly.</p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleRequestTokens}
              disabled={!humanVerified || !walletAddress.trim()}
              className="glass-btn w-full px-6 py-4 text-[15px] font-medium text-white"
            >
              Request Testnet Tokens
            </button>
          )}
        </div>
      </div>

      {/* Bottom branding */}
      <div className="absolute bottom-8 flex w-full items-center justify-between px-8 text-sm font-medium text-white/50">
        <span>Proof</span>
        <div className="flex items-center gap-2">
          <span className="text-white/30">(</span>
          <Logo size="text-lg" />
          <span className="text-white/30">)</span>
        </div>
        <span>of Human</span>
      </div>

      {/* ========== CAPTCHA MODAL ========== */}
      {showCaptcha && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget && !simulateBot) setShowCaptcha(false); }}>
          <div className="relative mx-4 w-full max-w-[380px] select-none overflow-hidden rounded-2xl border border-white/10 bg-[#1e1033] shadow-2xl" onClick={(e) => e.stopPropagation()}>
            {/* Close */}
            {!simulateBot && (
              <button type="button" onClick={() => setShowCaptcha(false)} className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            )}

            {/* Header */}
            <div className={`px-5 pb-4 pt-5 transition-colors duration-300 ${
              incorrectTiles.size > 0 || missedTiles.size > 0 ? "bg-red-500/80"
                : verified && solved ? (modelLabel === "HUMAN" ? "bg-emerald-500/80" : "bg-red-500/80")
                : "bg-purple-600/60"
            }`}>
              {incorrectTiles.size > 0 || missedTiles.size > 0 ? (
                <><h2 className="text-xl font-bold text-white">Incorrect</h2><p className="mt-1 text-[13px] text-white/80">Please try again.</p></>
              ) : verified && solved ? (
                <><h2 className="text-xl font-bold text-white">{modelLabel === "HUMAN" ? "Verified" : "Classified as Bot"}</h2><p className="mt-1 text-[13px] text-white/80">{modelLabel === "HUMAN" ? "You have been verified as human." : "Your behavior was classified as automated."}</p></>
              ) : (
                <><p className="text-[13px] text-white/60">Select all squares with</p><h2 className="mt-0.5 text-2xl font-bold capitalize text-white">{puzzle.target}s</h2><p className="mt-1 text-[13px] text-white/50">If there are none, click skip</p></>
              )}
            </div>

            {/* Grid */}
            <div className="relative">
              <div ref={gridRef} className="grid grid-cols-4 gap-[2px] bg-white/5 p-[2px]">
                {puzzle.tiles.map((pattern, i) => {
                  const isSel = selected.has(i), isWrong = incorrectTiles.has(i), isMissed = missedTiles.has(i), hasErr = isWrong || isMissed;
                  return (
                    <button key={i} type="button" disabled={simulateBot} onClick={(e) => handleHumanTileClick(i, e)}
                      className={`relative flex aspect-square items-center justify-center transition-all duration-150 ${
                        hasErr ? "bg-red-500/20 ring-2 ring-inset ring-red-400"
                          : isSel ? "scale-[0.92] bg-purple-500/20 ring-[3px] ring-inset ring-purple-400"
                          : "bg-white/5 hover:bg-white/10"
                      } ${simulateBot ? "cursor-not-allowed" : "cursor-pointer active:scale-95"}`}>
                      <div className="flex h-full w-full items-center justify-center p-2"><PatternIcon type={pattern} /></div>
                      {isSel && !hasErr && (
                        <div className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 shadow">
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        </div>
                      )}
                      {isWrong && (
                        <div className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 shadow">
                          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </div>
                      )}
                      {isMissed && (
                        <div className="absolute bottom-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500/80 shadow">
                          <span className="text-[9px] font-bold text-white">!</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {botCursorVisible && botCursorPos && (
                <div className="pointer-events-none absolute z-50" style={{ left: botCursorPos.x - 4, top: botCursorPos.y - 4, transition: "left 0.016s linear, top 0.016s linear" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M3 3L10.5 21L13 13L21 10.5L3 3Z" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                  <span className="absolute -right-8 -top-1 rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow">BOT</span>
                </div>
              )}
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-3 py-2.5">
              <div className="flex items-center gap-3">
                <button type="button" onClick={newPuzzle} className="flex h-7 w-7 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white/70" title="New challenge">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                </button>
                <label className="flex cursor-pointer items-center gap-1.5" title="Toggle bot simulation">
                  <input type="checkbox" className="h-3.5 w-3.5 rounded accent-purple-500" checked={simulateBot} onChange={(e) => handleBotToggle(e.target.checked)} />
                  <span className="text-[11px] font-medium text-white/40">Bot</span>
                </label>
              </div>
              <button type="button" onClick={handleVerify} disabled={simulateBot} className="rounded-lg bg-purple-600 px-5 py-1.5 text-sm font-bold text-white shadow transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-40">
                Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
