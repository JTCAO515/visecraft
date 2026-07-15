import Link from "next/link";
import { AlertTriangle, CheckCircle2, RefreshCw, ShieldCheck } from "lucide-react";
import { VerdictBadge, verdictCopy } from "@/components/verification/verdict-badge";
import { VerificationRefreshButton } from "@/components/verification/verification-refresh-button";
import { EmptyState } from "@/components/ui/empty-state";
import type { VerificationReport } from "@/lib/proof/types";

function formatDate(value?: string) {
  if (!value) return "Not applicable";
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function VerificationDashboard({
  report,
  projectId,
}: {
  report: VerificationReport;
  projectId: string;
}) {
  const missing = report.results.filter((result) => result.verdict === "insufficient_evidence" || result.verdict === "partially_supported");
  const contradicted = report.results.filter((result) => result.verdict === "contradicted");
  const stale = report.results.filter((result) => result.freshnessStatus === "stale");

  return (
    <main className="min-h-screen bg-[var(--bg0)] text-[var(--text)]">
      <header className="border-b border-[var(--line)] bg-[var(--bg1)]">
        <div className="content-rail flex min-h-16 flex-wrap items-center justify-between gap-4 py-4">
          <Link className="text-sm text-[var(--text-dim)] hover:text-[var(--text)]" href="/app">
            ← Workspace
          </Link>
          <p className="mono-label text-[var(--jade)]">Checked by ViseCraft Proof Engine</p>
        </div>
      </header>

      <section className="content-rail py-12">
        <div className="grid gap-8 lg:grid-cols-[0.68fr_0.32fr]">
          <div>
            <p className="mono-label text-[var(--text-faint)]">Verification dashboard</p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight md:text-6xl">
              Claim-level proof, not a project score.
            </h1>
            <p className="mt-5 max-w-3xl leading-7 text-[var(--text-dim)]">
              ViseCraft verification evaluates whether available connected evidence supports specific project claims. It is not an audit, certification, legal opinion, investment recommendation or guarantee of company performance.
            </p>
          </div>

          <aside className="surface p-5">
            <p className="mono-label text-[var(--text-faint)]">Latest run</p>
            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-2xl font-semibold">{report.run.claimsChecked}</p>
                <p className="mt-1 text-[var(--text-dim)]">Claims checked</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">{report.run.claimsPassed}</p>
                <p className="mt-1 text-[var(--text-dim)]">Directly supported</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">{report.run.claimsPartial}</p>
                <p className="mt-1 text-[var(--text-dim)]">Partial/self-reported</p>
              </div>
              <div>
                <p className="text-2xl font-semibold">{report.run.claimsFailed}</p>
                <p className="mt-1 text-[var(--text-dim)]">Failed/missing</p>
              </div>
            </div>
            <p className="mt-5 text-xs leading-5 text-[var(--text-faint)]">
              Last checked: {formatDate(report.run.completedAt)}
            </p>
            <div className="mt-5 border-t border-[var(--line)] pt-5">
              <VerificationRefreshButton />
            </div>
          </aside>
        </div>
      </section>

      <section className="section-band py-10">
        <div className="content-rail">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="surface p-5">
              <ShieldCheck className="text-[var(--jade)]" size={20} />
              <p className="mt-4 text-2xl font-semibold">{report.profile.length}</p>
              <p className="mt-1 text-sm text-[var(--text-dim)]">Verification profile rows, no aggregate score.</p>
            </div>
            <div className="surface p-5">
              <AlertTriangle className="text-[var(--amber)]" size={20} />
              <p className="mt-4 text-2xl font-semibold">{missing.length}</p>
              <p className="mt-1 text-sm text-[var(--text-dim)]">Claims requiring stronger evidence.</p>
            </div>
            <div className="surface p-5">
              <RefreshCw className="text-[var(--blue)]" size={20} />
              <p className="mt-4 text-2xl font-semibold">{stale.length}</p>
              <p className="mt-1 text-sm text-[var(--text-dim)]">Stale verification results.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-rail py-12">
        <div className="grid gap-8 lg:grid-cols-[0.35fr_0.65fr]">
          <aside className="border-t border-[var(--line-hi)] pt-5">
            <p className="mono-label text-[var(--jade)]">Verification profile</p>
            <div className="mt-5 space-y-4">
              {report.profile.map((item) => (
                <div key={item.label} className="grid gap-2 border-b border-[var(--line)] pb-4 last:border-b-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm">{item.label}</p>
                    <VerdictBadge verdict={item.verdict} />
                  </div>
                  <p className="text-xs leading-5 text-[var(--text-dim)]">{item.summary}</p>
                </div>
              ))}
            </div>
          </aside>

          <div className="surface overflow-hidden">
            <div className="grid gap-3 border-b border-[var(--line)] p-5 md:grid-cols-[1fr_auto_auto] md:items-center">
              <div>
                <p className="mono-label text-[var(--text-faint)]">Claims extracted</p>
                <h2 className="mt-2 text-2xl font-semibold">Evidence-backed report</h2>
              </div>
              <p className="mono-label text-[var(--text-faint)]">Freshness</p>
              <p className="mono-label text-[var(--text-faint)]">Verdict</p>
            </div>

            {report.results.map((result) => {
              const claim = report.claims.find((item) => item.id === result.claimId);
              if (!claim) return null;
              const copy = verdictCopy[result.verdict];

              return (
                <Link
                  key={result.id}
                  className="grid gap-4 border-b border-[var(--line)] p-5 transition hover:bg-[var(--surface-hi)] last:border-b-0 md:grid-cols-[1fr_140px_190px] md:items-start"
                  href={`/app/projects/${projectId}/verification/${claim.id}`}
                >
                  <div>
                    <p className="mono-label text-[var(--text-faint)]">{claim.claimType.replaceAll("_", " ")}</p>
                    <h3 className="mt-2 font-semibold">{claim.normalizedClaim}</h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--text-dim)]">{copy.description}</p>
                  </div>
                  <p className="mono-label text-[var(--text-dim)]">{result.freshnessStatus}</p>
                  <VerdictBadge verdict={result.verdict} />
                </Link>
              );
            })}
          </div>
        </div>

        {contradicted.length > 0 ? (
          <div className="mt-8 border border-[rgba(251,113,133,0.38)] bg-[rgba(251,113,133,0.06)] p-5" style={{ borderRadius: "12px" }}>
            <p className="mono-label text-[var(--rose)]">Contradictions</p>
            <p className="mt-3 text-sm text-[var(--text-dim)]">
              Proof Engine detected conflicting evidence. Open each claim report for the exact source check.
            </p>
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState
              compact
              description="The latest verification run did not find evidence that conflicts with the extracted claims. This is not a guarantee that no contradiction exists."
              icon={<CheckCircle2 aria-hidden="true" size={20} />}
              title="No contradictions detected"
            />
          </div>
        )}
      </section>
    </main>
  );
}
