# ViseCraft

Current product version: `v1.0.12`

Turn project activity into an inspectable, evidence-aware record.

ViseCraft is an independent SaaS product for connecting project sources, reviewing meaningful activity, maintaining a project record and evaluating specific claims against evidence and freshness rules.

ViseCraft Proof Engine is its verification layer: claim-level, evidence-backed and freshness-aware checks that produce scoped verdicts, reports, badges and exportable evidence summaries.

VisePitch is a separate product. It owns idea, document and deck intake, chatbot-assisted authoring, investor BP structure, interactive website BPs and BP publishing. VisePitch may later consume a bounded ViseCraft evidence packet through an explicit export contract, but the products do not share a database, application business logic or product promises.

It is not a VisePanda feature. VisePanda is an independent AI travel software project, and `vp.jtcao.space` is the first live case study that inspired this product.

## Current Status

The `v1.0.12` foundation includes:

- Public launch page with product positioning, capabilities, workflow, VisePanda demo, use cases, privacy, pricing preview and CTA paths. Its evidence-framed 12-chapter company record explains ViseCraft itself without marketing a generic BP builder.
- Login and signup entry.
- Supabase Auth architecture with GitHub OAuth support.
- Local preview auth fallback for MVP verification without committing secrets.
- Protected `/app` workspace with empty state, user identity, logout and project creation entry.
- ViseCraft Proof Engine V0 foundation: claim model, evidence model, freshness model, deterministic GitHub/URL/deployment adapters, protected verification dashboard and claim report.
- Homepage product interface centered on Proof Engine, evidence boundaries and inspectable release history.
- SEO metadata, Open Graph image, sitemap and robots.
- Supabase auth foundation migration with RLS.
- Bilingual, evidence-linked product release reports for v1.0.5 through v1.0.12 on the public homepage.

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

The four Chromium smoke tests cover the public homepage at desktop/mobile widths, bilingual copy, authentication entry points, the `/app` authentication boundary and the VisePanda verification dashboard/report flow. They use preview auth without Supabase or GitHub secrets, and dashboard assertions do not depend on a specific external-source verdict. The unit-test step remains reserved until Issue #2 lands.

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

Deploy the ViseCraft application on Vercel or another Next.js-compatible host. Set the environment variables above, configure Supabase Auth redirect URLs, and add GitHub OAuth credentials in Supabase if GitHub login is enabled. Interactive BP deployment belongs to the independent VisePitch product.

Use [`docs/DEPLOY.md`](docs/DEPLOY.md) for the click-by-click Vercel, Spaceship DNS, verification and rollback runbook. Use [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) when updating the bilingual 12-chapter company record.

## Roadmap

See `docs/ROADMAP.md`.
