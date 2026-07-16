# Product

ViseCraft turns connected project activity into an inspectable project record and evaluates specific claims against available evidence.

It is independent from VisePanda and VisePitch. VisePanda is an AI travel software project and `vp.jtcao.space` is the first live case study used by the current demo. VisePitch is the separate dynamic-BP product.

## Product Thesis

Project claims drift away from their sources as teams move quickly. ViseCraft keeps source activity, human review, project meaning, claims, evidence, freshness and verification history in one controlled loop. ViseCraft Proof Engine is the core verification layer that makes the support and limitations of each claim inspectable.

The capability architecture is:

1. Source connection: collect authorized project activity and source metadata without conflating account identity with repository access.
2. Review and project record: let a human accept, edit or hide meaningful activity before it becomes part of the timeline.
3. Proof Engine: extract or register atomic claims, connect evidence, run deterministic checks, evaluate freshness and produce scoped verdicts with limitations.
4. Evidence delivery: expose authorized claim reports, badges and bounded exports while keeping private evidence private.

ViseCraft may synthesize reviewable project updates from accepted activity, but it does not own investor BP structure, chatbot BP authoring, document/deck conversion, interactive website BP generation or BP publishing.

## Product Boundary With VisePitch

VisePitch independently owns:

- intake for an idea, an in-development project, a mature product, a written business plan or a presentation deck;
- chatbot-assisted BP creation and revision;
- investor-oriented BP structure and editorial guidance;
- interactive, continuously updateable website BP presentation;
- BP-specific sharing and publishing.

A later integration may allow VisePitch to consume a bounded ViseCraft evidence packet. That packet must have an explicit schema, project authorization, visibility filtering, provenance, freshness and revocation behavior. VisePitch and ViseCraft do not share a database, application business logic, authentication session or commercial entitlement model.

## The ViseCraft Company Narrative

The planned 12-chapter ViseCraft public site is ViseCraft's own evidence-framed company narrative. It demonstrates how ViseCraft reports purpose, product direction, releases, risks, traction boundaries and current asks with sources attached. It is not a generic BP-builder capability and must not be marketed as one.

## Personas

- Product and engineering teams that need an inspectable record of material progress.
- Founders and operators who need claim-level evidence boundaries before sharing project updates.
- Independent builders maintaining a source-linked project history.
- Non-technical stakeholders who need technical activity translated into reviewable project meaning.
- Future: studios and portfolio operators managing evidence across multiple projects.

## Jobs To Be Done

- Connect project sources without silently broadening access.
- Review which activities belong in the durable project record.
- Explain what changed and why it matters without treating generated language as fact.
- Attach evidence and freshness rules to important claims and milestones.
- Inspect verdicts, contradictions, missing evidence and limitations at claim level.
- Export or share only the evidence summary a project owner explicitly authorizes.

## MVP Scope

- Public ViseCraft company narrative and product explanation.
- Login, signup/early access and protected workspace.
- VisePanda live case study link and verification demo.
- Evidence-first design system.
- Supabase-ready auth architecture with local preview auth.
- Proof Engine V0 with claim-level verdicts, freshness and source checks.
- Project record/timeline direction, human activity review and evidence delivery contracts.
- VisePanda verification dashboard and claim report.

## Non-Goals

- No BP builder, investor-view generator, deck converter, BP chatbot or interactive BP publisher; those belong to VisePitch.
- No fabricated traction, revenue, customer logos or funding claims.
- No automatic repository access through account login.
- No public disclosure of private evidence by default.
- No SOC 2 or enterprise security claims until actually achieved.
- No company-level score, certification, audit or investment recommendation.
