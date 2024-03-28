import express from "express";
import { SignInController, SignUpController } from "../controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", SignUpController);
authRouter.post('/sign-in', SignInController);

export { authRouter };
