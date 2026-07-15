import { GoogleGenAI } from "@google/genai";
import { CONFIG } from "../config/config.js";

export const aiResponse=async (resume) => {
    const ai = new GoogleGenAI({
        apiKey:CONFIG.GEMINI_REAL_TWO
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
export const aiMatch=async (aiAnalysis,jobDescription,jobRequiredSkills,jobTitle) => {
  const ai = new GoogleGenAI({
    apiKey:CONFIG.GEMINI_REAL_ONE
  });

const interaction = await ai.interactions.create({
  model: "gemini-3.5-flash",
  input: `
Job Title:
${jobTitle}

Job Description:
${jobDescription}

Required Skills:
${JSON.stringify(jobRequiredSkills, null, 2)}

Candidate Resume Analysis:
${JSON.stringify(aiAnalysis, null, 2)}
`,
system_instruction: `
You are an expert ATS (Applicant Tracking System) and Senior Technical Recruiter.

Your task is to compare the candidate's resume with the provided job details and determine how well the candidate fits the role.

Compare the candidate based on:
- Technical Skills
- Experience
- Education
- Projects
- Overall relevance to the job

Rules:
1. Return ONLY valid JSON.
2. Do not return markdown.
3. Do not wrap the response inside \`\`\`json.
4. Do not include any explanation outside the JSON.
5. Use ONLY the information provided.
6. Never invent skills, education, projects, certifications, or experience.
7. Consider similar technologies as partial matches when appropriate.
8. Match score must be an integer between 0 and 100.
9. Include only actual matched skills in "matchedSkills".
10. Include only required but missing skills in "missingSkills".
11. "reason" must be short (maximum 2 sentences).
12. "recommendation" must be exactly one of:
   - "Highly Recommended"
   - "Recommended"
   - "Partially Recommended"
   - "Not Recommended"
13. "shortlist" must be a boolean:
   - true = Candidate should be shortlisted.
   - false = Candidate should not be shortlisted.
14. Base your recommendation on the following scoring criteria.

Scoring Guide:

90-100:
- Recommendation: Highly Recommended
- Shortlist: true

75-89:
- Recommendation: Recommended
- Shortlist: true

60-74:
- Recommendation: Partially Recommended
- Shortlist: false

0-59:
- Recommendation: Not Recommended
- Shortlist: false

Return ONLY this JSON:

{
  "matchScore": 0,
  "matchedSkills": [],
  "missingSkills": [],
  "recommendation": "",
  "shortlist": false,
  "reason": ""
}
`
});

return interaction.output_text;
}
export const aiInterviewQuestions=async (aiAnalysis,jobDescription,jobRequiredSkills,jobTitle) => {
  const ai = new GoogleGenAI({
    apiKey:CONFIG.GEMINI_REAL_THREE
  });

const interaction = await ai.interactions.create({
  model: "gemini-3.5-flash",
  input: `
Job Title:
${jobTitle}

Job Description:
${jobDescription}

Required Skills:
${JSON.stringify(jobRequiredSkills, null, 2)}

Candidate Resume Analysis:
${JSON.stringify(aiAnalysis, null, 2)}
`,
system_instruction: `
You are an expert Senior Technical Interviewer.

Your task is to generate interview questions based ONLY on:
- Candidate Resume Analysis
- Job Title
- Job Description
- Required Skills

Rules:
1. Return ONLY valid JSON.
2. Do not return markdown.
3. Do not wrap the response inside \`\`\`json.
4. Do not include any explanation outside the JSON.
5. Use only the information provided.
6. Do not invent candidate experience or skills.
7. Generate practical interview questions suitable for this candidate and job.
8. Questions should become more challenging gradually.
9. Avoid duplicate questions.
10. Keep every question concise and interview-ready.

Generate:
- 5 Technical Questions
- 3 Behavioral Questions

Technical questions should cover:
- Required technologies
- Candidate's experience
- Problem solving
- Best practices
- Real-world scenarios

Behavioral questions should assess:
- Communication
- Teamwork
- Leadership
- Problem solving
- Time management

Return ONLY this JSON:

{
  "technicalQuestions": [
    "",
    "",
    "",
    "",
    ""
  ],
  "behavioralQuestions": [
    "",
    "",
    ""
  ]
}
`
});

return interaction.output_text
}
export const aiRecommendJobs=async(aiAnalysis,jobList) => {
  const ai = new GoogleGenAI({
    apiKey:CONFIG.GEMINI_REAL_FOUR
  });
 const interaction = await ai.interactions.create({
  model: "gemini-3.5-flash",
  input: `
Candidate Resume Analysis:
${JSON.stringify(aiAnalysis, null, 2)}

Job List:
${JSON.stringify(jobList, null, 2)}
`,
  system_instruction: `
You are an expert AI Career Advisor and Technical Recruiter.

Your task is to recommend the most suitable jobs for the candidate based ONLY on:

- Candidate Resume Analysis
- Available Job List

Strict Rules:

1. Use ONLY the information provided in the Candidate Resume Analysis and Job List.
2. Never invent or assume any skills, experience, education, certifications, projects, achievements, or technologies.
3. Compare every job in the Job List with the candidate profile.
4. Calculate an estimated matchScore between 0 and 100.
5. Skills should have the highest priority while calculating the score.
6. Also consider:
   - Experience
   - Education
   - Projects
   - Technologies
   - Job Role
7. Recommend only relevant jobs.
8. Ignore jobs having matchScore below 40.
9. Sort recommended jobs by matchScore in descending order.
10. Return a maximum of 10 recommended jobs.
11. Do not recommend duplicate jobs.
12. Every recommended job MUST exist in the provided Job List.
13. Never modify job title or company name.
14. Never create fake jobs.
15. recommendation must be exactly one of:
    - Highly Recommended
    - Recommended
    - Average Match
16. matchedSkills must contain only skills common between candidate and job.
17. missingSkills must contain only required job skills that are absent in the candidate profile.
18. reason must be short (maximum 30 words).
19. Return ONLY valid JSON.
20. Do NOT return markdown.
21. Do NOT wrap the response inside \`\`\`json.
22. Do NOT include any explanation outside the JSON.
23. If there are no suitable jobs, return an empty array.

Return ONLY this JSON structure:

{
  "recommendedJobs": [
    {
      "jobId": "",
      "matchScore": 0,
      "matchedSkills": [],
      "missingSkills": [],
      "recommendation": "",
      "reason": ""
    }
  ]
}

Field Rules:

- Never return title.
- Never return company.
- Return only jobId.
- Backend will attach original job details.
- matchScore: Integer between 0 and 100.
- matchedSkills: Array of matching skills.
- missingSkills: Array of missing required skills.
- recommendation: One of "Highly Recommended", "Recommended", or "Average Match".
- reason: Short explanation (maximum 30 words).

If no suitable jobs are found, return exactly:

{
  "recommendedJobs": []
}
`
});

return interaction.output_text;
}