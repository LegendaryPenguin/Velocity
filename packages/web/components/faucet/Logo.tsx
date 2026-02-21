export function Logo({ size = "text-3xl" }: { size?: string }) {
  return (
    <span
      className={`${size} font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-100 to-fuchsia-200`}
    >
      ProofofHuman
    </span>
  );
}
