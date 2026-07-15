import { LoaderCircle } from "lucide-react";

type SkeletonProps = {
  variant?: "row" | "block";
  className?: string;
  label?: string;
};

export function Skeleton({
  variant = "row",
  className = "",
  label = "Loading content",
}: SkeletonProps) {
  const shape = variant === "block" ? "min-h-36" : "h-4";

  return (
    <span
      aria-label={label}
      className={`ui-skeleton block ${shape} ${className}`}
      role="status"
    />
  );
}

export function Spinner({ className = "", label = "Loading" }: { className?: string; label?: string }) {
  return <LoaderCircle aria-label={label} className={`animate-spin ${className}`} role="status" size={17} />;
}

export function InlineLoading({ label = "Loading" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-[var(--text-dim)]" role="status">
      <Spinner label="" />
      {label}
    </span>
  );
}

export function AppLoadingSkeleton() {
  return (
    <main className="min-h-screen bg-[var(--bg0)] text-[var(--text)]">
      <div className="border-b border-[var(--line)] bg-[var(--bg1)]">
        <div className="content-rail flex h-16 items-center justify-between">
          <Skeleton className="w-32" />
          <Skeleton className="w-24" />
        </div>
      </div>
      <div className="content-rail grid gap-8 py-12 lg:grid-cols-[0.68fr_0.32fr]">
        <div className="space-y-5">
          <Skeleton className="w-28" />
          <Skeleton className="h-12 w-4/5" />
          <Skeleton className="w-2/3" />
          <Skeleton variant="block" className="mt-8" />
        </div>
        <Skeleton variant="block" />
      </div>
    </main>
  );
}
