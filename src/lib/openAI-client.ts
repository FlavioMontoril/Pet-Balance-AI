import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY não definida");
}

export const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 60 * 1000,
  logLevel: "error",
});
