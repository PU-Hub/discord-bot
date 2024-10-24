import { EmbedBuilder, SlashCommandBuilder } from '@discordjs/builders';
import { Command } from '@/class/command';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const buildFoodEmbed = (food: Shop) => {
  const a = food.shopMenu[Math.floor(Math.random() * food.shopMenu.length)];
  return new EmbedBuilder()
    .setTitle(`你抽到了${food.shopName} 的 ${a.foodName}`)
    .setTimestamp()
    .setImage('https://blog.thebeefguy.com.hk/wp-content/uploads/2020/10/thebeefguy_photo1.png.webp')
    .setDescription(`- shop: ${food.shopName}\n- food: ${a.foodName}\n- price: ${a.foodPrice}`)
    .setFooter({ text: 'PU hub' });
};

export default new Command({
  builder: new SlashCommandBuilder()
    .setName('food')
    .setNameLocalization('zh-TW', '吃啥')
    .setDescription('Random a food')
    .setDescriptionLocalization('zh-TW', '不知道今天要吃什麼嗎？就讓我來挑吧'),

  async execute(interaction) {
    // TODO: food command
    await interaction.deferReply();
    const shop = JSON.parse(readFileSync(resolve(this.cacheFolderPath, 'food', 'jiungyuan.json'), 'utf-8')) as FoodShop;
    const randomResult = shop.shop[Math.floor(Math.random() * shop.shop.length)];

    await interaction.editReply({
      embeds: [buildFoodEmbed(randomResult)],
    });
  },
});

interface FoodShop {
  location: string;
  shop: Shop[];
}

interface Shop {
  shopName: string;
  shopMenu: {
    foodName: string;
    foodPrice: number;
  }[];
  openTime: string;
};
