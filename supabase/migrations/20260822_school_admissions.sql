create extension if not exists pgcrypto;

create type public.application_status as enum ('draft', 'submitted', 'under_review', 'approved', 'rejected');
create type public.staff_role as enum ('admin', 'admissions_officer', 'editor');

create table if not exists public.staff_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role public.staff_role not null default 'admissions_officer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admissions_applications (
  id uuid primary key default gen_random_uuid(),
  reference_number text not null unique,
  applicant_email text not null,
  applicant_phone text not null,
  student_name text not null,
  guardian_name text not null,
  guardian_relationship text not null,
  requested_level text not null,
  requested_form text not null,
  previous_school text not null,
  academic_summary text not null,
  address text not null,
  entry_form jsonb not null default '{}'::jsonb,
  status public.application_status not null default 'draft',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  submitted_at timestamptz
);

create table if not exists public.application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.admissions_applications(id) on delete cascade,
  document_type text not null,
  original_name text not null,
  storage_path text not null unique,
  mime_type text not null,
  file_size bigint not null,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.application_audit_log (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references public.admissions_applications(id) on delete cascade,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  from_status public.application_status,
  to_status public.application_status,
  note text,
  created_at timestamptz not null default now()
);

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.staff_profiles
    where id = auth.uid()
  );
$$;

create or replace function public.staff_role()
returns public.staff_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.staff_profiles where id = auth.uid();
$$;

alter table public.staff_profiles enable row level security;
alter table public.admissions_applications enable row level security;
alter table public.application_documents enable row level security;
alter table public.application_audit_log enable row level security;

create policy "staff can view their own profile"
  on public.staff_profiles for select
  to authenticated
  using (id = auth.uid());

create policy "staff can view applications"
  on public.admissions_applications for select
  to authenticated
  using (public.is_staff() or created_by = auth.uid());

create policy "applicants can create their own application"
  on public.admissions_applications for insert
  to authenticated
  with check (created_by = auth.uid());

create policy "applicants can update their own draft"
  on public.admissions_applications for update
  to authenticated
  using (created_by = auth.uid() and status = 'draft')
  with check (created_by = auth.uid());

create policy "staff can update application workflow"
  on public.admissions_applications for update
  to authenticated
  using (public.is_staff())
  with check (public.is_staff());

create policy "applicants can view their documents"
  on public.application_documents for select
  to authenticated
  using (
    exists (
      select 1 from public.admissions_applications a
      where a.id = application_id and (a.created_by = auth.uid() or public.is_staff())
    )
  );

create policy "authenticated users can add application documents"
  on public.application_documents for insert
  to authenticated
  with check (
    uploaded_by = auth.uid()
    and exists (
      select 1 from public.admissions_applications a
      where a.id = application_id and (a.created_by = auth.uid() or public.is_staff())
    )
  );

create policy "staff can view audit history"
  on public.application_audit_log for select
  to authenticated
  using (public.is_staff() or actor_id = auth.uid());

create policy "authenticated users can write audit history"
  on public.application_audit_log for insert
  to authenticated
  with check (actor_id = auth.uid());

insert into storage.buckets (id, name, public)
values ('application-documents', 'application-documents', false)
on conflict (id) do nothing;

create policy "authenticated users can upload application documents"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'application-documents' and owner_id = auth.uid()::text);

create policy "staff and applicants can read application documents"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'application-documents' and owner_id = auth.uid()::text);

create or replace function public.lookup_application_status(p_reference_number text, p_applicant_email text)
returns table(reference_number text, status public.application_status, submitted_at timestamptz)
language sql
stable
security definer
set search_path = public
as $$
  select a.reference_number, a.status, a.submitted_at
  from public.admissions_applications a
  where a.reference_number = p_reference_number
    and lower(a.applicant_email) = lower(p_applicant_email)
  limit 1;
$$;

grant execute on function public.lookup_application_status(text, text) to anon, authenticated;
