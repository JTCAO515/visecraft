# ViseCraft Documentation Index

Mandatory reading order:

1. `README.md`
2. `docs/PRODUCT.md`
3. `docs/ARCHITECTURE.md`
4. `docs/DATA_MODEL.md`
5. `docs/PROOF_ENGINE.md`
6. `docs/VERIFICATION_DATA_MODEL.md`
7. `docs/VERIFICATION_PROMPTS.md`
8. `docs/ROADMAP.md`
9. `docs/DESIGN.md`
10. `docs/OPERATOR_ACTIONS.md`
11. `AGENTS.md`

Current handoff snapshot:

- Product version: `v1.0.4`. Each completed product iteration increments only the patch number (`v1.0.5`, `v1.0.6`, ...), then updates `package.json`, the public version display, the project timeline and this handoff snapshot together.
- Active objective: Present ViseCraft as a living project-story SaaS platform, with Proof Engine as its core verification layer and BP creation/publishing as product capabilities.
- Implemented: Next.js App Router, dark evidence-first design system, bilingual marketing/auth/workspace copy, preview/Supabase auth adapter, protected `/app`, baseline RLS migration, Proof Engine database migration, deterministic GitHub/URL/deployment adapters, structured rule-based Proof AI provider, VisePanda verification dashboard and claim report, platform-level homepage narrative, Proof Engine section, commercial BP Builder capability section and website publishing workflow.
- Blockers: production Supabase Auth project, OAuth provider config, GitHub App installation, deployment-platform API credentials and automated Spaceship DNS provisioning are operator actions.
- Verification target: `npm run lint`, `npx tsc --noEmit`, `npm run build`, browser checks for `/`, `/login`, `/signup`, `/app`, `/app/projects/visepanda-demo/verification`.
- Next actions: persist BP/timeline/project data, connect real GitHub App, add scheduled rechecks, persist verification runs from service-role backend, integrate badges into published BP/timeline, automate Vercel deployment and Spaceship DNS subdomain creation.
