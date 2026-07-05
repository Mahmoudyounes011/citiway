-- ═══════════════════════════════════════════════════════════════════════
-- CITIWAY — ROLE-BASED RLS HARDENING
-- Goal: NO authenticated user can ever become / act as an administrator.
--
-- Model:
--   * Admin identity lives in public.admins. That table is UNWRITABLE via the
--     anon/authenticated API (RLS enabled, zero client policies), so a logged-in
--     user cannot grant themselves admin. Admins are added only by service_role
--     or in the SQL editor.
--   * public.is_admin() is SECURITY DEFINER so it can read public.admins without
--     needing its own RLS policy (and without recursion).
--   * Every write / upload / delete is gated on public.is_admin().
--   * Anonymous visitors get read-only access to public catalog data.
--   * The contact form may INSERT leads only, and only "new" leads.
--   * Everything not explicitly permitted is denied (RLS default-deny).
-- ═══════════════════════════════════════════════════════════════════════

begin;

-- ─────────────────────────────────────────────────────────────
-- 0. ADMIN REGISTRY  (the single source of truth for "who is admin")
-- ─────────────────────────────────────────────────────────────
create table if not exists public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- RLS ON, and DELIBERATELY NO POLICIES for anon/authenticated.
-- => the client (anon key) can neither read nor write this table at all.
-- => only service_role (bypasses RLS) or a DB superuser can manage admins.
alter table public.admins enable row level security;
alter table public.admins force row level security;

-- ─────────────────────────────────────────────────────────────
-- 1. ADMIN CHECK HELPER
--    SECURITY DEFINER: runs as the function owner so it can read
--    public.admins regardless of the caller's RLS. STABLE + fixed
--    search_path to avoid injection via search_path hijacking.
-- ─────────────────────────────────────────────────────────────
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins a where a.user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- 2. DROP EVERY LEGACY PERMISSIVE POLICY
--    (the old set used USING(true)/WITH CHECK(true) for any authenticated user)
-- ─────────────────────────────────────────────────────────────
drop policy if exists "Public can view non-hidden properties"      on public.properties;
drop policy if exists "Authenticated users can insert properties"  on public.properties;
drop policy if exists "Authenticated users can update properties"  on public.properties;
drop policy if exists "Authenticated users can delete properties"  on public.properties;

drop policy if exists "Public can view developers"                 on public.developers;
drop policy if exists "Authenticated can manage developers"        on public.developers;

drop policy if exists "Anyone can create leads"                    on public.leads;
drop policy if exists "Authenticated can view leads"               on public.leads;
drop policy if exists "Authenticated can update leads"             on public.leads;

drop policy if exists "Public can view images"                     on storage.objects;
drop policy if exists "Authenticated can upload images"            on storage.objects;
drop policy if exists "Authenticated can delete images"            on storage.objects;

-- Make sure RLS is enabled everywhere we rely on it.
alter table public.properties enable row level security;
alter table public.developers enable row level security;
alter table public.leads      enable row level security;

-- ─────────────────────────────────────────────────────────────
-- 3. PROPERTIES  — public reads non-hidden; only admins write
-- ─────────────────────────────────────────────────────────────
-- Read: anyone sees non-hidden listings; admins additionally see hidden ones.
create policy "properties_select_public_or_admin"
  on public.properties for select
  to anon, authenticated
  using (hidden = false or public.is_admin());

create policy "properties_insert_admin"
  on public.properties for insert
  to authenticated
  with check (public.is_admin());

create policy "properties_update_admin"
  on public.properties for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "properties_delete_admin"
  on public.properties for delete
  to authenticated
  using (public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- 4. DEVELOPERS — public catalog (read is intentionally public); admin writes
-- ─────────────────────────────────────────────────────────────
-- USING(true) here is intentional and necessary: the developer directory is
-- public marketing data meant for anonymous visitors. It is SELECT-ONLY.
create policy "developers_select_public"
  on public.developers for select
  to anon, authenticated
  using (true);

create policy "developers_insert_admin"
  on public.developers for insert
  to authenticated
  with check (public.is_admin());

create policy "developers_update_admin"
  on public.developers for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "developers_delete_admin"
  on public.developers for delete
  to authenticated
  using (public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- 5. LEADS — public contact form may INSERT (constrained); only admins read/modify
-- ─────────────────────────────────────────────────────────────
-- Insert is the ONLY thing the public may do, and only as a fresh "new" lead.
-- WITH CHECK is scoped (not `true`): prevents a submitter from pre-marking a
-- lead as converted/closed or otherwise seeding arbitrary pipeline state.
create policy "leads_insert_public_new_only"
  on public.leads for insert
  to anon, authenticated
  with check (
    coalesce(status, 'new') = 'new'
    and name is not null
    and char_length(name) between 1 and 200
  );

create policy "leads_select_admin"
  on public.leads for select
  to authenticated
  using (public.is_admin());

create policy "leads_update_admin"
  on public.leads for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "leads_delete_admin"
  on public.leads for delete
  to authenticated
  using (public.is_admin());

-- ─────────────────────────────────────────────────────────────
-- 6. STORAGE (bucket 'images') — public read; only admins upload/update/delete
-- ─────────────────────────────────────────────────────────────
-- Ensure RLS is actually ON for storage.objects. Supabase enables this by
-- default, but if it is ever off the policies below would be INERT and anyone
-- could upload/delete. Enabling it explicitly makes the guard fail-safe.
alter table storage.objects enable row level security;

-- Public SELECT is required so the website can serve images from the public
-- bucket. It is scoped to bucket_id = 'images', not a blanket USING(true).
create policy "images_select_public"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'images');

create policy "images_insert_admin"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'images' and public.is_admin());

create policy "images_update_admin"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'images' and public.is_admin())
  with check (bucket_id = 'images' and public.is_admin());

create policy "images_delete_admin"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'images' and public.is_admin());

commit;

-- ─────────────────────────────────────────────────────────────
-- HOW TO GRANT ADMIN (run manually / service_role only — never from client):
--   insert into public.admins (user_id) values ('<auth.users.id>');
-- HOW TO REVOKE:
--   delete from public.admins where user_id = '<auth.users.id>';
-- ─────────────────────────────────────────────────────────────
