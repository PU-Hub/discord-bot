import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';

import * as schema from './schema';

const dbPath = process.env.DATABASE_URL;
const db = new Database(dbPath, { create: true, strict: true });

export default drizzle(db, { schema });
