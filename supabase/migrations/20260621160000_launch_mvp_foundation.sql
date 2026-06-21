create extension if not exists pgcrypto;

create schema if not exists app_private;

do $$ begin
  create type public.app_role as enum ('client', 'business_staff', 'provider_staff', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.booking_pathway as enum ('provider_managed', 'self_managed_package', 'private_pay');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.booking_status as enum (
    'draft',
    'pending_provider_approval',
    'provider_approved',
    'vendor_confirmed',
    'in_progress',
    'completed',
    'invoice_sent',
    'paid',
    'cancelled'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.approval_status as enum ('requested', 'question_asked', 'approved', 'declined', 'expired');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.invoice_status as enum ('draft', 'sent', 'overdue', 'paid', 'void');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.verification_status as enum ('not_started', 'submitted', 'automated_review', 'human_review', 'approved', 'renewal_due', 'suspended');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.provider_plan as enum ('free', 'growth');
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.app_role not null default 'client',
  full_name text not null,
  email text not null,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  abn text,
  service_area text,
  verification_status public.verification_status not null default 'not_started',
  stripe_connect_account_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.business_staff_members (
  business_id uuid not null references public.businesses(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  staff_role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (business_id, profile_id)
);

create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  provider_type text not null default 'care_package_provider',
  plan public.provider_plan not null default 'free',
  billing_email text,
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.provider_staff_members (
  provider_id uuid not null references public.providers(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  staff_role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (provider_id, profile_id)
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  category text not null,
  name text not null,
  description text,
  rate_cents integer not null,
  duration_minutes integer,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.client_provider_links (
  client_profile_id uuid not null references public.profiles(id) on delete cascade,
  provider_id uuid not null references public.providers(id) on delete cascade,
  status text not null default 'active',
  client_reference text,
  approval_email text,
  finance_email text,
  created_at timestamptz not null default now(),
  primary key (client_profile_id, provider_id)
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  client_profile_id uuid not null references public.profiles(id) on delete cascade,
  requested_by uuid not null references public.profiles(id) on delete restrict,
  business_id uuid not null references public.businesses(id) on delete restrict,
  service_id uuid not null references public.services(id) on delete restrict,
  provider_id uuid references public.providers(id) on delete restrict,
  pathway public.booking_pathway not null,
  status public.booking_status not null default 'draft',
  scheduled_start timestamptz,
  scheduled_end timestamptz,
  care_preferences jsonb not null default '{}'::jsonb,
  access_notes text,
  approval_email text,
  finance_email text,
  estimated_amount_cents integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint provider_required_for_provider_managed check (
    pathway <> 'provider_managed' or provider_id is not null
  )
);

create table if not exists public.approvals (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  provider_id uuid not null references public.providers(id) on delete cascade,
  status public.approval_status not null default 'requested',
  question text,
  decision_note text,
  requested_at timestamptz not null default now(),
  decided_at timestamptz,
  decided_by uuid references public.profiles(id) on delete set null
);

create table if not exists public.progress_notes (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  author_profile_id uuid not null references public.profiles(id) on delete restrict,
  business_id uuid not null references public.businesses(id) on delete restrict,
  note text not null,
  attachments jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.bookings(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete restrict,
  provider_id uuid references public.providers(id) on delete restrict,
  amount_cents integer not null,
  commission_bps integer not null default 900,
  status public.invoice_status not null default 'draft',
  sent_to_email text,
  due_date date,
  expected_payment_date date,
  stripe_invoice_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings(id) on delete cascade,
  sender_profile_id uuid not null references public.profiles(id) on delete restrict,
  recipient_profile_id uuid not null references public.profiles(id) on delete restrict,
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  owner_profile_id uuid not null references public.profiles(id) on delete cascade,
  booking_id uuid references public.bookings(id) on delete cascade,
  title text not null,
  document_type text not null,
  storage_bucket text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.compliance_documents (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  document_type text not null,
  status public.verification_status not null default 'submitted',
  expires_on date,
  storage_bucket text not null default 'compliance-documents',
  storage_path text not null,
  reviewed_by uuid references public.profiles(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  provider_id uuid not null references public.providers(id) on delete cascade,
  plan public.provider_plan not null default 'free',
  status text not null default 'inactive',
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.payment_events (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references public.invoices(id) on delete set null,
  provider_id uuid references public.providers(id) on delete set null,
  business_id uuid references public.businesses(id) on delete set null,
  stripe_event_id text unique,
  status text not null,
  amount_cents integer,
  commission_cents integer,
  created_at timestamptz not null default now()
);

create index if not exists bookings_client_idx on public.bookings(client_profile_id);
create index if not exists bookings_business_idx on public.bookings(business_id);
create index if not exists bookings_provider_idx on public.bookings(provider_id);
create index if not exists approvals_booking_idx on public.approvals(booking_id);
create index if not exists invoices_booking_idx on public.invoices(booking_id);
create index if not exists messages_booking_idx on public.messages(booking_id);

create or replace function app_private.current_user_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function app_private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(app_private.current_user_role() = 'admin', false)
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
      and staff.profile_id = auth.uid()
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
      and staff.profile_id = auth.uid()
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
        or booking.client_profile_id = auth.uid()
        or booking.requested_by = auth.uid()
        or app_private.is_business_member(booking.business_id)
        or (booking.provider_id is not null and app_private.is_provider_member(booking.provider_id))
      )
  )
$$;

create or replace function app_private.prevent_profile_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if old.role is distinct from new.role and not app_private.is_admin() then
    raise exception 'Only admins can change profile roles';
  end if;

  return new;
end;
$$;

drop trigger if exists prevent_profile_role_escalation on public.profiles;
create trigger prevent_profile_role_escalation
before update on public.profiles
for each row execute function app_private.prevent_profile_role_escalation();

grant usage on schema app_private to authenticated;
grant execute on all functions in schema app_private to authenticated;
grant usage on schema public to authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage, select on all sequences in schema public to authenticated;

alter table public.profiles enable row level security;
alter table public.businesses enable row level security;
alter table public.business_staff_members enable row level security;
alter table public.providers enable row level security;
alter table public.provider_staff_members enable row level security;
alter table public.services enable row level security;
alter table public.client_provider_links enable row level security;
alter table public.bookings enable row level security;
alter table public.approvals enable row level security;
alter table public.progress_notes enable row level security;
alter table public.invoices enable row level security;
alter table public.messages enable row level security;
alter table public.documents enable row level security;
alter table public.compliance_documents enable row level security;
alter table public.subscriptions enable row level security;
alter table public.payment_events enable row level security;

create policy "profiles select self or admin" on public.profiles
  for select to authenticated
  using (id = auth.uid() or app_private.is_admin());

create policy "profiles insert client self" on public.profiles
  for insert to authenticated
  with check ((id = auth.uid() and role = 'client') or app_private.is_admin());

create policy "profiles update self or admin" on public.profiles
  for update to authenticated
  using (id = auth.uid() or app_private.is_admin())
  with check (id = auth.uid() or app_private.is_admin());

create policy "businesses select published context" on public.businesses
  for select to authenticated
  using (app_private.is_admin() or app_private.is_business_member(id) or verification_status = 'approved');

create policy "businesses manage own or admin" on public.businesses
  for all to authenticated
  using (app_private.is_admin() or app_private.is_business_member(id))
  with check (app_private.is_admin() or app_private.is_business_member(id));

create policy "business staff visible to members" on public.business_staff_members
  for select to authenticated
  using (app_private.is_admin() or app_private.is_business_member(business_id) or profile_id = auth.uid());

create policy "business staff admin manage" on public.business_staff_members
  for all to authenticated
  using (app_private.is_admin())
  with check (app_private.is_admin());

create policy "providers select members and linked clients" on public.providers
  for select to authenticated
  using (
    app_private.is_admin()
    or app_private.is_provider_member(id)
    or exists (
      select 1 from public.client_provider_links link
      where link.provider_id = id and link.client_profile_id = auth.uid()
    )
  );

create policy "providers admin manage" on public.providers
  for all to authenticated
  using (app_private.is_admin())
  with check (app_private.is_admin());

create policy "provider staff visible to members" on public.provider_staff_members
  for select to authenticated
  using (app_private.is_admin() or app_private.is_provider_member(provider_id) or profile_id = auth.uid());

create policy "provider staff admin manage" on public.provider_staff_members
  for all to authenticated
  using (app_private.is_admin())
  with check (app_private.is_admin());

create policy "services select approved businesses" on public.services
  for select to authenticated
  using (
    app_private.is_admin()
    or app_private.is_business_member(business_id)
    or exists (
      select 1 from public.businesses business
      where business.id = business_id
        and business.verification_status = 'approved'
        and is_published
    )
  );

create policy "services business manage" on public.services
  for all to authenticated
  using (app_private.is_admin() or app_private.is_business_member(business_id))
  with check (app_private.is_admin() or app_private.is_business_member(business_id));

create policy "client provider links participant select" on public.client_provider_links
  for select to authenticated
  using (app_private.is_admin() or client_profile_id = auth.uid() or app_private.is_provider_member(provider_id));

create policy "client provider links client or admin manage" on public.client_provider_links
  for all to authenticated
  using (app_private.is_admin() or client_profile_id = auth.uid())
  with check (app_private.is_admin() or client_profile_id = auth.uid());

create policy "bookings participant select" on public.bookings
  for select to authenticated
  using (app_private.can_access_booking(id));

create policy "bookings client insert" on public.bookings
  for insert to authenticated
  with check (app_private.is_admin() or requested_by = auth.uid() or client_profile_id = auth.uid());

create policy "bookings participant update" on public.bookings
  for update to authenticated
  using (
    app_private.is_admin()
    or requested_by = auth.uid()
    or app_private.is_business_member(business_id)
    or (provider_id is not null and app_private.is_provider_member(provider_id))
  )
  with check (
    app_private.is_admin()
    or requested_by = auth.uid()
    or app_private.is_business_member(business_id)
    or (provider_id is not null and app_private.is_provider_member(provider_id))
  );

create policy "approvals participant select" on public.approvals
  for select to authenticated
  using (app_private.is_admin() or app_private.is_provider_member(provider_id) or app_private.can_access_booking(booking_id));

create policy "approvals provider manage" on public.approvals
  for all to authenticated
  using (app_private.is_admin() or app_private.is_provider_member(provider_id))
  with check (app_private.is_admin() or app_private.is_provider_member(provider_id));

create policy "progress notes participant select" on public.progress_notes
  for select to authenticated
  using (app_private.can_access_booking(booking_id));

create policy "progress notes business insert" on public.progress_notes
  for insert to authenticated
  with check (app_private.is_admin() or (author_profile_id = auth.uid() and app_private.is_business_member(business_id)));

create policy "invoices participant select" on public.invoices
  for select to authenticated
  using (app_private.is_admin() or app_private.is_business_member(business_id) or (provider_id is not null and app_private.is_provider_member(provider_id)) or app_private.can_access_booking(booking_id));

create policy "invoices business insert" on public.invoices
  for insert to authenticated
  with check (app_private.is_admin() or app_private.is_business_member(business_id));

create policy "invoices participant update" on public.invoices
  for update to authenticated
  using (app_private.is_admin() or app_private.is_business_member(business_id) or (provider_id is not null and app_private.is_provider_member(provider_id)))
  with check (app_private.is_admin() or app_private.is_business_member(business_id) or (provider_id is not null and app_private.is_provider_member(provider_id)));

create policy "messages participant select" on public.messages
  for select to authenticated
  using (app_private.is_admin() or sender_profile_id = auth.uid() or recipient_profile_id = auth.uid() or (booking_id is not null and app_private.can_access_booking(booking_id)));

create policy "messages sender insert" on public.messages
  for insert to authenticated
  with check (app_private.is_admin() or sender_profile_id = auth.uid());

create policy "documents owner or booking select" on public.documents
  for select to authenticated
  using (app_private.is_admin() or owner_profile_id = auth.uid() or (booking_id is not null and app_private.can_access_booking(booking_id)));

create policy "documents owner insert" on public.documents
  for insert to authenticated
  with check (app_private.is_admin() or owner_profile_id = auth.uid());

create policy "compliance business select" on public.compliance_documents
  for select to authenticated
  using (app_private.is_admin() or app_private.is_business_member(business_id));

create policy "compliance business insert" on public.compliance_documents
  for insert to authenticated
  with check (app_private.is_admin() or app_private.is_business_member(business_id));

create policy "compliance admin update" on public.compliance_documents
  for update to authenticated
  using (app_private.is_admin())
  with check (app_private.is_admin());

create policy "subscriptions provider select" on public.subscriptions
  for select to authenticated
  using (app_private.is_admin() or app_private.is_provider_member(provider_id));

create policy "subscriptions admin manage" on public.subscriptions
  for all to authenticated
  using (app_private.is_admin())
  with check (app_private.is_admin());

create policy "payment events participant select" on public.payment_events
  for select to authenticated
  using (
    app_private.is_admin()
    or (provider_id is not null and app_private.is_provider_member(provider_id))
    or (business_id is not null and app_private.is_business_member(business_id))
  );

create policy "payment events admin manage" on public.payment_events
  for all to authenticated
  using (app_private.is_admin())
  with check (app_private.is_admin());

insert into storage.buckets (id, name, public)
values
  ('compliance-documents', 'compliance-documents', false),
  ('progress-note-attachments', 'progress-note-attachments', false),
  ('client-documents', 'client-documents', false)
on conflict (id) do nothing;

create policy "storage admin all launch buckets" on storage.objects
  for all to authenticated
  using (
    app_private.is_admin()
    and bucket_id in ('compliance-documents', 'progress-note-attachments', 'client-documents')
  )
  with check (
    app_private.is_admin()
    and bucket_id in ('compliance-documents', 'progress-note-attachments', 'client-documents')
  );

create policy "storage owner read launch buckets" on storage.objects
  for select to authenticated
  using (
    owner = auth.uid()
    and bucket_id in ('compliance-documents', 'progress-note-attachments', 'client-documents')
  );

create policy "storage owner upload launch buckets" on storage.objects
  for insert to authenticated
  with check (
    owner = auth.uid()
    and bucket_id in ('compliance-documents', 'progress-note-attachments', 'client-documents')
  );

create policy "storage owner update launch buckets" on storage.objects
  for update to authenticated
  using (
    owner = auth.uid()
    and bucket_id in ('compliance-documents', 'progress-note-attachments', 'client-documents')
  )
  with check (
    owner = auth.uid()
    and bucket_id in ('compliance-documents', 'progress-note-attachments', 'client-documents')
  );
