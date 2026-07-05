import {Router} from 'express';
import { checkCandidateRole } from '../middleware/role.middleware.js';
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { applyJobs } from '../controller/application.controller.js';
const applicationRouter = Router();
applicationRouter.post("/apply",isLoggedIn,checkCandidateRole,applyJobs)
export default applicationRouter