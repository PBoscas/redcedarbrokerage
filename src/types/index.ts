// ============================================================
// Red Cedar Real Estate — Core Type Definitions
// ============================================================

export type UserRole = 'super_admin' | 'brokerage_admin' | 'agent' | 'editor';

export type StaffRole = 'agent' | 'broker' | 'admin' | 'staff';

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Agent {
  id: string;
  user_id: string | null;
  slug: string;
  first_name: string;
  last_name: string;
  title: string;
  bio_short: string;
  bio_full: string | null;
  position_statement: string | null;
  headshot_url: string | null;
  cover_image_url: string | null;
  role: StaffRole;
  email: string;
  phone: string | null;
  status: 'active' | 'inactive' | 'draft';
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  seo_image: string | null;
  created_at: string;
  updated_at: string;
}

export interface AgentSpecialty {
  id: string;
  agent_id: string;
  name: string;
  sort_order: number;
}

export interface AgentServiceArea {
  id: string;
  agent_id: string;
  name: string;
  sort_order: number;
}

export interface AgentSocialLink {
  id: string;
  agent_id: string;
  platform: string;
  url: string;
  sort_order: number;
}

export interface AgentAward {
  id: string;
  agent_id: string;
  title: string;
  year: string | null;
  issuer: string | null;
  sort_order: number;
}

export interface AgentTestimonial {
  id: string;
  agent_id: string;
  client_name: string;
  client_title: string | null;
  quote: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  neighborhood_id: string | null;
  status: 'coming_soon' | 'active' | 'under_contract' | 'sold' | 'off_market';
  price: number | null;
  beds: number | null;
  baths: number | null;
  half_baths: number | null;
  sqft: number | null;
  lot_size: string | null;
  year_built: number | null;
  property_type: string | null;
  narrative: string | null;
  short_description: string | null;
  hero_image_url: string | null;
  featured: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface PropertyAgent {
  property_id: string;
  agent_id: string;
  role: 'primary' | 'co_agent';
}

export interface PropertyFeature {
  id: string;
  property_id: string;
  category: string;
  name: string;
  value: string | null;
  sort_order: number;
}

export interface PropertyMedia {
  id: string;
  property_id: string;
  url: string;
  type: 'image' | 'video' | 'virtual_tour';
  caption: string | null;
  alt_text: string | null;
  sort_order: number;
}

export interface Insight {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  category_id: string | null;
  author_id: string | null;
  cover_image_url: string | null;
  published: boolean;
  published_at: string | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface InsightCategory {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
}

export interface Neighborhood {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  overview: string | null;
  hero_image_url: string | null;
  region: string | null;
  highlights: string[] | null;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface MediaAsset {
  id: string;
  owner_id: string | null;
  url: string;
  filename: string;
  file_type: string;
  file_size: number;
  context: 'agent' | 'property' | 'brokerage' | 'insight' | 'neighborhood';
  alt_text: string | null;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  type: 'buying' | 'selling' | 'relocating' | 'agent_inquiry' | 'general' | 'recruiting';
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  agent_id: string | null;
  property_id: string | null;
  metadata: Record<string, unknown> | null;
  status: 'new' | 'read' | 'responded' | 'archived';
  created_at: string;
}

export interface HomepageSection {
  id: string;
  section_key: string;
  title: string | null;
  subtitle: string | null;
  body: string | null;
  media_url: string | null;
  config: Record<string, unknown>;
  sort_order: number;
  visible: boolean;
}

export interface SiteSetting {
  key: string;
  value: unknown;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
