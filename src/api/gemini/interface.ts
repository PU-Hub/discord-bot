export interface GeminiResponse {
  candidates: 
    {
      content: {
        parts:{
          text: string,
        }[],
      },
      finishReason: string,
      citationMetadata: string,
      avgLogprobs: number,
    }[],
  usageMetadata: {
  usageMetadata: {
    promptTokenCount: number,
    candidatesTokenCount: number,
    totalTokenCount: number,
    // unknow type
    promptTokensDetails: string[],
    //unknown type
    candidatesTokensDetails: string[],
  },
  modelVersion: "gemini-2.0-flash",
}}


