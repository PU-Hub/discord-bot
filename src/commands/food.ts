import { bold, EmbedBuilder, SlashCommandBooleanOption, SlashCommandBuilder, SlashCommandStringOption } from '@discordjs/builders';
import { Command } from '@/class/command';
import { and, count, eq, inArray, type SQLWrapper } from 'drizzle-orm';
import { menu } from '@/database/schema';

const locationOption = new SlashCommandStringOption()
  .setName('location')
  .setNameLocalization('zh-TW', '地點')
  .setDescription('Location')
  .setDescriptionLocalization('zh-TW', '選擇菜單的地點')
  .setChoices(
    {
      name: '靜園',
      value: '靜園',
    },
    {
      name: '怡園',
      value: '怡園',
    },
    {
      name: '至善',
      value: '至善',
    },
    {
      name: '校外',
      value: '校外',
    },
  );

const veganOption = new SlashCommandBooleanOption()
  .setName('vegan')
  .setNameLocalization('zh-TW', '素')
  .setDescription('Vegetarian')
  .setDescriptionLocalization('zh-TW', 'true = 只挑選素食， false = 只挑選葷食，留空來混合葷素食');

export default new Command({
  builder: new SlashCommandBuilder()
    .setName('food')
    .setNameLocalization('zh-TW', '吃啥')
    .setDescription('Random a food')
    .setDescriptionLocalization('zh-TW', '不知道今天要吃什麼嗎？就讓我來挑吧')
    .addStringOption(locationOption)
    .addBooleanOption(veganOption),

  async execute(interaction) {
    await interaction.deferReply();

    const location = interaction.options.getString('location');
    const vegan = interaction.options.getBoolean('vegan');

    const restaurants = await this.database
      .query
      .resturant
      .findMany();

    const conditions: SQLWrapper[] = [];

    if (location) {
      const list = restaurants
        .filter((v) => v.location == location)
        .map((v) => v.id);

      conditions.push(inArray(menu.resturantId, list));
    }

    if (typeof vegan == 'boolean') {
      conditions.push(eq(menu.vegan, vegan));
    }

    const getRandomMenu = async () => {
      const restaurant = restaurants[Math.floor(Math.random() * restaurants.length)];

      conditions.push(eq(menu.resturantId, restaurant.id));

      const items = await this.database.query.menu.findMany({
        where: and(...conditions),
      });

      const item = items[Math.floor(Math.random() * items.length)];
      return [restaurant, item] as [typeof restaurant, typeof item];
    };

    let item;
    let restaurant;
    let tries = 0;

    while (!item || !restaurant) {
      [restaurant, item] = await getRandomMenu();
      tries++;
    }

    const menuCount = await this.database
      .select({
        count: count(),
      })
      .from(menu)
      .where(eq(menu.resturantId, restaurant.id));

    const embed = new EmbedBuilder()
      .setDescription(`今天吃 ${bold(restaurant.name)} 的 ${bold(item.name)}`)
      .setFields(
        {
          name: '餐廳',
          value: `${restaurant.name} (${menuCount[0].count})`,
          inline: true,
        },
        {
          name: '地點',
          value: restaurant.location,
          inline: true,
        },
        {
          name: '價格',
          value: `${item.price}`,
          inline: true,
        })
      .setImage(item.imageUrl)
      .setTimestamp()
      .setFooter({ text: `Tried ${tries} time${tries > 1 ? 's' : ''}` });

    await interaction.editReply({
      embeds: [embed],
    });
  },
});
