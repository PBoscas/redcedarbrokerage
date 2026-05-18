import { auth } from '@/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

async function handleAuth(request: NextRequest) {
  try {
    const response = await auth.handler(request as unknown as Request);

    // If Better Auth returns a 500, re-create the response with the error visible
    if (response.status >= 500) {
      const body = await response.clone().text();
      console.error('[AUTH ERROR]', response.status, request.nextUrl.pathname, body || '(empty body)');
      return NextResponse.json(
        { error: body || 'Internal auth error', status: response.status },
        { status: response.status }
      );
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
