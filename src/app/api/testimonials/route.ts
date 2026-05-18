import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';
import { headers } from 'next/headers';
import { sql } from '@/lib/db';

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Get the agent belonging to this user
    const agents = await sql`
      SELECT id FROM agents WHERE user_id = ${session.user.id}
    `;
    if (agents.length === 0) {
      return NextResponse.json({ error: 'No agent profile found' }, { status: 403 });
    }
    const agentId = agents[0].id;

    const body = await request.json();
    const { client_name, client_title, quote, featured } = body;

    if (!client_name || !quote) {
      return NextResponse.json(
        { error: 'client_name and quote are required' },
        { status: 400 }
      );
    }

    const rows = await sql`
      INSERT INTO agent_testimonials (agent_id, client_name, client_title, quote, featured)
      VALUES (${agentId}, ${client_name}, ${client_title || null}, ${quote}, ${featured ?? false})
      RETURNING id, client_name, client_title, quote, featured
    `;

    return NextResponse.json({ testimonial: rows[0] }, { status: 201 });
  } catch (error) {
    console.error('Testimonial create error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Create failed' },
      { status: 500 }
    );
  }
}
