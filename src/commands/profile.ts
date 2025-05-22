import { SlashCommandBuilder } from '@discordjs/builders';
import { ActionRowBuilder, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';
import { Command } from '@/class/command';
import { askGemini } from '@/api/gemini/ask';

export default new Command(
  {
    builder: new SlashCommandBuilder()
      .setName('profile')
      .setDescription('Provide your profile to the bot'),
    async execute(interaction) {
      const modal = new ModalBuilder()
        .setCustomId('profile:create')
        .setTitle('Profile');

      const yearInput = new TextInputBuilder()
        .setCustomId('year')
        .setLabel('Year')
        .setStyle(TextInputStyle.Short);

      const heightInput = new TextInputBuilder()
        .setCustomId('height')
        .setLabel('Height')
        .setStyle(TextInputStyle.Short);

      const weightInput = new TextInputBuilder()
        .setCustomId('weight')
        .setLabel('Weight')
        .setStyle(TextInputStyle.Short);

      const genderInput = new TextInputBuilder()
        .setCustomId('gender')
        .setLabel('Gender')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('請選擇: 生理男/生理女');

      const foodInput = new TextInputBuilder()
        .setCustomId('food')
        .setLabel('食物禁忌')
        .setStyle(TextInputStyle.Short)
        .setPlaceholder('例如：海鮮、花生等');

      const yearRow = new ActionRowBuilder<TextInputBuilder>().addComponents(yearInput);
      const heightRow = new ActionRowBuilder<TextInputBuilder>().addComponents(heightInput);
      const weightRow = new ActionRowBuilder<TextInputBuilder>().addComponents(weightInput);
      const genderRow = new ActionRowBuilder<TextInputBuilder>().addComponents(genderInput);
      const foodRow = new ActionRowBuilder<TextInputBuilder>().addComponents(foodInput);
      modal.addComponents(yearRow, heightRow, weightRow, genderRow, foodRow);

      await interaction.showModal(modal);
    },
    async onModalSubmit(interaction, modalId) {
      if (modalId !== 'create') return;

      const year = interaction.fields.getTextInputValue('year');
      const height = interaction.fields.getTextInputValue('height');
      const weight = interaction.fields.getTextInputValue('weight');
      const gender = interaction.fields.getTextInputValue('gender');
      const food = interaction.fields.getTextInputValue('food');

      if (gender !== '生理男' && gender !== '生理女') {
        await interaction.reply({
          content: '性別只能選擇生理男或生理女',
          ephemeral: true,
        });
        return;
      }

      if (year === '' || height === '' || weight === '' || Number.isNaN(Number(year)) || Number.isNaN(Number(height)) || Number.isNaN(Number(weight))) {
        await interaction.reply({
          content: '請輸入正確的年齡、身高和體重',
          ephemeral: true,
        });
        return;
      }

      const user = interaction.user;

      await interaction.reply({
        content: `${user.displayName}的個人資料`,
        embeds: [
          new EmbedBuilder()
            .setThumbnail(user.avatarURL() ?? '')
            .setColor('Random')
            .setDescription('以下為您的資料，請確認無誤後再按下確認鈕')
            .addFields(
              { name: '😎 年齡', value: year, inline: true },
              { name: '👩‍🦳 身高', value: height, inline: true },
              { name: '💪 體重', value: weight, inline: true },
              { name: '🚻 性別', value: gender, inline: true },
              { name: '🍴 食物禁忌', value: food, inline: true },
            ),
        ],
      });

      const suggestion = await askGemini(`
        以下是${user.displayName}的個人資料：
        年齡：${year}
        身高：${height}
        體重：${weight}
        性別：${gender}
      `, '你是一位營養師，現在有一個使用者想要了解自己的健康飲食，請你依照使用者的個人資料，提供一個健康飲食的建議');

      await interaction.editReply({
        content: suggestion[0],
        embeds: [
          new EmbedBuilder()
            .setThumbnail(user.avatarURL() ?? '')
            .setColor('Random')
            .setDescription(`${user.displayName}的個人檔案`)
            .addFields(
              { name: '😎 年齡', value: year, inline: true },
              { name: '👩‍🦳 身高', value: height, inline: true },
              { name: '💪 體重', value: weight, inline: true },
              { name: '🚻 性別', value: gender, inline: true },
              { name: '🍴 食物禁忌', value: food, inline: true },
            ),
        ],
      });
    },
  },
);
