// ─── PuzzleVerify Types ─────────────────────────────────────────────────────

/** Backend-issued challenge payload */
export interface ChallengePayload {
  /** Unique identifier for backend session tracking */
  challengeId: string;
  /** Random field element (stringified integer) to bind ZK proof to session */
  challengeField: string;
  /** Deterministic puzzle seed (string) */
  seed: string;
  /** Unix ms timestamp – challenge becomes invalid after this */
  expiresAt: number;
}

/** Aggregate telemetry stats (no raw trace) */
export interface TelemetrySummary {
  samples: number;
  pointerType: 'mouse' | 'touch' | 'pen' | 'unknown';
  reversals: number;
  overshootPx: number;
  meanSpeed: number;
  maxSpeed: number;
  jitterScore: number;
  timeToFirstMoveMs: number;
  pauses: number;
  pauseDurationMs: number;
}

/** Puzzle-specific outcome metrics */
export interface PuzzleOutcome {
  type: 'slider';
  success: boolean;
  finalErrorPx: number;
  durationMs: number;
}

/** Result returned via onVerified / onFailed callbacks */
export interface VerifyResult {
  challengeId: string;
  challengeField: string;
  seed: string;
  status: 'verified' | 'failed' | 'expired' | 'timeout';
  puzzle: PuzzleOutcome;
  /** Compact numeric feature vector (integers) – fixed order, versioned */
  features: number[];
  telemetrySummary: TelemetrySummary;
  /** Optional proof payload (stub for MVP) */
  proofPayload?: { proof: unknown; publicSignals: string[] };
}

/** Widget difficulty */
export type Difficulty = 'easy' | 'normal' | 'hard';

/** Widget theme */
export type Theme = 'light' | 'dark';

/** Widget state machine states */
export type WidgetState = 'idle' | 'ready' | 'active' | 'verified' | 'failed' | 'timeout' | 'expired';

/** Props for <PuzzleVerify /> */
export interface PuzzleVerifyProps {
  challenge: ChallengePayload;
  onVerified: (result: VerifyResult) => void;
  onFailed?: (result: VerifyResult) => void;
  difficulty?: Difficulty;
  theme?: Theme;
  disableKeyboardTelemetry?: boolean;
  disablePointerTelemetry?: boolean;
  /** Maximum time to complete puzzle, ms (default 12 000) */
  maxDurationMs?: number;
  /** Alignment tolerance in px (overrides difficulty default) */
  epsilonPx?: number;
  /** Pointer telemetry sample rate (default 60) */
  sampleHz?: number;
  /** Show debug overlay */
  debug?: boolean;
}

/** Imperative handle exposed via React.forwardRef */
export interface PuzzleVerifyHandle {
  reset: () => void;
}

// ─── Internal types (not exported from package barrel) ──────────────────────

/** Single pointer sample captured in-memory only */
export interface PointerSample {
  /** Milliseconds since puzzle start */
  tMs: number;
  /** X position relative to widget bounds, integer px */
  xPx: number;
  /** Y position relative to widget bounds, integer px */
  yPx: number;
  /** Current slider knob position on track axis, integer px */
  sliderPosPx?: number;
}
