/**
 * Telemetry capture — local-only pointer/keyboard event collection.
 *
 * Raw samples are held in memory only and NEVER sent to network or persisted.
 * Only derived TelemetrySummary and feature vectors are returned to the host.
 */

import type { PointerSample } from './types';

export interface TelemetryCaptureOptions {
  /** Max samples to retain (default 240) */
  maxSamples?: number;
  /** Sample rate in Hz (default 60) */
  sampleHz?: number;
  /** Disable pointer telemetry */
  disablePointer?: boolean;
  /** Disable keyboard telemetry */
  disableKeyboard?: boolean;
}

export interface KeySample {
  tMs: number;
  key: string;
  type: 'down' | 'up';
}

export class TelemetryCapture {
  private samples: PointerSample[] = [];
  private keySamples: KeySample[] = [];
  private startTime = 0;
  private lastSampleTime = 0;
  private minInterval: number; // ms between samples
  private maxSamples: number;
  private disablePointer: boolean;
  private disableKeyboard: boolean;
  private detectedPointerType: 'mouse' | 'touch' | 'pen' | 'unknown' = 'unknown';
  private outOfBoundsCount = 0;

  constructor(opts: TelemetryCaptureOptions = {}) {
    this.maxSamples = opts.maxSamples ?? 240;
    this.minInterval = 1000 / (opts.sampleHz ?? 60);
    this.disablePointer = opts.disablePointer ?? false;
    this.disableKeyboard = opts.disableKeyboard ?? false;
  }

  /** Call once when the puzzle transitions to "active" */
  start(): void {
    this.startTime = performance.now();
    this.lastSampleTime = 0;
    this.samples = [];
    this.keySamples = [];
    this.detectedPointerType = 'unknown';
    this.outOfBoundsCount = 0;
  }

  /** Reset all collected data */
  reset(): void {
    this.samples = [];
    this.keySamples = [];
    this.startTime = 0;
    this.lastSampleTime = 0;
    this.detectedPointerType = 'unknown';
    this.outOfBoundsCount = 0;
  }

  /**
   * Record a pointer sample. Handles down-sampling, clamping,
   * and devicePixelRatio normalization.
   */
  recordPointer(
    event: PointerEvent,
    widgetRect: DOMRect,
    sliderPosPx?: number,
  ): void {
    if (this.disablePointer) return;
    if (this.samples.length >= this.maxSamples) return;

    const now = performance.now();
    const tMs = Math.round(now - this.startTime);

    // Down-sample: skip if less than minInterval since last sample
    if (tMs - this.lastSampleTime < this.minInterval && this.samples.length > 0) {
      return;
    }
    this.lastSampleTime = tMs;

    // Detect pointer type
    if (this.detectedPointerType === 'unknown') {
      const pt = event.pointerType;
      if (pt === 'mouse' || pt === 'touch' || pt === 'pen') {
        this.detectedPointerType = pt;
      }
    }

    // Position relative to widget, normalized for devicePixelRatio
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    let xRaw = (event.clientX - widgetRect.left) * dpr;
    let yRaw = (event.clientY - widgetRect.top) * dpr;

    // Clamp to bounds; count out-of-bounds
    const wPx = widgetRect.width * dpr;
    const hPx = widgetRect.height * dpr;
    if (xRaw < 0 || xRaw > wPx || yRaw < 0 || yRaw > hPx) {
      this.outOfBoundsCount++;
    }
    xRaw = Math.max(0, Math.min(wPx, xRaw));
    yRaw = Math.max(0, Math.min(hPx, yRaw));

    this.samples.push({
      tMs,
      xPx: Math.round(xRaw),
      yPx: Math.round(yRaw),
      sliderPosPx: sliderPosPx != null ? Math.round(sliderPosPx) : undefined,
    });
  }

  /** Record a keyboard event */
  recordKey(event: KeyboardEvent): void {
    if (this.disableKeyboard) return;
    const tMs = Math.round(performance.now() - this.startTime);
    this.keySamples.push({
      tMs,
      key: event.key,
      type: event.type === 'keydown' ? 'down' : 'up',
    });
  }

  /** Get raw samples (internal use only – never expose externally) */
  getSamples(): readonly PointerSample[] {
    return this.samples;
  }

  getKeySamples(): readonly KeySample[] {
    return this.keySamples;
  }

  getPointerType(): 'mouse' | 'touch' | 'pen' | 'unknown' {
    return this.detectedPointerType;
  }

  getOutOfBoundsCount(): number {
    return this.outOfBoundsCount;
  }

  getSampleCount(): number {
    return this.samples.length;
  }
}
