import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const resturant = sqliteTable('resturant', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  location: text('location').notNull(),
});
