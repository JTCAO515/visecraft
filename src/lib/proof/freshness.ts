import type { ClaimType, FreshnessStatus } from "@/lib/proof/types";

export type FreshnessRule = {
  ttlSeconds?: number;
  strategy: "ttl" | "historical" | "not_applicable";
};

export const freshnessRules: Record<ClaimType, FreshnessRule> = {
  deployment_live: { ttlSeconds: 86_400, strategy: "ttl" },
  product_accessible: { ttlSeconds: 3_600, strategy: "ttl" },
  project_active: { ttlSeconds: 604_800, strategy: "ttl" },
  feature_deployed: { ttlSeconds: 604_800, strategy: "ttl" },
  release_published: { strategy: "historical" },
  milestone_completed: { strategy: "historical" },
  roadmap_status: { ttlSeconds: 1_209_600, strategy: "ttl" },
  version_current: { ttlSeconds: 86_400, strategy: "ttl" },
  feature_exists: { strategy: "historical" },
  feature_implemented: { ttlSeconds: 604_800, strategy: "ttl" },
  feature_tested: { ttlSeconds: 604_800, strategy: "ttl" },
  development_progress: { ttlSeconds: 604_800, strategy: "ttl" },
};

export function calculateFreshness({
  claimType,
  checkedAt,
  now = new Date(),
}: {
  claimType: ClaimType;
  checkedAt: string;
  now?: Date;
}): { status: FreshnessStatus; expiresAt?: string } {
  const rule = freshnessRules[claimType];

  if (rule.strategy === "historical") {
    return { status: "historical" };
  }

  if (rule.strategy === "not_applicable" || !rule.ttlSeconds) {
    return { status: "not_applicable" };
  }

  const checked = new Date(checkedAt);
  const ageMs = now.getTime() - checked.getTime();
  const ttlMs = rule.ttlSeconds * 1000;
  const expiresAt = new Date(checked.getTime() + ttlMs).toISOString();

  if (ageMs >= ttlMs) {
    return { status: "stale", expiresAt };
  }

  if (ageMs >= ttlMs * 0.7) {
    return { status: "aging", expiresAt };
  }

  return { status: "current", expiresAt };
}
