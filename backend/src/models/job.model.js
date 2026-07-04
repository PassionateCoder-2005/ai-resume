import mongoose from 'mongoose';
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  requiredSkills: {
    type: [String],
    required: true
    },
    createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  salary: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});
const jobModel= mongoose.model('job', jobSchema);
export default jobModel;