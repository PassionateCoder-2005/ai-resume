import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import uploadRouter from "./routes/upload.routes.js";
export const server=express();
server.use(express.json())
server.use(cookieParser())
server.use("/api/auth",authRouter)
server.use("/api/upload",uploadRouter)
