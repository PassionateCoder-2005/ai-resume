import applicationModel from "../models/application.model.js";
import jobModel from "../models/job.model.js";

export const applyJobs=async (req,res) => {
    try {
        const {job}=req.body;
        if(!job){
            return res.status(400).json({
                message:"Job id is required"
            })
        }
        const candidateId=req.user.id;
        const isApplied=await applicationModel.findOne({candidate:candidateId,job:job});
        if(isApplied){
            return res.status(400).json({
                message:"You have already applied for this job"
            })
        }
       const jobAvailable=await jobModel.findById(job);
       if(!jobAvailable){
        return res.status(404).json({
            message:"Job not found"
        })
       }
       const application=await applicationModel.create({candidate:candidateId,job:job});
       return res.status(201).json({
        message:"Job applied successfully",
        application
       })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}