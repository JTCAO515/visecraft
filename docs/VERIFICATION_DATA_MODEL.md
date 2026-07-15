# Verification Data Model

This document records the Proof Engine database model introduced by:

`supabase/migrations/20260715123809_proof_engine_foundation.sql`

## Tables

### `projects`

Minimal project ownership table for the MVP.

Fields:

- `id`
- `owner_id`
- `slug`
- `name`
- `visibility`
- `created_at`
- `updated_at`
- `deleted_at`

RLS:

- Authenticated users can manage only their own non-deleted projects.

### `proof_claims`

Claim-level verification unit.

Fields:

- `id`
- `project_id`
- `source_content_type`
- `source_content_id`
- `original_text`
- `normalized_claim`
- `claim_type`
- `claim_subject`
- `claim_predicate`
- `claim_object`
- `claimed_status`
- `claimed_date`
- `scope`
- `visibility`
- `risk_level`
- `requires_freshness`
- `content_hash`
- `active`
- `superseded_at`
- `created_at`
- `updated_at`

Indexes:

- `(project_id, active)`
- `(source_content_type, source_content_id)`

RLS:

- Project owners can manage claims for their own projects.

### `proof_evidence_items`

Evidence source registry.

Fields:

- `id`
- `project_id`
- `source_type`
- `source_provider`
- `source_id`
- `source_url`
- `source_title`
- `captured_at`
- `observed_at`
- `last_checked_at`
- `content_hash`
- `raw_metadata`
- `trust_level`
- `visibility`
- `is_available`
- `created_at`
- `updated_at`

Unique key:

- `(project_id, source_type, source_provider, source_id)`

RLS:

- Project owners can manage evidence for their own projects.

### `proof_claim_evidence_links`

Candidate/supporting/contradicting evidence links.

Fields:

- `id`
- `claim_id`
- `evidence_id`
- `relation`
- `created_at`

Unique key:

- `(claim_id, evidence_id)`

### `proof_freshness_rules`

Configurable TTL rules by claim type.

Fields:

- `id`
- `claim_type`
- `ttl_seconds`
- `freshness_strategy`
- `created_at`
- `updated_at`

RLS:

- Authenticated users can read rules.
- Writes should be controlled by migrations/service role.

### `verification_runs`

Immutable run record.

Fields:

- `id`
- `project_id`
- `trigger_type`
- `proof_engine_version`
- `started_at`
- `completed_at`
- `status`
- `source_snapshot_at`
- `claims_checked`
- `claims_passed`
- `claims_partial`
- `claims_failed`
- `claims_stale`
- `error_summary`
- `created_at`

RLS:

- Project owners can read runs.
- Project owners cannot directly insert or update verdict history through client policies.

### `verification_results`

Final structured verdict per claim per run.

Fields:

- `id`
- `verification_run_id`
- `claim_id`
- `verdict`
- `confidence`
- `freshness_status`
- `evidence_coverage`
- `supporting_evidence_count`
- `contradicting_evidence_count`
- `summary`
- `limitations`
- `recommended_evidence`
- `deterministic_checks`
- `ai_output`
- `last_checked_at`
- `expires_at`
- `invalidated_at`
- `invalidation_reason`
- `created_at`

RLS:

- Project owners can read results for their own projects.
- There is no authenticated-user update policy for final verdicts.

### `verification_evidence_links`

Evidence used in a result.

Fields:

- `id`
- `verification_result_id`
- `evidence_id`
- `relation`
- `deterministic_status`
- `notes`
- `created_at`

### `verification_findings`

Human-readable issues detected during verification.

Fields:

- `id`
- `verification_result_id`
- `finding_type`
- `severity`
- `title`
- `body`
- `evidence_id`
- `created_at`

### `verification_model_runs`

Prompt/model audit record.

Fields:

- `id`
- `verification_run_id`
- `provider`
- `model`
- `prompt_version`
- `proof_engine_version`
- `input_claim_ids`
- `input_evidence_ids`
- `output`
- `status`
- `error_summary`
- `started_at`
- `completed_at`
- `created_at`

## Retention Rules

- Verification runs should be retained as historical records.
- Superseded claims should be marked inactive instead of hard-deleted.
- Evidence deletion should mark evidence unavailable and downgrade future results.
- Public pages may show public summaries only; private evidence rows should remain hidden.
