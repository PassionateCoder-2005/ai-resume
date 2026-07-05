import {Router} from 'express';
import { checkHrRole } from '../middleware/role.middleware.js';
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { aiMatchController, aiMatchInterviewQuestionsController } from '../controller/ai.match.controller.js';
const aiMatchRouter = Router();
aiMatchRouter.post("/match/jobs/:jobId/resumes/:resumeId",isLoggedIn,checkHrRole,aiMatchController)
aiMatchRouter.post("/interview-questions/jobs/:jobId/resumes/:resumeId", isLoggedIn, checkHrRole, aiMatchInterviewQuestionsController);
export default aiMatchRouter