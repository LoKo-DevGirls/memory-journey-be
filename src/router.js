import * as express from "express";

// TODO: add logger
// import logger from './logger.js';

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Server is running ⚡️");
});

export default router;
