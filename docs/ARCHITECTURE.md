# Architecture

## Stack

- Next.js App Router with TypeScript.
- Tailwind CSS v4 tokens in `src/app/globals.css`.
- Supabase Auth through `@supabase/ssr`.
- Local preview auth only for MVP verification when Supabase env vars are absent.
- Zod for request validation.

## Data Flow

Landing page content lives in `src/content/landing.ts`. UI components consume structured content and do not hard-code product claims into the design system.

## Route Boundaries

The App Router keeps one root document layout and uses route groups to separate rendering and access concerns without changing public URLs:

- `src/app/(marketing)`: `/`, `/login`, `/signup`, `/privacy` and `/terms`; explicitly static, with the landing navigation and footer owned by the marketing layout shell.
- `src/app/(app)`: `/app/**` and `/auth/callback`; dynamic application and authentication flows. The shared app layout requires an authenticated user before protected page content renders.
- `src/app/(public)`: reserved ISR presentation boundary for `/p/[slug]`. Issue #14 will add the first published project route; no placeholder project data is exposed meanwhile.
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

## Publishing Model

The public launch page is static and shareable. Published project pages will use the `(public)` route group's ISR boundary after persistent project data and GitHub activity import are implemented.
