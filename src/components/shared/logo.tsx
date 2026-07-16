import Link from "next/link";

export function ViseCraftMark({ href = "/" }: { href?: string }) {
  return (
    <Link aria-label="ViseCraft home" className="pressable flex items-center gap-3" href={href}>
      <span className="grid size-8 place-items-center" aria-hidden="true">
        <span className="relative block size-7">
          <span className="absolute bottom-0 left-[5px] h-7 w-3 origin-bottom rotate-[-20deg] rounded-[3px] bg-[var(--jade)]" />
          <span className="absolute bottom-0 right-[5px] h-7 w-3 origin-bottom rotate-[20deg] rounded-[3px] bg-[var(--blue)]" />
        </span>
      </span>
      <span className="text-lg font-semibold text-[var(--text)]">ViseCraft</span>
    </Link>
  );
}

export function EvidenceBadge({
  label,
  tone = "jade",
}: {
  label: string;
  tone?: "jade" | "blue" | "amber" | "rose" | "neutral";
}) {
  const color =
    tone === "blue"
      ? "var(--blue)"
      : tone === "amber"
        ? "var(--amber)"
        : tone === "rose"
          ? "var(--rose)"
          : tone === "neutral"
            ? "var(--text-faint)"
            : "var(--jade)";

  return (
    <span
      className="mono-label inline-flex items-center border px-2 py-1"
      style={{
        borderColor: color,
        color,
        borderRadius: "6px",
        background: "rgba(255,255,255,0.025)",
      }}
    >
      {label}
    </span>
  );
}
