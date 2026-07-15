# Data Model

## Current Migration

`supabase/migrations/20260715091736_auth_foundation.sql`

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

## Planned MVP Tables

Organizations, projects, project profiles, integrations, repositories, sync runs, source activities, timeline events, event sources, evidence items, milestones, roadmap items, releases, metrics, BP sections, published views, share links, page views and AI generations will be added when persistence and GitHub import move from scaffold to implementation.
