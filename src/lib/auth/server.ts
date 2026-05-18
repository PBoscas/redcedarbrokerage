import { betterAuth } from 'better-auth';
import pg from 'pg';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!.replace('-pooler.', '.'),
  options: '-c search_path=neon_auth,public',
  ssl: { rejectUnauthorized: false },
});

export const auth = betterAuth({
  basePath: '/api/auth',
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    database: {
      generateId: 'uuid',
    },
  },
});
