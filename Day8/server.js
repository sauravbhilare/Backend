import express from "express";
import dotenv from "dotenv";
import mainRouter from "./router/index.js";
import mongoose from "mongoose";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  console.log("App Token:", process.env.APP_Token);
  console.log("MongoDB URL:", process.env.MONGODB_URL);
  res.send("Environment variables are logged in the console.");
});

app.use("/api", mainRouter);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Database connected. Saurav Bhilare");
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
