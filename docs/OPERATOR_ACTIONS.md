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

## OA-003 Publish BP/Report Website on `jtcao.space`

- Purpose: publish a generated ViseCraft BP/report as a real website under a project subdomain such as `project-name.jtcao.space`.
- Owner: operator.
- Environment: Vercel project plus Spaceship DNS for `jtcao.space`.
- Placeholder names: `PROJECT_SLUG`, `PUBLISH_DOMAIN`, `VERCEL_PROJECT_ID`, `SPACESHIP_DNS_RECORD`.
- Current status: manual/operator-assisted. This must not be marketed as fully automated provisioning until the domain and deployment APIs are implemented.
- Prerequisite: generated BP/report build output and selected project slug.
- Manual flow:
  1. Deploy the project/report site through Vercel.
  2. Add or update the matching subdomain record in Spaceship DNS for `jtcao.space`.
  3. Wait for DNS propagation and Vercel domain verification.
  4. Verify the public URL loads the intended BP/report.
- Unblock condition: the selected URL, for example `PROJECT_SLUG.jtcao.space`, returns the published BP/report.
- Verification: open the URL in a private browser window and confirm the report content, visibility mode and evidence summaries match the intended published state.
- Rollback: remove the Vercel domain binding and delete or revert the Spaceship DNS record.
