import { Router } from "express";
import { login, logout, register } from "../controller/auth.contoller.js";
import { loginValidation, registerValidation } from "../validation/auth.validation.js";
const authRouter=Router();
authRouter.post("/register",registerValidation,register)
authRouter.post("/login",loginValidation,login)
authRouter.post("/logout",logout)
export default authRouter;