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
    res.status(500).send("Something went wrong in DB Memory Table");
  }

});


router.post("/muse", async (req, res) => {
  const { id, muse } = req.body;
  const museContent = muse;

  if (!id || !museContent) {
    res.status(400).send("Missing content in body");
  }

  try {
    const muse = await DB.insertMuse({ id, museContent });
    res.status(200).send(muse);
  } catch {
    res.status(500).send("Something went wrong in DB Muse Table.");
  }

});

export default router;
