import { auth } from '@/lib/auth/server';
import { NextRequest, NextResponse } from 'next/server';

async function handleAuth(request: NextRequest) {
  try {
    const response = await auth.handler(request as unknown as Request);
    return response;
  } catch (e) {
    console.error('[AUTH ERROR]', e instanceof Error ? e.stack : e);
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
