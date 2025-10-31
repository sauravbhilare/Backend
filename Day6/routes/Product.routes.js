import { Router } from "express";

const productRouter = Router();

productRouter.post("/cart", (req, res) => {
  res.send("This is the product cart route.");
});
export default productRouter;
