import { Events } from 'discord.js';
import { EventHandler } from '@/class/event';

export default new EventHandler({
  event: Events.InteractionCreate,

  async on(interaction) {
    if (!interaction.isButton()) return;
    const buttonId = interaction.customId;

    if (buttonId !== 'threadDelete') return;

    const thread = interaction.channel;
    if (!thread?.isThread()) return;
    if (interaction.user.id !== thread.ownerId) {
      await interaction.reply({ content: '你沒權限刪除此討論串', ephemeral: true });
      return;
    }
    await thread.delete();
  },
});
