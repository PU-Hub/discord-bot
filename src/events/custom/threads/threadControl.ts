import { Events } from 'discord.js';
import { EventHandler } from '@/class/event';

export default new EventHandler({
  event: Events.InteractionCreate,

  async on(interaction) {
    if (!interaction.isButton()) return;
    const buttonId = interaction.customId;

    if (buttonId !== 'threadLock') return;

    const thread = interaction.channel;
    if (!thread?.isThread()) return;

    await interaction.reply({
      content: '🔐 問題解決，已將討論串鎖定鎖定',
    });
    await thread.setLocked(true);
  },
});
