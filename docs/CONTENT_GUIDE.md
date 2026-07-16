# ViseCraft Content Guide

This guide governs the public ViseCraft company record and the content data that drives it. The public site is evidence-first: every important statement should show what is known, what supports it, how fresh it is and what remains outside the evidence boundary.

The twelve chapters on the homepage explain **ViseCraft itself**. They are not a reusable business-plan template, an investor-deck generator or a BP authoring workflow. Those capabilities belong to the independent VisePitch product.

## 1. Canonical product definition

English:

> ViseCraft turns connected project activity into an inspectable project record and evaluates specific claims against available evidence.

中文：

> ViseCraft 将已连接的项目活动转化为可检查的项目记录，并根据现有证据评估具体声明。

The core value chain is:

```text
authorized source -> collected activity -> human review -> project record/timeline
  -> atomic claim -> evidence packet -> deterministic checks/freshness
  -> scoped verdict -> authorized report, badge or export
```

Keep these product boundaries explicit:

- ViseCraft owns source connection, human review, project records, claim/evidence/freshness evaluation and authorized evidence delivery.
- VisePitch owns idea/document/deck intake, chatbot-assisted BP authoring, investor BP structure, interactive web BP creation and BP publishing.
- VisePanda is an independent AI travel software project and may appear only as a clearly labelled case study.
- A future VisePitch integration may consume a bounded, authorized and revocable ViseCraft evidence packet. The products do not share a database, session, application logic or commercial entitlement.

## 2. Source of truth

Public landing-page copy lives in:

```text
src/content/landing.ts
```

The file exports one structured `LandingCopy` object per locale:

- `landingContent.en`: default English content.
- `landingContent.zh`: complete Chinese counterpart.
- `productVersion`: the public version string without the leading `v`.

Reusable components in `src/components` render the content. Do not move product claims, evidence, release history or pricing language into visual primitives. A component may own interaction labels only when they are truly generic and not product assertions.

Product and operating truth is distributed across these documents:

- `docs/PRODUCT.md`: accepted product purpose, boundary and non-goals.
- `docs/ARCHITECTURE.md`: route, auth, data-flow and evidence-delivery boundaries.
- `docs/PROOF_ENGINE.md`: claim-level verification contract and limitations.
- `docs/OPERATOR_ACTIONS.md`: external account, credential and console work.
- `CHANGELOG.md`: released product changes.
- `docs/INDEX.md`: mandatory reading order and current handoff.

When these sources disagree, stop the content update. Resolve the product or architecture baseline first; do not hide the conflict with smoother marketing copy.

## 3. The evidence-first writing contract

Every material statement should be classifiable as one of the following:

| State | Meaning | Suitable language |
| --- | --- | --- |
| Code-backed | The repository directly supports an implementation statement. | “The route is implemented.” |
| Source-linked | An identified source supports the statement. | “The package metadata reports v1.0.12.” |
| Founder-reviewed | The owner accepted the event or interpretation into the formal record. | “Founder-reviewed project update.” |
| Partially supported | Evidence supports only part of the claim. | State the supported part and the missing proof. |
| Insufficient evidence | Available evidence cannot support the claim. | Say what additional evidence would be needed. |
| Planned | The item is not delivered. | Use “planned”, “target” or “roadmap”; never present tense. |
| Not applicable | The question does not apply to this project or stage. | Explain why; do not invent filler. |

For numbers and time-sensitive claims, record or be able to answer:

- exact definition and unit;
- period covered and timezone when relevant;
- source and accountable owner;
- last checked date;
- whether it is an actual, assumption, estimate or projection;
- visibility and sharing boundary;
- freshness rule or next recheck date.

Code activity can support implementation or execution claims. It cannot, by itself, prove deployment, active use, customer value, commercial traction, revenue, compliance or investment quality.

## 4. Twelve-chapter company record

The twelve modules live in `landingContent.<locale>.bpStudio.modules`. Each locale must preserve the same `key`, chapter order, meaning and evidence boundary.

| Key | Chapter | Required question | Suitable evidence | Never imply |
| --- | --- | --- | --- | --- |
| 01 | Purpose | Why should project progress become a durable, inspectable record? | Product thesis, accepted product baseline | A proven market need without research |
| 02 | Problem | Where do project claims drift away from source and time context? | Observed workflow problems, documented examples | Universal customer pain or adoption |
| 03 | Solution | How do connect, review, record and verify form one controlled chain? | Implemented routes, data model, product contract | Fully automated or production-complete workflow |
| 04 | Why now | Why does faster AI-assisted production increase the value of evidence boundaries? | Cited external research or clearly labelled thesis | Market inevitability or guaranteed demand |
| 05 | Project record | What enters the timeline and who approves it? | Activity schema, review states, UI and tests | Automatic summaries are facts |
| 06 | Proof Engine | How is an atomic claim checked and bounded? | Claim/evidence/freshness model, deterministic adapters | Audit, certification, investment recommendation or whole-company score |
| 07 | Source layer | Which sources are current, authorized and attributable? | Implemented adapters and source metadata | Planned integration is live |
| 08 | Human review | Where does the project owner accept, edit, merge or reject meaning? | Review states, ownership rules, product UI | AI can silently alter the formal record |
| 09 | Reports | What may an authorized reader inspect? | Report schema, visibility controls, export contract | Private evidence is public or access control is complete when it is not |
| 10 | Release history | What changed, why did it matter and what supports the release? | Commit, build, test and document evidence | Repository activity equals business traction |
| 11 | Risks | What remains unsupported, stale, contradictory or outside scope? | Explicit limitations, open issues, missing sources | Absence of evidence is success |
| 12 | Next milestone | What bounded evidence workflow is next? | Accepted roadmap and executable issue | Planned work is delivered or scheduled without approval |

Each module has four fields:

```ts
{
  key: "01",
  title: "Purpose",
  body: "Why project progress needs a durable, inspectable record.",
  output: "Turn activity into a record people can understand and verify."
}
```

- `key`: stable two-digit chapter identity; do not renumber casually.
- `title`: a short chapter label.
- `body`: the question or boundary the chapter explains.
- `output`: the bounded conclusion the current evidence can support.

Do not turn `output` into a generic founder deliverable such as “your investor deck”, “your BP” or “your fundraising website”. It is the output of ViseCraft’s own company-record chapter.

## 5. Audience views are evidence scopes

`bpStudio.views` currently presents three views. They are visibility and reading scopes, not three generated BPs:

- **Founder record**: full activity, decisions, blockers, risks and evidence gaps.
- **Review report**: selected claims, verdicts, sources, freshness and limitations.
- **Public summary**: only owner-authorized milestones and evidence summaries.

When changing these descriptions, preserve privacy by default. A public view must never imply that private source material will be serialized, indexed or shared automatically.

## 6. Claim and Proof Engine language

Keep claims atomic and testable. Prefer:

> “The published product version is v1.0.12.”

Avoid:

> “ViseCraft is a proven, investor-ready platform.”

Every public verification example should include:

1. the exact claim;
2. source identity or source category;
3. scoped verdict;
4. freshness or recheck requirement;
5. supporting evidence summary;
6. explicit limitation;
7. the Proof Engine disclaimer.

Approved limitation pattern:

> Code confirms implementation. It does not establish active user adoption.

Proof Engine must never be described as:

- an audit, certification, legal opinion or investment recommendation;
- proof of an entire startup, team or market;
- a guarantee that a product is live, secure, adopted or profitable;
- an autonomous fact authority that overrides source owners.

## 7. Release-history updates

Release entries live in `releaseHistory.items`. Add one only after the iteration is complete and the supporting repository state exists.

Each release must separate:

- `delivered`: what changed in the product or repository;
- `productImpact`: what user or system capability the change creates;
- `evidence`: the source category that supports the release;
- `evidenceStatus`: `Code-backed` or `Source-linked`;
- `sourceHref`: a public, stable source link when one exists.

For every completed ViseCraft iteration:

1. increment only the patch version;
2. update `package.json` and `package-lock.json`;
3. update `productVersion` and any public version label;
4. add a truthful release-history entry in English and Chinese;
5. update `README.md`, `CHANGELOG.md` and `docs/INDEX.md` in the same commit;
6. run the full verification gate before calling the release complete.

Never create a release entry for planned work, and never attach an unrelated historical commit to a new claim.

## 8. Bilingual contract

- A first visit defaults to English.
- English and Chinese must contain the same information, evidence boundary, CTA, chapter, limitation, FAQ and release count.
- The HTML language must be `en` for English and `zh-CN` for Chinese.
- Keep stable identifiers (`id`, chapter `key`, view `id`) identical across locales.
- Product names stay `ViseCraft`, `VisePitch`, `VisePanda` and `Proof Engine` in both languages.
- Translate meaning, not word order. Do not strengthen a claim in one language.
- Update both locales in the same commit; a one-language release is incomplete.

## 9. Calls to action and commercial language

CTA labels must match real behavior:

- `/signup` may describe account creation only if the route and active auth mode honestly support it.
- “Early access” must not claim an application was received unless a real, approved intake channel stored it.
- Pricing marked preview or pending must not be presented as an active paid contract.
- “Report”, “badge” and “export” must be labelled planned when their production authorization path is not implemented.

Do not publish:

- fabricated customer logos, revenue, adoption, fundraising or performance numbers;
- “investor approved”, “market recognized”, “guaranteed” or similar unsupported authority claims;
- “secure”, “compliant” or “private” without naming the implemented control and its scope;
- a future Vercel, Linear, Notion, Figma, Supabase or Stripe integration as currently connected;
- VisePitch BP creation or publishing as a ViseCraft capability.

## 10. Safe update workflow

### A. Classify the change

Write down whether the proposed content is:

- observed fact;
- source-backed interpretation;
- founder-reviewed statement;
- hypothesis;
- planned capability;
- unknown or contradicted.

If the classification is unclear, do not publish the claim.

### B. Find the authoritative source

Read the relevant documents in the order listed in `docs/INDEX.md`. Confirm that the proposed statement matches current code, version, product boundary and operator state.

### C. Edit structured content

Update `src/content/landing.ts` in both `en` and `zh`. Preserve interface shape and stable identifiers. Keep claims out of rendering components.

### D. Synchronize documentation

If the content changes product promises, architecture, routes, auth, privacy, security, evidence visibility or external services, update the corresponding authoritative document in the same change. A product-boundary change requires explicit review; it is not a copy-edit.

### E. Verify

Run:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run test:e2e
git diff --check
```

Then run the site locally and inspect:

- `/`, `/login`, `/signup`, `/privacy`, `/terms` and `/app`;
- VisePanda verification dashboard and one claim report;
- English first-load and complete Chinese switch;
- 1440px desktop and 390px mobile widths;
- mobile navigation, tabs, CTA destinations and keyboard focus;
- no horizontal overflow;
- no browser console errors or warnings.

### F. Record the observation

Update `docs/INDEX.md` with active work, verification evidence, blockers and next actions. Do not write “passed” for a command or production check that was not actually run.

## 11. Stop conditions

Stop the content-only workflow and request product/operator review if the change introduces or alters:

- authentication, account permissions or repository access;
- private evidence visibility or public report authorization;
- analytics, uploads, forms, email, CRM or personal-data collection;
- AI providers or source material sent to a third party;
- payments, pricing commitments or commercial entitlements;
- custom domains, production credentials or external-console configuration;
- a VisePitch integration contract;
- audit, certification, regulatory or investment claims.

Record approved external actions in `docs/OPERATOR_ACTIONS.md`. Never put secrets, tokens, credentials or private evidence in content files, commits, screenshots or chat.
