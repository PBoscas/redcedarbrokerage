import { NextRequest, NextResponse } from 'next/server';
import { syncAll, syncActiveListings, syncClosedListings } from '@/lib/mls/sync';

export const maxDuration = 300; // 5 min for Vercel

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const expectedKey = process.env.MLS_SYNC_API_KEY;

  // Require API key in production
  if (expectedKey && authHeader !== `Bearer ${expectedKey}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const type = searchParams.get('type') || 'all';

  try {
    let result;
    switch (type) {
      case 'active':
        result = await syncActiveListings();
        break;
      case 'closed':
        result = await syncClosedListings();
        break;
      default:
        result = await syncAll();
    }

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error('MLS sync error:', error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Also support GET for cron services (Vercel Cron, etc.)
export async function GET(request: NextRequest) {
  return POST(request);
}
