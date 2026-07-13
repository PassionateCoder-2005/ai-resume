import {Router} from "express"
import { isLoggedIn } from "../middleware/auth.middleware.js"
import { checkHrRole,checkCandidateRole } from "../middleware/role.middleware.js"
import { jobValidation } from "../validation/job.validation.js"
import { createJobs, getAllJobs,getJobAllDetails ,getOneJobDetails,deleteJob, recommendJobs} from "../controller/jobs.controller.js"
const jobsRouter=Router()
jobsRouter.post("/create",isLoggedIn,checkHrRole,jobValidation,createJobs)
jobsRouter.get("/all-jobs",getAllJobs)
jobsRouter.get("/:id/applicants",isLoggedIn,checkHrRole,getJobAllDetails)
jobsRouter.get("/:id/job/details",isLoggedIn,checkCandidateRole,getOneJobDetails)
jobsRouter.delete("/:id/delete",isLoggedIn,checkHrRole,deleteJob)
jobsRouter.get("/suggested/recommendations",isLoggedIn,checkCandidateRole,recommendJobs)
export default jobsRouter