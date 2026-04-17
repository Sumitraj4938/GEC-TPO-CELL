-- Supabase Schema for GEC Vaishali Portal

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users Table (Extending Supabase Auth users)
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  name text not null,
  role text not null check (role in ('super_admin', 'tpo_admin', 'hod_admin', 'student')),
  branch text check (branch in ('CSE', 'Civil', 'Mechanical', 'EE', 'ECE')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Profiles Table (Faculty/Leadership)
create table public.profiles (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  designation text not null check (designation in ('HOD', 'TPO_HEAD')),
  branch text not null check (branch in ('CSE', 'Civil', 'Mechanical', 'EE', 'ECE')),
  image_url text,
  bio text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Notifications Table
create table public.notifications (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  message text not null,
  branch text check (branch in ('CSE', 'Civil', 'Mechanical', 'EE', 'ECE', 'All')),
  role text check (role in ('super_admin', 'tpo_admin', 'hod_admin', 'student', 'All')),
  is_scheduled boolean default false,
  scheduled_for timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_by uuid references public.users(id)
);

-- Achievements Table
create table public.achievements (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  branch text check (branch in ('CSE', 'Civil', 'Mechanical', 'EE', 'ECE')),
  image_url text,
  student_name text not null,
  batch text not null,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Content Sections Table
create table public.content_sections (
  id uuid primary key default uuid_generate_v4(),
  section_name text unique not null,
  title text not null,
  content text not null, -- Can store markdown or JSON
  image_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;
alter table public.profiles enable row level security;
alter table public.notifications enable row level security;
alter table public.achievements enable row level security;
alter table public.content_sections enable row level security;

-- Policies

-- Users: Read access for everyone (or limited if needed)
create policy "Users are viewable by authenticated users" on public.users
  for select using (auth.role() = 'authenticated');

-- Profiles: Read access for everyone
create policy "Profiles are viewable by everyone" on public.profiles
  for select using (true);

-- Notifications: Read access for targeted audience
create policy "Notifications are viewable by targeted audience" on public.notifications
  for select using (
    (branch = 'All' or branch = (select branch from public.users where id = auth.uid())) and
    (role = 'All' or role = (select role from public.users where id = auth.uid()))
  );

-- Achievements: Read access for everyone
create policy "Achievements are viewable by everyone" on public.achievements
  for select using (true);

-- Content Sections: Read access for everyone
create policy "Content sections are viewable by everyone" on public.content_sections
  for select using (true);

-- Admin Policies (Simplified for prototype)
create policy "Admins can manage profiles" on public.profiles
  for all using (exists (select 1 from public.users where id = auth.uid() and role in ('super_admin', 'hod_admin', 'tpo_admin')));

create policy "Admins can manage notifications" on public.notifications
  for all using (exists (select 1 from public.users where id = auth.uid() and role in ('super_admin', 'hod_admin', 'tpo_admin')));

create policy "Admins can manage achievements" on public.achievements
  for all using (exists (select 1 from public.users where id = auth.uid() and role in ('super_admin', 'hod_admin', 'tpo_admin')));

create policy "Super admins can manage content" on public.content_sections
  for all using (exists (select 1 from public.users where id = auth.uid() and role = 'super_admin'));
