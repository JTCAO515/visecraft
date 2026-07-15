create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  slug text not null unique,
  name text not null,
  visibility text not null default 'private' check (visibility in ('private', 'unlisted', 'public', 'password_protected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.proof_claims (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  source_content_type text not null check (source_content_type in ('bp_section', 'timeline_event', 'weekly_update', 'manual')),
  source_content_id text not null,
  original_text text not null,
  normalized_claim text not null,
  claim_type text not null check (claim_type in (
    'feature_exists',
    'feature_implemented',
    'feature_tested',
    'feature_deployed',
    'release_published',
    'project_active',
    'milestone_completed',
    'roadmap_status',
    'deployment_live',
    'product_accessible',
    'development_progress',
    'version_current'
  )),
  claim_subject text,
  claim_predicate text,
  claim_object text,
  claimed_status text,
  claimed_date timestamptz,
  scope text not null default 'project' check (scope in ('project', 'feature', 'release', 'deployment', 'timeline', 'bp')),
  visibility text not null default 'private' check (visibility in ('private', 'team', 'public')),
  risk_level text not null default 'medium' check (risk_level in ('low', 'medium', 'high')),
  requires_freshness boolean not null default false,
  content_hash text not null,
  active boolean not null default true,
  superseded_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.proof_evidence_items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  source_type text not null check (source_type in (
    'github_commit',
    'github_pull_request',
    'github_issue',
    'github_release',
    'github_tag',
    'deployment_record',
    'production_url',
    'founder_note',
    'screenshot',
    'external_source_link'
  )),
  source_provider text not null,
  source_id text not null,
  source_url text,
  source_title text not null,
  captured_at timestamptz not null default now(),
  observed_at timestamptz,
  last_checked_at timestamptz,
  content_hash text,
  raw_metadata jsonb not null default '{}'::jsonb,
  trust_level text not null check (trust_level in (
    'direct_api_source',
    'signed_attestation',
    'platform_generated_record',
    'public_third_party_source',
    'uploaded_document',
    'screenshot',
    'founder_statement'
  )),
  visibility text not null default 'private' check (visibility in ('private', 'team', 'public_summary', 'public')),
  is_available boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, source_type, source_provider, source_id)
);

create table if not exists public.proof_claim_evidence_links (
  id uuid primary key default gen_random_uuid(),
  claim_id uuid not null references public.proof_claims(id) on delete cascade,
  evidence_id uuid not null references public.proof_evidence_items(id) on delete cascade,
  relation text not null default 'candidate' check (relation in ('candidate', 'supporting', 'contradicting', 'irrelevant')),
  created_at timestamptz not null default now(),
  unique (claim_id, evidence_id)
);

create table if not exists public.proof_freshness_rules (
  id uuid primary key default gen_random_uuid(),
  claim_type text not null unique,
  ttl_seconds integer,
  freshness_strategy text not null default 'ttl' check (freshness_strategy in ('ttl', 'historical', 'not_applicable')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

insert into public.proof_freshness_rules (claim_type, ttl_seconds, freshness_strategy)
values
  ('deployment_live', 86400, 'ttl'),
  ('product_accessible', 3600, 'ttl'),
  ('project_active', 604800, 'ttl'),
  ('feature_deployed', 604800, 'ttl'),
  ('release_published', null, 'historical'),
  ('milestone_completed', null, 'historical'),
  ('roadmap_status', 1209600, 'ttl'),
  ('version_current', 86400, 'ttl'),
  ('feature_exists', null, 'historical'),
  ('feature_implemented', 604800, 'ttl'),
  ('feature_tested', 604800, 'ttl'),
  ('development_progress', 604800, 'ttl')
on conflict (claim_type) do update
set ttl_seconds = excluded.ttl_seconds,
    freshness_strategy = excluded.freshness_strategy,
    updated_at = now();

create table if not exists public.verification_runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  trigger_type text not null check (trigger_type in ('manual', 'claim_changed', 'evidence_changed', 'scheduled', 'publish')),
  proof_engine_version text not null,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  status text not null default 'running' check (status in ('queued', 'running', 'completed', 'failed', 'cancelled')),
  source_snapshot_at timestamptz not null default now(),
  claims_checked integer not null default 0,
  claims_passed integer not null default 0,
  claims_partial integer not null default 0,
  claims_failed integer not null default 0,
  claims_stale integer not null default 0,
  error_summary text,
  created_at timestamptz not null default now()
);

create table if not exists public.verification_results (
  id uuid primary key default gen_random_uuid(),
  verification_run_id uuid not null references public.verification_runs(id) on delete cascade,
  claim_id uuid not null references public.proof_claims(id) on delete cascade,
  verdict text not null check (verdict in (
    'unverified',
    'self_reported',
    'source_linked',
    'code_backed',
    'deployment_backed',
    'partially_supported',
    'insufficient_evidence',
    'contradicted',
    'stale',
    'unable_to_verify'
  )),
  confidence text not null check (confidence in ('low', 'medium', 'high')),
  freshness_status text not null check (freshness_status in ('current', 'aging', 'stale', 'historical', 'not_applicable')),
  evidence_coverage text not null default 'none' check (evidence_coverage in ('none', 'partial', 'strong', 'contradictory')),
  supporting_evidence_count integer not null default 0,
  contradicting_evidence_count integer not null default 0,
  summary text not null,
  limitations text[] not null default '{}',
  recommended_evidence text[] not null default '{}',
  deterministic_checks jsonb not null default '{}'::jsonb,
  ai_output jsonb not null default '{}'::jsonb,
  last_checked_at timestamptz not null default now(),
  expires_at timestamptz,
  invalidated_at timestamptz,
  invalidation_reason text,
  created_at timestamptz not null default now(),
  unique (verification_run_id, claim_id)
);

create table if not exists public.verification_evidence_links (
  id uuid primary key default gen_random_uuid(),
  verification_result_id uuid not null references public.verification_results(id) on delete cascade,
  evidence_id uuid not null references public.proof_evidence_items(id) on delete cascade,
  relation text not null check (relation in ('supporting', 'contradicting', 'checked', 'missing')),
  deterministic_status text not null default 'not_checked' check (deterministic_status in ('passed', 'failed', 'stale', 'unavailable', 'not_checked')),
  notes text,
  created_at timestamptz not null default now(),
  unique (verification_result_id, evidence_id, relation)
);

create table if not exists public.verification_findings (
  id uuid primary key default gen_random_uuid(),
  verification_result_id uuid not null references public.verification_results(id) on delete cascade,
  finding_type text not null check (finding_type in ('missing_evidence', 'contradiction', 'stale_evidence', 'limitation', 'overstatement', 'source_unavailable')),
  severity text not null check (severity in ('info', 'warning', 'critical')),
  title text not null,
  body text not null,
  evidence_id uuid references public.proof_evidence_items(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.verification_model_runs (
  id uuid primary key default gen_random_uuid(),
  verification_run_id uuid not null references public.verification_runs(id) on delete cascade,
  provider text not null,
  model text not null,
  prompt_version text not null,
  proof_engine_version text not null,
  input_claim_ids uuid[] not null default '{}',
  input_evidence_ids uuid[] not null default '{}',
  output jsonb not null default '{}'::jsonb,
  status text not null check (status in ('completed', 'failed', 'skipped')),
  error_summary text,
  started_at timestamptz not null default now(),
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists projects_owner_idx on public.projects (owner_id) where deleted_at is null;
create index if not exists proof_claims_project_idx on public.proof_claims (project_id, active);
create index if not exists proof_claims_source_idx on public.proof_claims (source_content_type, source_content_id);
create index if not exists proof_evidence_project_idx on public.proof_evidence_items (project_id, source_type, source_provider);
create index if not exists verification_runs_project_idx on public.verification_runs (project_id, started_at desc);
create index if not exists verification_results_claim_idx on public.verification_results (claim_id, created_at desc);
create index if not exists verification_results_verdict_idx on public.verification_results (verdict, freshness_status);

alter table public.projects enable row level security;
alter table public.proof_claims enable row level security;
alter table public.proof_evidence_items enable row level security;
alter table public.proof_claim_evidence_links enable row level security;
alter table public.proof_freshness_rules enable row level security;
alter table public.verification_runs enable row level security;
alter table public.verification_results enable row level security;
alter table public.verification_evidence_links enable row level security;
alter table public.verification_findings enable row level security;
alter table public.verification_model_runs enable row level security;

create policy "Users can manage own projects"
  on public.projects
  for all
  to authenticated
  using ((select auth.uid()) = owner_id and deleted_at is null)
  with check ((select auth.uid()) = owner_id);

create policy "Users can manage claims for own projects"
  on public.proof_claims
  for all
  to authenticated
  using (exists (
    select 1 from public.projects p
    where p.id = proof_claims.project_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ))
  with check (exists (
    select 1 from public.projects p
    where p.id = proof_claims.project_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));

create policy "Users can manage evidence for own projects"
  on public.proof_evidence_items
  for all
  to authenticated
  using (exists (
    select 1 from public.projects p
    where p.id = proof_evidence_items.project_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ))
  with check (exists (
    select 1 from public.projects p
    where p.id = proof_evidence_items.project_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));

create policy "Users can manage claim evidence links for own projects"
  on public.proof_claim_evidence_links
  for all
  to authenticated
  using (exists (
    select 1
    from public.proof_claims c
    join public.projects p on p.id = c.project_id
    where c.id = proof_claim_evidence_links.claim_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ))
  with check (exists (
    select 1
    from public.proof_claims c
    join public.projects p on p.id = c.project_id
    where c.id = proof_claim_evidence_links.claim_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));

create policy "Authenticated users can read freshness rules"
  on public.proof_freshness_rules
  for select
  to authenticated
  using (true);

create policy "Users can read verification runs for own projects"
  on public.verification_runs
  for select
  to authenticated
  using (exists (
    select 1 from public.projects p
    where p.id = verification_runs.project_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));

create policy "Users can read verification results for own projects"
  on public.verification_results
  for select
  to authenticated
  using (exists (
    select 1
    from public.verification_runs r
    join public.projects p on p.id = r.project_id
    where r.id = verification_results.verification_run_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));

create policy "Users can read verification evidence links for own projects"
  on public.verification_evidence_links
  for select
  to authenticated
  using (exists (
    select 1
    from public.verification_results vr
    join public.verification_runs r on r.id = vr.verification_run_id
    join public.projects p on p.id = r.project_id
    where vr.id = verification_evidence_links.verification_result_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));

create policy "Users can read verification findings for own projects"
  on public.verification_findings
  for select
  to authenticated
  using (exists (
    select 1
    from public.verification_results vr
    join public.verification_runs r on r.id = vr.verification_run_id
    join public.projects p on p.id = r.project_id
    where vr.id = verification_findings.verification_result_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));

create policy "Users can read verification model runs for own projects"
  on public.verification_model_runs
  for select
  to authenticated
  using (exists (
    select 1
    from public.verification_runs r
    join public.projects p on p.id = r.project_id
    where r.id = verification_model_runs.verification_run_id
      and p.owner_id = (select auth.uid())
      and p.deleted_at is null
  ));
