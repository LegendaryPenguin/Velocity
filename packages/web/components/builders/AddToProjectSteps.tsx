type Step = {
  num: number;
  title: string;
  body: string;
  filePath?: string;
};

type Props = {
  steps: Step[];
  onStepClick?: (index: number) => void;
};

export function AddToProjectSteps({ steps, onStepClick }: Props) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-lg font-semibold text-white/90">Checklist</h3>
      <ol className="mt-4 space-y-4">
        {steps.map((s, index) => (
          <li key={s.num} className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-purple-500/30 text-xs font-semibold text-purple-200">
              {s.num}
            </span>
            <div className="min-w-0 flex-1">
              {onStepClick ? (
                <button
                  type="button"
                  onClick={() => onStepClick(index)}
                  className="text-left font-medium text-white/90 underline-offset-2 hover:underline hover:text-purple-200"
                >
                  {s.title}
                </button>
              ) : (
                <p className="font-medium text-white/90">{s.title}</p>
              )}
              {s.filePath && (
                <code className="mt-1 block text-xs text-purple-300/90">{s.filePath}</code>
              )}
              <p className="mt-1 text-sm text-white/60">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
