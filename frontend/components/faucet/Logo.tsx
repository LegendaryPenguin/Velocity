export function Logo({ size = "text-3xl" }: { size?: string }) {
  return (
    <span className={`${size} font-semibold tracking-tight text-white`}>
      <span className="text-purple-200">Proof</span>
      <span className="mx-1 text-white/45">of</span>
      <span className="text-white">Human</span>
    </span>
  );
}
