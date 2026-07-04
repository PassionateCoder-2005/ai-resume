import jobModel from "../models/job.model.js"

export const createJobs = async (req, res) => {
    try {
        const { title, description, company, location, requiredSkills, salary } = req.body
        const createdBy = req.user.id
        const job = await jobModel.create({ title, description, company, location, requiredSkills, salary, createdBy })
        return res.status(201).json({
            message: "Job created successfully",
            job
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
export const getAllJobs=async (req,res) => {
    try {
        const jobs=await jobModel.find();
        if(!jobs){
            return res.status(404).json({
                message:"No jobs found"
            })
        }
        return res.status(200).json({
            message:"All jobs",
            jobs
        })
    } catch (error) {
        console.log(error);
        
       return res.status(500).json({
        message:"Internal server error"
       }) 
    }
}