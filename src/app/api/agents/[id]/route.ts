import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';
import { headers } from 'next/headers';
import { sql } from '@/lib/db';

const ALLOWED_FIELDS = [
  'first_name',
  'last_name',
  'title',
  'role',
  'bio_short',
  'bio_full',
  'position_statement',
  'email',
  'phone',
] as const;

type AllowedField = (typeof ALLOWED_FIELDS)[number];

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: agentId } = await params;

  // Authenticate
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Verify the user owns this agent profile
    const agents = await sql`
      SELECT id FROM agents WHERE id = ${agentId} AND user_id = ${session.user.id}
    `;
    if (agents.length === 0) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();

    // Filter to only allowed fields that are present in the body
    const updates: Partial<Record<AllowedField, string | null>> = {};
    for (const field of ALLOWED_FIELDS) {
      if (field in body) {
        updates[field] = body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    // Use a sentinel to distinguish "field not sent" from "field sent as empty/null".
    // For each field, if the key exists in updates we use the new value; otherwise
    // we fall back to the existing column value via CASE/COALESCE.
    const has = (f: AllowedField) => f in updates;
    const val = (f: AllowedField) => (has(f) ? (updates[f] ?? null) : undefined);

    // We pass every field. For fields not in the update payload we pass a flag
    // and use the existing column value in SQL.
    await sql`
      UPDATE agents SET
        first_name  = CASE WHEN ${has('first_name')}  THEN ${val('first_name')}::text  ELSE first_name  END,
        last_name   = CASE WHEN ${has('last_name')}    THEN ${val('last_name')}::text   ELSE last_name   END,
        title       = CASE WHEN ${has('title')}        THEN ${val('title')}::text       ELSE title       END,
        role        = CASE WHEN ${has('role')}         THEN ${val('role')}::staff_role   ELSE role        END,
        bio_short   = CASE WHEN ${has('bio_short')}    THEN ${val('bio_short')}::text   ELSE bio_short   END,
        bio_full    = CASE WHEN ${has('bio_full')}     THEN ${val('bio_full')}::text     ELSE bio_full    END,
        position_statement = CASE WHEN ${has('position_statement')} THEN ${val('position_statement')}::text ELSE position_statement END,
        email       = CASE WHEN ${has('email')}        THEN ${val('email')}::text       ELSE email       END,
        phone       = CASE WHEN ${has('phone')}        THEN ${val('phone')}::text       ELSE phone       END,
        updated_at  = now()
      WHERE id = ${agentId}
    `;

    // Fetch and return the updated agent
    const rows = await sql`
      SELECT id, slug, first_name, last_name, title, bio_short, bio_full,
             position_statement, headshot_url, cover_image_url, email, phone,
             role, license_number, license_state, status, sort_order
      FROM agents
      WHERE id = ${agentId}
    `;

    return NextResponse.json({ agent: rows[0] });
  } catch (error) {
    console.error('Agent update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Update failed' },
      { status: 500 }
    );
  }
}
