import { Router } from "express";
import authRouter from "./Auth.routes.js";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
export default mainRouter;
