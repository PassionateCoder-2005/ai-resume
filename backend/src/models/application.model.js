import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId, 
        ref: "job",
        required: true,
    },
    status: {
      type: String,
        enum: ["applied", "shortlisted", "rejected"],
        default: "applied",
    },
    resume: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "resume",
    required: true,
},
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const applicationModel = mongoose.model("application", applicationSchema);
export default applicationModel;