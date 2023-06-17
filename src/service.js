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

  console.log("asked: ", prompt);
  console.log("answered: ", completion.data.choices[0].message.content);

  return completion.data.choices[0].message.content;
}

export async function createImage({ prompt, n = 1, size = "512x512" }) {
  const completion = await openai.createImage({
    prompt,
    n,
    size,
  });

  console.log("prompt: ", prompt);
  console.log("image url: ", completion.data.data[0].url);

  return completion.data.data[0].url;
}