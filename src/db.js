import { Client, APIErrorCode, LogLevel } from "@notionhq/client";
import dotenv from "dotenv";
dotenv.config();

const notion = new Client({
  auth: process.env.NOTION_KEY,
  logLevel: LogLevel.DEBUG,
});

const memoryDBId = process.env.NOTION_DATABASE_ID_MEMORY;
const sentimentDBId = process.env.NOTION_DATABASE_ID_SENTIMENT;

export async function addMemory(text) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: memoryDBId },
      properties: {
        title: {
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    if (isNotionClientError(error)) {
      // error is now strongly typed to NotionClientError
      switch (error.code) {
        case ClientErrorCode.RequestTimeout:
          // ...
          break;
        case APIErrorCode.ObjectNotFound:
          // ...
          break;
        case APIErrorCode.Unauthorized:
          // ...
          break;
        // ...
        default:
          // you could even take advantage of exhaustiveness checking
          assertNever(error.code);
      }
    } else {
      console.log(error);
    }
  }
}

export async function getDB({ type }) {
  // type should be either "memory" or "sentiment"
  const dbId = type === "memory" ? memoryDBId : sentimentDBId;
  const response = await notion.databases.retrieve({ database_id: dbId });
  console.log(response);
  return response;
}

// export async function
