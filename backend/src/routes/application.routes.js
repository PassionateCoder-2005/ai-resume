import {Router} from 'express';
import { checkCandidateRole,checkHrRole } from '../middleware/role.middleware.js';
import { isLoggedIn } from "../middleware/auth.middleware.js";
import { applyJobs ,updateApplicationStatus,getOneApplicationOfCandidate,getAllApplicationsOfCandidate} from '../controller/application.controller.js';
const applicationRouter = Router();
applicationRouter.post("/apply",isLoggedIn,checkCandidateRole,applyJobs)
applicationRouter.patch("/:applicationId",isLoggedIn,checkHrRole,updateApplicationStatus)
applicationRouter.get("/:applicationId/getOne",isLoggedIn,checkCandidateRole,getOneApplicationOfCandidate)
applicationRouter.get("/all",isLoggedIn,checkCandidateRole,getAllApplicationsOfCandidate)
export default applicationRouter