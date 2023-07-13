import * as express from "express";
import * as DB from "./db.js";
import { sendMemoryToProcessing } from "./webSocket.js";
import { generateImageURL } from "./logics.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Server is running ⚡️");
});

router.post("/memory", async (req, res) => {
  const { content, category, sentiments } = req.body;

  if (!content) {
    return res.status(400).send("Missing content in body");
  }

  try {
    const imageUrl = await generateImageURL({ memory: content });
    const memory = await DB.insertMemory({
      content,
      category,
      sentiments,
      imageUrl,
    });
    try {
      sendMemoryToProcessing(memory);
      return res.status(200).send(memory);
    } catch (processingError) {
      console.error("Error in Processing:", processingError);
      return res.status(500).send("Something went wrong in Processing");
    }
  } catch (dbError) {
    console.error("Error in DB:", dbError);
    return res.status(500).send("Something went wrong in DB");
  }
});

export default router;
