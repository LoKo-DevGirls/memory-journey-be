import express from "express";
import "express-async-errors";
import cors from "cors";
import router from "./router.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.use((_req, res, _next) => res.sendStatus(404));
app.use((error, _req, res, _next) => {
  console.error(error);
  res.sendStatus(500);
});

export default app;
