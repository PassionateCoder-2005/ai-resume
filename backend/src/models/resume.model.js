import mongoose from "mongoose"
const resumeSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    resumeUrl:{
        type:String,
        required:true,
        unique:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    aiAnalysis:{
        type:Object,
        default:{}
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    }
},{
    timestamps:true
})
const resumeModel=mongoose.model("resume",resumeSchema);
export default resumeModel;