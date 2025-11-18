import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    ogprice: Number,
    discount: Number,
    discountedprice: Number,
    size: Number,
    imgUrl: String,
    inStock: Boolean,
    quantity: Number,
    seller: String,
    isDeleted: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
