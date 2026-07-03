import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
 const tokenModel = mongoose.model("token", tokenSchema);
 export default tokenModel;