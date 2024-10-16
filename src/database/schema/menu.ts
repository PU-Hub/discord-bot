import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { resturant } from './resturant';

export const menu = sqliteTable('menu', {
  resturantId: text('resturant')
    .references(() => resturant.id),
  id: text('id')
    .primaryKey(),
  name: text('name')
    .notNull(),
  description: text('description')
    .notNull(),
  imageUrl    : text('imageUrl'),
  price       : integer('price'),
  recommended : integer('recommended', { mode: 'boolean' })
    .default(false),
});
