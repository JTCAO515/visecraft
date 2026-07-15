create table public.timeline_events (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  title text not null,
  event_type text not null,
  status text not null,
  occurred_at timestamptz not null,
  what text,
  why text,
  technical_summary text,
  business_meaning text,
  evidence_level text not null,
  visibility text not null default 'private' check (visibility in ('private', 'team', 'public')),
  source_activity_id uuid,
  position integer not null default 0 check (position >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.bp_sections (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  module_key text not null check (module_key in (
    'executive_summary',
    'problem_solution',
    'product_architecture',
    'market_business_model',
    'traction_milestones',
    'team_risks_ask'
  )),
  title text not null,
  content text not null,
  position integer not null default 0 check (position >= 0),
  visibility text not null default 'private' check (visibility in ('private', 'team', 'public')),
  content_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (project_id, module_key)
);

create table public.published_views (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  view_mode text not null check (view_mode in ('founder', 'investor', 'public')),
  slug text not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'unpublished')),
  published_at timestamptz,
  settings jsonb not null default '{}'::jsonb check (jsonb_typeof(settings) = 'object'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table public.share_links (
  id uuid primary key default gen_random_uuid(),
  published_view_id uuid not null references public.published_views(id) on delete cascade,
  token text not null unique,
  expires_at timestamptz,
  revoked_at timestamptz,
  created_at timestamptz not null default now()
);

create index timeline_events_project_occurred_idx
  on public.timeline_events (project_id, occurred_at desc)
  where deleted_at is null;

create index bp_sections_project_position_idx
  on public.bp_sections (project_id, position)
  where deleted_at is null;

create unique index published_views_slug_key
  on public.published_views (slug);

create index share_links_published_view_idx
  on public.share_links (published_view_id);

-- Data API exposure is explicit in new Supabase projects. Grants define reachable
-- operations; the RLS policies below still decide which rows each role can access.
grant select, insert, update, delete on table
  public.timeline_events,
  public.bp_sections,
  public.published_views,
  public.share_links
to authenticated;

grant select, insert, update, delete on table
  public.timeline_events,
  public.bp_sections,
  public.published_views,
  public.share_links
to service_role;

grant select on table public.published_views to anon;

alter table public.timeline_events enable row level security;
alter table public.bp_sections enable row level security;
alter table public.published_views enable row level security;
alter table public.share_links enable row level security;

-- Intent: project owners can manage only non-deleted timeline events that belong
-- to one of their active projects. WITH CHECK preserves ownership after writes.
create policy "Owners can manage timeline events"
  on public.timeline_events
  for all
  to authenticated
  using (
    deleted_at is null
    and exists (
      select 1
      from public.projects p
      where p.id = timeline_events.project_id
        and p.owner_id = (select auth.uid())
        and p.deleted_at is null
    )
  )
  with check (exists (
    select 1
    from public.projects p
    where p.id = timeline_events.project_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));

-- Intent: project owners can manage only non-deleted BP sections that belong to
-- one of their active projects. No policy grants cross-tenant section access.
create policy "Owners can manage BP sections"
  on public.bp_sections
  for all
  to authenticated
  using (
    deleted_at is null
    and exists (
      select 1
      from public.projects p
      where p.id = bp_sections.project_id
        and p.owner_id = (select auth.uid())
        and p.deleted_at is null
    )
  )
  with check (exists (
    select 1
    from public.projects p
    where p.id = bp_sections.project_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));

-- Intent: project owners can manage only non-deleted published views that belong
-- to one of their active projects, regardless of the view's publication status.
create policy "Owners can manage published views"
  on public.published_views
  for all
  to authenticated
  using (
    deleted_at is null
    and exists (
      select 1
      from public.projects p
      where p.id = published_views.project_id
        and p.owner_id = (select auth.uid())
        and p.deleted_at is null
    )
  )
  with check (exists (
    select 1
    from public.projects p
    where p.id = published_views.project_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));

-- Intent: anonymous and authenticated readers can see only active views that the
-- owner has explicitly published in public mode. Draft, founder, investor,
-- unpublished and soft-deleted views remain inaccessible through this policy.
create policy "Published public views are readable"
  on public.published_views
  for select
  to anon, authenticated
  using (
    deleted_at is null
    and status = 'published'
    and view_mode = 'public'
  );

-- Intent: only the project owner can manage share-link tokens for an active
-- published view. Share-link rows are never directly readable by anon.
create policy "Owners can manage share links"
  on public.share_links
  for all
  to authenticated
  using (exists (
    select 1
    from public.published_views pv
    join public.projects p on p.id = pv.project_id
    where pv.id = share_links.published_view_id
      and pv.deleted_at is null
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ))
  with check (exists (
    select 1
    from public.published_views pv
    join public.projects p on p.id = pv.project_id
    where pv.id = share_links.published_view_id
      and pv.deleted_at is null
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));
