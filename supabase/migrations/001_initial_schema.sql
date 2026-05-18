-- ============================================================
-- Red Cedar Real Estate — Initial Database Schema
-- ============================================================

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================

create type user_role as enum ('super_admin', 'brokerage_admin', 'agent', 'editor');
create type agent_status as enum ('active', 'inactive', 'draft');
create type property_status as enum ('coming_soon', 'active', 'under_contract', 'sold', 'off_market');
create type property_agent_role as enum ('primary', 'co_agent');
create type media_type as enum ('image', 'video', 'virtual_tour');
create type media_context as enum ('agent', 'property', 'brokerage', 'insight', 'neighborhood');
create type submission_type as enum ('buying', 'selling', 'relocating', 'agent_inquiry', 'general', 'recruiting');
create type submission_status as enum ('new', 'read', 'responded', 'archived');

-- ============================================================
-- PROFILES (extends auth.users)
-- ============================================================

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role user_role not null default 'agent',
  full_name text not null default '',
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone"
  on profiles for select using (true);

create policy "Users can update own profile"
  on profiles for update using (auth.uid() = id);

-- ============================================================
-- AGENTS
-- ============================================================

create table agents (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id) on delete set null,
  slug text unique not null,
  first_name text not null,
  last_name text not null,
  title text not null default '',
  bio_short text not null default '',
  bio_full text,
  position_statement text,
  headshot_url text,
  cover_image_url text,
  email text not null,
  phone text,
  status agent_status not null default 'draft',
  sort_order int not null default 0,
  seo_title text,
  seo_description text,
  seo_image text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table agents enable row level security;

create policy "Active agents are viewable by everyone"
  on agents for select using (status = 'active');

create policy "Admins can manage all agents"
  on agents for all using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role in ('super_admin', 'brokerage_admin')
    )
  );

create policy "Agents can update own record"
  on agents for update using (user_id = auth.uid());

-- ============================================================
-- AGENT RELATED TABLES
-- ============================================================

create table agent_specialties (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid not null references agents(id) on delete cascade,
  name text not null,
  sort_order int not null default 0
);

create table agent_service_areas (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid not null references agents(id) on delete cascade,
  name text not null,
  sort_order int not null default 0
);

create table agent_social_links (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid not null references agents(id) on delete cascade,
  platform text not null,
  url text not null,
  sort_order int not null default 0
);

create table agent_awards (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid not null references agents(id) on delete cascade,
  title text not null,
  year text,
  issuer text,
  sort_order int not null default 0
);

create table agent_testimonials (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid not null references agents(id) on delete cascade,
  client_name text not null,
  client_title text,
  quote text not null,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Enable RLS on agent sub-tables
alter table agent_specialties enable row level security;
alter table agent_service_areas enable row level security;
alter table agent_social_links enable row level security;
alter table agent_awards enable row level security;
alter table agent_testimonials enable row level security;

-- Public read for agent sub-tables
create policy "Public read" on agent_specialties for select using (true);
create policy "Public read" on agent_service_areas for select using (true);
create policy "Public read" on agent_social_links for select using (true);
create policy "Public read" on agent_awards for select using (true);
create policy "Public read" on agent_testimonials for select using (true);

-- ============================================================
-- PROPERTIES
-- ============================================================

create table properties (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  address text not null,
  city text not null,
  state text not null,
  zip text not null,
  neighborhood_id uuid,
  status property_status not null default 'coming_soon',
  price bigint,
  beds int,
  baths int,
  half_baths int,
  sqft int,
  lot_size text,
  year_built int,
  property_type text,
  narrative text,
  short_description text,
  hero_image_url text,
  featured boolean not null default false,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table properties enable row level security;

create policy "Published properties are viewable"
  on properties for select using (status in ('active', 'coming_soon', 'under_contract', 'sold'));

create policy "Admins can manage all properties"
  on properties for all using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role in ('super_admin', 'brokerage_admin')
    )
  );

-- ============================================================
-- PROPERTY AGENTS (junction)
-- ============================================================

create table property_agents (
  property_id uuid not null references properties(id) on delete cascade,
  agent_id uuid not null references agents(id) on delete cascade,
  role property_agent_role not null default 'primary',
  primary key (property_id, agent_id)
);

alter table property_agents enable row level security;
create policy "Public read" on property_agents for select using (true);

-- ============================================================
-- PROPERTY FEATURES & MEDIA
-- ============================================================

create table property_features (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references properties(id) on delete cascade,
  category text not null default 'General',
  name text not null,
  value text,
  sort_order int not null default 0
);

create table property_media (
  id uuid primary key default uuid_generate_v4(),
  property_id uuid not null references properties(id) on delete cascade,
  url text not null,
  type media_type not null default 'image',
  caption text,
  alt_text text,
  sort_order int not null default 0
);

alter table property_features enable row level security;
alter table property_media enable row level security;
create policy "Public read" on property_features for select using (true);
create policy "Public read" on property_media for select using (true);

-- ============================================================
-- INSIGHTS
-- ============================================================

create table insight_categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  sort_order int not null default 0
);

create table insights (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  excerpt text,
  body text not null default '',
  category_id uuid references insight_categories(id) on delete set null,
  author_id uuid references agents(id) on delete set null,
  cover_image_url text,
  published boolean not null default false,
  published_at timestamptz,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table insight_categories enable row level security;
alter table insights enable row level security;
create policy "Public read" on insight_categories for select using (true);
create policy "Published insights are viewable" on insights for select using (published = true);

-- ============================================================
-- NEIGHBORHOODS
-- ============================================================

create table neighborhoods (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  name text not null,
  tagline text,
  overview text,
  hero_image_url text,
  region text,
  highlights text[],
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table neighborhoods enable row level security;
create policy "Public read" on neighborhoods for select using (true);

-- Add FK from properties to neighborhoods
alter table properties
  add constraint fk_properties_neighborhood
  foreign key (neighborhood_id) references neighborhoods(id) on delete set null;

-- ============================================================
-- MEDIA ASSETS
-- ============================================================

create table media_assets (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references profiles(id) on delete set null,
  url text not null,
  filename text not null,
  file_type text not null,
  file_size bigint not null default 0,
  context media_context not null default 'brokerage',
  alt_text text,
  created_at timestamptz not null default now()
);

alter table media_assets enable row level security;

create policy "Admins can manage all media"
  on media_assets for all using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role in ('super_admin', 'brokerage_admin')
    )
  );

create policy "Users can manage own media"
  on media_assets for all using (owner_id = auth.uid());

-- ============================================================
-- CONTACT SUBMISSIONS
-- ============================================================

create table contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  type submission_type not null default 'general',
  name text not null,
  email text not null,
  phone text,
  message text,
  agent_id uuid references agents(id) on delete set null,
  property_id uuid references properties(id) on delete set null,
  metadata jsonb,
  status submission_status not null default 'new',
  created_at timestamptz not null default now()
);

alter table contact_submissions enable row level security;

create policy "Admins can view all submissions"
  on contact_submissions for select using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role in ('super_admin', 'brokerage_admin')
    )
  );

-- ============================================================
-- HOMEPAGE SECTIONS
-- ============================================================

create table homepage_sections (
  id uuid primary key default uuid_generate_v4(),
  section_key text unique not null,
  title text,
  subtitle text,
  body text,
  media_url text,
  config jsonb not null default '{}',
  sort_order int not null default 0,
  visible boolean not null default true
);

alter table homepage_sections enable row level security;
create policy "Public read" on homepage_sections for select using (true);

-- ============================================================
-- SITE SETTINGS
-- ============================================================

create table site_settings (
  key text primary key,
  value jsonb not null default '{}'
);

alter table site_settings enable row level security;
create policy "Public read" on site_settings for select using (true);

-- ============================================================
-- LIGHTWEIGHT ANALYTICS
-- ============================================================

create table page_views (
  id uuid primary key default uuid_generate_v4(),
  path text not null,
  referrer text,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table page_views enable row level security;

-- ============================================================
-- INDEXES
-- ============================================================

create index idx_agents_slug on agents(slug);
create index idx_agents_status on agents(status);
create index idx_properties_slug on properties(slug);
create index idx_properties_status on properties(status);
create index idx_properties_featured on properties(featured) where featured = true;
create index idx_insights_slug on insights(slug);
create index idx_insights_published on insights(published) where published = true;
create index idx_neighborhoods_slug on neighborhoods(slug);
create index idx_contact_submissions_status on contact_submissions(status);
create index idx_page_views_path on page_views(path);
create index idx_page_views_created on page_views(created_at);

-- ============================================================
-- TRIGGERS for updated_at
-- ============================================================

create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at before update on profiles
  for each row execute function update_updated_at();

create trigger set_updated_at before update on agents
  for each row execute function update_updated_at();

create trigger set_updated_at before update on properties
  for each row execute function update_updated_at();

create trigger set_updated_at before update on insights
  for each row execute function update_updated_at();

create trigger set_updated_at before update on neighborhoods
  for each row execute function update_updated_at();
