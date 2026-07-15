import { proofPromptVersion, type DeterministicCheck, type EvidenceItem, type ProofClaim, type Verdict } from "@/lib/proof/types";
import { verificationAIOutputSchema } from "@/lib/proof/schemas";
import type { ProofAIProvider, ProofEvidencePacket } from "@/lib/proof/ai/provider";

function sourceIds(evidence: EvidenceItem[], checks: DeterministicCheck[]) {
  const passed = new Set(checks.filter((check) => check.status === "passed").map((check) => check.evidenceId));
  return evidence.filter((item) => passed.has(item.id)).map((item) => item.id);
}

function hasType(evidence: EvidenceItem[], typePrefix: string) {
  return evidence.some((item) => item.sourceType.startsWith(typePrefix));
}

function verdictFor(claim: ProofClaim, evidence: EvidenceItem[], checks: DeterministicCheck[]): Verdict {
  if (checks.some((check) => check.status === "failed")) {
    return "contradicted";
  }

  if (evidence.length === 0) {
    return "insufficient_evidence";
  }

  const passed = checks.filter((check) => check.status === "passed");
  const onlySelfReported = evidence.every((item) => item.sourceType === "founder_note");

  if (onlySelfReported) {
    return "self_reported";
  }

  if (["deployment_live", "feature_deployed", "product_accessible"].includes(claim.claimType)) {
    if (passed.some((check) => ["deployment", "url"].includes(check.adapter))) {
      return claim.claimType === "product_accessible" && !hasType(evidence, "deployment") ? "source_linked" : "deployment_backed";
    }

    if (hasType(evidence, "github")) {
      return "partially_supported";
    }
  }

  if (["feature_exists", "feature_implemented", "development_progress"].includes(claim.claimType)) {
    if (passed.some((check) => check.adapter === "github")) {
      return "code_backed";
    }
  }

  if (claim.claimType === "release_published" || claim.claimType === "version_current") {
    if (passed.some((check) => check.adapter === "github")) {
      return "source_linked";
    }
  }

  if (passed.length > 0) {
    return "source_linked";
  }

  if (checks.some((check) => check.status === "unavailable")) {
    return "unable_to_verify";
  }

  return "insufficient_evidence";
}

function missingEvidence(claim: ProofClaim, verdict: Verdict) {
  if (verdict !== "partially_supported" && verdict !== "insufficient_evidence" && verdict !== "self_reported") {
    return [];
  }

  if (["deployment_live", "feature_deployed", "product_accessible"].includes(claim.claimType)) {
    return ["successful production deployment record", "reachable production URL", "deployment-to-commit correlation"];
  }

  if (["feature_exists", "feature_implemented", "development_progress"].includes(claim.claimType)) {
    return ["direct GitHub commit, merged PR, or release evidence"];
  }

  return ["direct platform source evidence"];
}

function limitationsFor(claim: ProofClaim, evidence: EvidenceItem[]) {
  const limitations = [
    "Verification evaluates only whether connected evidence supports this specific claim.",
  ];

  if (hasType(evidence, "github")) {
    limitations.push("Repository evidence can support implementation activity, but it does not prove production deployment, user adoption, revenue, or product-market fit.");
  }

  if (evidence.some((item) => item.sourceType === "production_url")) {
    limitations.push("A reachable URL confirms availability at check time only; it does not prove that a specific feature works or that users are active.");
  }

  if (evidence.some((item) => item.sourceType === "founder_note")) {
    limitations.push("Founder notes are self-reported and need stronger direct-source support for higher-confidence verification.");
  }

  if (claim.claimType.includes("deployed") && !evidence.some((item) => item.sourceType === "deployment_record")) {
    limitations.push("No direct deployment platform record was available for this claim.");
  }

  return Array.from(new Set(limitations));
}

export const ruleBasedProofProvider: ProofAIProvider = {
  provider: "visecraft",
  model: "deterministic-rule-provider-v0",
  promptVersion: proofPromptVersion,
  async verifyClaim(packet: ProofEvidencePacket) {
    const verdict = verdictFor(packet.claim, packet.evidence, packet.deterministicChecks);
    const supportingEvidenceIds = sourceIds(packet.evidence, packet.deterministicChecks);
    const contradictingEvidenceIds = packet.deterministicChecks
      .filter((check) => check.status === "failed")
      .map((check) => check.evidenceId);

    const output = {
      claimId: packet.claim.id,
      verdict,
      confidence:
        verdict === "deployment_backed" || verdict === "code_backed"
          ? "high"
          : verdict === "source_linked" || verdict === "partially_supported"
            ? "medium"
            : "low",
      supportedScope:
        supportingEvidenceIds.length > 0
          ? ["Connected evidence supports part of the claim scope described in the report."]
          : [],
      unsupportedScope: missingEvidence(packet.claim, verdict),
      reasoningSummary:
        verdict === "contradicted"
          ? "At least one deterministic source check failed or conflicts with the claim."
          : supportingEvidenceIds.length > 0
            ? "The verdict is based on connected evidence that passed deterministic checks."
            : "No direct evidence passed deterministic checks for this claim.",
      supportingEvidenceIds,
      contradictingEvidenceIds,
      missingEvidenceTypes: missingEvidence(packet.claim, verdict),
      overstatementDetected: verdict === "partially_supported" || verdict === "insufficient_evidence",
      freshnessConcern: false,
      limitations: limitationsFor(packet.claim, packet.evidence),
      recommendedRevision:
        verdict === "partially_supported"
          ? "Narrow the claim to the evidence-backed scope, or attach direct deployment/usage evidence."
          : undefined,
    };

    return verificationAIOutputSchema.parse(output);
  },
};
