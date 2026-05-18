import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';
import { headers } from 'next/headers';
import { sql } from '@/lib/db';

async function verifyOwnership(testimonialId: string, userId: string) {
  const rows = await sql`
    SELECT t.id
    FROM agent_testimonials t
    JOIN agents a ON a.id = t.agent_id
    WHERE t.id = ${testimonialId} AND a.user_id = ${userId}
  `;
  return rows.length > 0;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: testimonialId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const owns = await verifyOwnership(testimonialId, session.user.id);
    if (!owns) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { client_name, client_title, quote, featured } = body;

    if (!client_name || !quote) {
      return NextResponse.json(
        { error: 'client_name and quote are required' },
        { status: 400 }
      );
    }

    const rows = await sql`
      UPDATE agent_testimonials
      SET client_name = ${client_name},
          client_title = ${client_title || null},
          quote = ${quote},
          featured = ${featured ?? false}
      WHERE id = ${testimonialId}
      RETURNING id, client_name, client_title, quote, featured
    `;

    return NextResponse.json({ testimonial: rows[0] });
  } catch (error) {
    console.error('Testimonial update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Update failed' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: testimonialId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const owns = await verifyOwnership(testimonialId, session.user.id);
    if (!owns) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await sql`DELETE FROM agent_testimonials WHERE id = ${testimonialId}`;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Testimonial delete error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Delete failed' },
      { status: 500 }
    );
  }
}
