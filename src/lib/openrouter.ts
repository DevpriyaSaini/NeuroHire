import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

let client: OpenAI | null = null;

export function getOpenRouterClient(): OpenAI {
  if (client) return client;

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENROUTER_API_KEY is not set in environment variables");
  }

  client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey,
  });

  return client;
}

// Free OpenRouter models tend to get rate-limited or deprecated without notice.
// Try them in order and fall back to the next one instead of failing the whole request.
const FALLBACK_MODELS = [
  "google/gemma-4-31b-it:free",
  "google/gemma-4-26b-a4b-it:free",
  "minimax/minimax-m2.7:free",
  "z-ai/glm-5.2:free",
];

export const OPENROUTER_MODEL = FALLBACK_MODELS[0];

export async function createChatCompletion(messages: ChatCompletionMessageParam[]) {
  const openai = getOpenRouterClient();
  let lastError: unknown;

  for (const model of FALLBACK_MODELS) {
    try {
      return await openai.chat.completions.create({ model, messages });
    } catch (error) {
      lastError = error;
      console.error(`OpenRouter model ${model} failed, trying next fallback:`, error);
    }
  }

  throw lastError;
}
