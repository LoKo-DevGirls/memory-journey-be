import * as express from "express";
import * as DB from "./db.js";
import { sendMemoryToProcessing } from "./webSocket.js";
import { generateImageURL } from "./logics.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Server is running ⚡️");
});

router.post("/memory", async (req, res) => {
  const { content, category, consciousness, time, feeling } = req.body;

  if (!content) {
    return res.status(400).send("Missing content in body");
  }

  try {
    const imageUrl = await generateImageURL({ memory: content });
    const memory = await DB.insertMemory({
      content,
      category,
      imageUrl,
      consciousness,
      time,
      feeling,
    });
    try {
      sendMemoryToProcessing(memory);
      return res.status(200).send(memory);
    } catch (processingError) {
      return res.status(500).send("Error in websocket:", processingError);
    }
  } catch (dbError) {
    return res.status(500).send("Error in DB:", dbError);
  }
});

export default router;
