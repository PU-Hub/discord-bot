import { pgTable, text } from 'drizzle-orm/pg-core';

export const resturant = pgTable('resturant', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  location: text('location').notNull(),
});
