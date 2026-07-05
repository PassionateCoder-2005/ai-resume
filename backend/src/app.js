import express from "express";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import uploadRouter from "./routes/upload.routes.js";
import jobsRouter from "./routes/jobs.routes.js";
import applicationRouter from "./routes/application.routes.js";
export const server=express();
server.get("/",(req,res)=>{
    res.send("Welcome to the API")
}
)
server.use(express.json())
server.use(cookieParser())
server.use("/api/auth",authRouter)
server.use("/api/upload",uploadRouter)
server.use("/api/job",jobsRouter)
server.use("/api/application",applicationRouter)