import 'dotenv/config';

import { type } from 'arktype';

const schema = type({
  BOT_TOKEN: 'string',
  GOOGLE_TOKEN: 'string',
  DATABASE_URL: 'string',
});

const result = schema({
  BOT_TOKEN: process.env.BOT_TOKEN,
  GOOGLE_TOKEN: process.env.GOOGLE_TOKEN,
  DATABASE_URL: process.env.DATABASE_URL,
});

if (result instanceof type.errors) {
  throw new Error('Invalid environment variables');
}

export const env = result;
