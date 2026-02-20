/**
 * Feature extraction — deterministic computation of compact integer feature
 * vector from raw pointer samples and puzzle parameters.
 *
 * Feature vector order (featuresVersion = 1):
 *   [0] durationMs
 *   [1] timeToFirstMoveMs
 *   [2] meanSpeed   (px/ms * 100, integer)
 *   [3] maxSpeed    (px/ms * 100, integer)
 *   [4] reversalsCount
 *   [5] overshootPx (max beyond target, integer px)
 *   [6] finalErrorPx (absolute, integer px)
 *   [7] correctionsCount (sign changes near target in last 500 ms)
 *   [8] jitterScore (sum |deltaPos| in last 500 ms, integer px)
 *   [9] pauseCount
 *   [10] pauseDurationMs
 */

import type { PointerSample, TelemetrySummary } from './types';

export const FEATURES_VERSION = 1;

/** Pause = speed < threshold for > 120 ms */
const PAUSE_SPEED_THRESHOLD = 0.02; // px/ms
const PAUSE_MIN_DURATION_MS = 120;
const JITTER_WINDOW_MS = 500;
const CORRECTION_WINDOW_MS = 500;

export interface FeatureExtractionInput {
  samples: readonly PointerSample[];
  targetPx: number;
  /** Track axis = x; slider position stored in sliderPosPx */
  durationMs: number;
}

export interface FeatureExtractionOutput {
  features: number[];
  telemetrySummary: TelemetrySummary;
}

/**
 * Compute the feature vector and telemetry summary from raw samples.
 * This function is pure and deterministic.
 */
export function extractFeatures(
  input: FeatureExtractionInput,
  pointerType: 'mouse' | 'touch' | 'pen' | 'unknown',
): FeatureExtractionOutput {
  const { samples, targetPx, durationMs } = input;

  // ── Slider positions ──────────────────────────────────────────────────
  // Use sliderPosPx where available, else fall back to xPx
  const positions = samples.map((s) => s.sliderPosPx ?? s.xPx);
  const times = samples.map((s) => s.tMs);

  // ── Duration ──────────────────────────────────────────────────────────
  const totalDuration = Math.round(durationMs);

  // ── Time to first move ────────────────────────────────────────────────
  let timeToFirstMoveMs = totalDuration;
  if (samples.length >= 2) {
    for (let i = 1; i < samples.length; i++) {
      if (positions[i] !== positions[0]) {
        timeToFirstMoveMs = times[i];
        break;
      }
    }
  }

  // ── Speeds (px/ms) between consecutive samples ────────────────────────
  const speeds: number[] = [];
  for (let i = 1; i < samples.length; i++) {
    const dt = times[i] - times[i - 1];
    if (dt <= 0) {
      speeds.push(0);
      continue;
    }
    const dx = Math.abs(positions[i] - positions[i - 1]);
    speeds.push(dx / dt);
  }

  const meanSpeed = speeds.length > 0
    ? speeds.reduce((a, b) => a + b, 0) / speeds.length
    : 0;
  const maxSpeed = speeds.length > 0 ? Math.max(...speeds) : 0;

  // ── Reversals (direction changes on slider axis) ──────────────────────
  let reversals = 0;
  let prevDir = 0; // -1 left, +1 right, 0 none
  for (let i = 1; i < positions.length; i++) {
    const diff = positions[i] - positions[i - 1];
    const dir = diff > 0 ? 1 : diff < 0 ? -1 : 0;
    if (dir !== 0 && prevDir !== 0 && dir !== prevDir) {
      reversals++;
    }
    if (dir !== 0) prevDir = dir;
  }

  // ── Overshoot ─────────────────────────────────────────────────────────
  let overshootPx = 0;
  for (const pos of positions) {
    const over = pos - targetPx;
    // overshoot = max by which slider went past target (positive direction)
    if (Math.abs(over) > Math.abs(overshootPx)) {
      overshootPx = over;
    }
  }
  // We care about the magnitude of the farthest overshoot beyond target
  overshootPx = Math.abs(overshootPx);

  // ── Final error ───────────────────────────────────────────────────────
  const finalPos = positions.length > 0 ? positions[positions.length - 1] : 0;
  const finalErrorPx = Math.abs(finalPos - targetPx);

  // ── Corrections near target in last CORRECTION_WINDOW_MS ──────────────
  let correctionsCount = 0;
  if (samples.length >= 2) {
    const cutoff = totalDuration - CORRECTION_WINDOW_MS;
    let prevSign = 0;
    for (let i = 1; i < samples.length; i++) {
      if (times[i] < cutoff) continue;
      const diff = positions[i] - positions[i - 1];
      const sign = diff > 0 ? 1 : diff < 0 ? -1 : 0;
      if (sign !== 0 && prevSign !== 0 && sign !== prevSign) {
        correctionsCount++;
      }
      if (sign !== 0) prevSign = sign;
    }
  }

  // ── Jitter in last JITTER_WINDOW_MS ───────────────────────────────────
  let jitterScore = 0;
  {
    const cutoff = totalDuration - JITTER_WINDOW_MS;
    for (let i = 1; i < samples.length; i++) {
      if (times[i] < cutoff) continue;
      jitterScore += Math.abs(positions[i] - positions[i - 1]);
    }
  }

  // ── Pauses ────────────────────────────────────────────────────────────
  let pauseCount = 0;
  let pauseDurationMs = 0;
  {
    let pauseStart: number | null = null;
    for (let i = 0; i < speeds.length; i++) {
      if (speeds[i] < PAUSE_SPEED_THRESHOLD) {
        if (pauseStart === null) {
          pauseStart = times[i];
        }
      } else {
        if (pauseStart !== null) {
          const dur = times[i] - pauseStart;
          if (dur >= PAUSE_MIN_DURATION_MS) {
            pauseCount++;
            pauseDurationMs += dur;
          }
          pauseStart = null;
        }
      }
    }
    // Close open pause at end
    if (pauseStart !== null && samples.length > 0) {
      const dur = times[times.length - 1] - pauseStart;
      if (dur >= PAUSE_MIN_DURATION_MS) {
        pauseCount++;
        pauseDurationMs += dur;
      }
    }
  }

  // ── Assemble feature vector (all integers) ────────────────────────────
  const features: number[] = [
    Math.round(totalDuration),              // [0] durationMs
    Math.round(timeToFirstMoveMs),          // [1] timeToFirstMoveMs
    Math.round(meanSpeed * 100),            // [2] meanSpeed scaled
    Math.round(maxSpeed * 100),             // [3] maxSpeed scaled
    reversals,                               // [4] reversalsCount
    Math.round(overshootPx),                // [5] overshootPx
    Math.round(finalErrorPx),              // [6] finalErrorPx
    correctionsCount,                        // [7] correctionsCount
    Math.round(jitterScore),               // [8] jitterScore
    pauseCount,                              // [9] pauseCount
    Math.round(pauseDurationMs),            // [10] pauseDurationMs
  ];

  const telemetrySummary: TelemetrySummary = {
    samples: samples.length,
    pointerType,
    reversals,
    overshootPx: Math.round(overshootPx),
    meanSpeed: Math.round(meanSpeed * 100),
    maxSpeed: Math.round(maxSpeed * 100),
    jitterScore: Math.round(jitterScore),
    timeToFirstMoveMs: Math.round(timeToFirstMoveMs),
    pauses: pauseCount,
    pauseDurationMs: Math.round(pauseDurationMs),
  };

  return { features, telemetrySummary };
}
