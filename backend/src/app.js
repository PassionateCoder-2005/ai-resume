import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
export const server=express();
server.use(express.json())
server.use(cookieParser())
server.use("/api/auth",authRouter)
