/**
 * Slider puzzle engine — deterministic canvas rendering and interaction logic.
 *
 * Generates target offset from seed; renders track, cutout piece, and target gap.
 */

import { createRng, rngRange, rngInt } from './rng';
import type { Difficulty } from './types';

// ─── Puzzle geometry ────────────────────────────────────────────────────────

export interface SliderPuzzleParams {
  /** Target position (px from left of track) */
  targetPx: number;
  /** Tolerance in px */
  epsilonPx: number;
  /** Track width (CSS px) */
  trackWidthPx: number;
  /** Track height (CSS px) */
  trackHeightPx: number;
  /** Piece width/height */
  pieceSizePx: number;
  /** Gap vertical offset (from top of track) */
  gapTopPx: number;
  /** Hold-steady duration required (ms) */
  holdMs: number;
  /** Cosmetic: hue for background pattern */
  bgHue: number;
  /** Cosmetic: noise seed values */
  noiseSeeds: number[];
}

const EPSILON_MAP: Record<Difficulty, number> = {
  easy: 8,
  normal: 5,
  hard: 3,
};

const HOLD_MS_MAP: Record<Difficulty, number> = {
  easy: 0,
  normal: 200,
  hard: 250,
};

/**
 * Derive puzzle parameters deterministically from seed + difficulty.
 */
export function generateSliderPuzzle(
  seed: string,
  difficulty: Difficulty,
  trackWidthPx: number,
  trackHeightPx: number,
  epsilonOverride?: number,
): SliderPuzzleParams {
  const rng = createRng(seed);

  const pieceSizePx = Math.round(trackHeightPx * 0.55);

  // Target offset ratio in [0.2, 0.8]
  const targetRatio = rngRange(rng, 0.25, 0.75);
  const targetPx = Math.round(targetRatio * (trackWidthPx - pieceSizePx));

  const gapTopPx = Math.round((trackHeightPx - pieceSizePx) / 2);
  const bgHue = Math.round(rngRange(rng, 0, 360));

  const noiseSeeds: number[] = [];
  for (let i = 0; i < 6; i++) {
    noiseSeeds.push(rngInt(rng, 0, 255));
  }

  const epsilonPx = epsilonOverride ?? EPSILON_MAP[difficulty];
  const holdMs = HOLD_MS_MAP[difficulty];

  return {
    targetPx,
    epsilonPx,
    trackWidthPx,
    trackHeightPx,
    pieceSizePx,
    gapTopPx,
    holdMs,
    bgHue,
    noiseSeeds,
  };
}

// ─── Canvas rendering ───────────────────────────────────────────────────────

export interface RenderState {
  /** Current knob/piece position in CSS px from left of track */
  sliderPos: number;
  /** Whether the result is a success state right now */
  isAligned: boolean;
  /** Whether the puzzle is complete / verified */
  isComplete: boolean;
  /** Brightness pulse (0-1) for "almost there" feedback */
  alignPulse: number;
}

/**
 * Draw the full slider puzzle onto the given canvas context.
 * The canvas should be sized to trackWidthPx x trackHeightPx in CSS px
 * with the appropriate DPR scaling applied.
 */
export function drawSliderPuzzle(
  ctx: CanvasRenderingContext2D,
  params: SliderPuzzleParams,
  state: RenderState,
  theme: 'light' | 'dark',
  dpr: number,
): void {
  const { trackWidthPx, trackHeightPx, pieceSizePx, targetPx, gapTopPx, bgHue, noiseSeeds } =
    params;
  const w = trackWidthPx * dpr;
  const h = trackHeightPx * dpr;
  const ps = pieceSizePx * dpr;
  const tPx = targetPx * dpr;
  const gTop = gapTopPx * dpr;

  ctx.clearRect(0, 0, w, h);

  // ── Background with subtle noise pattern ────────────────────────────
  const isDark = theme === 'dark';
  const bgBase = isDark ? `hsl(${bgHue}, 15%, 18%)` : `hsl(${bgHue}, 25%, 88%)`;
  ctx.fillStyle = bgBase;
  ctx.fillRect(0, 0, w, h);

  // Subtle dot noise
  const dotColor = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  ctx.fillStyle = dotColor;
  const step = 12 * dpr;
  for (let nx = 0; nx < w; nx += step) {
    for (let ny = 0; ny < h; ny += step) {
      const idx = ((nx / step) * 17 + (ny / step) * 31 + noiseSeeds[0]) & 0xff;
      if (idx % 3 === 0) {
        ctx.fillRect(nx, ny, 2 * dpr, 2 * dpr);
      }
    }
  }

  // ── Track groove ────────────────────────────────────────────────────
  const trackY = h * 0.78;
  const trackH = 6 * dpr;
  const trackRadius = trackH / 2;
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.10)';
  roundRect(ctx, 8 * dpr, trackY - trackH / 2, w - 16 * dpr, trackH, trackRadius);
  ctx.fill();

  // ── Target gap (the hole the piece must align with) ─────────────────
  const gapBorder = isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.18)';
  const gapFill = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';
  ctx.strokeStyle = gapBorder;
  ctx.lineWidth = 2 * dpr;
  ctx.setLineDash([4 * dpr, 4 * dpr]);
  ctx.fillStyle = gapFill;
  roundRect(ctx, tPx, gTop, ps, ps, 6 * dpr);
  ctx.fill();
  ctx.stroke();
  ctx.setLineDash([]);

  // ── The draggable piece ─────────────────────────────────────────────
  const pieceX = state.sliderPos * dpr;

  // Alignment glow
  if (state.alignPulse > 0 && !state.isComplete) {
    ctx.save();
    ctx.shadowColor = 'rgba(34, 197, 94, 0.6)';
    ctx.shadowBlur = 16 * dpr * state.alignPulse;
    ctx.fillStyle = 'transparent';
    roundRect(ctx, pieceX, gTop, ps, ps, 6 * dpr);
    ctx.fill();
    ctx.restore();
  }

  // Piece body
  const pieceColor = state.isComplete
    ? 'rgba(34, 197, 94, 0.9)'
    : isDark
      ? `hsla(${bgHue}, 50%, 55%, 0.9)`
      : `hsla(${bgHue}, 55%, 45%, 0.9)`;
  ctx.fillStyle = pieceColor;
  roundRect(ctx, pieceX, gTop, ps, ps, 6 * dpr);
  ctx.fill();

  // Inner pattern on piece
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.2)';
  const innerMargin = 8 * dpr;
  for (let i = 0; i < 3; i++) {
    const ly = gTop + innerMargin + i * (ps - 2 * innerMargin) / 2;
    ctx.fillRect(pieceX + innerMargin, ly, ps - 2 * innerMargin, 2 * dpr);
  }

  // ── Slider knob on track ────────────────────────────────────────────
  const knobRadius = 10 * dpr;
  const knobX = pieceX + ps / 2;
  const knobY = trackY;
  ctx.beginPath();
  ctx.arc(knobX, knobY, knobRadius, 0, Math.PI * 2);
  ctx.fillStyle = state.isComplete
    ? 'rgba(34, 197, 94, 1)'
    : isDark
      ? '#e5e5e5'
      : '#333';
  ctx.fill();
  ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.2)';
  ctx.lineWidth = 1.5 * dpr;
  ctx.stroke();

  // ── Success checkmark ───────────────────────────────────────────────
  if (state.isComplete && state.isAligned) {
    const cx = w / 2;
    const cy = h / 2 - 12 * dpr;
    ctx.save();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3 * dpr;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 12 * dpr, cy);
    ctx.lineTo(cx - 3 * dpr, cy + 10 * dpr);
    ctx.lineTo(cx + 14 * dpr, cy - 8 * dpr);
    ctx.stroke();
    ctx.restore();
  }
}

/** Helper: draw a rounded rect path */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}
