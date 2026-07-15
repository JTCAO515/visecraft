import { verifyDeploymentEvidence } from "@/lib/proof/adapters/deployment";
import { verifyGitHubEvidence } from "@/lib/proof/adapters/github";
import { verifyUrlAvailability } from "@/lib/proof/adapters/url";
import type { DeterministicCheck, EvidenceItem } from "@/lib/proof/types";

const githubTypes = new Set([
  "github_commit",
  "github_pull_request",
  "github_issue",
  "github_release",
  "github_tag",
]);

export async function runDeterministicChecks(evidence: EvidenceItem[]): Promise<DeterministicCheck[]> {
  return Promise.all(
    evidence.map(async (item) => {
      if (!item.isAvailable) {
        return {
          evidenceId: item.id,
          adapter: "external",
          status: "unavailable",
          checkedAt: new Date().toISOString(),
          summary: "The evidence item is marked unavailable.",
        } satisfies DeterministicCheck;
      }

      if (githubTypes.has(item.sourceType)) {
        return verifyGitHubEvidence(item);
      }

      if (item.sourceType === "production_url" || item.sourceType === "external_source_link") {
        return verifyUrlAvailability(item);
      }

      if (item.sourceType === "deployment_record") {
        return verifyDeploymentEvidence(item);
      }

      return {
        evidenceId: item.id,
        adapter: item.sourceType === "founder_note" ? "founder_note" : "screenshot",
        status: item.isAvailable ? "not_checked" : "unavailable",
        checkedAt: new Date().toISOString(),
        summary:
          item.sourceType === "founder_note"
            ? "Founder notes are treated as self-reported evidence."
            : "Screenshots are weak evidence and require stronger supporting sources.",
      } satisfies DeterministicCheck;
    }),
  );
}
