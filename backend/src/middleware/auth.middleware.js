import { CONFIG } from "../config/config.js"
import jwt from "jsonwebtoken";
import tokenModel from "../models/token.models.js"
export const isLoggedIn=async (req,res,next)=>{
    try {
        const token=req.cookies.token
        if (!token) {
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        const checkToken=await tokenModel.findOne({token:token})   
     if(checkToken) {
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        const decoded=jwt.verify(token,CONFIG.JWT_SECRET)
        req.user=decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
}
