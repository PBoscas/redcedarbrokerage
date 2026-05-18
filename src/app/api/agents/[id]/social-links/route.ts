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

export async function PUT(
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

    const { instagram, linkedin } = await request.json();

    const platforms = [
      { platform: 'instagram', url: instagram },
      { platform: 'linkedin', url: linkedin },
    ];

    for (const { platform, url } of platforms) {
      if (url && typeof url === 'string' && url.trim()) {
        // Upsert: insert or update on conflict
        await sql`
          INSERT INTO agent_social_links (id, agent_id, platform, url, sort_order)
          VALUES (gen_random_uuid(), ${agentId}, ${platform}, ${url.trim()}, 0)
          ON CONFLICT (agent_id, platform)
          DO UPDATE SET url = ${url.trim()}
        `;
      } else {
        // If URL is empty, remove the row
        await sql`
          DELETE FROM agent_social_links WHERE agent_id = ${agentId} AND platform = ${platform}
        `;
      }
    }

    // Return the updated social links
    const rows = await sql`
      SELECT id, platform, url FROM agent_social_links
      WHERE agent_id = ${agentId}
      ORDER BY sort_order
    `;

    return NextResponse.json({ socialLinks: rows });
  } catch (error) {
    console.error('Update social links error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update social links' },
      { status: 500 }
    );
  }
}
