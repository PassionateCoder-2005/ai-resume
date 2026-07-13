import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { CONFIG } from "../config/config.js";
import path from "path";
import crypto from "crypto";

cloudinary.config({
  cloud_name: CONFIG.CLOUDINARY_CLOUD_NAME,
  api_key: CONFIG.CLOUDINARY_API_KEY,
  api_secret: CONFIG.CLOUDINARY_API_SECRET,
});

export const uploadService = async (file) => {
  const ext = path.extname(file.originalname);
  const uniqueFileName = `${Date.now()}-${crypto.randomUUID()}`;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "resume",
        public_id: uniqueFileName,
        format: ext.replace(".", ""), // pdf
      },
      (error, result) => {
        if (error) return reject(error);

        // PDF extension ke saath URL generate karo
        const resumeUrl = cloudinary.url(result.public_id, {
          resource_type: "raw",
          format: ext.replace(".", ""),
          secure: true,
        });

        resolve({
          ...result,
          secure_url: resumeUrl,
        });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};