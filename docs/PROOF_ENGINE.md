# ViseCraft Proof Engine

ViseCraft Proof Engine is the independent verification layer for Living BP, timeline, project updates and published views.

It does not verify a company, endorse an investment, certify a startup or guarantee performance. It evaluates whether available connected evidence supports a specific project claim.

## Product Principles

- Claim-level verification only.
- Evidence insufficient by default.
- Deterministic source checks before AI interpretation.
- AI may interpret semantic relevance, scope and overstatement, but cannot invent facts.
- Code evidence does not prove deployment.
- Deployment evidence does not prove user adoption.
- User adoption does not prove revenue.
- Founder statements are self-reported.
- Private evidence is never made public by default.
- No single score.

## System Architecture

Narrative Engine and Proof Engine are separated.

Narrative Engine:

- Generates BP sections.
- Summarizes activity.
- Writes timeline narratives.
- Produces investor updates.

Proof Engine:

- Reads claims and evidence.
- Extracts and normalizes claims.
- Runs deterministic evidence adapters.
- Builds a read-only evidence packet.
- Produces structured verdicts.
- Stores verification run history.
- Does not modify BP content.
- Does not allow project owners to manually edit verdicts.

Current MVP implementation:

- `src/lib/proof/types.ts`
- `src/lib/proof/engine.ts`
- `src/lib/proof/deterministic.ts`
- `src/lib/proof/adapters/github.ts`
- `src/lib/proof/adapters/url.ts`
- `src/lib/proof/adapters/deployment.ts`
- `src/lib/proof/ai/rule-based-provider.ts`
- `/app/projects/[projectId]/verification`

## Trust Model

Evidence is not equal. The trust model ranks evidence roughly as:

1. Direct API source
2. Signed attestation
3. Platform-generated record
4. Public third-party source
5. Uploaded document
6. Screenshot
7. Founder statement

MVP source types:

- GitHub commit
- GitHub pull request
- GitHub issue
- GitHub release
- GitHub tag
- Deployment record
- Production URL
- Founder note
- Screenshot
- External source link

## Verdict Definitions

- `unverified`: no completed verification.
- `self_reported`: supported only by founder-provided information.
- `source_linked`: source exists and was checked, but the support scope is limited.
- `code_backed`: repository evidence supports implementation-related scope.
- `deployment_backed`: deployment or URL evidence supports availability-related scope.
- `partially_supported`: evidence supports only part of the claim.
- `insufficient_evidence`: connected evidence is not enough.
- `contradicted`: evidence conflicts with the claim or a deterministic check failed.
- `stale`: result is too old for a current claim.
- `unable_to_verify`: source could not be checked.

Do not use “ViseCraft Certified”, “investment-grade”, “guaranteed true”, “fraud-free” or equivalent language.

## Freshness Model

Freshness is configured by claim type and mirrored in the database table `proof_freshness_rules`.

- `deployment_live`: 24 hours
- `product_accessible`: 1 hour
- `project_active`: 7 days
- `feature_deployed`: 7 days
- `release_published`: historical
- `milestone_completed`: historical
- `roadmap_status`: 14 days
- `version_current`: 24 hours

Each result stores:

- Last checked
- Freshness status
- Expires at
- Deterministic checks

## Contradiction Detection

Contradictions must name the source-level reason. Examples:

- PR not merged but claim says feature shipped.
- Release tag missing.
- Production URL unreachable.
- Deployment record is preview-only.
- Deployment timestamp is after claimed launch date.
- Claim says user usage but no usage evidence exists.

The MVP flags deterministic failures as `contradicted` and records source-unavailable findings separately.

## Limitations

ViseCraft verification evaluates whether available connected evidence supports specific project claims. It is not an audit, certification, legal opinion, investment recommendation or guarantee of company performance.

The first MVP does not verify:

- Revenue
- Bank records
- Contracts
- Fundraising amounts
- Legal compliance
- Government registry data
- User identity
- Investment merit

## Anti-Abuse Strategy

Implemented in the first data model:

- Source IDs are stored.
- First capture and last check timestamps are stored.
- Content hashes are stored.
- Verification run history is immutable for project users.
- Verdicts are read-only to authenticated project users.
- Claim edits produce new content hashes and should invalidate old results.
- Evidence has visibility controls so private evidence does not leak to public pages.

Future:

- Git history rewrite detection.
- Signed provenance.
- Artifact attestations.
- Cross-source verification.
- Screenshot tampering checks.
- Third-party identity verification.

## Future Roadmap

- Persist claim extraction from BP sections and timeline events.
- Add GitHub App installation flow.
- Add Vercel adapter using direct deployment API.
- Add Usage-backed and Revenue-backed claim types.
- Add scheduled rechecks.
- Add public verification explanation page.
- Add source deletion and evidence downgrade jobs.
