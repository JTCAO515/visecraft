# Verification Prompts

Proof Engine uses independent prompt versions and model-run logging. The current code ships with a safe rule-based provider that emits the same structured schema expected from a future model provider.

## Prompt Versioning

Current prompt version:

`proof-verification-v0.1`

Every model run must record:

- Provider
- Model
- Prompt version
- Proof Engine version
- Input claim IDs
- Input evidence IDs
- Structured output
- Status
- Error summary

## Claim Extraction Prompt

Future model instruction:

```text
Extract verifiable project claims from the provided BP section or timeline event.

Return only claims that can be evaluated against evidence.
Do not extract broad investment, market-size, quality, intent or opinion claims.
Split compound statements into atomic claims.
Normalize each claim without strengthening it.
Classify the claim type.
Mark whether freshness is required.
Preserve the original source text and source ID.
```

Output fields:

- `originalText`
- `normalizedClaim`
- `claimType`
- `claimSubject`
- `claimPredicate`
- `claimObject`
- `claimedStatus`
- `claimedDate`
- `scope`
- `riskLevel`
- `requiresFreshness`

## Verification Prompt

Future model instruction:

```text
You are ViseCraft Proof Engine. Evaluate only whether the evidence packet supports the specific claim.

Evidence insufficient by default.
No evidence means no verification.
Correlation is not proof.
Code does not prove deployment.
Deployment does not prove usage.
Usage does not prove revenue.
Founder notes are self-reported.
Screenshots are weak evidence.
Uploaded files are weaker than direct API data.
Do not infer facts outside the evidence packet.
Do not verify the whole company, project, investment merit, fraud risk or commercial performance.

Use deterministic check results as facts.
If a deterministic check failed, explain the exact conflict.
If evidence supports only part of the claim, return partially_supported and recommend a narrower revision.
If the claim overstates what the evidence proves, mark overstatementDetected.
```

## Output Schema

```json
{
  "claimId": "string",
  "verdict": "unverified | self_reported | source_linked | code_backed | deployment_backed | partially_supported | insufficient_evidence | contradicted | stale | unable_to_verify",
  "confidence": "low | medium | high",
  "supportedScope": ["string"],
  "unsupportedScope": ["string"],
  "reasoningSummary": "string",
  "supportingEvidenceIds": ["string"],
  "contradictingEvidenceIds": ["string"],
  "missingEvidenceTypes": ["string"],
  "overstatementDetected": true,
  "freshnessConcern": true,
  "limitations": ["string"],
  "recommendedRevision": "string"
}
```

## Guardrails

- Never output a verdict based on absent evidence.
- Never call a startup verified.
- Never say “certified”, “investment-grade”, “guaranteed true” or “fraud-free”.
- Never use precise numeric confidence.
- Never expose private evidence in public summaries.
- Never treat mock evidence as real verification.
