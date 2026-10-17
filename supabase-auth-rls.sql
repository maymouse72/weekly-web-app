-- Run only after the Supabase Auth accounts have been provisioned from the
-- initial-password workbook with scripts/provision_auth_users.py.
-- Users can read the team roster to choose their name at the login screen.
-- Weekly reports require a valid Supabase Auth session.

drop policy if exists "public can add roster entries" on public.members;
drop policy if exists "public can read active roster" on public.members;
drop policy if exists "public can update roster entries" on public.members;
drop policy if exists "public can create weekly reports" on public.weekly_reports;
drop policy if exists "public can read weekly reports" on public.weekly_reports;
drop policy if exists "public can update weekly reports" on public.weekly_reports;

create policy "team roster is visible for login"
on public.members for select to anon, authenticated
using (true);

create policy "managers can add roster entries"
on public.members for insert to authenticated
with check ((select auth.jwt() -> 'app_metadata' ->> 'is_manager') = 'true');

create policy "managers can update roster entries"
on public.members for update to authenticated
using ((select auth.jwt() -> 'app_metadata' ->> 'is_manager') = 'true')
with check ((select auth.jwt() -> 'app_metadata' ->> 'is_manager') = 'true');

create policy "signed in team can read weekly reports"
on public.weekly_reports for select to authenticated
using (
  (select auth.jwt() -> 'app_metadata' ->> 'is_manager') = 'true'
  or exists (
    select 1 from public.members m
    where m.id::text = (select auth.jwt() -> 'app_metadata' ->> 'member_id')
      and m.status = 'ACTIVE'
  )
);

create policy "members submit own reports and managers submit for team"
on public.weekly_reports for insert to authenticated
with check (
  (select auth.jwt() -> 'app_metadata' ->> 'is_manager') = 'true'
  or (
    (select auth.jwt() -> 'app_metadata' ->> 'member_id') = member_id::text
    and exists (
      select 1 from public.members m
      where m.id = member_id and m.status = 'ACTIVE' and m.work_type = 'office'
    )
  )
);

create policy "members update own reports and managers update team reports"
on public.weekly_reports for update to authenticated
using (
  (select auth.jwt() -> 'app_metadata' ->> 'is_manager') = 'true'
  or (
    (select auth.jwt() -> 'app_metadata' ->> 'member_id') = member_id::text
    and exists (
      select 1 from public.members m
      where m.id = member_id and m.status = 'ACTIVE' and m.work_type = 'office'
    )
  )
)
with check (
  (select auth.jwt() -> 'app_metadata' ->> 'is_manager') = 'true'
  or (
    (select auth.jwt() -> 'app_metadata' ->> 'member_id') = member_id::text
    and exists (
      select 1 from public.members m
      where m.id = member_id and m.status = 'ACTIVE' and m.work_type = 'office'
    )
  )
);
