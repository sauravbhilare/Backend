import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./Model/product.schema.js";

const app = express();
dotenv.config();

app.use(express.json());

app.get("/api/products/expensive", async (req, res) => {
  try {
    const data = await Product.find({ ogprice: { $gt: 1000 } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/instock", async (req, res) => {
  try {
    const data = await Product.find({ quantity: { $gt: 0 } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/category", async (req, res) => {
  try {
    const data = await Product.find({ category: { $in: ["Mens", "Womens"] } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/and", async (req, res) => {
  try {
    const data = await Product.find({
      $and: [{ ogprice: { $gt: 1000 } }, { quantity: { $gt: 10 } }],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/or", async (req, res) => {
  try {
    const data = await Product.find({
      $or: [{ category: "Mens" }, { category: "Kids" }],
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/not", async (req, res) => {
  try {
    const data = await Product.find({
      ogprice: { $not: { $lt: 1000 } },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/exists", async (req, res) => {
  try {
    const data = await Product.find({ discount: { $exists: true } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/nin", async (req, res) => {
  try {
    const data = await Product.find({
      category: { $nin: ["Mens", "Womens"] },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/gte", async (req, res) => {
  try {
    const data = await Product.find({ ogprice: { $gte: 1500 } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/products/lte", async (req, res) => {
  try {
    const data = await Product.find({ ogprice: { $lte: 1000 } });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected. Saurav Bhilare"))
  .catch((err) => console.log(err));

app.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
