import express from "express";
import { SignInController, SignUpController, googleController } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", SignUpController);
authRouter.post('/sign-in', SignInController);
authRouter.post('/google', googleController);

export { authRouter };
