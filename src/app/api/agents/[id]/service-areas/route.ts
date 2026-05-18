import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';
import { headers } from 'next/headers';
import { sql } from '@/lib/db';

async function verifyOwnership(agentId: string, userId: string) {
  const rows = await sql`
    SELECT id FROM agents WHERE id = ${agentId} AND user_id = ${userId}
  `;
  return rows.length > 0;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: agentId } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!(await verifyOwnership(agentId, session.user.id))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { name } = await request.json();
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    const rows = await sql`
      INSERT INTO agent_service_areas (id, agent_id, name, sort_order)
      VALUES (gen_random_uuid(), ${agentId}, ${name.trim()}, (
        SELECT COALESCE(MAX(sort_order), 0) + 1 FROM agent_service_areas WHERE agent_id = ${agentId}
      ))
      RETURNING id, name
    `;

    return NextResponse.json({ serviceArea: rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Add service area error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add service area' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: agentId } = await params;

  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    if (!(await verifyOwnership(agentId, session.user.id))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { serviceAreaId } = await request.json();
    if (!serviceAreaId) {
      return NextResponse.json({ error: 'serviceAreaId is required' }, { status: 400 });
    }

    await sql`
      DELETE FROM agent_service_areas WHERE id = ${serviceAreaId} AND agent_id = ${agentId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete service area error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete service area' },
      { status: 500 }
    );
  }
}
