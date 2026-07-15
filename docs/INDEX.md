# ViseCraft Documentation Index

Mandatory reading order:

1. `README.md`
2. `docs/PRODUCT.md`
3. `docs/ARCHITECTURE.md`
4. `docs/DATA_MODEL.md`
5. `docs/ROADMAP.md`
6. `docs/DESIGN.md`
7. `docs/OPERATOR_ACTIONS.md`
8. `AGENTS.md`

Current handoff snapshot:

- Active objective: V1 public launch page, bilingual language switch, login/signup entry, protected workspace.
- Implemented: Next.js App Router, dark evidence-first design system, bilingual marketing/auth/workspace copy, preview/Supabase auth adapter, auth callback, logout, protected `/app`, privacy/terms, SEO metadata, sitemap, robots, baseline RLS migration.
- Blockers: production Supabase Auth project and OAuth provider config are operator actions.
- Verification target: `npm run lint`, `npx tsc --noEmit`, `npm run build`, browser checks for `/`, `/login`, `/signup`, `/app`.
- Next actions: connect Supabase project, add persistent project creation, add GitHub repository connection and activity import.
