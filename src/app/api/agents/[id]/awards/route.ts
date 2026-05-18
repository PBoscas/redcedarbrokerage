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

    const { title, year, issuer } = await request.json();
    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const rows = await sql`
      INSERT INTO agent_awards (id, agent_id, title, year, issuer, sort_order)
      VALUES (gen_random_uuid(), ${agentId}, ${title.trim()}, ${year?.trim() || null}, ${issuer?.trim() || null}, (
        SELECT COALESCE(MAX(sort_order), 0) + 1 FROM agent_awards WHERE agent_id = ${agentId}
      ))
      RETURNING id, title, year, issuer
    `;

    return NextResponse.json({ award: rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Add award error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add award' },
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

    const { awardId } = await request.json();
    if (!awardId) {
      return NextResponse.json({ error: 'awardId is required' }, { status: 400 });
    }

    await sql`
      DELETE FROM agent_awards WHERE id = ${awardId} AND agent_id = ${agentId}
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete award error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete award' },
      { status: 500 }
    );
  }
}
