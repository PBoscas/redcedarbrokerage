import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';
import { headers } from 'next/headers';
import { sql } from '@/lib/db';
import { put } from '@vercel/blob';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  // Authenticate
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const agentId = formData.get('agentId') as string | null;

    if (!file || !agentId) {
      return NextResponse.json(
        { error: 'Missing file or agentId' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Accepted: JPG, PNG, WebP.' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Max 5MB.' },
        { status: 400 }
      );
    }

    // Verify the user owns this agent profile
    const agents = await sql`
      SELECT id FROM agents WHERE id = ${agentId} AND user_id = ${session.user.id}
    `;
    if (agents.length === 0) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Upload to Vercel Blob
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `agents/${agentId}-${Date.now()}.${ext}`;

    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    // Update the headshot_url in the database
    await sql`
      UPDATE agents SET headshot_url = ${blob.url}, updated_at = now()
      WHERE id = ${agentId}
    `;

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Upload failed' },
      { status: 500 }
    );
  }
}
