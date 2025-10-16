import express from "express";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.get("/", (req, res) => {
  console.log(process.env.APP_TOKEN, "-process.env.APP_TOKEN");
  console.log(process.env.MONGODB_URL, "-process.env.MONGODB_URL");
  res.send(`Hello ${process.env.APP_TOKEN}...!Welcome To The Express Server`);
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
