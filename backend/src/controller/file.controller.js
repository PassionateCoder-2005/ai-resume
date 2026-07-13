import path from "path";
import resumeModel from "../models/resume.model.js";
import { uploadService } from "../services/pdf.upload.js";
import { parsePDF } from "../services/pdf.parser.js";
import { aiResponse } from "../services/ai.service.js";

export const uploadFile = async (req, res) => {
    try {
        const file = await uploadService(req.file);

        const title = path.parse(req.file.originalname).name;
        const parsed= await parsePDF(req.file.buffer);
         const resume = await resumeModel.create({
            title,
            resumeUrl: file.url,
            user: req.user.id,          
        });
       const aiAnalysis = JSON.parse(await aiResponse(parsed));
   const updatedResume = await resumeModel.findByIdAndUpdate(
    resume._id,
    { aiAnalysis },
    {
        returnDocument: "after",
    }
);
   
        return res.status(201).json({
            message: "Your resume uploaded successfully",
            resume: updatedResume,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};
export const getResumeById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const resume = await resumeModel.find({ _id: id, user: userId });
        if (!resume) {
            return res.status(404).json({
                message: "Resume not found"
            });
        }
        return res.status(200).json({
            message: "Resume fetched successfully",
            resume
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
