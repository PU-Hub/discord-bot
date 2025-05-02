import { getGemini } from '@/api/gemini';
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
  MessageFlags,
} from 'discord.js';


export default new Command(
  withFeedbackButton({
    builder: new SlashCommandBuilder()
      .setName('gemini-test')
      .setNameLocalization('zh-TW', '對gemini發問')
      .setDescription('測試gemini').addStringOption( 
        new SlashCommandStringOption()
          .setName('question')
          .setNameLocalization('zh-TW', '問題')
          .setDescription('你想問的問題')
          .setRequired(true),
      ),

    async execute(interaction) {
      const question = interaction.options.getString('question', true);
      await interaction.deferReply({});

      try {
        
        const response = await getGemini(question);
        await interaction.editReply({ content: `**您的提問: ${question}**\n\n\`\`\`${response}\`\`\`\n\n-# 以下回答由Gemini提供，目前仍在測試階段，回答僅供參考` });
      } catch (error) {
        await interaction.editReply({ content: `發生錯誤: ${error}`});
      }
    },

    
  }),
);
