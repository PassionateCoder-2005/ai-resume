import { Router } from "express";
import multer from "multer"
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { checkCandidateRole } from "../middleware/role.middleware.js";
import { uploadFile ,getResumeById} from "../controller/file.controller.js";
import fileValidation from "../validation/file.validation.js";
const uploadRouter=Router()
const storage = multer.memoryStorage()
const upload=multer({
    storage:storage,
    limits:5*1024*1024
})
uploadRouter.post("/resume",isLoggedIn,checkCandidateRole,upload.single("pdf"),fileValidation,uploadFile)
uploadRouter.get("/get-your/resume",isLoggedIn,checkCandidateRole,getResumeById)
export default uploadRouter;