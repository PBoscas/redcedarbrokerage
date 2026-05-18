import { betterAuth } from 'better-auth';
import { Pool } from '@neondatabase/serverless';

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
