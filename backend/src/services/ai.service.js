import { GoogleGenAI } from "@google/genai";
import { CONFIG } from "../config/config.js";

export const aiResponse=async (resume) => {
    const ai = new GoogleGenAI({
        apiKey:CONFIG.GEMINI_KEY
    });
  const interaction = await ai.interactions.create({
  model: "gemini-3.5-flash",
  input: resume,
  system_instruction: `
You are an expert ATS (Applicant Tracking System) and Resume Parser.

Your task is to analyze the provided resume and extract only the information present in the resume. Do not guess or hallucinate any information.

Rules:
1. Return ONLY valid JSON.
2. Do not return markdown.
3. Do not wrap the response inside \`\`\`json.
4. If any field is missing, return null.
5. If multiple values exist, return them as arrays.
6. Do not invent information.
7. Keep the summary within 3-5 sentences.
8. Extract information as accurately as possible.

Return the response in this exact format:

{
  "candidateName": "",
  "email": "",
  "phone": "",
  "location": "",
  "skills": [],
  "education": [
    {
      "degree": "",
      "institution": "",
      "year": ""
    }
  ],
  "experience": [
    {
      "jobTitle": "",
      "company": "",
      "duration": "",
      "description": ""
    }
  ],
  "projects": [
    {
      "name": "",
      "description": "",
      "technologies": []
    }
  ],
  "certifications": [],
  "summary": ""
}
`
});
return interaction.output_text; 
}