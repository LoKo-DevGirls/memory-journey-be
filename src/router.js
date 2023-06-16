import * as express from "express";
import * as DB from "./db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  res.send("Server is running ⚡️");
});

router.post("/memory", async (req, res) => {
  const { content } = req.body;
  const memory = await DB.insertMemory({ content });
  res.send(memory);
});

export default router;
