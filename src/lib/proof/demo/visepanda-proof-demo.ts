import { runVerification } from "@/lib/proof/engine";
import { stableHash } from "@/lib/proof/hash";
import type { EvidenceItem, ProofClaim, VerificationReport } from "@/lib/proof/types";

const projectId = "visepanda-demo";
const now = new Date().toISOString();

function claim(partial: Omit<ProofClaim, "projectId" | "contentHash" | "updatedAt">): ProofClaim {
  return {
    ...partial,
    projectId,
    contentHash: stableHash(`${partial.sourceContentType}:${partial.sourceContentId}:${partial.originalText}`),
    updatedAt: now,
  };
}

export const visepandaDemoClaims: ProofClaim[] = [
  claim({
    id: "claim_visepanda_public_page_accessible",
    sourceContentType: "bp_section",
    sourceContentId: "demo-public-page",
    originalText: "VisePanda has a public interactive project page available at vp.jtcao.space.",
    normalizedClaim: "The public VisePanda project page is accessible at vp.jtcao.space.",
    claimType: "product_accessible",
    claimSubject: "VisePanda public project page",
    claimPredicate: "is accessible at",
    claimObject: "vp.jtcao.space",
    scope: "deployment",
    visibility: "public",
    riskLevel: "medium",
    requiresFreshness: true,
  }),
  claim({
    id: "claim_visepanda_project_story_self_reported",
    sourceContentType: "timeline_event",
    sourceContentId: "demo-origin-story",
    originalText: "VisePanda inspired ViseCraft's first demo project and proof workflow.",
    normalizedClaim: "VisePanda is the first seed case used to test ViseCraft's project-story workflow.",
    claimType: "milestone_completed",
    claimSubject: "ViseCraft seed workflow",
    claimPredicate: "uses",
    claimObject: "VisePanda as the first demo case",
    scope: "timeline",
    visibility: "public",
    riskLevel: "low",
    requiresFreshness: false,
  }),
  claim({
    id: "claim_visepanda_user_usage_missing",
    sourceContentType: "bp_section",
    sourceContentId: "demo-usage-boundary",
    originalText: "VisePanda is serving real users.",
    normalizedClaim: "VisePanda has active real user usage.",
    claimType: "product_accessible",
    claimSubject: "VisePanda",
    claimPredicate: "has",
    claimObject: "active real user usage",
    scope: "bp",
    visibility: "private",
    riskLevel: "high",
    requiresFreshness: true,
  }),
];

export const visepandaDemoEvidence: EvidenceItem[] = [
  {
    id: "ev_visepanda_public_url",
    projectId,
    sourceType: "production_url",
    sourceProvider: "url",
    sourceId: "https://vp.jtcao.space",
    sourceUrl: "https://vp.jtcao.space",
    sourceTitle: "VisePanda public project page",
    capturedAt: now,
    rawMetadata: { claimIds: ["claim_visepanda_public_page_accessible"] },
    trustLevel: "public_third_party_source",
    visibility: "public",
    isAvailable: true,
  },
  {
    id: "ev_visepanda_founder_note_origin",
    projectId,
    sourceType: "founder_note",
    sourceProvider: "visecraft",
    sourceId: "founder-note-visepanda-demo-origin",
    sourceTitle: "Founder note: VisePanda as first ViseCraft case",
    capturedAt: now,
    rawMetadata: { claimIds: ["claim_visepanda_project_story_self_reported"] },
    trustLevel: "founder_statement",
    visibility: "public_summary",
    isAvailable: true,
  },
];

export async function getVisePandaVerificationReport(): Promise<VerificationReport> {
  return runVerification({
    projectId,
    claims: visepandaDemoClaims,
    evidence: visepandaDemoEvidence,
    triggerType: "manual",
  });
}

export function findVisePandaClaimReport(report: VerificationReport, claimId: string) {
  const claim = report.claims.find((item) => item.id === claimId);
  const result = report.results.find((item) => item.claimId === claimId);
  const evidence = report.evidence.filter((item) => {
    const claimIds = item.rawMetadata.claimIds;
    return Array.isArray(claimIds) && claimIds.includes(claimId);
  });

  return claim && result ? { claim, result, evidence } : null;
}
