"use client";

type Field = {
  id: string;
  label: string;
  type?: "text" | "number" | "select";
  value: string | number;
  onChange: (value: string | number) => void;
  options?: { value: string; label: string }[];
  placeholder?: string;
  helper?: string;
};

type Props = {
  title: string;
  fields: Field[];
};

export function ConfigPanel({ title, fields }: Props) {
  return (
    <div className="glass-card rounded-2xl p-5">
      <h3 className="text-lg font-semibold text-white/90">{title}</h3>
      <div className="mt-4 space-y-4">
        {fields.map((f) => (
          <label key={f.id} className="block text-sm">
            <span className="mb-1.5 block font-medium text-white/70">{f.label}</span>
            {f.helper && <span className="mb-1.5 block text-xs text-white/50">{f.helper}</span>}
            {f.type === "select" && f.options ? (
              <select
                value={String(f.value)}
                onChange={(e) => f.onChange(e.target.value)}
                className="glass-input w-full px-4 py-2.5 text-white/90 bg-[#1a1428] border border-white/10 focus:border-purple-400/50"
                style={{ colorScheme: "dark" }}
              >
                {f.options.map((o) => (
                  <option key={o.value} value={o.value} className="bg-[#1a1428] text-white">
                    {o.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={f.type ?? "text"}
                value={f.value}
                onChange={(e) =>
                  f.onChange(f.type === "number" ? Number(e.target.value) || 0 : e.target.value)
                }
                placeholder={f.placeholder}
                className="glass-input w-full px-4 py-2.5 text-white/90 placeholder-white/40"
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
}
