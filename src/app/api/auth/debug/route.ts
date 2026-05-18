import { NextResponse } from 'next/server';
import pg from 'pg';

export async function GET() {
  const url = process.env.DATABASE_URL!.replace('-pooler.', '.');
  const pool = new pg.Pool({
    connectionString: url,
    options: '-c search_path=neon_auth,public',
    ssl: { rejectUnauthorized: false },
  });

  try {
    const result = await pool.query('SELECT id, email FROM "user" LIMIT 1');
    await pool.end();
    return NextResponse.json({
      ok: true,
      url_has_pooler: process.env.DATABASE_URL!.includes('-pooler'),
      unpooled_host: new URL(url).hostname,
      row: result.rows[0],
    });
  } catch (e) {
    await pool.end().catch(() => {});
    return NextResponse.json({
      ok: false,
      error: e instanceof Error ? e.message : String(e),
      stack: e instanceof Error ? e.stack : undefined,
    }, { status: 500 });
  }
}
