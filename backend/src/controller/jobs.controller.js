import applicationModel from "../models/application.model.js"
import jobModel from "../models/job.model.js"
import resumeModel from "../models/resume.model.js"
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
export const getJobAllDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await jobModel.findById(id);

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const applications = await applicationModel
            .find({ job: id })
            .populate("candidate", "name email")
            .populate("job", "title company");

        const applicants = await Promise.all(
            applications.map(async (application) => {

                const resume = await resumeModel.findOne({
                    user: application.candidate._id
                });

                return {
                    candidate: application.candidate,
                    job: application.job,
                    applicationStatus: application.status,
                    appliedAt: application.appliedAt,
                    resume: resume
                        ? {
                            id: resume._id,
                            title: resume.title,
                            resumeUrl: resume.resumeUrl,
                            resumeStatus: resume.status,
                            aiAnalysis: resume.aiAnalysis
                        }
                        : null
                };
            })
        );

        return res.status(200).json({
            message: "Applicants fetched successfully",
            totalApplicants: applicants.length,
            applicants
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};