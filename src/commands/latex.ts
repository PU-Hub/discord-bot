import {
  AttachmentBuilder,
  Colors,
  EmbedBuilder,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from 'discord.js';
import { Command } from '@/class/command';
import { latexToImage } from '@/utils/latex';
import { fButtonRow, withFeedbackButton } from '@/utils/feedback';

import logger from '@/class/logger';

const inputOption = new SlashCommandStringOption()
  .setName('input')
  .setDescription('Accepts LaTex syntax and regular math operators.')
  .setRequired(true);

export default new Command(withFeedbackButton({
  builder: new SlashCommandBuilder()
    .setName('latex')
    .setDescription('Latex')
    .addStringOption(inputOption),
  async execute(interaction) {
    await interaction.deferReply();

    const input = interaction.options.getString('input', true);

    try {
      const image = await latexToImage(input);

      await interaction.editReply({
        files: [new AttachmentBuilder(image)],
        components: [fButtonRow('latex')],
      });
    }
    catch (error) {
      logger.error(`Failed to convert LaTex to Image`, input, error);
      await interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setColor(Colors.Red)
            .setDescription(
              '❌ 轉換圖片時發生錯誤，請確保你的語法正確並再試一次',
            ),
        ],
        components: [fButtonRow('latex')],
      });
    }
  },
}));
