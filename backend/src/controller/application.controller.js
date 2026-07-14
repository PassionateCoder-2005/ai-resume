import applicationModel from "../models/application.model.js";
import jobModel from "../models/job.model.js";
import resumeModel from "../models/resume.model.js";

export const applyJobs = async (req, res) => {
    try {
        const { job } = req.body;
        if (!job) {
            return res.status(400).json({
                message: "Job id is required"
            })
        }
        const candidateId = req.user.id;
        const isApplied = await applicationModel.findOne({ candidate: candidateId, job: job });
        if (isApplied) {
            return res.status(400).json({
                message: "You have already applied for this job"
            })
        }

        const jobAvailable = await jobModel.findById(job);
        if (!jobAvailable) {
            return res.status(404).json({
                message: "Job not found"
            })
        }
        const activeResume = await resumeModel.findOne({
            user: candidateId,
            isActive: true
        });
        if (!activeResume) {
    return res.status(400).json({
        message: "Please upload your resume before applying.",
    });
}
        const application = await applicationModel.create({ candidate: candidateId, job: job, resume: activeResume._id, });
        return res.status(201).json({
            message: "Job applied successfully",
            application
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
export const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({
                message: "Status is required"
            })
        }
        const application = await applicationModel.findById(applicationId);
        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            })
        }
        application.status = status;
        await application.save();
        return res.status(200).json({
            message: "Application status updated successfully",
            application
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
export const getOneApplicationOfCandidate = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const application = await applicationModel.find({
            candidate: req.user.id,
            _id: applicationId
        })

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            })
        }
        return res.status(200).json({
            message: "Application fetched successfully",
            application
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
export const getAllApplicationsOfCandidate = async (req, res) => {
  try {
    const applications = await applicationModel
      .find({ candidate: req.user.id })
      .populate({
        path: "job",
        select: "title company location salary requiredSkills"
      })
      .populate({
        path: "resume",
        select: "title resumeUrl aiAnalysis"
      });

    if (applications.length === 0) {
      return res.status(404).json({
        message: "No applications found",
        applications: [],
      });
    }

    return res.status(200).json({
      message: "Applications fetched successfully",
      applications,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
// export const getAllApplicationsForHr