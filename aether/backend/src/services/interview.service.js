import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

/**
 * Generate tailored interview questions
 */
export const generateInterviewQuestions = async (resumeText, jobDetails, candidateSkills = []) => {
  try {
    const prompt = `
You are a senior technical interviewer at a top-tier company.
Generate a complete interview question set tailored to this specific candidate and role.

Job Title: ${jobDetails.title}
Job Description: ${jobDetails.description}
Required Skills: ${jobDetails.requiredSkills.join(', ')}
Candidate Skills: ${candidateSkills.join(', ')}

Candidate Resume:
${resumeText}

Generate exactly:
- 5 technical questions (varying difficulty: 2 easy, 2 medium, 1 hard)
- 3 behavioral questions using STAR method
- 3 HR questions
- 2 situational questions

Each question must be specific to this candidate's background and the role requirements.
Include expected answer guidelines and follow-up questions.
`;

    const schema = {
      type: SchemaType.OBJECT,
      properties: {
        technical: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              question: { type: SchemaType.STRING },
              difficulty: { type: SchemaType.STRING },
              expectedAnswer: { type: SchemaType.STRING },
              followUp: { type: SchemaType.STRING }
            },
            required: ["question", "difficulty", "expectedAnswer", "followUp"]
          }
        },
        behavioral: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              question: { type: SchemaType.STRING },
              category: { type: SchemaType.STRING },
              expectedAnswer: { type: SchemaType.STRING }
            },
            required: ["question", "category", "expectedAnswer"]
          }
        },
        hr: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              question: { type: SchemaType.STRING },
              purpose: { type: SchemaType.STRING }
            },
            required: ["question", "purpose"]
          }
        },
        situational: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              question: { type: SchemaType.STRING },
              scenario: { type: SchemaType.STRING },
              expectedAnswer: { type: SchemaType.STRING }
            },
            required: ["question", "scenario", "expectedAnswer"]
          }
        }
      },
      required: ["technical", "behavioral", "hr", "situational"]
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
    console.error("Interview Generation Error:", error.message);
    return {
      technical: [{ question: "AI generation temporarily unavailable", difficulty: "N/A", expectedAnswer: "", followUp: "" }],
      behavioral: [{ question: "AI generation temporarily unavailable", category: "N/A", expectedAnswer: "" }],
      hr: [{ question: "AI generation temporarily unavailable", purpose: "" }],
      situational: [{ question: "AI generation temporarily unavailable", scenario: "", expectedAnswer: "" }]
    };
  }
};
