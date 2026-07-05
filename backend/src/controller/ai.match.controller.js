import jobModel from "../models/job.model.js";
import resumeModel from "../models/resume.model.js";
import { aiMatch,aiInterviewQuestions } from "../services/ai.service.js";

export const aiMatchController = async (req, res) => {
    try {
        const { jobId, resumeId } = req.params;
        if (!jobId || !resumeId) {
            return res.status(400).json({
                message: "Job ID and Resume ID are required"
            });
        }
        const job = await jobModel.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }
        const resume = await resumeModel.findById(resumeId);
        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }
        const match = JSON.parse(
    await aiMatch(
        resume.aiAnalysis,
        job.description,
        job.requiredSkills,
        job.title
    )
);
        return res.status(200).json({
            message: "AI match analysis completed",
            match
        });
       
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
export const aiMatchInterviewQuestionsController = async (req, res) =>{
    try {
        const { jobId, resumeId } = req.params;
        if (!jobId || !resumeId) {
            return res.status(400).json({
                message: "Job ID and Resume ID are required"
            });
        }
        const job = await jobModel.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }
        const resume = await resumeModel.findById(resumeId);
        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }
        const questions = JSON.parse(
    await aiInterviewQuestions(
        resume.aiAnalysis,
        job.description,
        job.requiredSkills,
        job.title
    ));
        return res.status(200).json({
            message: "AI interview questions generated",
            questions
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}