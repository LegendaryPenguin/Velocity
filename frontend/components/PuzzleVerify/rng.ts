/**
 * Seeded PRNG — mulberry32 implementation.
 * Deterministic across all browsers given the same numeric seed.
 *
 * Usage:
 *   const rng = createRng("my-seed-string");
 *   const val = rng();  // 0 ≤ val < 1
 */

/** Hash a string seed into a 32-bit unsigned integer (FNV-1a) */
function hashSeed(seed: string): number {
  let h = 0x811c9dc5; // FNV offset basis
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 0x01000193); // FNV prime
  }
  return h >>> 0;
}

/**
 * Mulberry32 — fast 32-bit PRNG.
 * Returns a function that yields a float in [0, 1) on each call.
 */
export function createRng(seed: string): () => number {
  let state = hashSeed(seed);
  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generate a random float in [min, max) using the provided rng.
 */
export function rngRange(rng: () => number, min: number, max: number): number {
  return min + rng() * (max - min);
}

/**
 * Generate a random integer in [min, max] (inclusive) using the provided rng.
 */
export function rngInt(rng: () => number, min: number, max: number): number {
  return Math.floor(rngRange(rng, min, max + 1));
}
