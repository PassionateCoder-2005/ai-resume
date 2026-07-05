import {Router} from "express"
import { isLoggedIn } from "../middleware/auth.middleware.js"
import { checkHrRole } from "../middleware/role.middleware.js"
import { jobValidation } from "../validation/job.validation.js"
import { createJobs, getAllJobs,getJobAllDetails } from "../controller/jobs.controller.js"
const jobsRouter=Router()
jobsRouter.post("/create",isLoggedIn,checkHrRole,jobValidation,createJobs)
jobsRouter.get("/all-jobs",getAllJobs)
jobsRouter.get("/:id/applicants",isLoggedIn,checkHrRole,getJobAllDetails)
export default jobsRouter