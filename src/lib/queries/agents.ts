import { sql } from '@/lib/db';
import type { StaffRole } from '@/types';

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

export async function getRandomAgents(limit = 3): Promise<AgentRow[]> {
  const rows = await sql`
    SELECT id, slug, first_name, last_name, title, bio_short,
           headshot_url, email, phone, role, status, sort_order
    FROM agents
    WHERE status = 'active' AND role IN ('agent', 'broker')
    ORDER BY random()
    LIMIT ${limit}
  `;
  return rows as AgentRow[];
}

export async function getPublicAgents(): Promise<AgentRow[]> {
  const rows = await sql`
    SELECT id, slug, first_name, last_name, title, bio_short, bio_full,
           headshot_url, email, phone, role, license_number, license_state, status, sort_order
    FROM agents
    WHERE status = 'active' AND role IN ('agent', 'broker')
    ORDER BY last_name, first_name
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

export async function getAllAgents(): Promise<AgentRow[]> {
  const rows = await sql`
    SELECT id, slug, first_name, last_name, title, bio_short, bio_full,
           headshot_url, email, phone, role, license_number, license_state, status, sort_order
    FROM agents
    ORDER BY sort_order
  `;
  return rows as AgentRow[];
}
