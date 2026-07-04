import {body, validationResult} from "express-validator";
let valid=(req,res,next)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
}
const fileValidation = [
    body("pdf").custom((value, { req }) => {
        if (!req.file) {
            throw new Error("File is required");
        }
        if (req.file.mimetype !== "application/pdf") {
            throw new Error("Only PDF files are allowed");
        }
        if (!req.file.buffer || req.file.buffer.length === 0) {
            throw new Error("File is empty");
        }
        // Max 10MB file size
        const maxSize = 10 * 1024 * 1024;
        if (req.file.buffer.length > maxSize) {
            throw new Error(`File size exceeds maximum limit of ${maxSize / (1024 * 1024)}MB`);
        }
        return true;
    }),
    valid
];
export default fileValidation;