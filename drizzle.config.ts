import { defineConfig } from 'drizzle-kit';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined in .env');
}

export default defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/database/schema',
  dbCredentials: {
    url: connectionString,
  },
});
