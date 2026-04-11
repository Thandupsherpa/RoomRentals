import {Router} from "express";
import * as authController from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const authRouter = Router();

authRouter.post("/login", authController.login);

authRouter.post("/register",authController.register)

authRouter.post("/logout",verifyToken,authController.logout)

export default authRouter;