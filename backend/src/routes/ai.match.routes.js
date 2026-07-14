import {Router} from 'express';
import { checkHrRole } from '../middleware/role.middleware.js';
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { aiMatchController, aiMatchInterviewQuestionsController } from '../controller/ai.match.controller.js';
const aiMatchRouter = Router();
aiMatchRouter.post("/applications/:applicationId/match",isLoggedIn,checkHrRole,aiMatchController)
aiMatchRouter.post("/applications/:applicationId/interview-questions", isLoggedIn, checkHrRole, aiMatchInterviewQuestionsController);
export default aiMatchRouter