import * as express from "express";
import * as DB from "./db.js";
import { sendMemoryToProcessing } from "./webSocket.js";
import { generateImageURL, generateTags } from "./logics.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Server is running ⚡️");
});

router.get("/memory", async (req, res) => {
  const { id } = req.query;

  if (id !== undefined) { // get one memory
    try {
      const memory = await DB.getMemory({ id });
      return res.status(200).send(memory);
    } catch (dbError) {
      console.error('Error executing SELECT query:', dbError.message);
      return res.status(500).send("Something went wrong in DB");
    }
  } else {
    try {
      const memories = await DB.getAllMemory();
      return res.status(200).send(memories);
    } catch (dbError) {
      console.error('Error executing SELECT query:', dbError.message);
      return res.status(500).send("Something went wrong in DB");
    }
  }
})

router.get("/tags", async (req, res) => {
  try {
    const tags = await DB.getTagList();
    return res.status(200).send(tags);
  } catch (dbError) {
    console.error('Error executing SELECT query:', dbError.message);
    return res.status(500).send("Something went wrong in DB");
  }
})

router.post("/memory", async (req, res) => {
  const { content, consciousness, time, feeling } = req.body;

  if (!content) {
    return res.status(400).send("Missing content in body");
  }

  // const [imageURL, tags] = await Promise.all([
  //   generateImageURL({ memory: content }),
  //   generateTags({ memory: content }),
  // ]);
  // Tags 는 chatGPT가 생성함
  const tags = await generateTags({ memory: content });
  const imageUrl = ""; // 이미지는 일단 사용 X

  try {
    const memory = await DB.insertMemory({
      content,
      imageUrl,
      consciousness,
      time,
      feeling,
      tags,
    });

    // processing 열면 아래 코드 사용
    // try {
    //   sendMemoryToProcessing(memory);
    //   return res.status(200).send(memory);
    // } catch (processingError) {
    //   return res.status(500).send("Error in websocket");
    // }
    return res.status(200).send(memory);
  } catch (dbError) {
    return res.status(500).send("Error in DB");
  }
});

router.put("/memory/:id", async (req, res) => {
  const memoryId = req.params.id;
  const { content, consciousness, time, feeling, tags } = req.body;

  if(memoryId !== undefined && memoryId > 0) {
    try {
      const imageUrl = await generateImageURL({ memory: content });

      const updateFields = {};
      // 업데이트할 필드를 검증하고 추가하는 함수
      const addToUpdateFields = (field, value) => {
        if (value !== undefined) {
          updateFields[field] = value;
        }
      };

      // 각 필드에 대해 검증 및 추가
      addToUpdateFields('imageUrl', imageUrl);
      addToUpdateFields('content', content);
      addToUpdateFields('consciousness', consciousness);
      addToUpdateFields('time', time);
      addToUpdateFields('feeling', feeling);
      addToUpdateFields('tags', tags);

      const memory = await DB.updateMemory(memoryId, updateFields);

    } catch (dbError) {
      return res.status(500).send("Error in DB");
    }
  }
});

router.delete("/memory/:id", async (req, res) => {
  const memoryId = req.params.id;

  try {
    const memory = await DB.deleteMemory(memoryId);
    return res.status(200).send(memory);
  } catch (dbError) {
    console.error('Error executing DELETE query:', dbError.message);
    return res.status(500).send("Something went wrong in DB");
  }
});

export default router;
