# ViseCraft Documentation Index

Mandatory reading order:

1. `README.md`
2. `CHANGELOG.md`
3. `docs/PRODUCT.md`
4. `docs/ARCHITECTURE.md`
5. `docs/DATA_MODEL.md`
6. `docs/PROOF_ENGINE.md`
7. `docs/VERIFICATION_DATA_MODEL.md`
8. `docs/VERIFICATION_PROMPTS.md`
9. `docs/ROADMAP.md`
10. `docs/DESIGN.md`
11. `docs/CONTENT_GUIDE.md`
12. `docs/DEPLOY.md`
13. `docs/OPERATOR_ACTIONS.md`
14. `AGENTS.md`

Current handoff snapshot:

- Product version: `v1.0.12`. Each completed product iteration increments only the patch number (`v1.0.13`, `v1.0.14`, ...), then updates `package.json`, the public version display, `README.md`, `CHANGELOG.md`, the project timeline and this handoff snapshot together.
- Active objective: Present ViseCraft as the evidence system for connected project activity: source connection, human review, project record/timeline, claim/evidence/freshness, Proof Engine verdicts and evidence delivery through reports, badges and exports.
- Accepted product boundary: VisePitch independently owns idea/document/deck intake, chatbot-assisted authoring, investor BP structure, interactive website BPs and BP publishing. A future VisePitch integration may consume a bounded ViseCraft evidence packet, but the products do not share a database or application business logic.
- Implemented software: Next.js App Router with `(marketing)`, `(app)` and reserved `(public)` route boundaries, dark evidence-first design system, bilingual marketing/auth/workspace copy, preview/Supabase auth adapter, protected `/app`, baseline RLS migration, Proof Engine database migration, deterministic GitHub/URL/deployment adapters, structured rule-based Proof AI provider, VisePanda verification dashboard and claim report, explicit integration roadmap, Free/Pro comparison, reusable marketing primitives, immediate press feedback, functional floating chrome, reduced-transparency/high-contrast fallbacks, a product-continuous auth flow, Chromium smoke coverage for public/authenticated verification paths, bilingual evidence-linked homepage release reports for v1.0.5 through v1.0.12, an evidence-first 12-chapter content maintenance guide and a beginner-safe Vercel/Spaceship deployment runbook for `vc.jtcao.space`.
- Current deviation: several historical releases and open Issues still describe the superseded BP-creation direction. Current source and product documentation follow the corrected boundary; Issue remediation remains future repository maintenance.
- Blockers: production Supabase Auth project, OAuth provider configuration and GitHub App installation are operator actions. ViseCraft BP/domain publishing is no longer an operator action in this repository.
- Verification target: `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm run test:e2e` for `/`, `/login`, `/signup`, `/app`, `/app/projects/visepanda-demo/verification` and a claim report; production release additionally requires desktop/mobile, bilingual, route, console, GitHub Actions, Vercel deployment, DNS and HTTPS smoke checks from `docs/DEPLOY.md`.
- Next actions: run the release gate and production smoke for the current `main` commit; align open Issues with the corrected boundary; persist project/timeline data; connect the real GitHub App; add scheduled rechecks; persist verification runs from a service-role backend; define the evidence-packet export contract; and add public claim reports and badges without exposing private evidence.
