import { pgTableCreator } from 'drizzle-orm/pg-core';

const createTable = pgTableCreator((name) => `puhub_${name}`);

export const menu = createTable('menu', ({ boolean, integer, text }) => ({
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
}));

export const resturant = createTable('resturant', ({ text }) => ({
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  location: text('location').notNull(),
}));
