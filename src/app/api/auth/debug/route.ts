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
    // Check the actual password hash stored
    const accountResult = await pool.query(
      `SELECT a.password, a."providerId", a."accountId", length(a.password) as pw_len
       FROM account a JOIN "user" u ON a."userId" = u.id
       WHERE u.email = $1 AND a."providerId" = 'credential'`,
      ['peter@redcedarre.com']
    );

    // Test scrypt verification
    const { scrypt } = require('crypto');
    const hash = accountResult.rows[0]?.password;
    const [salt, key] = hash ? hash.split(':') : [null, null];

    let verifyResult = 'no hash found';
    if (salt && key) {
      verifyResult = await new Promise((resolve) => {
        scrypt('RedCedar2026!'.normalize('NFKC'), salt, 64, {
          N: 16384, r: 16, p: 1,
          maxmem: 128 * 16384 * 16 * 2
        }, (err: Error | null, derivedKey: Buffer) => {
          if (err) resolve(`scrypt error: ${err.message}`);
          else resolve(derivedKey.toString('hex') === key ? 'MATCH' : 'MISMATCH');
        });
      });
    }

    await pool.end();
    return NextResponse.json({
      account: accountResult.rows[0],
      salt_length: salt?.length,
      key_length: key?.length,
      verify: verifyResult,
    });
  } catch (e) {
    await pool.end().catch(() => {});
    return NextResponse.json({
      error: e instanceof Error ? e.message : String(e),
    }, { status: 500 });
  }
}
