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

export async function analysisSentiments({ memory }) {
  const prompt = `There are 9 categories of feelings or emotions that are associated with different forms of art and expression. Each category is associated with a particular type of art or literature. For example, Calliope is associated with epic poetry and embodies grand and elevated emotions such as passion and awe, while Clio is associated with historical literature and represents reverence, serenity, and purity. Similarly, Euterpe is associated with music and represents elation, joy, and passionate love, while Melpomene is associated with tragedy and represents sadness, mourning, and longing. Each category is associated with a unique set of emotions, providing a rich vocabulary for understanding and expressing different human experiences.
  Calculate how much this memory is related to each category from 0 to 1, 1 is strongly related and 0 is the opposite and the sum of all should be 1, and make the output in the format of \`{ [category]: number }\`: \n"${memory}"\n`;
  const answer = await askChatGPT({ prompt });

  const regex = /{([\s\S]+)}/;
  const match = answer.match(regex);

  if (match) {
    const innerText = match[1];
    const keyValuePairs = innerText.split(",");

    const sentimentObject = {};
    keyValuePairs.forEach((pair) => {
      const [key, value] = pair
        .split(":")
        .map((str) => str.trim().replace(/"/g, ""));
      sentimentObject[key] = parseFloat(value);
    });

    return sentimentObject;
  } else {
    throw new Error("GPT result is not really good, try again.");
  }
}