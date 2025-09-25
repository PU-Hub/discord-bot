import { GatewayIntentBits } from 'discord.js';

import { ExtendedClient } from '@/class/client';
import { env } from '@/env';

import type { ClientOptions } from 'discord.js';

const options = {
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
} satisfies ClientOptions;

const client = new ExtendedClient(options);

client.login(env.BOT_TOKEN)
  .catch((e: unknown) => {
    console.error(e);
  });
