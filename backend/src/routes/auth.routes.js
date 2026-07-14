import { Router } from "express";
import { getMe, login, logout, register } from "../controller/auth.contoller.js";
import { loginValidation, registerValidation } from "../validation/auth.validation.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
const authRouter=Router();
authRouter.post("/register",registerValidation,register)
authRouter.post("/login",loginValidation,login)
authRouter.post("/logout",logout)
authRouter.get("/getme",isLoggedIn,getMe)
export default authRouter;