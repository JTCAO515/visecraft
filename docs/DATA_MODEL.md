# Data Model

## Current Migrations

- `supabase/migrations/20260715091736_auth_foundation.sql`
- `supabase/migrations/20260715123809_proof_engine_foundation.sql`
- `supabase/migrations/20260715181458_integration_domain_foundation.sql`

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

## Integration Domain Foundation

### integrations

- `id uuid`
- `project_id uuid`: references `projects` with cascade delete.
- `provider text`: currently `github` only.
- `installation_id text`: GitHub App installation identifier, not a token or secret.
- `account_login text`
- `status text`: `active`, `suspended`, `revoked`.
- `connected_by uuid`: nullable reference to `auth.users`.
- `created_at timestamptz`
- `updated_at timestamptz`
- `deleted_at timestamptz`

Unique keys: `(project_id, provider, installation_id)` and `(id, project_id)`.

RLS allows authenticated owners to manage non-deleted integrations only through an active project they own. No installation token or credential is stored.

### repositories

- `id uuid`
- `integration_id uuid`
- `project_id uuid`: redundant project key used for RLS.
- `owner text`
- `name text`
- `full_name text`
- `default_branch text`
- `private boolean`
- `last_synced_at timestamptz`
- `created_at timestamptz`
- `updated_at timestamptz`
- `deleted_at timestamptz`

The composite foreign key `(integration_id, project_id)` references `integrations(id, project_id)` so the redundant project key cannot point to another tenant. Unique keys are `(integration_id, full_name)` and `(id, project_id)`.

RLS allows authenticated owners to manage non-deleted repository bindings only through an active project they own.

### sync_runs

- `id uuid`
- `repository_id uuid`: references `repositories` with cascade delete.
- `trigger_type text`: `manual`, `scheduled`, `webhook`.
- `status text`: `queued`, `running`, `completed`, `failed`.
- `started_at timestamptz`
- `completed_at timestamptz`
- `stats jsonb`: object for imported commit, pull-request and release counts.
- `error_summary text`
- `created_at timestamptz`

Index: `(repository_id, created_at desc)`.

RLS gives authenticated project owners read-only access through their repository and project. Writes are reserved for `service_role`.

### source_activities

- `id uuid`
- `repository_id uuid`
- `project_id uuid`: redundant project key used for RLS.
- `activity_type text`: `commit`, `pull_request`, `issue`, `release`, `tag`.
- `source_id text`: commit SHA, PR/issue number or release/tag identifier.
- `title text`
- `summary text`
- `occurred_at timestamptz`
- `author_login text`
- `url text`
- `raw_metadata jsonb`
- `review_status text`: `pending`, `accepted`, `edited`, `hidden`.
- `promoted_event_id uuid`: nullable reference to `timeline_events`.
- `content_hash text`
- `created_at timestamptz`
- `updated_at timestamptz`

The composite foreign key `(repository_id, project_id)` references `repositories(id, project_id)` so source activity ownership cannot diverge from repository ownership. Unique key: `(repository_id, activity_type, source_id)`.

Index: `(project_id, review_status, occurred_at desc)`.

RLS gives authenticated project owners read access. The client role receives column-level `UPDATE(review_status)` only; raw source writes, payload edits and promotion links are reserved for `service_role`.

## Integration Data API Grants

Authenticated users can manage owner-scoped `integrations` and `repositories`, read owner-scoped `sync_runs` and `source_activities`, and update only `source_activities.review_status`. The `service_role` receives the write privileges required for synchronization. The `anon` role receives no integration-domain grants.

## Planned MVP Tables

Organizations, projects, project profiles, timeline events, event sources, general evidence items, milestones, roadmap items, releases, metrics, BP sections, published views, share links, page views and AI generations remain planned for later migrations.
