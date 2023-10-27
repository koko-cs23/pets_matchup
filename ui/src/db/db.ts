import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from './schema/schema.js';

const sql = postgres(process.env.DATABASE_URL!, {
  max: 1
});
const db = drizzle(sql, { schema });

export { db };