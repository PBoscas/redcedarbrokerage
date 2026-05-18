import { betterAuth } from 'better-auth';
import { Pool } from '@neondatabase/serverless';

// Use a Pool so Better Auth's Kysely adapter can detect the "connect" method.
// Set search_path so it finds auth tables in the neon_auth schema.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  options: '-c search_path=neon_auth,public',
});

export const auth = betterAuth({
  basePath: '/api/auth',
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
});
