import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import mainRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  console.log("App Token:", process.env.APP_TOKEN);
  console.log("MongoDB URL:", process.env.MONGODB_URL);
  res.send("Hello, World!");
});

app.use("/api", mainRouter);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Database connected. Saurav Bhilare");
});

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
