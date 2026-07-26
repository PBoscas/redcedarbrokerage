import { sql } from '@/lib/db';
import { PRINCIPAL_AGENT_SLUGS } from '@/lib/constants/brand';
import type { StaffRole } from '@/types';

// Tagged-template params can't be spread into ANY(), so materialize the
// readonly tuple as a plain array once.
const PRINCIPALS: string[] = [...PRINCIPAL_AGENT_SLUGS];

export interface AgentRow {
  id: string;
  slug: string;
  first_name: string;
  last_name: string;
  title: string;
  bio_short: string;
  bio_full: string | null;
  position_statement: string | null;
  headshot_url: string | null;
  cover_image_url: string | null;
  email: string;
  phone: string | null;
  role: StaffRole;
  license_number: string | null;
  license_state: string | null;
  status: string;
  sort_order: number;
}

export interface AgentSpecialtyRow {
  id: string;
  name: string;
}

export interface AgentServiceAreaRow {
  id: string;
  name: string;
}

export interface AgentAwardRow {
  id: string;
  title: string;
  year: string | null;
  issuer: string | null;
}

export interface AgentSocialLinkRow {
  id: string;
  platform: string;
  url: string;
}

export async function getActiveAgents(): Promise<AgentRow[]> {
  const rows = await sql`
    SELECT id, slug, first_name, last_name, title, bio_short, bio_full,
           headshot_url, email, phone, role, license_number, license_state, status, sort_order
    FROM agents
    WHERE status = 'active'
    ORDER BY last_name, first_name
  `;
  return rows as AgentRow[];
}

export async function getFeaturedAgents(): Promise<AgentRow[]> {
  const rows = await sql`
    SELECT id, slug, first_name, last_name, title, bio_short,
           headshot_url, email, phone, role, status, sort_order
    FROM agents
    WHERE status = 'active' AND slug = ANY(${PRINCIPALS})
    ORDER BY random()
  `;
  return rows as AgentRow[];
}

export async function getPublicAgents(): Promise<AgentRow[]> {
  const rows = await sql`
    SELECT id, slug, first_name, last_name, title, bio_short, bio_full,
           headshot_url, email, phone, role, license_number, license_state, status, sort_order
    FROM agents
    WHERE status = 'active' AND role IN ('agent', 'broker')
    ORDER BY
      -- Principals first (shuffled among themselves), then everyone else
      -- alphabetically by last name. Non-principals all share the same
      -- constant second key, so they fall through to last_name/first_name.
      CASE WHEN slug = ANY(${PRINCIPALS}) THEN 0 ELSE 1 END,
      CASE WHEN slug = ANY(${PRINCIPALS}) THEN random() ELSE 1 END,
      last_name, first_name
  `;
  return rows as AgentRow[];
}

export async function getAgentBySlug(slug: string): Promise<AgentRow | null> {
  const rows = await sql`
    SELECT id, slug, first_name, last_name, title, bio_short, bio_full,
           position_statement, headshot_url, cover_image_url, email, phone,
           role, license_number, license_state, status, sort_order
    FROM agents
    WHERE slug = ${slug} AND status = 'active'
    LIMIT 1
  `;
  return (rows[0] as AgentRow) ?? null;
}

export async function getAgentSpecialties(agentId: string): Promise<AgentSpecialtyRow[]> {
  const rows = await sql`
    SELECT id, name FROM agent_specialties
    WHERE agent_id = ${agentId}
    ORDER BY sort_order
  `;
  return rows as AgentSpecialtyRow[];
}

export async function getAgentServiceAreas(agentId: string): Promise<AgentServiceAreaRow[]> {
  const rows = await sql`
    SELECT id, name FROM agent_service_areas
    WHERE agent_id = ${agentId}
    ORDER BY sort_order
  `;
  return rows as AgentServiceAreaRow[];
}

export async function getAgentAwards(agentId: string): Promise<AgentAwardRow[]> {
  const rows = await sql`
    SELECT id, title, year, issuer FROM agent_awards
    WHERE agent_id = ${agentId}
    ORDER BY sort_order
  `;
  return rows as AgentAwardRow[];
}

export async function getAgentSocialLinks(agentId: string): Promise<AgentSocialLinkRow[]> {
  const rows = await sql`
    SELECT id, platform, url FROM agent_social_links
    WHERE agent_id = ${agentId}
    ORDER BY sort_order
  `;
  return rows as AgentSocialLinkRow[];
}

export async function getAgentByUserId(userId: string): Promise<AgentRow | null> {
  const rows = await sql`
    SELECT id, slug, first_name, last_name, title, bio_short, bio_full,
           position_statement, headshot_url, cover_image_url, email, phone,
           role, license_number, license_state, status, sort_order
    FROM agents
    WHERE user_id = ${userId}
    LIMIT 1
  `;
  return (rows[0] as AgentRow) ?? null;
}

export async function getAgentByFullName(fullName: string): Promise<AgentRow | null> {
  const rows = await sql`
    SELECT id, slug, first_name, last_name, title, bio_short, bio_full,
           headshot_url, email, phone, role, license_number, license_state, status, sort_order
    FROM agents
    WHERE status = 'active'
      AND (first_name || ' ' || last_name) ILIKE ${fullName}
    LIMIT 1
  `;
  return (rows[0] as AgentRow) ?? null;
}

export async function getAllAgents(): Promise<AgentRow[]> {
  const rows = await sql`
    SELECT id, slug, first_name, last_name, title, bio_short, bio_full,
           headshot_url, email, phone, role, license_number, license_state, status, sort_order
    FROM agents
    ORDER BY sort_order
  `;
  return rows as AgentRow[];
}
