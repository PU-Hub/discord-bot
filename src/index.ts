import 'dotenv/config';
import { ExtendedClient } from '@/class/client';
import { GatewayIntentBits } from 'discord.js';

import type { ClientOptions } from 'discord.js';

const options = {
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
} satisfies ClientOptions;

const client = new ExtendedClient(options);

client.login(process.env.TOKEN)
  .catch((e: unknown) => {
    console.error(e);
  });
