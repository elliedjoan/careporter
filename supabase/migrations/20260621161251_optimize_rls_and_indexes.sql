create index if not exists approvals_provider_idx on public.approvals(provider_id);
create index if not exists approvals_decided_by_idx on public.approvals(decided_by);
create index if not exists bookings_requested_by_idx on public.bookings(requested_by);
create index if not exists bookings_service_idx on public.bookings(service_id);
create index if not exists business_staff_profile_idx on public.business_staff_members(profile_id);
create index if not exists client_provider_links_provider_idx on public.client_provider_links(provider_id);
create index if not exists compliance_documents_business_idx on public.compliance_documents(business_id);
create index if not exists compliance_documents_reviewed_by_idx on public.compliance_documents(reviewed_by);
create index if not exists documents_booking_idx on public.documents(booking_id);
create index if not exists documents_owner_profile_idx on public.documents(owner_profile_id);
create index if not exists invoices_business_idx on public.invoices(business_id);
create index if not exists invoices_provider_idx on public.invoices(provider_id);
create index if not exists messages_sender_profile_idx on public.messages(sender_profile_id);
create index if not exists messages_recipient_profile_idx on public.messages(recipient_profile_id);
create index if not exists payment_events_invoice_idx on public.payment_events(invoice_id);
create index if not exists payment_events_provider_idx on public.payment_events(provider_id);
create index if not exists payment_events_business_idx on public.payment_events(business_id);
create index if not exists progress_notes_booking_idx on public.progress_notes(booking_id);
create index if not exists progress_notes_author_profile_idx on public.progress_notes(author_profile_id);
create index if not exists progress_notes_business_idx on public.progress_notes(business_id);
create index if not exists provider_staff_profile_idx on public.provider_staff_members(profile_id);
create index if not exists services_business_idx on public.services(business_id);
create index if not exists subscriptions_provider_idx on public.subscriptions(provider_id);

create or replace function app_private.current_user_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = (select auth.uid())
$$;

create or replace function app_private.is_business_member(target_business_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.business_staff_members staff
    where staff.business_id = target_business_id
      and staff.profile_id = (select auth.uid())
  )
$$;

create or replace function app_private.is_provider_member(target_provider_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.provider_staff_members staff
    where staff.provider_id = target_provider_id
      and staff.profile_id = (select auth.uid())
  )
$$;

create or replace function app_private.can_access_booking(target_booking_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.bookings booking
    where booking.id = target_booking_id
      and (
        app_private.is_admin()
        or booking.client_profile_id = (select auth.uid())
        or booking.requested_by = (select auth.uid())
        or app_private.is_business_member(booking.business_id)
        or (booking.provider_id is not null and app_private.is_provider_member(booking.provider_id))
      )
  )
$$;

drop policy if exists "profiles select self or admin" on public.profiles;
drop policy if exists "profiles insert client self" on public.profiles;
drop policy if exists "profiles update self or admin" on public.profiles;

create policy "profiles select self or admin" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or (select app_private.is_admin()));

create policy "profiles insert client self" on public.profiles
  for insert to authenticated
  with check ((id = (select auth.uid()) and role = 'client') or (select app_private.is_admin()));

create policy "profiles update self or admin" on public.profiles
  for update to authenticated
  using (id = (select auth.uid()) or (select app_private.is_admin()))
  with check (id = (select auth.uid()) or (select app_private.is_admin()));

drop policy if exists "businesses select published context" on public.businesses;
drop policy if exists "businesses manage own or admin" on public.businesses;

create policy "businesses select published context" on public.businesses
  for select to authenticated
  using ((select app_private.is_admin()) or app_private.is_business_member(id) or verification_status = 'approved');

create policy "businesses insert own or admin" on public.businesses
  for insert to authenticated
  with check ((select app_private.is_admin()) or app_private.is_business_member(id));

create policy "businesses update own or admin" on public.businesses
  for update to authenticated
  using ((select app_private.is_admin()) or app_private.is_business_member(id))
  with check ((select app_private.is_admin()) or app_private.is_business_member(id));

create policy "businesses delete own or admin" on public.businesses
  for delete to authenticated
  using ((select app_private.is_admin()) or app_private.is_business_member(id));

drop policy if exists "business staff visible to members" on public.business_staff_members;
drop policy if exists "business staff admin manage" on public.business_staff_members;

create policy "business staff visible to members" on public.business_staff_members
  for select to authenticated
  using (
    (select app_private.is_admin())
    or app_private.is_business_member(business_id)
    or profile_id = (select auth.uid())
  );

create policy "business staff admin insert" on public.business_staff_members
  for insert to authenticated
  with check ((select app_private.is_admin()));

create policy "business staff admin update" on public.business_staff_members
  for update to authenticated
  using ((select app_private.is_admin()))
  with check ((select app_private.is_admin()));

create policy "business staff admin delete" on public.business_staff_members
  for delete to authenticated
  using ((select app_private.is_admin()));

drop policy if exists "providers select members and linked clients" on public.providers;
drop policy if exists "providers admin manage" on public.providers;

create policy "providers select members and linked clients" on public.providers
  for select to authenticated
  using (
    (select app_private.is_admin())
    or app_private.is_provider_member(id)
    or exists (
      select 1 from public.client_provider_links link
      where link.provider_id = id
        and link.client_profile_id = (select auth.uid())
    )
  );

create policy "providers admin insert" on public.providers
  for insert to authenticated
  with check ((select app_private.is_admin()));

create policy "providers admin update" on public.providers
  for update to authenticated
  using ((select app_private.is_admin()))
  with check ((select app_private.is_admin()));

create policy "providers admin delete" on public.providers
  for delete to authenticated
  using ((select app_private.is_admin()));

drop policy if exists "provider staff visible to members" on public.provider_staff_members;
drop policy if exists "provider staff admin manage" on public.provider_staff_members;

create policy "provider staff visible to members" on public.provider_staff_members
  for select to authenticated
  using (
    (select app_private.is_admin())
    or app_private.is_provider_member(provider_id)
    or profile_id = (select auth.uid())
  );

create policy "provider staff admin insert" on public.provider_staff_members
  for insert to authenticated
  with check ((select app_private.is_admin()));

create policy "provider staff admin update" on public.provider_staff_members
  for update to authenticated
  using ((select app_private.is_admin()))
  with check ((select app_private.is_admin()));

create policy "provider staff admin delete" on public.provider_staff_members
  for delete to authenticated
  using ((select app_private.is_admin()));

drop policy if exists "services select approved businesses" on public.services;
drop policy if exists "services business manage" on public.services;

create policy "services select approved businesses" on public.services
  for select to authenticated
  using (
    (select app_private.is_admin())
    or app_private.is_business_member(business_id)
    or exists (
      select 1 from public.businesses business
      where business.id = services.business_id
        and business.verification_status = 'approved'
        and services.is_published
    )
  );

create policy "services business insert" on public.services
  for insert to authenticated
  with check ((select app_private.is_admin()) or app_private.is_business_member(business_id));

create policy "services business update" on public.services
  for update to authenticated
  using ((select app_private.is_admin()) or app_private.is_business_member(business_id))
  with check ((select app_private.is_admin()) or app_private.is_business_member(business_id));

create policy "services business delete" on public.services
  for delete to authenticated
  using ((select app_private.is_admin()) or app_private.is_business_member(business_id));

drop policy if exists "client provider links participant select" on public.client_provider_links;
drop policy if exists "client provider links client or admin manage" on public.client_provider_links;

create policy "client provider links participant select" on public.client_provider_links
  for select to authenticated
  using (
    (select app_private.is_admin())
    or client_profile_id = (select auth.uid())
    or app_private.is_provider_member(provider_id)
  );

create policy "client provider links client or admin insert" on public.client_provider_links
  for insert to authenticated
  with check ((select app_private.is_admin()) or client_profile_id = (select auth.uid()));

create policy "client provider links client or admin update" on public.client_provider_links
  for update to authenticated
  using ((select app_private.is_admin()) or client_profile_id = (select auth.uid()))
  with check ((select app_private.is_admin()) or client_profile_id = (select auth.uid()));

create policy "client provider links client or admin delete" on public.client_provider_links
  for delete to authenticated
  using ((select app_private.is_admin()) or client_profile_id = (select auth.uid()));

drop policy if exists "bookings client insert" on public.bookings;
drop policy if exists "bookings participant update" on public.bookings;

create policy "bookings client insert" on public.bookings
  for insert to authenticated
  with check (
    (select app_private.is_admin())
    or requested_by = (select auth.uid())
    or client_profile_id = (select auth.uid())
  );

create policy "bookings participant update" on public.bookings
  for update to authenticated
  using (
    (select app_private.is_admin())
    or requested_by = (select auth.uid())
    or app_private.is_business_member(business_id)
    or (provider_id is not null and app_private.is_provider_member(provider_id))
  )
  with check (
    (select app_private.is_admin())
    or requested_by = (select auth.uid())
    or app_private.is_business_member(business_id)
    or (provider_id is not null and app_private.is_provider_member(provider_id))
  );

drop policy if exists "approvals participant select" on public.approvals;
drop policy if exists "approvals provider manage" on public.approvals;

create policy "approvals participant select" on public.approvals
  for select to authenticated
  using (
    (select app_private.is_admin())
    or app_private.is_provider_member(provider_id)
    or app_private.can_access_booking(booking_id)
  );

create policy "approvals provider insert" on public.approvals
  for insert to authenticated
  with check ((select app_private.is_admin()) or app_private.is_provider_member(provider_id));

create policy "approvals provider update" on public.approvals
  for update to authenticated
  using ((select app_private.is_admin()) or app_private.is_provider_member(provider_id))
  with check ((select app_private.is_admin()) or app_private.is_provider_member(provider_id));

create policy "approvals provider delete" on public.approvals
  for delete to authenticated
  using ((select app_private.is_admin()) or app_private.is_provider_member(provider_id));

drop policy if exists "progress notes business insert" on public.progress_notes;

create policy "progress notes business insert" on public.progress_notes
  for insert to authenticated
  with check (
    (select app_private.is_admin())
    or (author_profile_id = (select auth.uid()) and app_private.is_business_member(business_id))
  );

drop policy if exists "messages participant select" on public.messages;
drop policy if exists "messages sender insert" on public.messages;

create policy "messages participant select" on public.messages
  for select to authenticated
  using (
    (select app_private.is_admin())
    or sender_profile_id = (select auth.uid())
    or recipient_profile_id = (select auth.uid())
    or (booking_id is not null and app_private.can_access_booking(booking_id))
  );

create policy "messages sender insert" on public.messages
  for insert to authenticated
  with check ((select app_private.is_admin()) or sender_profile_id = (select auth.uid()));

drop policy if exists "documents owner or booking select" on public.documents;
drop policy if exists "documents owner insert" on public.documents;

create policy "documents owner or booking select" on public.documents
  for select to authenticated
  using (
    (select app_private.is_admin())
    or owner_profile_id = (select auth.uid())
    or (booking_id is not null and app_private.can_access_booking(booking_id))
  );

create policy "documents owner insert" on public.documents
  for insert to authenticated
  with check ((select app_private.is_admin()) or owner_profile_id = (select auth.uid()));

drop policy if exists "subscriptions provider select" on public.subscriptions;
drop policy if exists "subscriptions admin manage" on public.subscriptions;

create policy "subscriptions provider select" on public.subscriptions
  for select to authenticated
  using ((select app_private.is_admin()) or app_private.is_provider_member(provider_id));

create policy "subscriptions admin insert" on public.subscriptions
  for insert to authenticated
  with check ((select app_private.is_admin()));

create policy "subscriptions admin update" on public.subscriptions
  for update to authenticated
  using ((select app_private.is_admin()))
  with check ((select app_private.is_admin()));

create policy "subscriptions admin delete" on public.subscriptions
  for delete to authenticated
  using ((select app_private.is_admin()));

drop policy if exists "payment events participant select" on public.payment_events;
drop policy if exists "payment events admin manage" on public.payment_events;

create policy "payment events participant select" on public.payment_events
  for select to authenticated
  using (
    (select app_private.is_admin())
    or (provider_id is not null and app_private.is_provider_member(provider_id))
    or (business_id is not null and app_private.is_business_member(business_id))
  );

create policy "payment events admin insert" on public.payment_events
  for insert to authenticated
  with check ((select app_private.is_admin()));

create policy "payment events admin update" on public.payment_events
  for update to authenticated
  using ((select app_private.is_admin()))
  with check ((select app_private.is_admin()));

create policy "payment events admin delete" on public.payment_events
  for delete to authenticated
  using ((select app_private.is_admin()));

drop policy if exists "storage owner read launch buckets" on storage.objects;
drop policy if exists "storage owner upload launch buckets" on storage.objects;
drop policy if exists "storage owner update launch buckets" on storage.objects;

create policy "storage owner read launch buckets" on storage.objects
  for select to authenticated
  using (
    owner = (select auth.uid())
    and bucket_id in ('compliance-documents', 'progress-note-attachments', 'client-documents')
  );

create policy "storage owner upload launch buckets" on storage.objects
  for insert to authenticated
  with check (
    owner = (select auth.uid())
    and bucket_id in ('compliance-documents', 'progress-note-attachments', 'client-documents')
  );

create policy "storage owner update launch buckets" on storage.objects
  for update to authenticated
  using (
    owner = (select auth.uid())
    and bucket_id in ('compliance-documents', 'progress-note-attachments', 'client-documents')
  )
  with check (
    owner = (select auth.uid())
    and bucket_id in ('compliance-documents', 'progress-note-attachments', 'client-documents')
  );
