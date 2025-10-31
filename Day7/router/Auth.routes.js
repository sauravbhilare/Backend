import { Router } from "express";
import { Login } from "../controllers/Auth.controller.js";
import { Register } from "../controllers/Auth.controller.js";

const router = Router();

router.post("/login", Login);

router.post("/register", Register);
export default router;
