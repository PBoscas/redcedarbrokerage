import { auth } from '@/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('[AUTH GET]', request.url, request.method);
  try {
    return await auth.handler(request as unknown as Request);
  } catch (e) {
    console.error('[AUTH ERROR]', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  console.log('[AUTH POST]', request.url, request.method);
  try {
    return await auth.handler(request as unknown as Request);
  } catch (e) {
    console.error('[AUTH ERROR]', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
