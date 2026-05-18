import { auth } from '@/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

async function handleAuth(request: NextRequest) {
  try {
    // Convert NextRequest to a standard Request for Better Auth compatibility
    const standardRequest = new Request(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      // @ts-expect-error duplex is needed for streaming body
      duplex: 'half',
    });

    const response = await auth.handler(standardRequest);

    if (response.status >= 500) {
      const body = await response.clone().text();
      console.error('[AUTH ERROR]', response.status, request.nextUrl.pathname, body || '(empty body)');
    }

    return response;
  } catch (e) {
    console.error('[AUTH CRASH]', e instanceof Error ? e.stack : e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return handleAuth(request);
}

export async function POST(request: NextRequest) {
  return handleAuth(request);
}
