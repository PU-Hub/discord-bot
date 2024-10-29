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

    await thread.setArchived(true);
    await interaction.reply({
      content: '討論串鎖定',
    });
  },
});
