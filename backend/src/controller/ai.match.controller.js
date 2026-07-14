import applicationModel from "../models/application.model.js";
import jobModel from "../models/job.model.js";
import resumeModel from "../models/resume.model.js";
import { aiMatch, aiInterviewQuestions } from "../services/ai.service.js";

export const aiMatchController = async (req, res) => {
    try {
        const { applicationId } = req.params;
        if (!applicationId) {
            return res.status(400).json({
                message: "Application id is required"
            });
        }
        const application = await applicationModel.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }
        const { job, resume } = application;
        const jobData = await jobModel.findById(job);

        if (!jobData) {
            return res.status(404).json({
                message: "Job not found"
            });
        }
        const resumeData = await resumeModel.findById(resume);

        if (!resumeData) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }
        const match = JSON.parse(
            await aiMatch(
                resumeData.aiAnalysis,
                jobData.description,
                jobData.requiredSkills,
                jobData.title
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
export const aiMatchInterviewQuestionsController = async (req, res) => {
    try {
        const { applicationId } = req.params;

        if (!applicationId) {
            return res.status(400).json({
                message: "Application ID is required"
            });
        }
        const application = await applicationModel.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }
        const job = await jobModel.findById(application.job);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const resume = await resumeModel.findById(application.resume);

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
    )
);
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