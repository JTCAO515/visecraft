# ViseCraft

Turn real project progress into an investor-ready story.

ViseCraft is an independent SaaS product. It is not a VisePanda feature. VisePanda is an independent AI travel software project, and `vp.jtcao.space` is the first live case study that inspired this product.

## Current Status

V1 foundation includes:

- Public launch page with product positioning, capabilities, workflow, VisePanda demo, use cases, privacy, pricing preview and CTA paths.
- Login and signup entry.
- Supabase Auth architecture with GitHub OAuth support.
- Local preview auth fallback for MVP verification without committing secrets.
- Protected `/app` workspace with empty state, user identity, logout and project creation entry.
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

## Authentication

Email/password and GitHub login use Supabase when configured. GitHub account login is identity only; repository connection will be a separate authorization flow inside the app.

When Supabase env vars are absent, preview auth sets an HTTP-only cookie so `/login`, `/signup`, `/app` and logout can be verified locally. Preview auth is not production security.

## Database Setup

Apply migrations with Supabase CLI after linking a project:

```bash
supabase link --project-ref your-project-ref
supabase db push
```

Current migration: `supabase/migrations/20260715091736_auth_foundation.sql`.

## Deployment

Deploy on Vercel or another Next.js-compatible host. Set the environment variables above, configure Supabase Auth redirect URLs, and add GitHub OAuth credentials in Supabase if GitHub login is enabled.

## Roadmap

See `docs/ROADMAP.md`.
