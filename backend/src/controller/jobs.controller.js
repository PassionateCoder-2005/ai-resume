import applicationModel from "../models/application.model.js"
import jobModel from "../models/job.model.js"
import resumeModel from "../models/resume.model.js"
import { aiRecommendJobs } from "../services/ai.service.js"
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
        console.log(error);
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

        const job = await jobModel.find({
            _id:id,
            createdBy:req.user.id
        });

        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        const applications = await applicationModel
            .find({job:id})
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
export const getOneJobDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await jobModel.findById(id);
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }
        return res.status(200).json({
            message: "Job details fetched successfully",
            job
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
export const deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const job = await jobModel.findOneAndDelete({ _id: id, createdBy: userId });
        if (!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }
        return res.status(200).json({
            message: "Job deleted successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
export const recommendJobs = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get Active Resume
    const resume = await resumeModel.findOne({
      user: userId,
      isActive: true,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Please upload and activate a resume first.",
      });
    }

    // 2. Get Jobs (Only Required Fields)
    const jobList = await jobModel
      .find()
      .select("_id title description requiredSkills location company");

    if (jobList.length === 0) {
      return res.status(404).json({
        message: "No jobs available.",
      });
    }

    // 3. AI Recommendation
    const aiResponse = await aiRecommendJobs(
      resume.aiAnalysis,
      jobList
    );

    // 4. Parse AI Response
    let parsed;

    try {
      parsed = JSON.parse(aiResponse);
    } catch (err) {
      return res.status(500).json({
        message: "AI returned invalid JSON.",
      });
    }

    if (!parsed.recommendedJobs) {
      return res.status(500).json({
        message: "Invalid AI response.",
      });
    }

    // 5. Fetch Candidate Applications
    const applications = await applicationModel.find({
      candidate: userId,
    });

    // 6. Create Job Map
    const jobMap = new Map();

    jobList.forEach((job) => {
      jobMap.set(job._id.toString(), job);
    });

    // 7. Create Application Map
    const applicationMap = new Map();

    applications.forEach((app) => {
      applicationMap.set(app.job.toString(), app.status);
    });

    // 8. Merge AI + Original Job + Application Status
    const recommendedJobs = parsed.recommendedJobs.map((item) => {
      const job = jobMap.get(item.jobId);

      if (!job) return null;

      return {
        ...job.toObject(),

        matchScore: item.matchScore,
        matchedSkills: item.matchedSkills,
        missingSkills: item.missingSkills,
        recommendation: item.recommendation,
        reason: item.reason,

        applicationStatus:
          applicationMap.get(item.jobId) || null,
      };
    }).filter(Boolean);

    return res.status(200).json({
      message: "Recommended jobs fetched successfully.",
      recommendedJobs,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error.",
    });
  }
};