import { useId, type InputHTMLAttributes } from "react";

export function Field({
  label,
  description,
  error,
  id,
  className = "",
  ...inputProps
}: {
  label: string;
  description?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = description ? `${inputId}-description` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <label className="block text-sm" htmlFor={inputId}>
      <span className="mono-label text-[var(--text-faint)]">{label}</span>
      {description ? <span className="mt-2 block text-xs leading-5 text-[var(--text-dim)]" id={descriptionId}>{description}</span> : null}
      <input
        {...inputProps}
        aria-describedby={describedBy}
        aria-invalid={Boolean(error)}
        className={`mt-2 h-11 w-full border bg-[var(--bg0)] px-3 text-[var(--text)] outline-none transition placeholder:text-[var(--text-faint)] ${error ? "border-[var(--rose)]" : "border-[var(--line-hi)] focus:border-[var(--jade)]"} ${className}`}
        id={inputId}
        style={{ borderRadius: "var(--radius-sm)" }}
      />
      {error ? <span className="mt-2 block text-xs leading-5 text-[var(--rose)]" id={errorId}>{error}</span> : null}
    </label>
  );
}
