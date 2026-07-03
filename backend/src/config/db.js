import mongoose from "mongoose";
import { CONFIG } from "./config.js";
export const connectDb=async () => {
    try {
        await mongoose.connect(CONFIG.MONGODB_URI)
        console.log("mongodb connected");
    } catch (error) {
        console.log("error in connection with mongodb");
    }
}