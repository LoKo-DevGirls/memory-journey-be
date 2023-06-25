import * as express from "express";
import * as DB from "./db.js";
// import { sendMemoryToProcessing } from "./webSocket.js";

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
    const memory = await DB.insertMemory({ content, category, sentiments });
    try {
      // await sendMemoryToProcessing(memory);
      return res.status(200).send(memory);
    } catch (processingError) {
      console.error("Error in Processing:", processingError);
      // Handle the error from sendMemoryToProcessing
      return res.status(500).send("Something went wrong in Processing");
    }
  } catch (dbError) {
    console.error("Error in DB:", dbError);
    // Handle the error from DB.insertMemory
    return res.status(500).send("Something went wrong in DB");
  }
});

export default router;
