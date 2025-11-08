import { Router } from "express";
import { Login, Register, getUser } from "../Controllers/auth.Controllers.js";
import tokenDecoder from "../middleware/tokenMiddleware.js";

const authRouter = Router();

authRouter.post("/login", Login);
authRouter.post("/register", Register);
authRouter.get("/getUser", tokenDecoder, getUser);

export default authRouter;
