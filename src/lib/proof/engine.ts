import { ruleBasedProofProvider } from "@/lib/proof/ai/rule-based-provider";
import { calculateFreshness } from "@/lib/proof/freshness";
import { runDeterministicChecks } from "@/lib/proof/deterministic";
import { proofEngineVersion, type EvidenceCoverage, type EvidenceItem, type ProofClaim, type VerificationFinding, type VerificationProfileItem, type VerificationReport, type VerificationResult, type VerificationRun, type Verdict } from "@/lib/proof/types";

function id(prefix: string, value: string) {
  return `${prefix}_${value.replace(/[^a-zA-Z0-9]+/g, "_").slice(0, 52)}`;
}

function evidenceCoverage(verdict: Verdict): EvidenceCoverage {
  if (verdict === "contradicted") return "contradictory";
  if (["deployment_backed", "code_backed", "source_linked"].includes(verdict)) return "strong";
  if (verdict === "partially_supported" || verdict === "self_reported") return "partial";
  return "none";
}

function countPassed(verdict: Verdict) {
  return ["deployment_backed", "code_backed", "source_linked"].includes(verdict) ? 1 : 0;
}

function buildFindings(result: VerificationResult): VerificationFinding[] {
  const findings: VerificationFinding[] = [];

  if (result.verdict === "contradicted") {
    findings.push({
      id: id("finding", `${result.claimId}-contradicted`),
      resultId: result.id,
      findingType: "contradiction",
      severity: "critical",
      title: "Conflicting or failed source check",
      body: result.summary,
    });
  }

  if (result.verdict === "insufficient_evidence" || result.verdict === "partially_supported") {
    findings.push({
      id: id("finding", `${result.claimId}-missing`),
      resultId: result.id,
      findingType: "missing_evidence",
      severity: "warning",
      title: "More direct evidence required",
      body: result.recommendedEvidence.join(", ") || "Attach direct platform evidence to strengthen this claim.",
    });
  }

  if (result.freshnessStatus === "stale") {
    findings.push({
      id: id("finding", `${result.claimId}-stale`),
      resultId: result.id,
      findingType: "stale_evidence",
      severity: "warning",
      title: "Verification result is stale",
      body: "This claim needs to be rechecked before it can be presented as current.",
    });
  }

  for (const check of result.deterministicChecks.filter((item) => item.status === "unavailable")) {
    findings.push({
      id: id("finding", `${result.claimId}-${check.evidenceId}-unavailable`),
      resultId: result.id,
      findingType: "source_unavailable",
      severity: "warning",
      title: "Evidence source unavailable",
      body: check.summary,
      evidenceId: check.evidenceId,
    });
  }

  return findings;
}

function buildProfile(results: VerificationResult[]): VerificationProfileItem[] {
  const has = (verdicts: Verdict[]) => results.some((result) => verdicts.includes(result.verdict));
  const staleCount = results.filter((result) => result.freshnessStatus === "stale").length;
  const contradictionCount = results.filter((result) => result.verdict === "contradicted").length;

  return [
    {
      label: "Project identity",
      verdict: has(["source_linked", "code_backed", "deployment_backed"]) ? "source_linked" : "self_reported",
      summary: "Identity is represented only by connected or founder-provided project records in this MVP.",
    },
    {
      label: "Product evidence",
      verdict: has(["code_backed"]) ? "code_backed" : has(["source_linked"]) ? "source_linked" : "insufficient_evidence",
      summary: "Repository-backed claims are evaluated separately from deployment and usage claims.",
    },
    {
      label: "Deployment evidence",
      verdict: has(["deployment_backed"]) ? "deployment_backed" : "insufficient_evidence",
      summary: "Deployment requires a reachable URL or deployment record; code alone is not enough.",
    },
    {
      label: "Usage evidence",
      verdict: "insufficient_evidence",
      summary: "Usage-backed verification is intentionally out of scope for the first Proof Engine MVP.",
    },
    {
      label: "Freshness",
      verdict: staleCount > 0 ? "stale" : "source_linked",
      summary: staleCount > 0 ? `${staleCount} claim result(s) need recheck.` : "No stale result detected in the latest run.",
    },
    {
      label: "Contradictions",
      verdict: contradictionCount > 0 ? "contradicted" : "source_linked",
      summary: contradictionCount > 0 ? `${contradictionCount} contradiction(s) detected.` : "None detected in connected evidence.",
    },
  ];
}

export async function runVerification({
  projectId,
  claims,
  evidence,
  triggerType = "manual",
}: {
  projectId: string;
  claims: ProofClaim[];
  evidence: EvidenceItem[];
  triggerType?: VerificationRun["triggerType"];
}): Promise<VerificationReport> {
  const startedAt = new Date().toISOString();
  const runId = id("vrun", `${projectId}-${startedAt}`);
  const results: VerificationResult[] = [];

  for (const claim of claims) {
    const claimEvidence = evidence.filter((item) => {
      const claimIds = item.rawMetadata.claimIds;
      return (
        item.projectId === claim.projectId &&
        (!Array.isArray(claimIds) || claimIds.includes(claim.id))
      );
    });
    const deterministicChecks = await runDeterministicChecks(claimEvidence);
    const aiOutput = await ruleBasedProofProvider.verifyClaim({
      claim,
      evidence: claimEvidence,
      deterministicChecks,
    });
    const checkedAt = new Date().toISOString();
    const freshness = calculateFreshness({ claimType: claim.claimType, checkedAt });
    const verdict = freshness.status === "stale" && aiOutput.verdict !== "contradicted" ? "stale" : aiOutput.verdict;

    results.push({
      id: id("vresult", `${runId}-${claim.id}`),
      verificationRunId: runId,
      claimId: claim.id,
      verdict,
      confidence: aiOutput.confidence,
      freshnessStatus: freshness.status,
      evidenceCoverage: evidenceCoverage(verdict),
      supportingEvidenceCount: aiOutput.supportingEvidenceIds.length,
      contradictingEvidenceCount: aiOutput.contradictingEvidenceIds.length,
      summary: aiOutput.reasoningSummary,
      limitations: aiOutput.limitations,
      recommendedEvidence: aiOutput.missingEvidenceTypes,
      deterministicChecks,
      aiOutput,
      lastCheckedAt: checkedAt,
      expiresAt: freshness.expiresAt,
    });
  }

  const run: VerificationRun = {
    id: runId,
    projectId,
    triggerType,
    proofEngineVersion,
    startedAt,
    completedAt: new Date().toISOString(),
    status: "completed",
    sourceSnapshotAt: startedAt,
    claimsChecked: claims.length,
    claimsPassed: results.filter((result) => countPassed(result.verdict) > 0).length,
    claimsPartial: results.filter((result) => result.verdict === "partially_supported" || result.verdict === "self_reported").length,
    claimsFailed: results.filter((result) => ["contradicted", "insufficient_evidence", "unable_to_verify"].includes(result.verdict)).length,
    claimsStale: results.filter((result) => result.freshnessStatus === "stale").length,
  };

  return {
    run,
    claims,
    evidence,
    results,
    findings: results.flatMap(buildFindings),
    profile: buildProfile(results),
  };
}
