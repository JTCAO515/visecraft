import { afterEach, describe, expect, it } from "vitest";
import { calculateFreshness, freshnessRules } from "@/lib/proof/freshness";

const checkedAt = "2026-01-01T00:00:00.000Z";
const originalFeatureExistsRule = freshnessRules.feature_exists;

afterEach(() => {
  freshnessRules.feature_exists = originalFeatureExistsRule;
});

describe("calculateFreshness", () => {
  it("keeps a TTL claim current before the 0.7 aging boundary", () => {
    const result = calculateFreshness({
      claimType: "product_accessible",
      checkedAt,
      now: new Date("2026-01-01T00:41:59.999Z"),
    });

    expect(result).toEqual({
      status: "current",
      expiresAt: "2026-01-01T01:00:00.000Z",
    });
  });

  it("marks a TTL claim aging exactly at the 0.7 boundary", () => {
    const result = calculateFreshness({
      claimType: "product_accessible",
      checkedAt,
      now: new Date("2026-01-01T00:42:00.000Z"),
    });

    expect(result.status).toBe("aging");
  });

  it("keeps a TTL claim aging until the stale boundary", () => {
    const result = calculateFreshness({
      claimType: "product_accessible",
      checkedAt,
      now: new Date("2026-01-01T00:59:59.999Z"),
    });

    expect(result.status).toBe("aging");
  });

  it("marks a TTL claim stale exactly at expiry", () => {
    const result = calculateFreshness({
      claimType: "product_accessible",
      checkedAt,
      now: new Date("2026-01-01T01:00:00.000Z"),
    });

    expect(result).toEqual({
      status: "stale",
      expiresAt: "2026-01-01T01:00:00.000Z",
    });
  });

  it.each(["release_published", "milestone_completed", "feature_exists"] as const)(
    "treats %s as historical",
    (claimType) => {
      expect(calculateFreshness({ claimType, checkedAt, now: new Date("2030-01-01T00:00:00.000Z") })).toEqual({
        status: "historical",
      });
    },
  );

  it("returns not_applicable for a configured not-applicable rule", () => {
    freshnessRules.feature_exists = { strategy: "not_applicable" };

    expect(calculateFreshness({ claimType: "feature_exists", checkedAt, now: new Date("2030-01-01T00:00:00.000Z") })).toEqual({
      status: "not_applicable",
    });
  });
});
