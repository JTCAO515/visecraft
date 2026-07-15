export const proofEngineVersion = "0.1.0";
export const proofPromptVersion = "proof-verification-v0.1";

export type ClaimType =
  | "feature_exists"
  | "feature_implemented"
  | "feature_tested"
  | "feature_deployed"
  | "release_published"
  | "project_active"
  | "milestone_completed"
  | "roadmap_status"
  | "deployment_live"
  | "product_accessible"
  | "development_progress"
  | "version_current";

export type Verdict =
  | "unverified"
  | "self_reported"
  | "source_linked"
  | "code_backed"
  | "deployment_backed"
  | "partially_supported"
  | "insufficient_evidence"
  | "contradicted"
  | "stale"
  | "unable_to_verify";

export type FreshnessStatus = "current" | "aging" | "stale" | "historical" | "not_applicable";
export type Confidence = "low" | "medium" | "high";
export type EvidenceCoverage = "none" | "partial" | "strong" | "contradictory";

export type EvidenceSourceType =
  | "github_commit"
  | "github_pull_request"
  | "github_issue"
  | "github_release"
  | "github_tag"
  | "deployment_record"
  | "production_url"
  | "founder_note"
  | "screenshot"
  | "external_source_link";

export type TrustLevel =
  | "direct_api_source"
  | "signed_attestation"
  | "platform_generated_record"
  | "public_third_party_source"
  | "uploaded_document"
  | "screenshot"
  | "founder_statement";

export type ProofClaim = {
  id: string;
  projectId: string;
  sourceContentType: "bp_section" | "timeline_event" | "weekly_update" | "manual";
  sourceContentId: string;
  originalText: string;
  normalizedClaim: string;
  claimType: ClaimType;
  claimSubject: string;
  claimPredicate: string;
  claimObject?: string;
  claimedStatus?: string;
  claimedDate?: string;
  scope: "project" | "feature" | "release" | "deployment" | "timeline" | "bp";
  visibility: "private" | "team" | "public";
  riskLevel: "low" | "medium" | "high";
  requiresFreshness: boolean;
  contentHash: string;
  updatedAt: string;
};

export type EvidenceItem = {
  id: string;
  projectId: string;
  sourceType: EvidenceSourceType;
  sourceProvider: string;
  sourceId: string;
  sourceUrl?: string;
  sourceTitle: string;
  capturedAt: string;
  observedAt?: string;
  lastCheckedAt?: string;
  contentHash?: string;
  rawMetadata: Record<string, unknown>;
  trustLevel: TrustLevel;
  visibility: "private" | "team" | "public_summary" | "public";
  isAvailable: boolean;
};

export type DeterministicCheck = {
  evidenceId: string;
  adapter: "github" | "url" | "deployment" | "founder_note" | "screenshot" | "external";
  status: "passed" | "failed" | "stale" | "unavailable" | "not_checked";
  summary: string;
  checkedAt: string;
  observedAt?: string;
  metadata?: Record<string, unknown>;
};

export type VerificationAIOutput = {
  claimId: string;
  verdict: Verdict;
  confidence: Confidence;
  supportedScope: string[];
  unsupportedScope: string[];
  reasoningSummary: string;
  supportingEvidenceIds: string[];
  contradictingEvidenceIds: string[];
  missingEvidenceTypes: string[];
  overstatementDetected: boolean;
  freshnessConcern: boolean;
  limitations: string[];
  recommendedRevision?: string;
};

export type VerificationResult = {
  id: string;
  verificationRunId: string;
  claimId: string;
  verdict: Verdict;
  confidence: Confidence;
  freshnessStatus: FreshnessStatus;
  evidenceCoverage: EvidenceCoverage;
  supportingEvidenceCount: number;
  contradictingEvidenceCount: number;
  summary: string;
  limitations: string[];
  recommendedEvidence: string[];
  deterministicChecks: DeterministicCheck[];
  aiOutput: VerificationAIOutput;
  lastCheckedAt: string;
  expiresAt?: string;
  invalidatedAt?: string;
  invalidationReason?: string;
};

export type VerificationRun = {
  id: string;
  projectId: string;
  triggerType: "manual" | "claim_changed" | "evidence_changed" | "scheduled" | "publish";
  proofEngineVersion: string;
  startedAt: string;
  completedAt?: string;
  status: "queued" | "running" | "completed" | "failed" | "cancelled";
  sourceSnapshotAt: string;
  claimsChecked: number;
  claimsPassed: number;
  claimsPartial: number;
  claimsFailed: number;
  claimsStale: number;
  errorSummary?: string;
};

export type VerificationReport = {
  run: VerificationRun;
  claims: ProofClaim[];
  evidence: EvidenceItem[];
  results: VerificationResult[];
  findings: VerificationFinding[];
  profile: VerificationProfileItem[];
};

export type VerificationFinding = {
  id: string;
  resultId: string;
  findingType:
    | "missing_evidence"
    | "contradiction"
    | "stale_evidence"
    | "limitation"
    | "overstatement"
    | "source_unavailable";
  severity: "info" | "warning" | "critical";
  title: string;
  body: string;
  evidenceId?: string;
};

export type VerificationProfileItem = {
  label: string;
  verdict: Verdict;
  summary: string;
};
