import Link from "next/link";
import { VerdictBadge } from "@/components/verification/verdict-badge";
import { proofEngineVersion } from "@/lib/proof/types";
import type { EvidenceItem, ProofClaim, VerificationResult } from "@/lib/proof/types";

function formatDate(value?: string) {
  if (!value) return "Not applicable";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function VerificationReportView({
  projectId,
  claim,
  result,
  evidence,
}: {
  projectId: string;
  claim: ProofClaim;
  result: VerificationResult;
  evidence: EvidenceItem[];
}) {
  return (
    <main className="min-h-screen bg-[var(--bg0)] text-[var(--text)]">
      <header className="border-b border-[var(--line)] bg-[var(--bg1)]">
        <div className="content-rail flex min-h-16 flex-wrap items-center justify-between gap-4 py-4">
          <Link className="text-sm text-[var(--text-dim)] hover:text-[var(--text)]" href={`/app/projects/${projectId}/verification`}>
            ← Verification dashboard
          </Link>
          <p className="mono-label text-[var(--jade)]">Proof Engine v{proofEngineVersion}</p>
        </div>
      </header>

      <section className="content-rail py-12">
        <div className="grid gap-8 lg:grid-cols-[0.65fr_0.35fr]">
          <div>
            <p className="mono-label text-[var(--text-faint)]">Claim report</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
              {claim.normalizedClaim}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <VerdictBadge verdict={result.verdict} />
              <span className="mono-label text-[var(--text-faint)]">Confidence: {result.confidence}</span>
              <span className="mono-label text-[var(--text-faint)]">Freshness: {result.freshnessStatus}</span>
            </div>
          </div>

          <aside className="surface p-5">
            <p className="mono-label text-[var(--text-faint)]">Disclaimer</p>
            <p className="mt-4 text-sm leading-6 text-[var(--text-dim)]">
              ViseCraft verification evaluates whether available connected evidence supports specific project claims. It is not an audit, certification, legal opinion, investment recommendation or guarantee of company performance.
            </p>
          </aside>
        </div>
      </section>

      <section className="content-rail pb-14">
        <div className="grid gap-8 lg:grid-cols-[0.38fr_0.62fr]">
          <aside className="space-y-6">
            <div className="surface p-5">
              <p className="mono-label text-[var(--text-faint)]">Freshness</p>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--text-dim)]">Last checked</dt>
                  <dd>{formatDate(result.lastCheckedAt)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--text-dim)]">Expires at</dt>
                  <dd>{formatDate(result.expiresAt)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-[var(--text-dim)]">Evidence coverage</dt>
                  <dd>{result.evidenceCoverage}</dd>
                </div>
              </dl>
            </div>

            <div className="surface p-5">
              <p className="mono-label text-[var(--text-faint)]">Actions</p>
              <div className="mt-4 grid gap-3 text-sm">
                <button className="border border-[var(--line-hi)] px-3 py-2 text-left text-[var(--text-dim)]" type="button" style={{ borderRadius: "8px" }}>
                  Add evidence (coming soon)
                </button>
                <button className="border border-[var(--line-hi)] px-3 py-2 text-left text-[var(--text-dim)]" type="button" style={{ borderRadius: "8px" }}>
                  Re-run verification (server action next)
                </button>
                <button className="border border-[var(--line-hi)] px-3 py-2 text-left text-[var(--text-dim)]" type="button" style={{ borderRadius: "8px" }}>
                  Edit source claim (invalidates result)
                </button>
              </div>
            </div>
          </aside>

          <div className="space-y-6">
            <section className="surface p-5">
              <p className="mono-label text-[var(--jade)]">Claim</p>
              <dl className="mt-4 grid gap-4 text-sm">
                <div>
                  <dt className="mono-label text-[var(--text-faint)]">Original</dt>
                  <dd className="mt-2 leading-6">{claim.originalText}</dd>
                </div>
                <div>
                  <dt className="mono-label text-[var(--text-faint)]">Normalized</dt>
                  <dd className="mt-2 leading-6">{claim.normalizedClaim}</dd>
                </div>
                <div>
                  <dt className="mono-label text-[var(--text-faint)]">Type</dt>
                  <dd className="mt-2">{claim.claimType.replaceAll("_", " ")}</dd>
                </div>
              </dl>
            </section>

            <section className="surface p-5">
              <p className="mono-label text-[var(--jade)]">Verdict summary</p>
              <p className="mt-4 text-sm leading-6 text-[var(--text-dim)]">{result.summary}</p>
              {result.limitations.length > 0 ? (
                <div className="mt-5">
                  <p className="mono-label text-[var(--amber)]">Limitations</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-dim)]">
                    {result.limitations.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {result.recommendedEvidence.length > 0 ? (
                <div className="mt-5">
                  <p className="mono-label text-[var(--blue)]">Recommended evidence</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--text-dim)]">
                    {result.recommendedEvidence.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>

            <section className="surface overflow-hidden">
              <div className="border-b border-[var(--line)] p-5">
                <p className="mono-label text-[var(--jade)]">Supporting evidence</p>
              </div>
              {evidence.length > 0 ? (
                evidence.map((item) => {
                  const check = result.deterministicChecks.find((entry) => entry.evidenceId === item.id);
                  const isPublic = item.visibility === "public" || item.visibility === "public_summary";

                  return (
                    <div key={item.id} className="grid gap-3 border-b border-[var(--line)] p-5 last:border-b-0 md:grid-cols-[1fr_140px]">
                      <div>
                        <p className="font-semibold">{item.sourceTitle}</p>
                        <p className="mt-2 text-sm leading-6 text-[var(--text-dim)]">
                          {item.sourceType.replaceAll("_", " ")} · {item.trustLevel.replaceAll("_", " ")} · {isPublic ? "public-safe" : "private evidence hidden from public views"}
                        </p>
                        <p className="mt-2 text-xs leading-5 text-[var(--text-faint)]">{check?.summary ?? "No deterministic check was recorded."}</p>
                        {item.sourceUrl && isPublic ? (
                          <a className="mt-3 inline-flex text-sm text-[var(--blue)] hover:text-[var(--text)]" href={item.sourceUrl} target="_blank" rel="noreferrer">
                            Open source link
                          </a>
                        ) : null}
                      </div>
                      <p className="mono-label text-[var(--text-dim)]">{check?.status ?? "not checked"}</p>
                    </div>
                  );
                })
              ) : (
                <p className="p-5 text-sm text-[var(--text-dim)]">No evidence is currently attached to this claim.</p>
              )}
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
