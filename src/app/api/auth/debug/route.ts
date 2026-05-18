import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';

export async function GET(request: Request) {
  try {
    // Test with real credentials
    const testUrl = new URL('/api/auth/sign-in/email', request.url);
    const testReq = new Request(testUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'peter@redcedarre.com', password: 'RedCedar2026!' }),
    });

    const response = await auth.handler(testReq);
    const body = await response.text();

    return NextResponse.json({
      status: response.status,
      body: body || '(empty)',
      headers: Object.fromEntries(response.headers.entries()),
    });
  } catch (e) {
    return NextResponse.json({
      error: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
    }, { status: 500 });
  }
}
