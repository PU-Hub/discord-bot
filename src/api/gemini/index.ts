import type { GeminiResponse } from './interface';

export const getGemini = async (text: string) => {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
    method: 'POST',
    body: JSON.stringify({ contents: [{
      parts: [{ text: text }],
    }] }),
  });

  if (!res.ok) {
    throw new Error('[GeminiAPI]Failed to fetch response text, status: ' + res.status);
  }

  const data = await res.json() as GeminiResponse;
  // console.log(data);
  return data.candidates[0].content.parts[0].text;
};

// getGemini("開放性較高的人").then(console.log);
