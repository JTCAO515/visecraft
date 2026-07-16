import { stableHash } from "@/lib/proof/hash";
import type { ClaimType, ProofClaim } from "@/lib/proof/types";

type SourceContent = {
  projectId: string;
  sourceContentType: ProofClaim["sourceContentType"];
  sourceContentId: string;
  text: string;
  visibility?: ProofClaim["visibility"];
};

function classifyClaim(text: string): ClaimType {
  const lower = text.toLowerCase();

  if (lower.includes("deployed") || lower.includes("launched")) return "feature_deployed";
  if (lower.includes("live") || lower.includes("accessible") || lower.includes("available at")) return "product_accessible";
  if (lower.includes("release") || lower.includes("version")) return "release_published";
  if (lower.includes("roadmap")) return "roadmap_status";
  if (lower.includes("active") || lower.includes("development")) return "development_progress";
  if (lower.includes("implemented") || lower.includes("built")) return "feature_implemented";

  return "feature_exists";
}

function requiresFreshness(claimType: ClaimType) {
  return ["deployment_live", "product_accessible", "project_active", "feature_deployed", "roadmap_status", "version_current"].includes(claimType);
}

export function extractClaimsFromContent(source: SourceContent): ProofClaim[] {
  return source.text
    .split(/(?<=[!?。！？])\s*|(?<=[.])(?=\s)|(?<!\d\.)(?<=[.])(?=\S)/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 16)
    .map((sentence, index) => {
      const claimType = classifyClaim(sentence);
      const contentHash = stableHash(`${source.sourceContentType}:${source.sourceContentId}:${sentence}`);

      return {
        id: `claim_${contentHash}_${index}`,
        projectId: source.projectId,
        sourceContentType: source.sourceContentType,
        sourceContentId: source.sourceContentId,
        originalText: sentence,
        normalizedClaim: sentence.replace(/\s+/g, " "),
        claimType,
        claimSubject: "project",
        claimPredicate: claimType.replaceAll("_", " "),
        scope: claimType.includes("deployment") || claimType === "product_accessible" ? "deployment" : "project",
        visibility: source.visibility ?? "private",
        riskLevel: requiresFreshness(claimType) ? "medium" : "low",
        requiresFreshness: requiresFreshness(claimType),
        contentHash,
        updatedAt: new Date().toISOString(),
      };
    });
}

export function isVerificationInvalidatedByClaimEdit(previousHash: string, currentClaim: ProofClaim) {
  return previousHash !== currentClaim.contentHash;
}
