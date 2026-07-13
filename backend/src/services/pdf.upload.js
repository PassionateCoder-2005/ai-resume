import { createClient } from "@supabase/supabase-js";
import path from "path";
import crypto from "crypto";
import { CONFIG } from "../config/config.js";

export const uploadService = async (file) => {
     const supabase = createClient(
  CONFIG.SUPABASE_URL,
  CONFIG.SUPABASE_SERVICE_ROLE_KEY
);

  const ext = path.extname(file.originalname);
  const fileName = `${Date.now()}-${crypto.randomUUID()}${ext}`;

  const { error } = await supabase.storage
    .from("resume")
    .upload(fileName, file.buffer, {
      contentType: file.mimetype,
      upsert: false,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage
    .from("resume")
    .getPublicUrl(fileName);

  return {
    url: data.publicUrl,
    fileName,
  };
};