import Link from "next/link";
import type { Verdict } from "@/lib/proof/types";

export const verdictCopy: Record<Verdict, { label: string; tone: "jade" | "blue" | "amber" | "rose" | "neutral"; description: string }> = {
  unverified: {
    label: "Unverified",
    tone: "neutral",
    description: "No verification has been completed for this claim.",
  },
  self_reported: {
    label: "Self-reported",
    tone: "amber",
    description: "The claim is supported only by founder-provided information.",
  },
  source_linked: {
    label: "Source-linked",
    tone: "blue",
    description: "A source exists and was checked, but the support scope is limited.",
  },
  code_backed: {
    label: "Code-backed",
    tone: "jade",
    description: "Repository evidence supports the implementation-related scope of the claim.",
  },
  deployment_backed: {
    label: "Deployment-backed",
    tone: "jade",
    description: "Deployment or URL evidence supports the availability-related scope of the claim.",
  },
  partially_supported: {
    label: "Partially supported",
    tone: "amber",
    description: "Evidence supports only part of the claim.",
  },
  insufficient_evidence: {
    label: "Evidence missing",
    tone: "amber",
    description: "Connected evidence is not enough to support this claim.",
  },
  contradicted: {
    label: "Contradicted",
    tone: "rose",
    description: "Connected evidence conflicts with the claim or a deterministic check failed.",
  },
  stale: {
    label: "Stale",
    tone: "amber",
    description: "The result is too old for a current claim and needs recheck.",
  },
  unable_to_verify: {
    label: "Unable to verify",
    tone: "neutral",
    description: "The source could not be checked.",
  },
};

function toneColor(tone: "jade" | "blue" | "amber" | "rose" | "neutral") {
  if (tone === "jade") return "var(--jade)";
  if (tone === "blue") return "var(--blue)";
  if (tone === "amber") return "var(--amber)";
  if (tone === "rose") return "var(--rose)";
  return "var(--text-faint)";
}

export function VerdictBadge({
  verdict,
  href,
}: {
  verdict: Verdict;
  href?: string;
}) {
  const copy = verdictCopy[verdict];
  const color = toneColor(copy.tone);
  const className = "mono-label inline-flex items-center border px-2 py-1";
  const style = {
    borderColor: color,
    color,
    borderRadius: "6px",
    background: "rgba(255,255,255,0.025)",
  };

  if (href) {
    return (
      <Link aria-label={`Open verification report: ${copy.label}`} className={className} href={href} style={style} title={copy.description}>
        {copy.label}
      </Link>
    );
  }

  return (
    <span className={className} style={style} title={copy.description}>
      {copy.label}
    </span>
  );
}
