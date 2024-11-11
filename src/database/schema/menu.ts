import { boolean, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { resturant } from './resturant';

export const menu = pgTable('menu', {
  resturantId: text('resturantId').references(() => resturant.id).notNull(),
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  note: text('note').notNull(),
  tags: text('tags').array().notNull(),
  description: text('description').notNull(),
  imageUrl: text('imageUrl'),
  price: integer('price'),
  vegan: boolean('vegan').default(false),
});
