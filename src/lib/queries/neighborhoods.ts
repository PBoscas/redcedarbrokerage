import { sql } from '@/lib/db';

export interface NeighborhoodRow {
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
}

export async function getAllNeighborhoods(): Promise<NeighborhoodRow[]> {
  const rows = await sql`
    SELECT id, slug, name, tagline, overview, hero_image_url, region, highlights
    FROM neighborhoods
    ORDER BY name
  `;
  return rows as NeighborhoodRow[];
}

export async function getFeaturedNeighborhoods(limit = 6): Promise<NeighborhoodRow[]> {
  const rows = await sql`
    SELECT id, slug, name, tagline, hero_image_url, region
    FROM neighborhoods
    ORDER BY name
    LIMIT ${limit}
  `;
  return rows as NeighborhoodRow[];
}

export async function getDistinctRegions(): Promise<string[]> {
  const rows = await sql`
    SELECT DISTINCT region FROM neighborhoods
    WHERE region IS NOT NULL
    ORDER BY region
  `;
  return rows.map((r) => (r as { region: string }).region);
}

export async function getNeighborhoodBySlug(slug: string): Promise<NeighborhoodRow | null> {
  const rows = await sql`
    SELECT id, slug, name, tagline, overview, hero_image_url, region, highlights,
           seo_title, seo_description
    FROM neighborhoods
    WHERE slug = ${slug}
    LIMIT 1
  `;
  return (rows[0] as NeighborhoodRow) ?? null;
}
