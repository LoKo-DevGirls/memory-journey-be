import * as express from "express";
import * as DB from "./db.js";
import { sendMemoryToProcessing } from "./webSocket.js";
import { generateImageURL, generateTags } from "./logics.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Server is running ⚡️");
});

router.get("/memory/all", async (req, res) => {
  try {
    const memories = await DB.getAllMemory({});
    return res.status(200).send(memories);
  } catch (dbError) {
    console.error("Error executing SELECT query:", dbError.message);
    return res.status(500).send("Something went wrong in DB");
  }
});

router.get("/memory", async (req, res) => {
  const { id, category } = req.query;

  if (id !== undefined) {
    // get one memory
    try {
      const memory = await DB.getMemory({ id });
      return res.status(200).send(memory);
    } catch (dbError) {
      console.error("Error executing SELECT query:", dbError.message);
      return res.status(500).send("Something went wrong in DB");
    }
  } else {
    try {
      const memories = await DB.getAllMemory({ category });
      return res.status(200).send(memories);
    } catch (dbError) {
      console.error("Error executing SELECT query:", dbError.message);
      return res.status(500).send("Something went wrong in DB");
    }
  }
});

router.post("/memory", async (req, res) => {
  const { content, consciousness, time, feeling } = req.body;

  if (!content) {
    return res.status(400).send("Missing content in body");
  }

  try {
    const [imageUrl, tags] = await Promise.all([
      generateImageURL({ memory: content }),
      generateTags({ memory: content }),
    ]);
    const memory = await DB.insertMemory({
      content,
      imageUrl,
      consciousness,
      time,
      feeling,
      tags,
    });

    try {
      sendMemoryToProcessing(memory);
      return res.status(200).send(memory);
    } catch (processingError) {
      return res.status(500).send("Error in websocket");
    }
  } catch (dbError) {
    return res.status(500).send("Error in DB");
  }
});

export default router;
