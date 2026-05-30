import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

/**
 * Analyzes a resume against a job description
 * @param {string} resumeText - Parsed text from resume
 * @param {Object} jobDetails - Job details object
 */
export const analyzeApplication = async (resumeText, jobDetails) => {
  try {
    const prompt = `
      You are an expert ATS (Applicant Tracking System) and AI Recruiter.
      Analyze the candidate's resume against the following job requirements.
      
      Job Title: ${jobDetails.title}
      Required Skills: ${jobDetails.requiredSkills.join(', ')}
      Required Experience: ${jobDetails.requiredExperience} years
      Job Description: ${jobDetails.description}

      Candidate Resume Text:
      ${resumeText}

      Calculate a match score based on the following weights:
      - Skills Match: 50%
      - Experience Match: 25%
      - Education Match: 10%
      - Certifications: 10%
      - Soft Skills / AI Confidence: 5%

      Return the analysis in JSON format.
    `;

    const schema = {
      description: "Application AI Analysis",
      type: SchemaType.OBJECT,
      properties: {
        matchScore: {
          type: SchemaType.NUMBER,
          description: "Overall match percentage (0-100)",
        },
        missingSkills: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
          description: "Required skills missing from the resume",
        },
        strengths: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
          description: "Candidate's key strengths relative to the job",
        },
        summary: {
          type: SchemaType.STRING,
          description: "A short summary of the candidate's fit",
        },
        suggestedImprovements: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
          description: "Actionable advice for the candidate to improve their profile",
        },
        interviewQuestions: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING },
          description: "3-5 tailored interview questions for this specific candidate and role",
        },
        hiringRecommendation: {
          type: SchemaType.STRING,
          description: "Strong Yes, Yes, Maybe, No",
        }
      },
      required: ["matchScore", "missingSkills", "strengths", "summary", "suggestedImprovements", "interviewQuestions", "hiringRecommendation"],
    };

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      }
    });

    const response = result.response.text();
    return JSON.parse(response);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    // Fallback if AI fails
    return {
      matchScore: 0,
      missingSkills: [],
      strengths: [],
      summary: "AI analysis failed.",
      suggestedImprovements: [],
      interviewQuestions: [],
      hiringRecommendation: "Maybe"
    };
  }
};
