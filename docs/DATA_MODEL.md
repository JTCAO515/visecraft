# Data Model

## Current Migrations

- `supabase/migrations/20260715091736_auth_foundation.sql`
- `supabase/migrations/20260715123809_proof_engine_foundation.sql`
- `supabase/migrations/20260715180531_project_domain_foundation.sql`

### profiles

- `id uuid`: references `auth.users`.
- `email text`
- `full_name text`
- `created_at timestamptz`
- `updated_at timestamptz`
- `deleted_at timestamptz`

RLS allows authenticated users to read, insert and update only their own profile.

### early_access_requests

- `id uuid`
- `email text`
- `full_name text`
- `source text`
- `status text`: `requested`, `invited`, `accepted`, `rejected`
- `created_at timestamptz`
- `updated_at timestamptz`
- `deleted_at timestamptz`

RLS allows anonymous or authenticated insert, and authenticated users can read matching requests by JWT email.

### projects

The Proof Engine foundation migration owns the minimal project table used by both proof and project-domain records.

- `id uuid`
- `owner_id uuid`: references `auth.users`.
- `slug text`: globally unique.
- `name text`
- `visibility text`: `private`, `unlisted`, `public`, `password_protected`.
- `created_at timestamptz`
- `updated_at timestamptz`
- `deleted_at timestamptz`

RLS allows authenticated owners to manage only their own non-deleted projects.

## Project Domain Foundation

### timeline_events

- `id uuid`
- `project_id uuid`: references `projects` with cascade delete.
- `title text`
- `event_type text`
- `status text`
- `occurred_at timestamptz`
- `what text`
- `why text`
- `technical_summary text`
- `business_meaning text`
- `evidence_level text`
- `visibility text`: `private`, `team`, `public`.
- `source_activity_id uuid`: nullable reservation for the activity-review domain.
- `position integer`
- `created_at timestamptz`
- `updated_at timestamptz`
- `deleted_at timestamptz`

Index: `(project_id, occurred_at desc)` for non-deleted rows.

RLS allows authenticated owners to manage non-deleted events only through an active project they own. Anonymous access is not granted.

### bp_sections

- `id uuid`
- `project_id uuid`: references `projects` with cascade delete.
- `module_key text`: `executive_summary`, `problem_solution`, `product_architecture`, `market_business_model`, `traction_milestones`, `team_risks_ask`.
- `title text`
- `content text`
- `position integer`
- `visibility text`: `private`, `team`, `public`.
- `content_hash text`
- `created_at timestamptz`
- `updated_at timestamptz`
- `deleted_at timestamptz`

Unique key: `(project_id, module_key)`.

Index: `(project_id, position)` for non-deleted rows.

RLS allows authenticated owners to manage non-deleted sections only through an active project they own. Anonymous access is not granted.

### published_views

- `id uuid`
- `project_id uuid`: references `projects` with cascade delete.
- `view_mode text`: `founder`, `investor`, `public`.
- `slug text`: globally unique.
- `status text`: `draft`, `published`, `unpublished`.
- `published_at timestamptz`
- `settings jsonb`: object reserved for unlisted and password-protection settings.
- `created_at timestamptz`
- `updated_at timestamptz`
- `deleted_at timestamptz`

Unique index: `(slug)`.

RLS allows authenticated owners to manage views through an active project they own. Anonymous and authenticated public readers can select only non-deleted rows where `status = 'published'` and `view_mode = 'public'`.

### share_links

- `id uuid`
- `published_view_id uuid`: references `published_views` with cascade delete.
- `token text`: globally unique.
- `expires_at timestamptz`
- `revoked_at timestamptz`
- `created_at timestamptz`

Index: `(published_view_id)`.

RLS allows authenticated owners to manage share links only through a non-deleted view attached to an active project they own. The `anon` role has no direct table access.

## Data API Grants

Project-domain tables explicitly grant `select`, `insert`, `update` and `delete` to `authenticated` and `service_role`; RLS still limits authenticated rows. Only `select` on `published_views` is granted to `anon`, and its public-read policy applies the publication and view-mode boundary.

## Planned MVP Tables

Organizations, organization members, project profiles, integrations, repositories, sync runs, source activities, event sources, general evidence items, milestones, roadmap items, releases, metrics, page views and AI generations remain planned for later migrations.
