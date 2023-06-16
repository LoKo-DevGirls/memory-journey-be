import * as express from "express";
import * as DB from "./db.js";

// TODO: add logger
// import logger from './logger.js';

const router = express.Router();

router.get("/", (req, res) => {
  DB.addMemory("hello");
  res.send("Server is running ⚡️");
});

router.post("/add", (req, res) => {});

export default router;
