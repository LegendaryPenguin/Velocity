'use client';

/**
 * <PuzzleVerify /> — Drop-in React widget for human verification via
 * a shape-align slider puzzle with local telemetry capture.
 *
 * See types.ts for full prop/result interfaces.
 */

import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from 'react';

import type {
  ChallengePayload,
  Difficulty,
  PuzzleVerifyHandle,
  PuzzleVerifyProps,
  Theme,
  VerifyResult,
  WidgetState,
} from './types';

import { generateSliderPuzzle, drawSliderPuzzle, type SliderPuzzleParams, type RenderState } from './sliderPuzzle';
import { TelemetryCapture } from './telemetry';
import { extractFeatures } from './features';

// ─── Constants ──────────────────────────────────────────────────────────────

const DEFAULT_MAX_DURATION_MS = 12_000;
const DEFAULT_SAMPLE_HZ = 60;
const TRACK_WIDTH = 340;
const TRACK_HEIGHT = 180;
const HOLD_CHECK_INTERVAL = 50; // ms

// ─── Component ──────────────────────────────────────────────────────────────

const PuzzleVerify = forwardRef<PuzzleVerifyHandle, PuzzleVerifyProps>(
  function PuzzleVerify(props, ref) {
    const {
      challenge,
      onVerified,
      onFailed,
      difficulty = 'normal',
      theme: themeProp,
      disableKeyboardTelemetry = false,
      disablePointerTelemetry = false,
      maxDurationMs = DEFAULT_MAX_DURATION_MS,
      epsilonPx: epsilonOverride,
      sampleHz = DEFAULT_SAMPLE_HZ,
      debug = false,
    } = props;

    // ── Resolve theme ─────────────────────────────────────────────────
    const [systemDark, setSystemDark] = useState(false);
    useEffect(() => {
      if (typeof window === 'undefined') return;
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      setSystemDark(mq.matches);
      const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }, []);
    const theme: Theme = themeProp ?? (systemDark ? 'dark' : 'light');

    // ── Refs ──────────────────────────────────────────────────────────
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const telemetryRef = useRef<TelemetryCapture | null>(null);
    const puzzleParamsRef = useRef<SliderPuzzleParams | null>(null);
    const animFrameRef = useRef<number>(0);
    const timeoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const holdTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef<number>(0);
    const holdStartRef = useRef<number>(0);
    const isDraggingRef = useRef(false);
    const sliderPosRef = useRef(0);
    const resultEmittedRef = useRef(false);

    // ── State ─────────────────────────────────────────────────────────
    const [widgetState, setWidgetState] = useState<WidgetState>('idle');
    const [sliderPos, setSliderPos] = useState(0);
    const [statusText, setStatusText] = useState('');
    const [alignPulse, setAlignPulse] = useState(0);

    // ── Puzzle params (memoized from seed) ────────────────────────────
    const puzzleParams = useMemo(() => {
      const p = generateSliderPuzzle(
        challenge.seed,
        difficulty,
        TRACK_WIDTH,
        TRACK_HEIGHT,
        epsilonOverride,
      );
      puzzleParamsRef.current = p;
      return p;
    }, [challenge.seed, difficulty, epsilonOverride]);

    // ── Telemetry instance ────────────────────────────────────────────
    useEffect(() => {
      telemetryRef.current = new TelemetryCapture({
        maxSamples: 240,
        sampleHz,
        disablePointer: disablePointerTelemetry,
        disableKeyboard: disableKeyboardTelemetry,
      });
    }, [sampleHz, disablePointerTelemetry, disableKeyboardTelemetry]);

    // ── Check expiry ──────────────────────────────────────────────────
    useEffect(() => {
      if (Date.now() > challenge.expiresAt) {
        setWidgetState('expired');
        setStatusText('Challenge expired');
      } else {
        setWidgetState('ready');
        setStatusText('Drag to align the piece');
      }
    }, [challenge.expiresAt, challenge.challengeId]);

    // ── Canvas DPR + draw ─────────────────────────────────────────────
    const draw = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas || !puzzleParams) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = puzzleParams.trackWidthPx * dpr;
      canvas.height = puzzleParams.trackHeightPx * dpr;
      canvas.style.width = `${puzzleParams.trackWidthPx}px`;
      canvas.style.height = `${puzzleParams.trackHeightPx}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const renderState: RenderState = {
        sliderPos: sliderPosRef.current,
        isAligned: Math.abs(sliderPosRef.current - puzzleParams.targetPx) <= puzzleParams.epsilonPx,
        isComplete: widgetState === 'verified' || widgetState === 'failed',
        alignPulse,
      };

      drawSliderPuzzle(ctx, puzzleParams, renderState, theme, dpr);
    }, [puzzleParams, theme, alignPulse, widgetState]);

    // Redraw on each frame when dragging / state changes
    useEffect(() => {
      draw();
    }, [draw, sliderPos, widgetState]);

    // ── Emit result ───────────────────────────────────────────────────
    const emitResult = useCallback(
      (status: VerifyResult['status'], success: boolean) => {
        if (resultEmittedRef.current) return;
        resultEmittedRef.current = true;

        const tel = telemetryRef.current;
        const pp = puzzleParamsRef.current;
        if (!tel || !pp) return;

        const durationMs = performance.now() - startTimeRef.current;
        const finalErrorPx = Math.abs(sliderPosRef.current - pp.targetPx);

        const { features, telemetrySummary } = extractFeatures(
          {
            samples: tel.getSamples(),
            targetPx: pp.targetPx,
            durationMs,
          },
          tel.getPointerType(),
        );

        const result: VerifyResult = {
          challengeId: challenge.challengeId,
          challengeField: challenge.challengeField,
          seed: challenge.seed,
          status,
          puzzle: {
            type: 'slider',
            success,
            finalErrorPx: Math.round(finalErrorPx),
            durationMs: Math.round(durationMs),
          },
          features,
          telemetrySummary,
        };

        if (success) {
          onVerified(result);
        } else {
          onFailed?.(result);
        }
      },
      [challenge, onVerified, onFailed],
    );

    // ── Complete: verified ────────────────────────────────────────────
    const completeVerified = useCallback(() => {
      setWidgetState('verified');
      setStatusText('Verified ✓');
      emitResult('verified', true);
      cleanup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emitResult]);

    // ── Complete: failed / timeout ────────────────────────────────────
    const completeFailed = useCallback(
      (reason: 'failed' | 'timeout' | 'expired') => {
        setWidgetState(reason);
        setStatusText(
          reason === 'timeout'
            ? 'Time expired'
            : reason === 'expired'
              ? 'Challenge expired'
              : 'Not aligned — try again',
        );
        emitResult(reason, false);
        cleanup();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [emitResult],
    );

    // ── Cleanup timers ────────────────────────────────────────────────
    const cleanup = useCallback(() => {
      if (timeoutTimerRef.current) {
        clearTimeout(timeoutTimerRef.current);
        timeoutTimerRef.current = null;
      }
      if (holdTimerRef.current) {
        clearInterval(holdTimerRef.current);
        holdTimerRef.current = null;
      }
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = 0;
      }
    }, []);

    // Cleanup on unmount
    useEffect(() => cleanup, [cleanup]);

    // ── Start session (on first interaction) ──────────────────────────
    const startSession = useCallback(() => {
      if (widgetState !== 'ready') return;
      if (Date.now() > challenge.expiresAt) {
        completeFailed('expired');
        return;
      }
      setWidgetState('active');
      startTimeRef.current = performance.now();
      resultEmittedRef.current = false;
      telemetryRef.current?.start();

      // Global timeout
      timeoutTimerRef.current = setTimeout(() => {
        completeFailed('timeout');
      }, maxDurationMs);
    }, [widgetState, challenge.expiresAt, maxDurationMs, completeFailed]);

    // ── Hold-steady check ─────────────────────────────────────────────
    const startHoldCheck = useCallback(() => {
      const pp = puzzleParamsRef.current;
      if (!pp || pp.holdMs <= 0) {
        // No hold required — immediate verify
        completeVerified();
        return;
      }
      holdStartRef.current = performance.now();
      if (holdTimerRef.current) clearInterval(holdTimerRef.current);
      holdTimerRef.current = setInterval(() => {
        if (!pp) return;
        const aligned =
          Math.abs(sliderPosRef.current - pp.targetPx) <= pp.epsilonPx;
        if (!aligned) {
          // Drifted out — reset hold timer
          holdStartRef.current = 0;
          setAlignPulse(0);
          if (holdTimerRef.current) clearInterval(holdTimerRef.current);
          holdTimerRef.current = null;
          return;
        }
        const held = performance.now() - holdStartRef.current;
        setAlignPulse(Math.min(1, held / pp.holdMs));
        if (held >= pp.holdMs) {
          completeVerified();
        }
      }, HOLD_CHECK_INTERVAL);
    }, [completeVerified]);

    // ── Pointer event handlers ────────────────────────────────────────
    const getSliderX = useCallback(
      (clientX: number): number => {
        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect || !puzzleParams) return 0;
        const x = clientX - rect.left;
        const maxX = puzzleParams.trackWidthPx - puzzleParams.pieceSizePx;
        return Math.max(0, Math.min(maxX, x - puzzleParams.pieceSizePx / 2));
      },
      [puzzleParams],
    );

    const onPointerDown = useCallback(
      (e: React.PointerEvent) => {
        if (widgetState === 'verified' || widgetState === 'failed' || widgetState === 'timeout' || widgetState === 'expired') return;
        e.preventDefault();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        isDraggingRef.current = true;

        if (widgetState === 'ready') startSession();

        const pos = getSliderX(e.clientX);
        sliderPosRef.current = pos;
        setSliderPos(pos);

        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          telemetryRef.current?.recordPointer(
            e.nativeEvent,
            rect,
            pos,
          );
        }
      },
      [widgetState, startSession, getSliderX],
    );

    const onPointerMove = useCallback(
      (e: React.PointerEvent) => {
        if (!isDraggingRef.current || widgetState !== 'active') return;
        e.preventDefault();

        const pos = getSliderX(e.clientX);
        sliderPosRef.current = pos;
        setSliderPos(pos);

        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          telemetryRef.current?.recordPointer(
            e.nativeEvent,
            rect,
            pos,
          );
        }

        // Check near-target pulse
        if (puzzleParams) {
          const error = Math.abs(pos - puzzleParams.targetPx);
          if (error <= puzzleParams.epsilonPx * 3) {
            setAlignPulse(Math.max(0, 1 - error / (puzzleParams.epsilonPx * 3)));
          } else {
            setAlignPulse(0);
          }
        }
      },
      [widgetState, getSliderX, puzzleParams],
    );

    const onPointerUp = useCallback(
      (e: React.PointerEvent) => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;

        const rect = canvasRef.current?.getBoundingClientRect();
        if (rect) {
          telemetryRef.current?.recordPointer(
            e.nativeEvent,
            rect,
            sliderPosRef.current,
          );
        }

        if (widgetState !== 'active') return;

        // Check alignment
        const pp = puzzleParamsRef.current;
        if (!pp) return;
        const error = Math.abs(sliderPosRef.current - pp.targetPx);
        if (error <= pp.epsilonPx) {
          startHoldCheck();
        }
      },
      [widgetState, startHoldCheck],
    );

    // ── Keyboard events ───────────────────────────────────────────────
    const onKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disableKeyboardTelemetry) return;
        telemetryRef.current?.recordKey(e.nativeEvent);

        if (widgetState !== 'active' && widgetState !== 'ready') return;
        if (widgetState === 'ready') startSession();

        const step = e.shiftKey ? 10 : 2;
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const dir = e.key === 'ArrowRight' ? 1 : -1;
          const maxX = puzzleParams
            ? puzzleParams.trackWidthPx - puzzleParams.pieceSizePx
            : TRACK_WIDTH;
          const nextPos = Math.max(0, Math.min(maxX, sliderPosRef.current + dir * step));
          sliderPosRef.current = nextPos;
          setSliderPos(nextPos);
        }
      },
      [widgetState, startSession, puzzleParams, disableKeyboardTelemetry],
    );

    const onKeyUp = useCallback(
      (e: React.KeyboardEvent) => {
        if (disableKeyboardTelemetry) return;
        telemetryRef.current?.recordKey(e.nativeEvent);

        // On key release, check alignment
        if (widgetState === 'active' && puzzleParams) {
          const error = Math.abs(sliderPosRef.current - puzzleParams.targetPx);
          if (error <= puzzleParams.epsilonPx) {
            startHoldCheck();
          }
        }
      },
      [widgetState, puzzleParams, startHoldCheck, disableKeyboardTelemetry],
    );

    // ── Imperative reset ──────────────────────────────────────────────
    const reset = useCallback(() => {
      cleanup();
      resultEmittedRef.current = false;
      isDraggingRef.current = false;
      sliderPosRef.current = 0;
      setSliderPos(0);
      setAlignPulse(0);
      telemetryRef.current?.reset();
      if (Date.now() > challenge.expiresAt) {
        setWidgetState('expired');
        setStatusText('Challenge expired');
      } else {
        setWidgetState('ready');
        setStatusText('Drag to align the piece');
      }
    }, [cleanup, challenge.expiresAt]);

    useImperativeHandle(ref, () => ({ reset }), [reset]);

    // ── Derived ───────────────────────────────────────────────────────
    const isDark = theme === 'dark';
    const isTerminal =
      widgetState === 'verified' ||
      widgetState === 'failed' ||
      widgetState === 'timeout' ||
      widgetState === 'expired';

    // ── Render ────────────────────────────────────────────────────────
    return (
      <div
        ref={containerRef}
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          padding: 16,
          borderRadius: 12,
          background: isDark ? '#1a1a2e' : '#f8f9fb',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: 14,
          color: isDark ? '#e5e5e5' : '#222',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          touchAction: 'none',
          contain: 'layout style',
          maxWidth: '100%',
        }}
        tabIndex={0}
        role="application"
        aria-label="Puzzle verification: drag slider to align the piece"
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      >
        {/* Instruction / status text */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            height: 24,
            fontSize: 13,
            fontWeight: 500,
            color:
              widgetState === 'verified'
                ? '#22c55e'
                : widgetState === 'timeout' || widgetState === 'expired' || widgetState === 'failed'
                  ? '#ef4444'
                  : isDark
                    ? '#a1a1aa'
                    : '#71717a',
          }}
        >
          {widgetState === 'verified' && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="#22c55e" strokeWidth="1.5" fill="rgba(34,197,94,0.1)" />
              <path d="M5 8.5l2 2 4-4.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {statusText}
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{
            cursor: isTerminal
              ? 'default'
              : isDraggingRef.current
                ? 'grabbing'
                : 'grab',
            borderRadius: 8,
            outline: 'none',
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />

        {/* Debug overlay */}
        {debug && (
          <pre
            style={{
              fontSize: 10,
              lineHeight: 1.4,
              color: isDark ? '#888' : '#aaa',
              margin: 0,
              maxWidth: TRACK_WIDTH,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            state={widgetState} pos={Math.round(sliderPosRef.current)} target=
            {puzzleParams?.targetPx} eps={puzzleParams?.epsilonPx} samples=
            {telemetryRef.current?.getSampleCount() ?? 0}
          </pre>
        )}

        {/* Branding line */}
        <div
          style={{
            fontSize: 10,
            color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)',
            letterSpacing: 0.5,
          }}
        >
          PuzzleVerify
        </div>
      </div>
    );
  },
);

PuzzleVerify.displayName = 'PuzzleVerify';

export default PuzzleVerify;
