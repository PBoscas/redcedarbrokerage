import { betterAuth } from 'better-auth';
import { Pool } from '@neondatabase/serverless';

// Use unpooled connection for Better Auth (pooled connections don't support search_path option)
// Replace -pooler hostname with direct hostname
const unpooledUrl = process.env.DATABASE_URL!.replace('-pooler.', '.');

const pool = new Pool({
  connectionString: unpooledUrl,
  options: '-c search_path=neon_auth,public',
});

export const auth = betterAuth({
  basePath: '/api/auth',
  database: pool,
  emailAndPassword: {
    enabled: true,
  },
});
