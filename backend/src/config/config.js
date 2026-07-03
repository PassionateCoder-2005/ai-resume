import dotenv from "dotenv";
dotenv.config();
if(!process.env.MONGODB_URI){
    throw new Error("Mongodb uri not found");
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT secret not found");
}

export const CONFIG={
    MONGODB_URI:process.env.MONGODB_URI,
    JWT_SECRET:process.env.JWT_SECRET
}
