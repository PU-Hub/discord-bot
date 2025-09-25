import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors, EmbedBuilder, Events, GuildMember, inlineCode, unorderedList } from 'discord.js';

import { EventHandler } from '@/class/event';

import type { AnyThreadChannel } from 'discord.js';

const embedBuilder = (thread: AnyThreadChannel, owner: GuildMember, firstMessage: string | undefined) => new EmbedBuilder()
  .setColor(Colors.Blue)
  .setTitle(thread.name)
  .setDescription(unorderedList([
    `id: ${inlineCode(thread.id)}`,
    `問題描述: ${firstMessage}`,
    '你現在可以在這裡發問與回答問題了！',
    '數學運算可以用 </latex:1295941649154965535> 來表示',
  ]))
  .setTimestamp()
  .setFooter({
    text: `本討論串由 ${owner.displayName} 建立`,
    iconURL: owner.avatarURL() ?? undefined,
  });

const threadLockActionRow = () => new ActionRowBuilder<ButtonBuilder>()
  .addComponents(new ButtonBuilder()
    .setCustomId('threadLock')
    .setLabel('已解決')
    .setEmoji('✅')
    .setStyle(ButtonStyle.Success));

const threadDeleteActionRow = () => new ActionRowBuilder<ButtonBuilder>()
  .addComponents(new ButtonBuilder()
    .setCustomId('threadDelete')
    .setLabel('刪除此討論串')
    .setEmoji('🚮')
    .setStyle(ButtonStyle.Danger));

export default new EventHandler({
  event: Events.ThreadCreate,

  async on(thread) {
    if (!thread.ownerId) return;
    const owner = await thread.guild.members.fetch({
      user: thread.ownerId,
      force: true,
    });
    const firstMessage = await thread.fetchStarterMessage();

    await thread.send({
      embeds: [embedBuilder(thread, owner, firstMessage?.content)],
      components: [threadLockActionRow(), threadDeleteActionRow()],
    });
  },

});
