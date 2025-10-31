import express from "express";
import dotenv from "dotenv";
import mainrouter from "./routes/index.js";

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  console.log("Environment Variable JWT_SECRET:", process.env.JWT_SECRET);
  console.log("Environment Variable MONGODB_URL:", process.env.MONGODB_URL);
  res.send("Check the server console for environment variables.");
});

app.use("/api", mainrouter);

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
