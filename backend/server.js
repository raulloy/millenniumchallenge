import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import surveysRouter from "./routers/surveysRouter.js";
import responsesRouter from "./routers/responsesRouter.js";
import resultsRouter from "./routers/resultsRouter.js";
import categoriesRouter from "./routers/categoriesRouter.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to mongodb");
  })
  .catch((error) => {
    console.log(error.reason);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 5000;

app.get("/", (req, res) => {
  res.send(["millenniumchallenge"]);
});

app.use("/api/surveys", surveysRouter);
app.use("/api/responses", responsesRouter);
app.use("/api/results", resultsRouter);
app.use("/api/categories", categoriesRouter);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}/`);
});
