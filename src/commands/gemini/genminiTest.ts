import { Command } from '@/class/command';
import logger from '@/class/logger';
import { env } from '@/env';
import { withFeedbackButton } from '@/utils/feedback';
import { GoogleGenAI } from '@google/genai';
import {
  Message,
  SlashCommandBuilder,
  SlashCommandStringOption,
} from 'discord.js';

const ai = new GoogleGenAI({ apiKey: env.GOOGLE_TOKEN });

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
      const channel = interaction.channel;

      if (!channel) return;

      const _reply = (await interaction.deferReply({ withResponse: true })).resource?.message;
      const messages = [] as Message<true>[];

      if (_reply) {
        messages.push(_reply as Message<true>);
      }

      try {
        const stream = await ai.models.generateContentStream({
          model: 'gemini-2.0-flash-lite-001',
          contents: question,
        });

        let result = '';
        let sending = false;

        const update = async (force = false) => {
          logger.debug('update invoked');

          if (!force && (!result.length || sending)) {
            logger.debug(`skipping update - force: ${force}, length: ${result.length}, sending: ${sending}`);
            return;
          }

          logger.debug('should update');

          try {
            await channel.sendTyping();

            const index = Math.floor(result.length / 2000);
            const content = result.slice(2000 * index, 2000 * (index + 1));

            logger.debug(`index: ${index}`);
            logger.debug(`content: ${content}`);

            if (!messages[index]) {
              logger.debug('should update');

              sending = true;

              logger.debug('followup');
              const lastMessageContent = result.slice(2000 * (index - 1), 2000 * index);

              if (index == 0) {
                await interaction.editReply({ content: lastMessageContent });
              }
              else {
                await messages[index - 1].edit({ content: lastMessageContent });
              }
              messages[index] = await channel.send({ content });

              return;
            }

            sending = true;

            logger.debug('edit');

            if (index == 0) {
              await interaction.editReply({ content });
            }
            else {
              await messages[index].edit({ content });
            }
          }
          catch (e) {
            logger.debug('update errored');
            logger.error(`更新訊息時發生錯誤: ${e}`);
          }
          finally {
            sending = false;
            logger.debug('update finished');
          }
        };

        for await (const chunk of stream) {
          if (chunk.text) {
            result += chunk.text;
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (!sending) void update();
          }
        }

        await update(true);
      }
      catch (error) {
        logger.error(`發生錯誤: ${error}`);
      }
    },

  }),
);
