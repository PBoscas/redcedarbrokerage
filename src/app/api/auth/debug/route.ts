import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';

export async function GET(request: Request) {
  try {
    // Test the auth handler directly with a fake sign-in request
    const testUrl = new URL('/api/auth/sign-in/email', request.url);
    const testReq = new Request(testUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'debug@test.com', password: 'test' }),
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
