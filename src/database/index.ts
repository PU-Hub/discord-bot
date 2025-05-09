import postgres from 'postgres';
import * as schema from './schema';

import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '@/env';

export const client = postgres(env.DATABASE_URL, { prepare: false });
export default drizzle(client, { schema });
