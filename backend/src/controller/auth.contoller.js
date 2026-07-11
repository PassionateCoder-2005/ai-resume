import { CONFIG } from "../config/config.js";
import userModel from "../models/user.models.js"
import tokenModel from "../models/token.models.js"
import jwt from "jsonwebtoken";
export const register=async (req,res) => {
    try {
        let {username,email,password,role}=req.body
        const isUser=await userModel.findOne({
            email:email
        })
        if (isUser) {
            return res.status(400).json({
                message:"User already exists"
            })
        }
        const user=await userModel.create({
            username,
            email,
            password,
            role
        })
        const token=jwt.sign({
            id:user._id,
            email:user.email,
            role:user.role
        },CONFIG.JWT_SECRET,{
            expiresIn:"1h"
        })
       res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 3600000,
})

        return res.status(201).json({
            message:"User registered successfully",
            token:{ token },
            user:{
                username:user.username,
                email:user.email,
                role:user.role

            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
export const login=async (req,res) => {
    try {
        let {email,password}=req.body
        const user=await userModel.findOne({email})
        if (!user) {
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }
        const isMatch=await user.comparePassword(password)
        if (!isMatch) {
            return res.status(400).json({
                message:"Invalid credentials"
            })
        }
        const token=jwt.sign({
            id:user._id,
            email:user.email,
            role:user.role
        },CONFIG.JWT_SECRET,{
            expiresIn:"1h"
        })
        res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 3600000,
})
        return res.status(200).json({
            message:"Login successful",
            user:{
                username:user.username,
                email:user.email,
                role:user.role
            },
            token:{ token }
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}
export const logout=async (req,res) => {
    try {
        let token=req.cookies.token
        if (!token) {
            return res.status(400).json({
                message:"User not logged in"
            })
        }
        
        await tokenModel.create({
            token:token
        })

        res.clearCookie("token",{
            httpOnly: true,
            secure: true,
            sameSite: "none"
        })
        return res.status(200).json({
            message:"Logout successful"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}