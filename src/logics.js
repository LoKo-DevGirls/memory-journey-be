import { askChatGPT, createImage } from "../service";

export async function generateTags({ memory }) {
  const prompt = `Generate at most 10 one word tags that explain this memory the most, if the memory is too short, you can make only one tag.: \n"${memory}"\n`;
  const answer = await askChatGPT({ prompt });

  const tags = answer
    .replace(/\./g, "")
    .split(", ")
    .filter((tag) => tag !== "");

  // tags array
  return tags;
}

export async function generateImageURL({ memory }) {
  const prompt = `Generate an image that explains this memory the most: \n"${memory}"\n`;
  const imageUrl = await createImage({ prompt });

  // image url string
  return imageUrl;
}

