import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

/**
 * Comprehensive ATS Resume Analysis
 */
export const analyzeResume = async (resumeText, jobDetails) => {
  try {
    const prompt = `
You are an elite ATS (Applicant Tracking System) engine used by Fortune 500 companies.
Perform a comprehensive resume analysis against the following job.

Job Title: ${jobDetails.title}
Required Skills: ${jobDetails.requiredSkills.join(', ')}
Required Experience: ${jobDetails.requiredExperience} years
Job Description: ${jobDetails.description}

Candidate Resume:
${resumeText}

Score using these exact weights:
- Skills Match: 50%
- Experience Match: 25%
- Education Match: 10%
- Certifications: 10%
- Soft Skills / AI Confidence: 5%

Be precise. Calculate each sub-score individually, then compute the weighted total.
Identify every matched and missing skill. Detect all certifications.
Provide actionable improvement suggestions.
`;

    const schema = {
      type: SchemaType.OBJECT,
      properties: {
        atsScore: { type: SchemaType.NUMBER, description: "Weighted total ATS score 0-100" },
        skillsMatch: {
          type: SchemaType.OBJECT,
          properties: {
            matched: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            missing: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            score: { type: SchemaType.NUMBER }
          },
          required: ["matched", "missing", "score"]
        },
        experienceMatch: {
          type: SchemaType.OBJECT,
          properties: {
            detected: { type: SchemaType.STRING },
            required: { type: SchemaType.STRING },
            score: { type: SchemaType.NUMBER }
          },
          required: ["detected", "required", "score"]
        },
        educationMatch: {
          type: SchemaType.OBJECT,
          properties: {
            detected: { type: SchemaType.STRING },
            score: { type: SchemaType.NUMBER }
          },
          required: ["detected", "score"]
        },
        certificationsMatch: {
          type: SchemaType.OBJECT,
          properties: {
            detected: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            score: { type: SchemaType.NUMBER }
          },
          required: ["detected", "score"]
        },
        softSkillsScore: { type: SchemaType.NUMBER },
        keywords: {
          type: SchemaType.OBJECT,
          properties: {
            found: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
            missing: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
          },
          required: ["found", "missing"]
        },
        improvements: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
        hiringRecommendation: { type: SchemaType.STRING, description: "Strong Yes, Yes, Maybe, No" }
      },
      required: ["atsScore", "skillsMatch", "experienceMatch", "educationMatch", "certificationsMatch", "softSkillsScore", "keywords", "improvements", "hiringRecommendation"]
    };

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    return JSON.parse(result.response.text());
  } catch (error) {
    console.error("ATS Analysis Error:", error.message);
    return {
      atsScore: 0,
      skillsMatch: { matched: [], missing: [], score: 0 },
      experienceMatch: { detected: "Unknown", required: String(jobDetails.requiredExperience), score: 0 },
      educationMatch: { detected: "Unknown", score: 0 },
      certificationsMatch: { detected: [], score: 0 },
      softSkillsScore: 0,
      keywords: { found: [], missing: [] },
      improvements: ["AI analysis temporarily unavailable"],
      hiringRecommendation: "Maybe"
    };
  }
};

/**
 * Rank multiple candidates for a single job
 */
export const rankCandidates = async (applications, jobDetails) => {
  try {
    const candidateSummaries = applications.map((app, i) => ({
      index: i,
      applicantId: app.applicant?._id || app.applicant,
      name: app.applicant?.name || `Candidate ${i + 1}`,
      matchScore: app.aiAnalysis?.atsScore || app.aiAnalysis?.matchScore || 0,
      strengths: app.aiAnalysis?.strengths || [],
      missingSkills: app.aiAnalysis?.missingSkills || app.aiAnalysis?.skillsMatch?.missing || [],
      recommendation: app.aiAnalysis?.hiringRecommendation || 'N/A',
    }));

    // Sort by matchScore descending
    candidateSummaries.sort((a, b) => b.matchScore - a.matchScore);

    return candidateSummaries.map((c, rank) => ({
      rank: rank + 1,
      applicantId: c.applicantId,
      name: c.name,
      matchScore: c.matchScore,
      strengths: c.strengths,
      missingSkills: c.missingSkills,
      recommendation: c.recommendation,
    }));
  } catch (error) {
    console.error("Ranking Error:", error.message);
    return [];
  }
};
