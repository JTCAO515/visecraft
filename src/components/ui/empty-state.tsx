import type { ReactNode } from "react";

export function EmptyState({
  icon,
  title,
  description,
  action,
  compact = false,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  compact?: boolean;
}) {
  return (
    <div className={`border-t border-[var(--line-hi)] ${compact ? "py-5" : "py-8"}`}>
      {icon ? <div className="mb-4 text-[var(--text-faint)]">{icon}</div> : null}
      <h3 className="text-lg font-semibold text-[var(--text)]">{title}</h3>
      <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-dim)]">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
