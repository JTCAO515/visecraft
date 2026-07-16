"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export function ErrorState({
  title,
  description,
  onRetry,
  retryLabel = "Try again",
}: {
  title: string;
  description?: string;
  onRetry?: () => void;
  retryLabel?: string;
}) {
  return (
    <div className="border-l border-[var(--rose)] bg-[rgba(251,113,133,0.06)] p-5" role="alert">
      <AlertTriangle aria-hidden="true" className="text-[var(--rose)]" size={20} />
      <h3 className="mt-4 font-semibold text-[var(--text)]">{title}</h3>
      {description ? <p className="mt-2 text-sm leading-6 text-[var(--text-dim)]">{description}</p> : null}
      {onRetry ? (
        <button
          className="mt-4 inline-flex h-9 items-center gap-2 border border-[var(--line-hi)] px-3 text-sm text-[var(--text)]"
          onClick={onRetry}
          style={{ borderRadius: "var(--radius-sm)" }}
          type="button"
        >
          <RotateCcw aria-hidden="true" size={14} /> {retryLabel}
        </button>
      ) : null}
    </div>
  );
}
