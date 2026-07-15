create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists public.early_access_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text,
  source text not null default 'landing',
  status text not null default 'requested' check (status in ('requested', 'invited', 'accepted', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create index if not exists profiles_email_idx on public.profiles (email) where deleted_at is null;
create index if not exists early_access_requests_email_idx on public.early_access_requests (email) where deleted_at is null;
create index if not exists early_access_requests_status_idx on public.early_access_requests (status) where deleted_at is null;

alter table public.profiles enable row level security;
alter table public.early_access_requests enable row level security;

create policy "Users can read their own profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id and deleted_at is null);

create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using ((select auth.uid()) = id and deleted_at is null)
  with check ((select auth.uid()) = id);

create policy "Users can insert their own profile"
  on public.profiles
  for insert
  to authenticated
  with check ((select auth.uid()) = id);

create policy "Anyone can request early access"
  on public.early_access_requests
  for insert
  to anon, authenticated
  with check (deleted_at is null);

create policy "Authenticated users can read their own early access request"
  on public.early_access_requests
  for select
  to authenticated
  using (email = (select auth.jwt() ->> 'email') and deleted_at is null);
