import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function askChatGPT({ prompt }) {
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return completion.data.choices[0].message.content;
}

export async function createImage({ prompt, n = 1, size = "512x512" }) {
  const completion = await openai.createImage({
    prompt,
    n,
    size,
  });

  return completion.data.data[0].url;
}