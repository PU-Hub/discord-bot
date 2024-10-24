import {
  SlashCommandBuilder,
  ModalBuilder,
  ActionRowBuilder,
  EmbedBuilder,
} from '@discordjs/builders';
import { Command } from '@/class/command';
import { TextInputBuilder, TextInputStyle } from 'discord.js';
import { fButtonRow, withFeedbackButton } from '@/utils/feedback';

export const feedbackModals = {
  feedback: new ModalBuilder()
    .setTitle('意見回饋')
    .setCustomId('feedback:feedback')
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>()
        .addComponents(
          new TextInputBuilder()
            .setLabel('標題')
            .setCustomId('feedback:title')
            .setStyle(TextInputStyle.Short)
            .setRequired(true),
        ),
    )
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>()
        .addComponents(
          new TextInputBuilder()
            .setLabel('內容')
            .setCustomId('feedback:content')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true),
        ),
    ),
};

export default new Command(
  withFeedbackButton({
    builder: new SlashCommandBuilder()
      .setName('feedback')
      .setNameLocalization('zh-TW', '問題回饋')
      .setDescription('Report bug or give feedback')
      .setDescriptionLocalization('zh-TW', '提交問題回報或意見回饋'),
    async execute(interaction) {
      await interaction.showModal(feedbackModals.feedback);
    },
    async onModalSubmit(interaction) {
      await interaction.deferReply();

      const title = interaction.fields.getTextInputValue('feedback:title');
      const content = interaction.fields.getTextInputValue('feedback:content');

      const embed = new EmbedBuilder()
        .setDescription(
          '謝謝你的填寫，我們已經收到您的回饋',
        );

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
        components: [fButtonRow('feedback')],
        ephemeral: true,
      });
    },
  }),
);
