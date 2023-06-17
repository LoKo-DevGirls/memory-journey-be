import { askChatGPT, createImage } from "../service";

export async function generateTags({ prompt }) {
  const answer = await askChatGPT({ prompt });

  const tags = answer
    .replace(/\./g, "")
    .split(", ")
    .filter((tag) => tag !== "");

  // tags array
  return tags;
}

export async function generateImageURL({ prompt }) {
  const imageUrl = await createImage({ prompt });

  // image url string
  return imageUrl;
}
