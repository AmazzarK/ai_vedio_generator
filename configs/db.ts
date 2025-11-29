import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const databaseUrl = process.env.NEON_PUBLIC_DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'NEON_PUBLIC_DATABASE_URL is not defined. Please add it to your .env.local file.'
  );
}

const sql = neon(databaseUrl);

export const db = drizzle({ client: sql });
