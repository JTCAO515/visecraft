import { describe, expect, it, vi } from "vitest";
import { runVerification } from "@/lib/proof/engine";
import type { EvidenceItem, ProofClaim } from "@/lib/proof/types";

function claim(id: string, claimType: ProofClaim["claimType"]): ProofClaim {
  return {
    id,
    projectId: "project_test",
    sourceContentType: "bp_section",
    sourceContentId: `section_${id}`,
    originalText: `Claim ${id} has enough text for verification.`,
    normalizedClaim: `Claim ${id} has enough text for verification.`,
    claimType,
    claimSubject: "project",
    claimPredicate: claimType.replaceAll("_", " "),
    scope: claimType.includes("deployment") || claimType === "product_accessible" ? "deployment" : "project",
    visibility: "private",
    riskLevel: "medium",
    requiresFreshness: !["release_published", "milestone_completed", "feature_exists"].includes(claimType),
    contentHash: `h_${id}`,
    updatedAt: "2026-01-01T00:00:00.000Z",
  };
}

function evidence({
  id,
  sourceType,
  claimId,
  isAvailable = true,
  rawMetadata = {},
}: {
  id: string;
  sourceType: EvidenceItem["sourceType"];
  claimId: string;
  isAvailable?: boolean;
  rawMetadata?: Record<string, unknown>;
}): EvidenceItem {
  return {
    id,
    projectId: "project_test",
    sourceType,
    sourceProvider: "test",
    sourceId: id,
    sourceTitle: id,
    capturedAt: "2026-01-01T00:00:00.000Z",
    rawMetadata: { ...rawMetadata, claimIds: [claimId] },
    trustLevel: sourceType === "founder_note" ? "founder_statement" : "platform_generated_record",
    visibility: "private",
    isAvailable,
  };
}

describe("runVerification", () => {
  it("aggregates passed, partial and failed results without calling network adapters", async () => {
    const claims = [
      claim("claim_deployed", "feature_deployed"),
      claim("claim_founder", "milestone_completed"),
      claim("claim_missing", "feature_implemented"),
      claim("claim_contradicted", "feature_deployed"),
      claim("claim_unavailable", "feature_tested"),
    ];
    const proofEvidence = [
      evidence({
        id: "evidence_deployed",
        sourceType: "deployment_record",
        claimId: "claim_deployed",
        rawMetadata: { provider: "test", status: "ready", environment: "production" },
      }),
      evidence({ id: "evidence_founder", sourceType: "founder_note", claimId: "claim_founder" }),
      evidence({
        id: "evidence_preview",
        sourceType: "deployment_record",
        claimId: "claim_contradicted",
        rawMetadata: { provider: "test", status: "ready", environment: "preview" },
      }),
      evidence({
        id: "evidence_unavailable",
        sourceType: "external_source_link",
        claimId: "claim_unavailable",
        isAvailable: false,
      }),
    ];

    const report = await runVerification({ projectId: "project_test", claims, evidence: proofEvidence });

    expect(report.run).toMatchObject({
      claimsChecked: 5,
      claimsPassed: 1,
      claimsPartial: 1,
      claimsFailed: 3,
      claimsStale: 0,
      status: "completed",
    });
    expect(Object.fromEntries(report.results.map((result) => [result.claimId, result.verdict]))).toEqual({
      claim_deployed: "deployment_backed",
      claim_founder: "self_reported",
      claim_missing: "insufficient_evidence",
      claim_contradicted: "contradicted",
      claim_unavailable: "unable_to_verify",
    });
  });

  it("generates contradiction, missing-evidence and unavailable-source findings", async () => {
    const claims = [
      claim("claim_missing", "feature_implemented"),
      claim("claim_contradicted", "feature_deployed"),
      claim("claim_unavailable", "feature_tested"),
    ];
    const proofEvidence = [
      evidence({
        id: "evidence_preview",
        sourceType: "deployment_record",
        claimId: "claim_contradicted",
        rawMetadata: { provider: "test", status: "ready", environment: "preview" },
      }),
      evidence({
        id: "evidence_unavailable",
        sourceType: "external_source_link",
        claimId: "claim_unavailable",
        isAvailable: false,
      }),
    ];

    const report = await runVerification({ projectId: "project_test", claims, evidence: proofEvidence });

    expect(report.findings.map((finding) => finding.findingType)).toEqual([
      "missing_evidence",
      "contradiction",
      "source_unavailable",
    ]);
    expect(report.findings.find((finding) => finding.findingType === "contradiction")).toMatchObject({
      severity: "critical",
      title: "Conflicting or failed source check",
    });
    expect(report.findings.find((finding) => finding.findingType === "source_unavailable")?.evidenceId).toBe("evidence_unavailable");
  });

  it("builds the six-row verification profile from result categories", async () => {
    const deployedClaim = claim("claim_deployed", "feature_deployed");
    const contradictedClaim = claim("claim_contradicted", "feature_deployed");
    const report = await runVerification({
      projectId: "project_test",
      claims: [deployedClaim, contradictedClaim],
      evidence: [
        evidence({
          id: "evidence_deployed",
          sourceType: "deployment_record",
          claimId: deployedClaim.id,
          rawMetadata: { provider: "test", status: "ready", environment: "production" },
        }),
        evidence({
          id: "evidence_preview",
          sourceType: "deployment_record",
          claimId: contradictedClaim.id,
          rawMetadata: { provider: "test", status: "ready", environment: "preview" },
        }),
      ],
    });

    expect(report.profile).toHaveLength(6);
    expect(report.profile.map((item) => item.label)).toEqual([
      "Project identity",
      "Product evidence",
      "Deployment evidence",
      "Usage evidence",
      "Freshness",
      "Contradictions",
    ]);
    expect(Object.fromEntries(report.profile.map((item) => [item.label, item.verdict]))).toMatchObject({
      "Project identity": "source_linked",
      "Deployment evidence": "deployment_backed",
      "Usage evidence": "insufficient_evidence",
      Freshness: "source_linked",
      Contradictions: "contradicted",
    });
  });

  it("overrides a non-contradicted verdict when freshness becomes stale", async () => {
    const now = vi
      .fn<() => Date>()
      .mockReturnValueOnce(new Date("2026-01-01T00:00:00.000Z"))
      .mockReturnValueOnce(new Date("2026-01-01T00:00:00.000Z"))
      .mockReturnValueOnce(new Date("2026-01-09T00:00:00.000Z"))
      .mockReturnValueOnce(new Date("2026-01-09T00:00:00.000Z"));

    const report = await runVerification({
      projectId: "project_test",
      claims: [claim("claim_stale", "feature_implemented")],
      evidence: [],
      now,
    });

    expect(report.results[0]).toMatchObject({
      verdict: "stale",
      freshnessStatus: "stale",
    });
    expect(report.run).toMatchObject({ claimsStale: 1, claimsFailed: 0 });
    expect(report.findings.map((finding) => finding.findingType)).toContain("stale_evidence");
    expect(report.profile.find((item) => item.label === "Freshness")?.verdict).toBe("stale");
  });
});
