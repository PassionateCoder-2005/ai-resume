export const checkHrRole = (req,res,next) => {
    try {
        const userRole = req.user.role;
        if (userRole !== "hr") {
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        next()
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
export const checkCandidateRole = (req,res,next) => {
    try {
        const userRole = req.user.role;
        if (userRole !== "candidate") {
            return res.status(403).json({
                message: "Forbidden"
            })
        }
        next()
    }
    catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}
