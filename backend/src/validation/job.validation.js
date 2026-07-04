import {body,validationResult} from "express-validator"
const valid=(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    next()
}

export const jobValidation=[
    body("title").notEmpty().withMessage("Title is required"),
    body("company").notEmpty().withMessage("Company is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("salary").notEmpty().withMessage("Salary is required").isNumeric().withMessage("Salary must be a number"),
    body("requiredSkills").isArray({min: 1}).withMessage("At least one required skill is required"),
    valid
]