import jwt from "jsonwebtoken"
import { CONFIG } from "../config/config.js";
export const checkHrRole = (req,res,next) => {
    try {
        const userRole = req.user.role;
        if (userRole !== "hr") {
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
export const checkCandidateRole = (req,res,next) => {
    try {
        const userRole = req.user.role;
        if (userRole !== "candidate") {
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        const token=req.cookies.token;
        const decode=jwt.verify(token,CONFIG.JWT_SECRET)
        req.user=decode;
        next()
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
