import { EmbedBuilder, SlashCommandBuilder } from '@discordjs/builders';
import { Colors } from 'discord.js';
import { Command } from '@/class/command';
import { fButtonRow, withFeedbackButton } from '@/utils/feedback';
import { stripIndent } from 'common-tags';
export default new Command(
  withFeedbackButton({
    builder: new SlashCommandBuilder()
      .setName('nutrition')
      .setDescription('上傳圖片獲得營養資訊')
      .addAttachmentOption((option) =>
        option
          .setName('input')
          .setDescription('圖片')
          .setRequired(true),
      ),
    async execute(interaction) {
      await interaction.deferReply();

      const input = interaction.options.getAttachment('input', true);

      const contentType = input.contentType ?? '';
      if (['image/png', 'image/jpeg'].includes(contentType)) {
        const embed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setDescription('❌ 檔案必須是 JPEG 或 PNG 圖片檔');
        await interaction.editReply({ embeds: [embed] });
      };

      const fileSize = input.size;
      if (fileSize > (10 << 20)) {
        const embed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setDescription('❌ 檔案必須小於 10 MB');
        await interaction.editReply({ embeds: [embed] });
      };

      let buffer: ArrayBuffer | null = null;

      fetchImage: {
        const res = await fetch(input.url);
        if (!res.ok) break fetchImage;
        buffer = await res.arrayBuffer();
      }

      if (!buffer) {
        const embed = new EmbedBuilder()
          .setColor(Colors.Red)
          .setDescription('❌ 抓取檔案時發生問題');

        await interaction.editReply({ embeds: [embed] });
        return;
      }

      // TODO: YOLO image recognization
      const result = {
        calories: 0,
        protein: 0,
        totalFat: 0,
        saturatedFat: 0,
        transFat: 0,
        totalCarbohydrate: 0,
        sugar: 0,
        sodium: 0,
      };

      const embed = new EmbedBuilder()
        .setDescription(stripIndent`
          **卡路里**： ${result.calories} 大卡
          **蛋白質**：${result.protein} 公克
          **脂肪**：${result.totalFat} 公克
          - **飽和脂肪**：${result.saturatedFat} 公克
          - **反式脂肪**：${result.transFat} 公克
          **碳水化合物**：${result.totalCarbohydrate} 公克
          - **糖**：${result.sugar} 公克
          **鈉**：${result.sodium} 毫克
        `)
        .setFooter({
          text: '此為圖片辨識後分析的結果，無法代表真實的營養成分。',
        });

      await interaction.editReply({
        embeds: [embed],
        components: [fButtonRow('nutrition')],
      });
    },
  }),
);
