# Operator Action Register

## OA-001 Configure Supabase Auth

- Purpose: enable production email/password and GitHub OAuth sessions.
- Owner: operator.
- Environment: Supabase project and deployment provider.
- Placeholder names: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `NEXT_PUBLIC_AUTH_MODE=supabase`.
- Prerequisite: create or select a Supabase project.
- Unblock condition: `/login` can sign in with real Supabase credentials and `/auth/callback` exchanges OAuth codes.
- Verification: sign in, visit `/app`, logout, then confirm `/app` redirects to `/login`.
- Rollback: set `NEXT_PUBLIC_AUTH_MODE=preview` in local development only.

## OA-002 Configure GitHub OAuth Provider in Supabase

- Purpose: allow account login with GitHub without granting repository data access.
- Owner: operator.
- Environment: GitHub OAuth app and Supabase Auth provider settings.
- Placeholder: GitHub OAuth client ID and secret stored only in Supabase.
- Unblock condition: `Sign in with GitHub` redirects through Supabase and returns to `/auth/callback`.
- Verification: login succeeds and no repository permissions are requested beyond identity/email scopes.
- Rollback: disable GitHub provider in Supabase Auth.
