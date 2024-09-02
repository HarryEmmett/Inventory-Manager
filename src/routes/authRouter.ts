import { Router } from "express";
import {
  signUp,
  login,
  logout,
  signUpForm,
} from "../controllers/authController";

const authRouter = Router();

authRouter.get("/sign-up", signUpForm);
authRouter.post("/sign-up", signUp);
authRouter.post("/login", login);
authRouter.get("/log-out", logout);

export default authRouter;
