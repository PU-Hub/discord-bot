import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Colors,
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';

import type { CommandOptions } from '@/class/command';

export const fButtonRow = (command: string) =>
  new ActionRowBuilder<ButtonBuilder>()
    .addComponents(
      new ButtonBuilder()
        .setCustomId(`${command}:feedbackButton`)
        .setLabel('問題回報')
        .setStyle(ButtonStyle.Secondary),
    );

const fModal = (command: CommandOptions) =>
  new ModalBuilder()
    .setTitle('意見回饋')
    .setCustomId(`${command.builder.name}:commandFeedback`)
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>()
        .addComponents(
          new TextInputBuilder()
            .setLabel('標題')
            .setCustomId('commandFeedback:title')
            .setStyle(TextInputStyle.Short)
            .setRequired(true),
        ),
    )
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>()
        .addComponents(
          new TextInputBuilder()
            .setLabel('內容')
            .setCustomId('commandFeedback:content')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true),
        ),
    );

export const withFeedbackButton = (
  command: CommandOptions,
): CommandOptions => ({
  builder: command.builder,
  execute: command.execute,
  async onButton(interaction, id) {
    if (id == 'feedbackButton') {
      await interaction.showModal(fModal(command));
      return;
    }

    command.onButton?.call(this, interaction, id);
  },
  async onModalSubmit(interaction, id) {
    if (id == 'commandFeedback') {
      const title = interaction.fields.getTextInputValue(
        'commandFeedback:title',
      );
      const content = interaction.fields.getTextInputValue(
        'commandFeedback:content',
      );

      const embed = new EmbedBuilder()
        .setDescription('謝謝你的填寫，我們已經收到您的回饋')
        .setColor(Colors.Blue);

      const channel = this.channels.cache.get('1294160794031886427');
      if (!channel?.isSendable()) {
        return;
      }

      await channel.send({
        embeds: [
          new EmbedBuilder()
            .setAuthor({
              name: interaction.user.tag,
              iconURL: interaction.user.displayAvatarURL(),
            })
            .setTitle(title)
            .setDescription(content)
            .setTimestamp(),
        ],
      });

      await interaction.followUp({
        embeds: [embed],
        ephemeral: true,
      });
      return;
    }

    command.onModalSubmit?.call(this, interaction, id);
  },
});
