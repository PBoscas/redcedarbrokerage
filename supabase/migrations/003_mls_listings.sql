-- MLS Listings from Bright MLS RESO API
create table mls_listings (
  listing_key text primary key,
  listing_id text unique not null,
  status text not null,
  list_price numeric,
  close_price numeric,
  property_type text,
  property_sub_type text,
  address text,
  street_number text,
  street_name text,
  street_suffix text,
  unit_number text,
  city text,
  state text,
  zip text,
  county text,
  latitude double precision,
  longitude double precision,
  bedrooms int,
  bathrooms_full int,
  bathrooms_half int,
  living_area int,
  lot_size_acres double precision,
  lot_size_sqft double precision,
  year_built int,
  list_agent_mls_id text,
  list_agent_name text,
  list_office_mls_id text,
  listing_date date,
  close_date date,
  days_on_market int,
  public_remarks text,
  subdivision text,
  garage_spaces int,
  stories int,
  architectural_style text,
  association_fee numeric,
  association_fee_freq text,
  original_list_price numeric,
  modification_timestamp timestamptz,
  synced_at timestamptz not null default now()
);

create index idx_mls_listings_status on mls_listings(status);

create table mls_listing_photos (
  media_key text primary key,
  listing_key text not null references mls_listings(listing_key) on delete cascade,
  media_url text not null,
  media_category text,
  display_order int,
  synced_at timestamptz not null default now()
);

create index idx_mls_listing_photos_listing_key on mls_listing_photos(listing_key);

-- Track sync state for delta syncing
create table mls_sync_state (
  id int primary key default 1 check (id = 1),
  last_modification_timestamp timestamptz,
  last_sync_at timestamptz,
  last_closed_sync_at timestamptz
);

insert into mls_sync_state (id) values (1);
