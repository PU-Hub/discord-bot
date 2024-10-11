import { Events } from 'discord.js';
import { EventHandler } from '@/class/event';

import logger from '@/class/logger';

export default new EventHandler({
  event: Events.ClientReady,
  async on(client) {
    logger.info(`Logged in as ${client.user.tag}`);
    await this.updateCommands();
  },
});
