import {
  AttachmentBuilder,
  Colors,
  EmbedBuilder,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from 'discord.js';
import { Command } from '@/class/command';
import { withFeedbackButton } from '@/utils/feedback';

interface LatexResponse {
  imageUrl: string;
  error: unknown;
}

const inputOption = new SlashCommandStringOption()
  .setName('input')
  .setDescription('Accepts LaTex syntax and regular math operators.')
  .setRequired(true);

export default new Command(
  withFeedbackButton({
    builder: new SlashCommandBuilder()
      .setName('latex')
      .setDescription('Latex')
      .addStringOption(inputOption),
    ephemeral: false,
    defer: true,
    async execute(interaction) {
      const input = interaction.options.getString('input', true);

      const body = {
        latexInput: `\\begin{align*}\n${input}\n\\end{align*}\n`,
        outputFormat: 'PNG',
        outputScale: '125%',
      };

      const response = await fetch(
        'https://e1kf0882p7.execute-api.us-east-1.amazonaws.com/default/latex2image',
        {
          method: 'POST',
          body: JSON.stringify(body),
        },
      );

      if (!response.ok) {
        await interaction.editReply({
          embeds: [
            new EmbedBuilder()
              .setColor(Colors.Red)
              .setDescription(
                '❌ 轉換圖片時發生錯誤，請確保你的語法正確並再試一次',
              ),
          ],
        });
        return;
      }

      const data = (await response.json()) as LatexResponse;

      await interaction.editReply({
        files: [new AttachmentBuilder(data.imageUrl)],
      });
    },
  }),
);
