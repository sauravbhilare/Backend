import { Router } from "express";
import productRouter from "./Product.routes.js";

const mainrouter = Router();

mainrouter.use("/products", productRouter);
export default mainrouter;
