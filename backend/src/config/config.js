import dotenv from "dotenv";
dotenv.config();
if(!process.env.MONGODB_URI){
    throw new Error("Mongodb uri not found");
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT secret not found");
}
// if(!process.env.IMAGE_KIT_PUBLIC_KEY){
//     throw new Error("Image kit public key not found");
// }
// if(!process.env.IMAGE_KIT_PRIVATE_KEY){
//     throw new Error("Image kit private key not found");
// }
// if(!process.env.IMAGE_KIT_URL_ENDPOINT){
//     throw new Error("Image kit url endpoint not found");
// }
if(!process.env.CLOUDINARY_CLOUD_NAME){
    throw new Error("Cloudinary cloud name not found");
}
if(!process.env.CLOUDINARY_API_KEY){
    throw new Error("Cloudinary api key not found");
}
if(!process.env.CLOUDINARY_API_SECRET){
    throw new Error("Cloudinary api secret not found");
}
if(!process.env.GEMINI_KEY){
    throw new Error("Gemini key not found");
}
if(!process.env.GEMINI_KEY_ONE){
    throw new Error("Gemini key one not found");
}
if(!process.env.GEMINI_KEY_TWO){
    throw new Error("Gemini key two not found");
}
export const CONFIG={
    MONGODB_URI:process.env.MONGODB_URI,
    JWT_SECRET:process.env.JWT_SECRET,
    IMAGE_KIT_PUBLIC_KEY:process.env.IMAGE_KIT_PUBLIC_KEY,
    IMAGE_KIT_PRIVATE_KEY:process.env.IMAGE_KIT_PRIVATE_KEY,
    IMAGE_KIT_URL_ENDPOINT:process.env.IMAGE_KIT_URL_ENDPOINT,
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
    GEMINI_KEY:process.env.GEMINI_KEY,
    GEMINI_KEY_ONE:process.env.GEMINI_KEY_ONE,
    GEMINI_KEY_TWO:process.env.GEMINI_KEY_TWO
}
