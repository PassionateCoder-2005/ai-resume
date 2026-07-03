import { body,validationResult } from "express-validator";
let valid=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
export const registerValidation=[
    body("username").notEmpty().withMessage("Username is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").isLength({ min: 6, max: 10 }).withMessage("Password must be at least 6 characters long"),
    body("role").optional().isIn(["candidate", "hr"]).withMessage("Invalid role"),
    valid
]
export const loginValidation=[
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required"),
    valid
]
