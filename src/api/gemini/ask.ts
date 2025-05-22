import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from '@google/genai';
import { env } from '@/env';
import logger from '@/class/logger';

export const askGemini = async (question: string, request: string) => {
  const ai = new GoogleGenAI({ apiKey: env.GOOGLE_TOKEN });

  const tools = [
    { googleSearch: {} },
  ];

  const config = {
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE, // Block most
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE, // Block most
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE, // Block most
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE, // Block most
      },
    ],
    tools,
    responseMimeType: 'text/plain',
    systemInstruction: [
      {
        text: request,
      },
    ],
  };

  // ask
  try {
    const stream = await ai.models.generateContentStream({
      model: 'gemini-2.0-flash-lite-001',
      config,
      contents: question,
    });

    let result = '';

    let currentChunk = '';
    const results = [];

    for await (const chunk of stream) {
      if (chunk.text) {
        currentChunk += chunk.text;
        if (currentChunk.length >= 2000) {
          results.push(currentChunk.slice(0, 2000));
          currentChunk = currentChunk.slice(2000);
        }
      }
    }

    if (currentChunk.length > 0) {
      results.push(currentChunk);
    }
    result = results.join('');

    return result;
  }
  catch (error) {
    logger.error(`發生錯誤: ${error}`);
    return `發生錯誤: ${error}`;
  }
};
