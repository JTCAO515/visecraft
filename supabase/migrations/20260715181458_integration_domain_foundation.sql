create table public.integrations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  provider text not null check (provider in ('github')),
  installation_id text not null,
  account_login text not null,
  status text not null default 'active' check (status in ('active', 'suspended', 'revoked')),
  connected_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (project_id, provider, installation_id),
  unique (id, project_id)
);

create table public.repositories (
  id uuid primary key default gen_random_uuid(),
  integration_id uuid not null,
  project_id uuid not null,
  owner text not null,
  name text not null,
  full_name text not null,
  default_branch text not null,
  private boolean not null default true,
  last_synced_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint repositories_integration_project_fk
    foreign key (integration_id, project_id)
    references public.integrations (id, project_id)
    on delete cascade,
  unique (integration_id, full_name),
  unique (id, project_id)
);

create table public.sync_runs (
  id uuid primary key default gen_random_uuid(),
  repository_id uuid not null references public.repositories(id) on delete cascade,
  trigger_type text not null check (trigger_type in ('manual', 'scheduled', 'webhook')),
  status text not null default 'queued' check (status in ('queued', 'running', 'completed', 'failed')),
  started_at timestamptz,
  completed_at timestamptz,
  stats jsonb not null default '{}'::jsonb check (jsonb_typeof(stats) = 'object'),
  error_summary text,
  created_at timestamptz not null default now()
);

create table public.source_activities (
  id uuid primary key default gen_random_uuid(),
  repository_id uuid not null,
  project_id uuid not null,
  activity_type text not null check (activity_type in ('commit', 'pull_request', 'issue', 'release', 'tag')),
  source_id text not null,
  title text not null,
  summary text,
  occurred_at timestamptz not null,
  author_login text,
  url text not null,
  raw_metadata jsonb not null default '{}'::jsonb check (jsonb_typeof(raw_metadata) = 'object'),
  review_status text not null default 'pending' check (review_status in ('pending', 'accepted', 'edited', 'hidden')),
  promoted_event_id uuid references public.timeline_events(id) on delete set null,
  content_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint source_activities_repository_project_fk
    foreign key (repository_id, project_id)
    references public.repositories (id, project_id)
    on delete cascade,
  unique (repository_id, activity_type, source_id)
);

create index integrations_project_idx
  on public.integrations (project_id)
  where deleted_at is null;

create index repositories_project_idx
  on public.repositories (project_id)
  where deleted_at is null;

create index sync_runs_repository_created_idx
  on public.sync_runs (repository_id, created_at desc);

create index source_activities_project_review_occurred_idx
  on public.source_activities (project_id, review_status, occurred_at desc);

create index source_activities_promoted_event_idx
  on public.source_activities (promoted_event_id)
  where promoted_event_id is not null;

-- Data API grants are explicit. RLS below still restricts rows by project owner.
grant select, insert, update, delete on table
  public.integrations,
  public.repositories
to authenticated;

grant select on table
  public.sync_runs,
  public.source_activities
to authenticated;

-- Owners may review imported activities, but cannot edit source identity,
-- metadata, content hashes or promotion links through the client role.
grant update (review_status) on table public.source_activities to authenticated;

grant select, insert, update, delete on table
  public.integrations,
  public.repositories,
  public.sync_runs,
  public.source_activities
to service_role;

alter table public.integrations enable row level security;
alter table public.repositories enable row level security;
alter table public.sync_runs enable row level security;
alter table public.source_activities enable row level security;

-- Intent: authenticated project owners can manage only non-deleted integration
-- registrations attached to one of their active projects.
create policy "Owners can manage integrations"
  on public.integrations
  for all
  to authenticated
  using (
    deleted_at is null
    and exists (
      select 1
      from public.projects p
      where p.id = integrations.project_id
        and p.owner_id = (select auth.uid())
        and p.deleted_at is null
    )
  )
  with check (exists (
    select 1
    from public.projects p
    where p.id = integrations.project_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));

-- Intent: authenticated project owners can manage only non-deleted repository
-- bindings for their active projects. The composite FK prevents project mismatch.
create policy "Owners can manage repositories"
  on public.repositories
  for all
  to authenticated
  using (
    deleted_at is null
    and exists (
      select 1
      from public.projects p
      where p.id = repositories.project_id
        and p.owner_id = (select auth.uid())
        and p.deleted_at is null
    )
  )
  with check (exists (
    select 1
    from public.projects p
    where p.id = repositories.project_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));

-- Intent: authenticated project owners can read sync history for their own active
-- repositories. Inserts and mutations are reserved for the service role.
create policy "Owners can read sync runs"
  on public.sync_runs
  for select
  to authenticated
  using (exists (
    select 1
    from public.repositories r
    join public.projects p on p.id = r.project_id
    where r.id = sync_runs.repository_id
      and r.deleted_at is null
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));

-- Intent: authenticated project owners can read imported activities for their
-- own active repositories. Anon receives no table grant or policy.
create policy "Owners can read source activities"
  on public.source_activities
  for select
  to authenticated
  using (exists (
    select 1
    from public.repositories r
    join public.projects p on p.id = r.project_id
    where r.id = source_activities.repository_id
      and r.project_id = source_activities.project_id
      and r.deleted_at is null
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));

-- Intent: authenticated project owners may update source activities only for
-- their own repositories. Column-level GRANT restricts the client mutation to
-- review_status; source payload and promotion fields remain service-role only.
create policy "Owners can review source activities"
  on public.source_activities
  for update
  to authenticated
  using (exists (
    select 1
    from public.repositories r
    join public.projects p on p.id = r.project_id
    where r.id = source_activities.repository_id
      and r.project_id = source_activities.project_id
      and r.deleted_at is null
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ))
  with check (exists (
    select 1
    from public.repositories r
    join public.projects p on p.id = r.project_id
    where r.id = source_activities.repository_id
      and r.project_id = source_activities.project_id
      and r.deleted_at is null
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));
