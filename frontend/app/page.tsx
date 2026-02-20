"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

type Point = { x: number; y: number };
type Sample = { x: number; y: number; t: number; withinTolerance: boolean };

type FeatureName =
  | "time_ms"
  | "mistakes"
  | "path_len_px"
  | "curvature"
  | "avg_speed_x100"
  | "speed_std_x100"
  | "avg_acc_x100"
  | "acc_std_x100"
  | "hesitations"
  | "blur_count";

type Features = Record<FeatureName, number>;

const SVG_WIDTH = 720;
const SVG_HEIGHT = 280;
const PATH_D = "M 60 220 C 140 40, 260 250, 360 120 C 460 20, 560 260, 660 60";
const START_POINT: Point = { x: 60, y: 220 };
const END_POINT: Point = { x: 660, y: 60 };
const HANDLE_RADIUS = 10;
const PATH_TOLERANCE_PX = 22;
const SNAP_BACK_FACTOR = 0.35;
const END_REACH_RATIO = 0.985;
const REQUIRED_WITHIN_RATIO = 0.85;
const BOT_SIMULATION_DURATION_MS = 18000;

const FEATURE_ORDER: FeatureName[] = [
  "time_ms",
  "mistakes",
  "path_len_px",
  "curvature",
  "avg_speed_x100",
  "speed_std_x100",
  "avg_acc_x100",
  "acc_std_x100",
  "hesitations",
  "blur_count",
];
const WEIGHTS = [-1, -900, 1, 2, 3, -15, 2, -10, 250, -400];
const BIAS = 1200;
const THRESHOLD = 0;

const ZERO_FEATURES: Features = {
  time_ms: 0,
  mistakes: 0,
  path_len_px: 0,
  curvature: 0,
  avg_speed_x100: 0,
  speed_std_x100: 0,
  avg_acc_x100: 0,
  acc_std_x100: 0,
  hesitations: 0,
  blur_count: 0,
};

function clampInt(value: number, min: number, max: number): number {
  const clamped = Math.max(min, Math.min(max, value));
  return Math.trunc(clamped);
}

function distance(a: Point, b: Point): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function lerpPoint(from: Point, to: Point, t: number): Point {
  return {
    x: from.x + (to.x - from.x) * t,
    y: from.y + (to.y - from.y) * t,
  };
}

function computeFeatures(
  samples: Sample[],
  mistakesRaw: number,
  blurCountRaw: number,
  startTime: number | null,
  endTime: number | null,
): Features {
  const safeStart = startTime ?? 0;
  const safeEnd = endTime ?? safeStart;
  const timeMsRaw = Math.max(0, safeEnd - safeStart);
  const timeMs = clampInt(Math.round(timeMsRaw), 0, 30000);
  const mistakes = clampInt(Math.round(mistakesRaw), 0, 50);
  const blurCount = clampInt(Math.round(blurCountRaw), 0, 100);

  if (samples.length < 2) {
    return {
      ...ZERO_FEATURES,
      time_ms: timeMs,
      mistakes,
      blur_count: blurCount,
    };
  }

  let pathLen = 0;
  for (let i = 1; i < samples.length; i += 1) {
    pathLen += distance(samples[i - 1], samples[i]);
  }
  const pathLenPx = clampInt(Math.round(pathLen), 0, 100000);

  let curvatureSum = 0;
  for (let i = 2; i < samples.length; i += 1) {
    const v1x = samples[i - 1].x - samples[i - 2].x;
    const v1y = samples[i - 1].y - samples[i - 2].y;
    const v2x = samples[i].x - samples[i - 1].x;
    const v2y = samples[i].y - samples[i - 1].y;
    const mag1 = Math.sqrt(v1x * v1x + v1y * v1y);
    const mag2 = Math.sqrt(v2x * v2x + v2y * v2y);
    if (mag1 === 0 || mag2 === 0) continue;
    const dot = v1x * v2x + v1y * v2y;
    const cos = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
    const angle = Math.acos(cos);
    curvatureSum += Math.abs(angle);
  }
  const curvature = clampInt(Math.round(curvatureSum * 1000), 0, 100000);

  const speeds: number[] = [];
  for (let i = 1; i < samples.length; i += 1) {
    const dt = Math.max(1, samples[i].t - samples[i - 1].t);
    const ds = distance(samples[i - 1], samples[i]);
    speeds.push(ds / dt);
  }

  const speedMean =
    speeds.length > 0
      ? speeds.reduce((acc, value) => acc + value, 0) / speeds.length
      : 0;
  const speedVar =
    speeds.length > 0
      ? speeds.reduce((acc, value) => acc + (value - speedMean) ** 2, 0) /
        speeds.length
      : 0;
  const speedStd = Math.sqrt(speedVar);

  const hesitations = clampInt(
    Math.round(speeds.filter((speed) => speed < 0.02).length),
    0,
    500,
  );
  const avgSpeedX100 = clampInt(Math.round(speedMean * 100), 0, 100000);
  const speedStdX100 = clampInt(Math.round(speedStd * 100), 0, 100000);

  const accelerations: number[] = [];
  for (let i = 1; i < speeds.length; i += 1) {
    const dt = Math.max(1, samples[i + 1].t - samples[i].t);
    const acc = Math.abs(speeds[i] - speeds[i - 1]) / dt;
    accelerations.push(acc);
  }
  const accMean =
    accelerations.length > 0
      ? accelerations.reduce((acc, value) => acc + value, 0) /
        accelerations.length
      : 0;
  const accVar =
    accelerations.length > 0
      ? accelerations.reduce((acc, value) => acc + (value - accMean) ** 2, 0) /
        accelerations.length
      : 0;
  const accStd = Math.sqrt(accVar);

  const avgAccX100 = clampInt(Math.round(accMean * 100), 0, 200000);
  const accStdX100 = clampInt(Math.round(accStd * 100), 0, 200000);

  return {
    time_ms: timeMs,
    mistakes,
    path_len_px: pathLenPx,
    curvature,
    avg_speed_x100: avgSpeedX100,
    speed_std_x100: speedStdX100,
    avg_acc_x100: avgAccX100,
    acc_std_x100: accStdX100,
    hesitations,
    blur_count: blurCount,
  };
}

function runModel(features: Features): { score: number; label: "HUMAN" | "BOT" } {
  const score = FEATURE_ORDER.reduce((acc, featureName, index) => {
    return acc + WEIGHTS[index] * features[featureName];
  }, BIAS);
  return { score, label: score >= THRESHOLD ? "HUMAN" : "BOT" };
}

type AttemptState = {
  samples: Sample[];
  mistakes: number;
  blurCount: number;
  withinCount: number;
  totalCount: number;
  startTime: number | null;
  endTime: number | null;
  reachedEnd: boolean;
};

const initialAttemptState = (): AttemptState => ({
  samples: [],
  mistakes: 0,
  blurCount: 0,
  withinCount: 0,
  totalCount: 0,
  startTime: null,
  endTime: null,
  reachedEnd: false,
});

export default function Home() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const pointerRef = useRef<Point>(START_POINT);
  const pointerIdRef = useRef<number | null>(null);
  const draggingRef = useRef(false);
  const simulatingRef = useRef(false);
  const activeAttemptRef = useRef(false);
  const simStartRef = useRef<number | null>(null);
  const currentPathDistanceRef = useRef(0);
  const attemptRef = useRef<AttemptState>(initialAttemptState());

  const [handlePos, setHandlePos] = useState<Point>(START_POINT);
  const [simulateBot, setSimulateBot] = useState(false);
  const [statusText, setStatusText] = useState(
    "Drag the handle along the path to the finish.",
  );
  const [puzzleProgress, setPuzzleProgress] = useState(0);
  const [withinTolerancePercent, setWithinTolerancePercent] = useState(100);
  const [features, setFeatures] = useState<Features>(ZERO_FEATURES);
  const [score, setScore] = useState(0);
  const [label, setLabel] = useState<"HUMAN" | "BOT">("BOT");
  const [completed, setCompleted] = useState(false);
  const [puzzleSuccess, setPuzzleSuccess] = useState(false);

  const computeAndPublishResult = (endTimeOverride?: number | null) => {
    const attempt = attemptRef.current;
    const endTime =
      endTimeOverride ?? attempt.endTime ?? attempt.startTime ?? performance.now();
    attempt.endTime = endTime;
    const nextFeatures = computeFeatures(
      attempt.samples,
      attempt.mistakes,
      attempt.blurCount,
      attempt.startTime,
      attempt.endTime,
    );
    const model = runModel(nextFeatures);
    setFeatures(nextFeatures);
    setScore(model.score);
    setLabel(model.label);
  };

  const resetPuzzleStateOnly = () => {
    draggingRef.current = false;
    simulatingRef.current = false;
    activeAttemptRef.current = false;
    simStartRef.current = null;
    pointerIdRef.current = null;
    currentPathDistanceRef.current = 0;
    attemptRef.current = initialAttemptState();
    pointerRef.current = START_POINT;
    setHandlePos(START_POINT);
    setPuzzleProgress(0);
    setWithinTolerancePercent(100);
    setCompleted(false);
    setPuzzleSuccess(false);
    setStatusText("Drag the handle along the path to the finish.");
  };

  const closestPathPoint = (point: Point) => {
    const path = pathRef.current;
    if (!path) return { point, lengthAtPoint: 0, distanceToPath: 0 };
    const pathLength = path.getTotalLength();
    const steps = 180;
    let bestLength = 0;
    let bestPoint = path.getPointAtLength(0);
    let bestDistance = Number.POSITIVE_INFINITY;
    for (let i = 0; i <= steps; i += 1) {
      const len = (i / steps) * pathLength;
      const p = path.getPointAtLength(len);
      const d = Math.hypot(point.x - p.x, point.y - p.y);
      if (d < bestDistance) {
        bestDistance = d;
        bestLength = len;
        bestPoint = p;
      }
    }
    return {
      point: { x: bestPoint.x, y: bestPoint.y },
      lengthAtPoint: bestLength,
      distanceToPath: bestDistance,
    };
  };

  const startAttemptIfNeeded = (now: number) => {
    const attempt = attemptRef.current;
    if (attempt.startTime === null) {
      attempt.startTime = now;
      activeAttemptRef.current = true;
    }
  };

  const finishAttempt = (reachedEnd: boolean) => {
    const now = performance.now();
    const attempt = attemptRef.current;
    attempt.endTime = now;
    attempt.reachedEnd = reachedEnd;
    activeAttemptRef.current = false;
    draggingRef.current = false;
    simulatingRef.current = false;
    pointerIdRef.current = null;

    const ratio =
      attempt.totalCount > 0 ? attempt.withinCount / attempt.totalCount : 0;
    const success = reachedEnd && ratio >= REQUIRED_WITHIN_RATIO;
    setCompleted(true);
    setPuzzleSuccess(success);
    computeAndPublishResult(now);
    setStatusText(
      success
        ? "Path complete with stable tracing."
        : "Finished, but tracing quality was too noisy.",
    );
  };

  const cancelRaf = () => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const runSamplingLoop = () => {
    cancelRaf();
    const tick = (ts: number) => {
      if (!draggingRef.current && !simulatingRef.current) {
        rafRef.current = null;
        return;
      }

      startAttemptIfNeeded(ts);
      const attempt = attemptRef.current;
      const path = pathRef.current;
      if (!path) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      let rawPoint: Point;
      if (simulatingRef.current) {
        if (simStartRef.current === null) simStartRef.current = ts;
        const elapsed = ts - simStartRef.current;
        const progress = Math.min(1, elapsed / BOT_SIMULATION_DURATION_MS);
        const len = progress * path.getTotalLength();
        const p = path.getPointAtLength(len);
        rawPoint = { x: p.x, y: p.y };
      } else {
        rawPoint = pointerRef.current;
      }

      const nearest = closestPathPoint(rawPoint);
      let withinTolerance = nearest.distanceToPath <= PATH_TOLERANCE_PX;
      let corrected = rawPoint;
      if (!withinTolerance) {
        attempt.mistakes += 1;
        corrected = lerpPoint(rawPoint, nearest.point, SNAP_BACK_FACTOR);
      }

      if (simulatingRef.current) {
        withinTolerance = true;
        corrected = nearest.point;
      }

      currentPathDistanceRef.current = Math.max(
        currentPathDistanceRef.current,
        nearest.lengthAtPoint,
      );

      attempt.samples.push({
        x: corrected.x,
        y: corrected.y,
        t: ts,
        withinTolerance,
      });
      attempt.totalCount += 1;
      if (withinTolerance) attempt.withinCount += 1;

      const progressRatio = currentPathDistanceRef.current / path.getTotalLength();
      const ratio =
        attempt.totalCount > 0 ? attempt.withinCount / attempt.totalCount : 0;

      setHandlePos(corrected);
      setPuzzleProgress(Math.round(progressRatio * 100));
      setWithinTolerancePercent(Math.round(ratio * 100));

      if (progressRatio >= END_REACH_RATIO) {
        finishAttempt(true);
        cancelRaf();
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const toSvgPoint = (clientX: number, clientY: number): Point => {
    const svg = svgRef.current;
    if (!svg) return START_POINT;
    const rect = svg.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * SVG_WIDTH;
    const y = ((clientY - rect.top) / rect.height) * SVG_HEIGHT;
    return { x, y };
  };

  const resetPuzzle = (preserveCurrentAsResult: boolean) => {
    if (preserveCurrentAsResult) {
      computeAndPublishResult(performance.now());
    }
    resetPuzzleStateOnly();
    cancelRaf();
    if (simulateBot) {
      simulatingRef.current = true;
      setStatusText("Running deterministic bot simulation...");
      runSamplingLoop();
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<SVGCircleElement>) => {
    if (simulateBot) return;
    if (completed) {
      setCompleted(false);
      setPuzzleSuccess(false);
      setStatusText("Continue tracing to reach the finish.");
    }
    pointerIdRef.current = event.pointerId;
    draggingRef.current = true;
    pointerRef.current = toSvgPoint(event.clientX, event.clientY);
    event.currentTarget.setPointerCapture(event.pointerId);
    setStatusText("Tracing in progress...");
    runSamplingLoop();
  };

  const handlePointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!draggingRef.current) return;
    if (pointerIdRef.current !== null && event.pointerId !== pointerIdRef.current) {
      return;
    }
    pointerRef.current = toSvgPoint(event.clientX, event.clientY);
  };

  const handlePointerUp = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!draggingRef.current) return;
    if (pointerIdRef.current !== null && event.pointerId !== pointerIdRef.current) {
      return;
    }
    draggingRef.current = false;
    pointerIdRef.current = null;
    const attempt = attemptRef.current;
    if (!attempt.reachedEnd) {
      attempt.mistakes += 1;
      setStatusText("Pointer released early. Grab the handle and continue.");
    }
    cancelRaf();
  };

  const handleSimulationToggle = (nextValue: boolean) => {
    setSimulateBot(nextValue);
    if (nextValue) {
      resetPuzzleStateOnly();
      simulatingRef.current = true;
      setStatusText("Running deterministic bot simulation...");
      runSamplingLoop();
      return;
    }
    resetPuzzleStateOnly();
  };

  useEffect(() => {
    const onVisibilityInterrupt = () => {
      if (activeAttemptRef.current) {
        attemptRef.current.blurCount += 1;
      }
    };
    window.addEventListener("blur", onVisibilityInterrupt);
    window.addEventListener("focus", onVisibilityInterrupt);
    return () => {
      window.removeEventListener("blur", onVisibilityInterrupt);
      window.removeEventListener("focus", onVisibilityInterrupt);
    };
  }, []);

  useEffect(() => {
    return () => {
      cancelRaf();
    };
  }, []);

  const contributions = FEATURE_ORDER.map((name, index) => {
    const weight = WEIGHTS[index];
    const value = features[name];
    return {
      name,
      weight,
      value,
      contribution: weight * value,
    };
  });

  const verificationText = completed && label === "HUMAN" ? "Verified" : "Try again";

  return (
    <div className="min-h-screen bg-slate-100 p-4 text-slate-900">
      <main className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-5xl items-center justify-center">
        <section className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xl md:p-8">
          <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-2xl font-bold">Captcha Behavior Demo</h1>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-400"
                  checked={simulateBot}
                  onChange={(event) => handleSimulationToggle(event.target.checked)}
                />
                Simulate Bot
              </label>
              <button
                type="button"
                onClick={() => resetPuzzle(true)}
                className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Reset puzzle
              </button>
            </div>
          </header>

          <p className="mb-4 rounded-lg bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
            {statusText}
          </p>

          <div className="mb-4 grid gap-3 text-sm md:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              Progress: <span className="font-semibold">{puzzleProgress}%</span>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              Samples within tolerance:{" "}
              <span className="font-semibold">{withinTolerancePercent}%</span>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              Mistakes:{" "}
              <span className="font-semibold">{attemptRef.current.mistakes}</span>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <svg
              ref={svgRef}
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              className="h-[320px] w-full rounded-lg bg-gradient-to-br from-slate-50 to-slate-100"
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <path
                ref={pathRef}
                d={PATH_D}
                fill="none"
                stroke="#94a3b8"
                strokeWidth={14}
                strokeLinecap="round"
              />
              <path
                d={PATH_D}
                fill="none"
                stroke="#0f172a"
                strokeWidth={4}
                strokeDasharray="8 7"
                strokeLinecap="round"
              />
              <circle cx={START_POINT.x} cy={START_POINT.y} r={14} fill="#0ea5e9" />
              <circle cx={END_POINT.x} cy={END_POINT.y} r={14} fill="#22c55e" />
              <circle
                cx={handlePos.x}
                cy={handlePos.y}
                r={HANDLE_RADIUS}
                fill="#f97316"
                stroke="#ffffff"
                strokeWidth={2}
                onPointerDown={handlePointerDown}
                className={simulateBot ? "cursor-not-allowed" : "cursor-grab"}
              />
            </svg>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.1fr]">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h2 className="mb-2 text-lg font-semibold">Model Output</h2>
              <div className="mb-2 text-sm">
                Score: <span className="font-bold">{score}</span>
              </div>
              <div
                className={`inline-flex rounded-full px-4 py-2 text-xl font-bold tracking-wide ${
                  label === "HUMAN"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-rose-100 text-rose-700"
                }`}
              >
                {label}
              </div>
              {completed ? (
                <p
                  className={`mt-3 text-sm font-semibold ${
                    verificationText === "Verified"
                      ? "text-emerald-700"
                      : "text-rose-700"
                  }`}
                >
                  {verificationText}
                </p>
              ) : null}
              <p className="mt-4 text-xs text-slate-600">
                Privacy note: raw pointer traces never leave the device.
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
