import { SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '@/class/command';

export default new Command({
  builder: new SlashCommandBuilder()
    .setName('food')
    .setNameLocalization('zh-TW', '吃啥')
    .setDescription('Random a food')
    .setDescriptionLocalization('zh-TW', '不知道今天要吃什麼嗎？就讓我來挑吧'),
  defer: true,
  ephemeral: true,
  async execute(interaction) {},
});
