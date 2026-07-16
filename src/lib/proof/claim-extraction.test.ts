import { describe, expect, it } from "vitest";
import { extractClaimsFromContent, isVerificationInvalidatedByClaimEdit } from "@/lib/proof/claim-extraction";
import type { ClaimType } from "@/lib/proof/types";

const baseSource = {
  projectId: "project_test",
  sourceContentType: "bp_section" as const,
  sourceContentId: "section_product",
};

function extract(text: string) {
  return extractClaimsFromContent({ ...baseSource, text });
}

describe("extractClaimsFromContent", () => {
  it("splits sentences at English and Chinese punctuation without requiring whitespace", () => {
    const claims = extract(
      "The booking engine was implemented for production.短句。这个功能已经部署并可供投资人查看。Roadmap planning is visible!",
    );

    expect(claims.map((claim) => claim.originalText)).toEqual([
      "The booking engine was implemented for production.",
      "这个功能已经部署并可供投资人查看。",
      "Roadmap planning is visible!",
    ]);
  });

  it("drops sentences with 16 or fewer characters", () => {
    expect(extract("1234567890123456")).toHaveLength(0);
    expect(extract("12345678901234567")).toHaveLength(1);
  });

  it.each<[string, ClaimType, boolean]>([
    ["The booking engine was deployed yesterday.", "feature_deployed", true],
    ["The public product is live for testing.", "product_accessible", true],
    ["Release 1.2 was published to customers.", "release_published", false],
    ["The roadmap now includes enterprise access.", "roadmap_status", true],
    ["Development continues across the core product.", "development_progress", false],
    ["The booking workflow was implemented fully.", "feature_implemented", false],
    ["The booking workflow supports itinerary edits.", "feature_exists", false],
  ])("classifies %s as %s", (text, expectedType, expectedFreshness) => {
    const [claim] = extract(text);

    expect(claim.claimType).toBe(expectedType);
    expect(claim.requiresFreshness).toBe(expectedFreshness);
    expect(claim.riskLevel).toBe(expectedFreshness ? "medium" : "low");
  });

  it("produces stable hashes for the same source and changes them when source identity changes", () => {
    const text = "The product supports evidence-backed project updates.";
    const [first] = extract(text);
    const [second] = extract(text);
    const [differentSource] = extractClaimsFromContent({
      ...baseSource,
      sourceContentId: "section_traction",
      text,
    });

    expect(first.contentHash).toBe(second.contentHash);
    expect(first.id).toBe(second.id);
    expect(differentSource.contentHash).not.toBe(first.contentHash);
  });
});

describe("isVerificationInvalidatedByClaimEdit", () => {
  it("invalidates a result only when the claim hash changes", () => {
    const [claim] = extract("The product supports evidence-backed project updates.");

    expect(isVerificationInvalidatedByClaimEdit(claim.contentHash, claim)).toBe(false);
    expect(isVerificationInvalidatedByClaimEdit("h_previous", claim)).toBe(true);
  });
});
