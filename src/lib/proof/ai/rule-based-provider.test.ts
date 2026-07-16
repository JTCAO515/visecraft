import { describe, expect, it } from "vitest";
import { ruleBasedProofProvider } from "@/lib/proof/ai/rule-based-provider";
import { verificationAIOutputSchema } from "@/lib/proof/schemas";
import type { DeterministicCheck, EvidenceItem, ProofClaim } from "@/lib/proof/types";

function claim(claimType: ProofClaim["claimType"] = "feature_implemented"): ProofClaim {
  return {
    id: `claim_${claimType}`,
    projectId: "project_test",
    sourceContentType: "bp_section",
    sourceContentId: "section_product",
    originalText: "The project implemented an evidence-backed product workflow.",
    normalizedClaim: "The project implemented an evidence-backed product workflow.",
    claimType,
    claimSubject: "project",
    claimPredicate: "implemented",
    scope: claimType.includes("deployed") ? "deployment" : "feature",
    visibility: "private",
    riskLevel: "medium",
    requiresFreshness: claimType.includes("deployed"),
    contentHash: "h_claim",
    updatedAt: "2026-01-01T00:00:00.000Z",
  };
}

function evidence(sourceType: EvidenceItem["sourceType"], isAvailable = true): EvidenceItem {
  return {
    id: `evidence_${sourceType}`,
    projectId: "project_test",
    sourceType,
    sourceProvider: "test",
    sourceId: `source_${sourceType}`,
    sourceTitle: `Test ${sourceType}`,
    capturedAt: "2026-01-01T00:00:00.000Z",
    rawMetadata: {},
    trustLevel: sourceType === "founder_note" ? "founder_statement" : "direct_api_source",
    visibility: "private",
    isAvailable,
  };
}

function check(item: EvidenceItem, adapter: DeterministicCheck["adapter"], status: DeterministicCheck["status"]): DeterministicCheck {
  return {
    evidenceId: item.id,
    adapter,
    status,
    summary: `${adapter} ${status}`,
    checkedAt: "2026-01-01T00:00:00.000Z",
  };
}

async function verify({
  proofClaim = claim(),
  proofEvidence = [],
  deterministicChecks = [],
}: {
  proofClaim?: ProofClaim;
  proofEvidence?: EvidenceItem[];
  deterministicChecks?: DeterministicCheck[];
} = {}) {
  const output = await ruleBasedProofProvider.verifyClaim({
    claim: proofClaim,
    evidence: proofEvidence,
    deterministicChecks,
  });

  expect(() => verificationAIOutputSchema.parse(output)).not.toThrow();
  return output;
}

describe("ruleBasedProofProvider.verifyClaim", () => {
  it("returns contradicted when any deterministic check fails", async () => {
    const item = evidence("github_commit");
    const output = await verify({
      proofEvidence: [item],
      deterministicChecks: [check(item, "github", "failed")],
    });

    expect(output.verdict).toBe("contradicted");
    expect(output.contradictingEvidenceIds).toEqual([item.id]);
  });

  it("returns insufficient_evidence when no evidence exists", async () => {
    const output = await verify();

    expect(output.verdict).toBe("insufficient_evidence");
    expect(output.supportingEvidenceIds).toEqual([]);
  });

  it("returns self_reported when all evidence is founder-provided", async () => {
    const item = evidence("founder_note");
    const output = await verify({
      proofEvidence: [item],
      deterministicChecks: [check(item, "founder_note", "not_checked")],
    });

    expect(output.verdict).toBe("self_reported");
    expect(output.limitations).toContain("Founder notes are self-reported and need stronger direct-source support for higher-confidence verification.");
  });

  it("recommends direct platform evidence for a self-reported claim outside specialized categories", async () => {
    const item = evidence("founder_note");
    const output = await verify({
      proofClaim: claim("feature_tested"),
      proofEvidence: [item],
      deterministicChecks: [check(item, "founder_note", "not_checked")],
    });

    expect(output.verdict).toBe("self_reported");
    expect(output.missingEvidenceTypes).toEqual(["direct platform source evidence"]);
  });

  it.each([
    ["deployment_record", "deployment"],
    ["production_url", "url"],
  ] as const)("returns deployment_backed when passing %s evidence supports deployment", async (sourceType, adapter) => {
    const item = evidence(sourceType);
    const output = await verify({
      proofClaim: claim("feature_deployed"),
      proofEvidence: [item],
      deterministicChecks: [check(item, adapter, "passed")],
    });

    expect(output.verdict).toBe("deployment_backed");
    expect(output.confidence).toBe("high");
  });

  it("returns code_backed when a GitHub check passes for an implementation claim", async () => {
    const item = evidence("github_pull_request");
    const output = await verify({
      proofEvidence: [item],
      deterministicChecks: [check(item, "github", "passed")],
    });

    expect(output.verdict).toBe("code_backed");
    expect(output.supportingEvidenceIds).toEqual([item.id]);
  });

  it("returns partially_supported when repository evidence cannot prove deployment", async () => {
    const item = evidence("github_commit");
    const output = await verify({
      proofClaim: claim("feature_deployed"),
      proofEvidence: [item],
      deterministicChecks: [check(item, "github", "passed")],
    });

    expect(output.verdict).toBe("partially_supported");
    expect(output.missingEvidenceTypes).toContain("successful production deployment record");
    expect(output.overstatementDetected).toBe(true);
  });

  it("returns source_linked for a reachable product URL without a deployment record", async () => {
    const item = evidence("production_url");
    const output = await verify({
      proofClaim: claim("product_accessible"),
      proofEvidence: [item],
      deterministicChecks: [check(item, "url", "passed")],
    });

    expect(output.verdict).toBe("source_linked");
    expect(output.confidence).toBe("medium");
  });

  it.each(["release_published", "version_current"] as const)(
    "returns source_linked when a GitHub check supports a %s claim",
    async (claimType) => {
    const item = evidence("github_release");
    const output = await verify({
      proofClaim: claim(claimType),
      proofEvidence: [item],
      deterministicChecks: [check(item, "github", "passed")],
    });

    expect(output.verdict).toBe("source_linked");
    },
  );

  it("falls back to source_linked for another claim type with a passing direct check", async () => {
    const item = evidence("external_source_link");
    const output = await verify({
      proofClaim: claim("feature_tested"),
      proofEvidence: [item],
      deterministicChecks: [check(item, "external", "passed")],
    });

    expect(output.verdict).toBe("source_linked");
  });

  it("returns unable_to_verify when the available source cannot be checked", async () => {
    const item = evidence("external_source_link", false);
    const output = await verify({
      proofEvidence: [item],
      deterministicChecks: [check(item, "external", "unavailable")],
    });

    expect(output.verdict).toBe("unable_to_verify");
  });

  it.each(["feature_deployed", "release_published"] as const)(
    "does not elevate a %s claim when only an unchecked screenshot exists",
    async (claimType) => {
      const item = evidence("screenshot");
      const output = await verify({
        proofClaim: claim(claimType),
        proofEvidence: [item],
        deterministicChecks: [check(item, "screenshot", "not_checked")],
      });

      expect(output.verdict).toBe("insufficient_evidence");
    },
  );

  it("returns insufficient_evidence when evidence exists but no check passes", async () => {
    const item = evidence("screenshot");
    const output = await verify({
      proofEvidence: [item],
      deterministicChecks: [check(item, "screenshot", "not_checked")],
    });

    expect(output.verdict).toBe("insufficient_evidence");
    expect(output.confidence).toBe("low");
  });
});
