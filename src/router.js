import * as express from "express";
import * as DB from "./db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Server is running ⚡️");
});

router.post("/memory", async (req, res) => {
  const { content, category } = req.body;

  if (!content) {
    res.status(400).send("Missing content in body");
  }

  try {
    const memory = await DB.insertMemory({ content, category });
    res.status(200).send(memory);
  } catch {
    res.status(500).send("Something went wrong in DB");
  }

});

export default router;
