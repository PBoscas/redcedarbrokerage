import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || typeof body !== 'object') {
      return NextResponse.json(
        { error: 'Request body must be a JSON object of key-value settings.' },
        { status: 400 }
      );
    }

    // body is Record<string, unknown> — each key is a settings key, value is the setting value
    const entries = Object.entries(body);
    if (entries.length === 0) {
      return NextResponse.json(
        { error: 'No settings provided.' },
        { status: 400 }
      );
    }

    // Upsert each setting
    for (const [key, value] of entries) {
      await sql`
        INSERT INTO site_settings (key, value)
        VALUES (${key}, ${JSON.stringify(value)})
        ON CONFLICT (key) DO UPDATE SET value = ${JSON.stringify(value)}
      `;
    }

    return NextResponse.json({ success: true, updated: entries.length });
  } catch (error) {
    console.error('Settings save error:', error);
    return NextResponse.json(
      { error: 'Failed to save settings.' },
      { status: 500 }
    );
  }
}
