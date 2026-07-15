import type { DeterministicCheck, EvidenceItem } from "@/lib/proof/types";

type DeploymentMetadata = {
  provider?: string;
  status?: string;
  environment?: string;
  deployedAt?: string;
  commitSha?: string;
  isMock?: boolean;
};

export async function verifyDeploymentEvidence(evidence: EvidenceItem): Promise<DeterministicCheck> {
  const checkedAt = new Date().toISOString();
  const metadata = evidence.rawMetadata as DeploymentMetadata;

  if (metadata.isMock) {
    return {
      evidenceId: evidence.id,
      adapter: "deployment",
      status: "not_checked",
      checkedAt,
      summary: "Mock deployment metadata is excluded from real verification results.",
      metadata,
    };
  }

  if (!metadata.provider || !metadata.status) {
    return {
      evidenceId: evidence.id,
      adapter: "deployment",
      status: "unavailable",
      checkedAt,
      summary: "Deployment evidence is missing provider/status metadata or API authorization.",
      metadata,
    };
  }

  const isProduction = metadata.environment === "production";
  const succeeded = ["ready", "success", "succeeded", "completed"].includes(metadata.status.toLowerCase());

  return {
    evidenceId: evidence.id,
    adapter: "deployment",
    status: succeeded && isProduction ? "passed" : "failed",
    checkedAt,
    observedAt: metadata.deployedAt,
    summary:
      succeeded && isProduction
        ? "Deployment metadata indicates a successful production deployment."
        : "Deployment metadata does not confirm a successful production deployment.",
    metadata,
  };
}
