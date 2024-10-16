import { Command } from '@/class/command';
import { fButtonRow, withFeedbackButton } from '@/utils/feedback';
import {
  ModalBuilder,
  SlashCommandBuilder,
  SlashCommandStringOption,
  ActionRowBuilder,
  TextInputBuilder,
  TextInputStyle,
  EmbedBuilder,
  Colors,
} from 'discord.js';

let qType = '';

const askModals = {
  ask: new ModalBuilder()
    .setTitle('提問')
    .setCustomId('ask:ask')
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>()
        .addComponents(
          new TextInputBuilder()
            .setLabel('問題概述')
            .setCustomId('ask:title')
            .setStyle(TextInputStyle.Short)
            .setRequired(true),
        ),
    )
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>()
        .addComponents(
          new TextInputBuilder()
            .setLabel('詳細說明問題')
            .setCustomId('ask:content')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true),
        ),
    ),
};

export default new Command(
  withFeedbackButton({
    builder: new SlashCommandBuilder()
      .setName('ask')
      .setNameLocalization('zh-TW', '發問')
      .setDescription('遇到問題？由機器人來幫你提問')
      .addStringOption(
        new SlashCommandStringOption()
          .setName('type')
          .setNameLocalization('zh-TW', '問題類別')
          .setDescription('關你你想發問的題目類型')
          .addChoices(
            {
              name  : '關於學校',
              value : 'school',
            },
            {
              name  : '關於課業',
              value : 'class',
            },
            {
              name  : '其他',
              value : 'other',
            },
          )
          .setRequired(true),
      ),

    defer     : true,
    ephemeral : true,
    async execute(interaction) {
      qType = interaction.options.getString('type', true);
      await interaction.showModal(askModals.ask);
    },

    async onModalSubmit(interaction) {
      const title = interaction.fields.getTextInputValue('ask:title');
      const embed = new EmbedBuilder()
        .setTitle(`已經建立新的問題討論站了!`)
        .setDescription(`- 問題： ${title}\n- 類型: ${qType}`)
        .setColor(Colors.DarkGreen);

      await interaction.followUp({
        embeds     : [embed],
        components : [fButtonRow('ask')],
        ephemeral  : true,
      });
    },
  }),
);
