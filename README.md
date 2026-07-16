# ViseCraft

Current product version: `v1.0.4`

Turn every project in motion into a verifiable, living business story.

ViseCraft is an independent SaaS platform that automatically transforms real project progress into interactive, verifiable and continuously updated living BPs, project stories and investor updates.

ViseCraft Proof Engine is its verification layer: claim-level, evidence-backed and freshness-aware checks for living BP, timeline and investor-update claims. Formal BP creation, audience views and website publishing are product capabilities built on that platform.

It is not a VisePanda feature. VisePanda is an independent AI travel software project, and `vp.jtcao.space` is the first live case study that inspired this product.

## Current Status

The `v1.0.4` foundation includes:

- Public launch page with product positioning, capabilities, workflow, VisePanda demo, use cases, privacy, pricing preview and CTA paths.
- Login and signup entry.
- Supabase Auth architecture with GitHub OAuth support.
- Local preview auth fallback for MVP verification without committing secrets.
- Protected `/app` workspace with empty state, user identity, logout and project creation entry.
- ViseCraft Proof Engine V0 foundation: claim model, evidence model, freshness model, deterministic GitHub/URL/deployment adapters, protected verification dashboard and claim report.
- Homepage positioning centered on the living project-story platform, with Proof Engine as the core verification layer.
- SEO metadata, Open Graph image, sitemap and robots.
- Supabase auth foundation migration with RLS.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- Supabase Auth and PostgreSQL
- Zod
- Lucide React

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

### Continuous Integration

GitHub Actions runs on every pull request and every push to `main`. The quality and Playwright jobs use preview-auth environment values only. Run the same checks locally with:

```bash
npm run lint
npx tsc --noEmit
npm run build
npx playwright install chromium
npm run test:e2e
```

The three Chromium smoke tests cover the public authentication entry points, the `/app` authentication boundary and the VisePanda verification dashboard/report flow. They use preview auth without Supabase or GitHub secrets, and dashboard assertions do not depend on a specific external-source verdict. The unit-test step remains reserved until Issue #2 lands.

## Environment Variables

For local preview without a Supabase project:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_AUTH_MODE=preview
```

For production Supabase Auth:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_AUTH_MODE=supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Never expose a Supabase service role key in browser code.

For server-side GitHub evidence checks:

```bash
GITHUB_TOKEN=github_fine_grained_read_only_token
```

The token is optional for public repositories and must never be exposed to browser code. Use the minimum read-only repository metadata permissions needed for commit, PR, issue, release and tag checks.

## Authentication

Email/password and GitHub login use Supabase when configured. GitHub account login is identity only; repository connection will be a separate authorization flow inside the app.

When Supabase env vars are absent, preview auth sets an HTTP-only cookie so `/login`, `/signup`, `/app` and logout can be verified locally. Preview auth is not production security.

## Database Setup

Apply migrations with Supabase CLI after linking a project:

```bash
supabase link --project-ref your-project-ref
supabase db push
```

Current migrations:

- `supabase/migrations/20260715091736_auth_foundation.sql`
- `supabase/migrations/20260715123809_proof_engine_foundation.sql`

## Proof Engine

Proof Engine evaluates whether connected evidence supports individual project claims. It does not verify an entire startup and does not provide certification, audit, legal opinion, investment recommendation or guarantee of performance.

Current MVP supports:

- Claim-level data model.
- Evidence trust model.
- Verification run/result history.
- Freshness TTL rules.
- GitHub commit/PR/issue/release/tag source checks.
- URL availability checks.
- Deployment metadata abstraction.
- VisePanda demo verification at `/app/projects/visepanda-demo/verification`.

See:

- `docs/PROOF_ENGINE.md`
- `docs/VERIFICATION_DATA_MODEL.md`
- `docs/VERIFICATION_PROMPTS.md`

## Deployment

Deploy on Vercel or another Next.js-compatible host. Set the environment variables above, configure Supabase Auth redirect URLs, and add GitHub OAuth credentials in Supabase if GitHub login is enabled.

## Roadmap

See `docs/ROADMAP.md`.
