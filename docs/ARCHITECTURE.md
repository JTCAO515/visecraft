# Architecture

## Stack

- Next.js App Router with TypeScript.
- Tailwind CSS v4 tokens in `src/app/globals.css`.
- Supabase Auth through `@supabase/ssr`.
- Local preview auth only for MVP verification when Supabase env vars are absent.
- Zod for request validation.

## Data Flow

Landing page content currently lives in `src/content/landing.ts`. UI components consume structured content and do not hard-code product claims into the design system. The next source revision must replace legacy BP-builder promises with the corrected ViseCraft boundary recorded in `docs/PRODUCT.md`.

The target ViseCraft value flow is:

```text
authorized source -> collected activity -> human review -> project record/timeline
  -> atomic claim -> evidence packet -> deterministic checks/freshness
  -> scoped verdict -> authorized report, badge or export
```

Generated summaries remain drafts until a user accepts them. Proof Engine consumes read-only claim and evidence inputs and does not modify source content.

## Route Boundaries

The App Router keeps one root document layout and uses route groups to separate rendering and access concerns without changing public URLs:

- `src/app/(marketing)`: `/`, `/login`, `/signup`, `/privacy` and `/terms`; explicitly static, with the landing navigation and footer owned by the marketing layout shell.
- `src/app/(app)`: `/app/**` and `/auth/callback`; dynamic application and authentication flows. The shared app layout requires an authenticated user before protected page content renders.
- `src/app/(public)`: reserved public evidence-delivery boundary. Future routes may expose authorized claim reports or badge explanations; no generic project BP route or placeholder private project data is exposed.
- `src/app/api`: server endpoints remain outside presentation groups.

Route groups do not contribute URL segments. `src/proxy.ts` continues to protect only `/app/:path*`; moving files between groups must not broaden that matcher.

Auth flow:

1. User visits `/login` or `/signup`.
2. If Supabase env vars exist, email/password and GitHub OAuth use Supabase Auth.
3. `/auth/callback` exchanges OAuth codes for a Supabase session.
4. If Supabase env vars are absent and preview mode is enabled, preview auth sets an HTTP-only cookie for local verification.
5. `src/proxy.ts` protects `/app/*` and redirects unauthenticated users to `/login`.

## Security Model

- Service role keys must never be exposed to the browser.
- GitHub login is identity only; repository connection is a separate future flow.
- Protected routes use Supabase `getClaims()` in proxy when Supabase is configured.
- Preview auth is for local MVP verification and must not be treated as production security.

## Evidence Delivery Model

The public launch page is static and shareable. Future ViseCraft public surfaces are limited to authorized verification reports, badge explanations and bounded evidence exports. Visibility filtering must occur server-side, and private/team evidence must never be serialized into a public response.

Interactive BP rendering and publishing belong to VisePitch. A future cross-product integration uses an explicit, revocable evidence-packet contract; it does not query ViseCraft tables directly and does not share application business logic.
