"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { PatternIcon } from "@/components/faucet/PatternIcon";
import { useReducedMotionPref } from "@/hooks/useReducedMotionPref";
import {
  BOT_STEP_INTERVAL_MS,
  ExportedJson,
  Features,
  generateBotPath,
  generatePuzzle,
  INITIAL_SEED,
  MouseSample,
  Puzzle,
  runModel,
  computeFeatures,
  toExportJson,
  ZERO_FEATURES,
} from "@/lib/captchaModel";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onVerifiedHuman: (payload: ExportedJson, score: number) => void;
};

export function CaptchaModal({ isOpen, onClose, onVerifiedHuman }: Props) {
  const reducedMotion = useReducedMotionPref();
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
  const [verifyLoading, setVerifyLoading] = useState(false);

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
  const dialogRef = useRef<HTMLDivElement>(null);

  const tileClickRef = useRef<(index: number, cx?: number, cy?: number) => void>(() => {});
  const verifyRef = useRef<() => void>(() => {});

  const clearBotTimers = () => {
    botTimersRef.current.forEach(clearTimeout);
    botTimersRef.current = [];
    botRafRef.current.forEach(cancelAnimationFrame);
    botRafRef.current = [];
  };

  useEffect(() => () => clearBotTimers(), []);

  const resetTelemetry = () => {
    clickTsRef.current = [];
    uniqueTilesRef.current = new Set();
    verifyAttRef.current = 0;
    mistakesRef.current = 0;
    startTimeRef.current = null;
    activeRef.current = false;
    mousePathRef.current = [];
    clickPosRef.current = [];
    pausesRef.current = [];
    lastMoveRef.current = null;
  };

  const refreshFeatures = useCallback((endTime: number | null) => {
    const f = computeFeatures(
      clickTsRef.current,
      uniqueTilesRef.current,
      verifyAttRef.current,
      mistakesRef.current,
      blurCountRef.current,
      resetCountRef.current,
      startTimeRef.current,
      endTime,
      mousePathRef.current,
      clickPosRef.current,
      pausesRef.current,
    );
    const m = runModel(f);
    setFeatures(f);
    setModelScore(m.score);
    setModelLabel(m.label);
    return { features: f, model: m };
  }, []);

  const newPuzzle = useCallback(() => {
    clearBotTimers();
    setBotCursorVisible(false);
    setBotCursorPos(null);
    const seed = Date.now();
    setPuzzle(generatePuzzle(seed));
    setSelected(new Set());
    setSolved(false);
    setVerified(false);
    setVerifyLoading(false);
    setIncorrectTiles(new Set());
    setMissedTiles(new Set());
    resetCountRef.current += 1;
    resetTelemetry();
    refreshFeatures(null);
  }, [refreshFeatures]);

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

  // Reset and autofocus whenever modal opens
  useEffect(() => {
    if (!isOpen) return;
    newPuzzle();
    const t = setTimeout(() => dialogRef.current?.focus(), 40);
    return () => clearTimeout(t);
  }, [isOpen, newPuzzle]);

  // Focus trap + escape
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !simulateBot) onClose();
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>("button,input,[tabindex]:not([tabindex='-1'])"),
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, simulateBot]);

  // Mouse tracking
  useEffect(() => {
    if (!isOpen) return;
    const grid = gridRef.current;
    if (!grid || simulateBot) return;
    const onMove = (e: MouseEvent) => {
      if (!activeRef.current && startTimeRef.current === null) return;
      const now = performance.now();
      const r = grid.getBoundingClientRect();
      mousePathRef.current.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: now });
      lastMoveRef.current = now;
    };
    grid.addEventListener("mousemove", onMove);
    return () => grid.removeEventListener("mousemove", onMove);
  }, [simulateBot, isOpen]);

  const getTileCenter = useCallback((idx: number) => {
    const grid = gridRef.current;
    if (!grid) return null;
    const tile = grid.children[idx] as HTMLElement | undefined;
    if (!tile) return null;
    const gr = grid.getBoundingClientRect();
    const tr = tile.getBoundingClientRect();
    return { x: tr.left - gr.left + tr.width / 2, y: tr.top - gr.top + tr.height / 2 };
  }, []);

  const handleTileClick = useCallback(
    (index: number, cx?: number, cy?: number) => {
      if (solved && verified) return;
      if (incorrectTiles.size > 0 || missedTiles.size > 0) {
        setIncorrectTiles(new Set());
        setMissedTiles(new Set());
      }
      const now = performance.now();
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
        activeRef.current = true;
      }
      clickTsRef.current.push(now);
      uniqueTilesRef.current.add(index);

      if (lastMoveRef.current !== null) pausesRef.current.push(now - lastMoveRef.current);

      const center = getTileCenter(index);
      if (center && cx !== undefined && cy !== undefined) {
        clickPosRef.current.push({ x: cx, y: cy, tileCenterX: center.x, tileCenterY: center.y });
      } else if (center) {
        const off = 5 + Math.random() * 15;
        const ang = Math.random() * Math.PI * 2;
        clickPosRef.current.push({
          x: center.x + Math.cos(ang) * off,
          y: center.y + Math.sin(ang) * off,
          tileCenterX: center.x,
          tileCenterY: center.y,
        });
      }
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(index)) next.delete(index);
        else next.add(index);
        return next;
      });
      refreshFeatures(now);
    },
    [solved, verified, incorrectTiles, missedTiles, getTileCenter, refreshFeatures],
  );

  const handleHumanTileClick = useCallback(
    (idx: number, e: React.MouseEvent) => {
      const grid = gridRef.current;
      if (!grid) return handleTileClick(idx);
      const r = grid.getBoundingClientRect();
      handleTileClick(idx, e.clientX - r.left, e.clientY - r.top);
    },
    [handleTileClick],
  );

  const handleVerify = useCallback(() => {
    if (solved && verified) return;
    setVerifyLoading(true);
    const timer = setTimeout(() => {
      const now = performance.now();
      verifyAttRef.current += 1;
      const fp = new Set([...selected].filter((i) => !puzzle.targetIndices.has(i)));
      const fn = new Set([...puzzle.targetIndices].filter((i) => !selected.has(i)));
      mistakesRef.current += fp.size + fn.size;
      const correct = fp.size === 0 && fn.size === 0;
      if (!correct && !simulateBot) {
        setIncorrectTiles(fp);
        setMissedTiles(fn);
        refreshFeatures(now);
        setVerifyLoading(false);
        return;
      }

      setIncorrectTiles(new Set());
      setMissedTiles(new Set());
      setSolved(true);
      setVerified(true);
      const { features: f, model } = refreshFeatures(now);
      if (simulateBot) {
        setModelLabel("BOT");
      } else {
        setModelLabel("HUMAN");
        onVerifiedHuman(toExportJson(model.score), model.score);
      }
      setFeatures(f);
      setModelScore(model.score);
      setVerifyLoading(false);
    }, 450);
    botTimersRef.current.push(timer);
  }, [solved, verified, selected, puzzle, simulateBot, onVerifiedHuman, refreshFeatures]);

  useEffect(() => {
    tileClickRef.current = handleTileClick;
    verifyRef.current = handleVerify;
  }, [handleTileClick, handleVerify]);

  const startBotSim = useCallback(() => {
    clearBotTimers();
    const seed = Date.now();
    const p = generatePuzzle(seed);
    setPuzzle(p);
    setSelected(new Set());
    setSolved(false);
    setVerified(false);
    resetTelemetry();
    resetCountRef.current = 0;
    refreshFeatures(null);

    const targets = [...p.targetIndices];
    const schedule = setTimeout(() => {
      setBotCursorVisible(true);
      const g = gridRef.current;
      if (!g) return;
      const gr = g.getBoundingClientRect();
      const center = (idx: number) => {
        const el = g.children[idx] as HTMLElement | undefined;
        if (!el) return { x: gr.width / 2, y: gr.height / 2 };
        const r = el.getBoundingClientRect();
        return { x: r.left - gr.left + r.width / 2, y: r.top - gr.top + r.height / 2 };
      };

      let cx = gr.width / 2;
      let cy = -20;
      let totalDelay = 0;
      startTimeRef.current = performance.now();
      activeRef.current = true;

      targets.forEach((tileIdx) => {
        const moveDuration = 220 + Math.random() * 60;
        const pauseBefore = 30 + Math.random() * 30;
        const stepStart = totalDelay;
        const fromX = cx;
        const fromY = cy;
        const tm = setTimeout(() => {
          const tgt = center(tileIdx);
          const path = generateBotPath(fromX, fromY, tgt.x, tgt.y, moveDuration);
          const animStart = performance.now();
          path.forEach((s) => mousePathRef.current.push({ x: s.x, y: s.y, t: animStart + s.t }));
          const totalPathTime = path[path.length - 1].t;
          const animate = () => {
            const elapsed = performance.now() - animStart;
            if (elapsed >= totalPathTime) {
              setBotCursorPos({ x: path[path.length - 1].x, y: path[path.length - 1].y });
              return;
            }
            const frac = elapsed / totalPathTime;
            const idx = Math.min(Math.floor(frac * path.length), path.length - 1);
            setBotCursorPos({ x: path[idx].x, y: path[idx].y });
            botRafRef.current.push(requestAnimationFrame(animate));
          };
          botRafRef.current.push(requestAnimationFrame(animate));
          const clickTm = setTimeout(() => {
            const c = center(tileIdx);
            const clx = c.x + (Math.random() - 0.5) * 1.5;
            const cly = c.y + (Math.random() - 0.5) * 1.5;
            setBotCursorPos({ x: clx, y: cly });
            lastMoveRef.current = performance.now() - pauseBefore;
            tileClickRef.current(tileIdx, clx, cly);
          }, moveDuration + pauseBefore);
          botTimersRef.current.push(clickTm);
        }, 300 + stepStart);
        botTimersRef.current.push(tm);
        const tgt = center(tileIdx);
        cx = tgt.x;
        cy = tgt.y;
        totalDelay += moveDuration + pauseBefore + BOT_STEP_INTERVAL_MS;
      });

      const verifyTm = setTimeout(() => {
        setBotCursorVisible(false);
        verifyRef.current();
      }, 300 + totalDelay + 220);
      botTimersRef.current.push(verifyTm);
    }, 120);
    botTimersRef.current.push(schedule);
  }, [refreshFeatures]);

  const handleBotToggle = useCallback(
    (next: boolean) => {
      setSimulateBot(next);
      if (next) startBotSim();
      else {
        clearBotTimers();
        setBotCursorVisible(false);
        setBotCursorPos(null);
        newPuzzle();
      }
    },
    [newPuzzle, startBotSim],
  );

  const modalTone = useMemo(() => {
    if (incorrectTiles.size > 0 || missedTiles.size > 0) return "bg-red-500/80";
    if (verified && solved) return modelLabel === "HUMAN" ? "bg-emerald-500/80" : "bg-red-500/80";
    return "bg-purple-600/65";
  }, [incorrectTiles, missedTiles, verified, solved, modelLabel]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/62 ${
        reducedMotion ? "" : "animate-in fade-in duration-300"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget && !simulateBot) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={`relative mx-4 w-[92vw] max-w-[420px] overflow-hidden rounded-2xl border border-white/12 bg-[#1e1033] shadow-2xl outline-none ${
          reducedMotion ? "" : "animate-in zoom-in-95 fade-in duration-300"
        }`}
      >
        {!simulateBot && (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        <div className={`px-5 pb-4 pt-5 transition-colors duration-300 ${modalTone}`}>
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/70">
            Step 1: Prove humanity
          </p>
          {incorrectTiles.size > 0 || missedTiles.size > 0 ? (
            <>
              <h2 className="text-xl font-bold text-white">Try Again</h2>
              <p className="mt-1 text-[13px] text-white/80">Adjust your selection and verify again.</p>
            </>
          ) : verified && solved ? (
            <>
              <h2 className="text-xl font-bold text-white">
                {modelLabel === "HUMAN" ? "Access Granted" : "Classified as Bot"}
              </h2>
              <p className="mt-1 text-[13px] text-white/80">
                {modelLabel === "HUMAN"
                  ? `Behavioral score ${modelScore} accepted.`
                  : "Behavior did not meet the human threshold."}
              </p>
            </>
          ) : (
            <>
              <p className="text-[13px] text-white/65">Select all squares with</p>
              <h2 className="mt-0.5 text-2xl font-bold capitalize text-white">{puzzle.target}s</h2>
              <p className="mt-1 text-[13px] text-white/55">If there are none, click skip</p>
            </>
          )}
        </div>

        <div className="relative max-h-[54vh] overflow-y-auto">
          <div ref={gridRef} className="grid grid-cols-4 gap-[2px] bg-white/6 p-[2px]">
            {puzzle.tiles.map((pattern, i) => {
              const isSel = selected.has(i);
              const isWrong = incorrectTiles.has(i);
              const isMissed = missedTiles.has(i);
              const hasErr = isWrong || isMissed;
              return (
                <button
                  key={i}
                  type="button"
                  disabled={simulateBot}
                  onClick={(e) => handleHumanTileClick(i, e)}
                  className={`relative flex aspect-square min-h-11 items-center justify-center transition-all duration-150 ${
                    hasErr
                      ? "bg-red-500/20 ring-2 ring-inset ring-red-400"
                      : isSel
                        ? "scale-[0.92] bg-purple-500/20 ring-[3px] ring-inset ring-purple-400"
                        : "bg-white/6 hover:bg-white/14"
                  } ${simulateBot ? "cursor-not-allowed" : "cursor-pointer active:scale-95"}`}
                >
                  <div className="flex h-full w-full items-center justify-center p-2">
                    <PatternIcon type={pattern} />
                  </div>
                  {isSel && !hasErr && (
                    <div className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500 shadow">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  {isWrong && (
                    <div className="absolute bottom-1 left-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 shadow">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
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
              <span className="absolute -right-8 -top-1 rounded bg-red-600 px-1.5 py-0.5 text-[9px] font-bold text-white shadow">
                BOT
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/12 bg-white/5 px-3 py-2.5">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={newPuzzle}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white/80"
              title="New challenge"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <label className="flex cursor-pointer items-center gap-1.5 text-[11px] font-medium text-white/65">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded accent-purple-500"
                checked={simulateBot}
                onChange={(e) => handleBotToggle(e.target.checked)}
              />
              Bot
            </label>
          </div>
          <button
            type="button"
            onClick={handleVerify}
            disabled={simulateBot || verifyLoading}
            className="btn-primary min-h-10 rounded-lg px-5 py-1.5 text-sm font-semibold"
          >
            {verifyLoading ? "Verifying..." : "Verify Access"}
          </button>
        </div>
      </div>
    </div>
  );
}
