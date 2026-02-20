'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import { PuzzleVerify } from '@/components/PuzzleVerify';
import type { ChallengePayload, PuzzleVerifyHandle, VerifyResult } from '@/components/PuzzleVerify';

// ─── Mock challenge generator (simulates backend /session/start) ────────────

function createMockChallenge(): ChallengePayload {
  return {
    challengeId: crypto.randomUUID(),
    challengeField: String(Math.floor(Math.random() * 2 ** 32)),
    seed: crypto.randomUUID(),
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 min
  };
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function SignupPage() {
  const puzzleRef = useRef<PuzzleVerifyHandle>(null);
  const [challenge, setChallenge] = useState<ChallengePayload>(createMockChallenge);
  const [verified, setVerified] = useState(false);
  const [lastResult, setLastResult] = useState<VerifyResult | null>(null);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showDebug, setShowDebug] = useState(false);

  const onVerified = useCallback((result: VerifyResult) => {
    setVerified(true);
    setLastResult(result);
  }, []);

  const onFailed = useCallback((result: VerifyResult) => {
    setVerified(false);
    setLastResult(result);
  }, []);

  const handleRetry = useCallback(() => {
    setChallenge(createMockChallenge());
    setVerified(false);
    setLastResult(null);
    puzzleRef.current?.reset();
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!verified || !lastResult) {
        alert('Please complete the puzzle first.');
        return;
      }
      // In production: POST { ...formData, verifyResult: lastResult } to backend
      alert(
        `Sign-up submitted!\n\nEmail: ${formData.email}\nChallenge ID: ${lastResult.challengeId}\nFeatures: [${lastResult.features.join(', ')}]`,
      );
    },
    [verified, lastResult, formData],
  );

  const isDark = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 420,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Header */}
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Create an account</h1>
          <p style={{ fontSize: 14, opacity: 0.6, margin: '6px 0 0' }}>
            Complete the puzzle to verify you&apos;re human.
          </p>
        </div>

        {/* Form */}
        {/* <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 500 }}>
            Email
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid rgba(128,128,128,0.3)',
                fontSize: 14,
                background: 'transparent',
                color: 'inherit',
                outline: 'none',
              }}
              placeholder="you@example.com"
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, fontWeight: 500 }}>
            Password
            <input
              type="password"
              required
              minLength={8}
              value={formData.password}
              onChange={(e) => setFormData((f) => ({ ...f, password: e.target.value }))}
              style={{
                padding: '8px 12px',
                borderRadius: 8,
                border: '1px solid rgba(128,128,128,0.3)',
                fontSize: 14,
                background: 'transparent',
                color: 'inherit',
                outline: 'none',
              }}
              placeholder="Min. 8 characters"
            />
          </label>


          


          <button
            type="submit"
            disabled={!verified}
            style={{
              padding: '10px 0',
              borderRadius: 8,
              border: 'none',
              background: verified ? '#22c55e' : 'rgba(128,128,128,0.2)',
              color: verified ? '#fff' : 'rgba(128,128,128,0.5)',
              fontWeight: 600,
              fontSize: 15,
              cursor: verified ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
          >
            {verified ? 'Sign Up' : 'Complete puzzle to continue'}
          </button>
        </form> */}

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <PuzzleVerify
              ref={puzzleRef}
              challenge={challenge}
              onVerified={onVerified}
              onFailed={onFailed}
              difficulty="normal"
              debug={showDebug}
            />

            {lastResult && !verified && (
              <button
                type="button"
                onClick={handleRetry}
                style={{
                  padding: '6px 16px',
                  borderRadius: 6,
                  border: '1px solid rgba(128,128,128,0.3)',
                  background: 'transparent',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                Retry
              </button>
            )}
          </div>

        {/* Debug toggle */}
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 11,
            opacity: 0.4,
            cursor: 'pointer',
          }}
        >
          <input
            type="checkbox"
            checked={showDebug}
            onChange={(e) => setShowDebug(e.target.checked)}
          />{' '}
          Debug overlay
        </label>

        {/* Result preview */}
        {showDebug && lastResult && (
          <pre
            style={{
              fontSize: 10,
              lineHeight: 1.5,
              padding: 12,
              borderRadius: 8,
              background: 'rgba(128,128,128,0.06)',
              overflow: 'auto',
              maxHeight: 240,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            {JSON.stringify(lastResult, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
