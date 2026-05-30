import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

/**
 * AI-powered fraud detection for resumes
 */
export const detectFraud = async (resumeText, applicantHistory = []) => {
  try {
    const historyContext = applicantHistory.length > 0
      ? `Previous Applications by this user:\n${applicantHistory.map((h, i) => `${i + 1}. Applied to "${h.jobTitle}" on ${h.date} — Score: ${h.matchScore}`).join('\n')}`
      : 'No previous application history available.';

    const prompt = `
You are an advanced fraud detection AI for a hiring platform.
Analyze this resume for signs of fraud, fabrication, or misrepresentation.

Resume Text:
${resumeText}

${historyContext}

Check for:
1. Fake or inflated experience (unrealistic job progressions, impossible timelines)
2. Suspicious skill inflation (claiming mastery in too many unrelated technologies)
3. Inconsistent employment history (overlapping dates, gaps without explanation)
4. Generic or templated content (copy-pasted descriptions, buzzword stuffing)
5. Unrealistic career progression (junior to CTO in 2 years)
6. Education red flags (unaccredited institutions, impossible degree timelines)

Be thorough but fair. Not every unusual pattern is fraud.
`;

    const schema = {
      type: SchemaType.OBJECT,
      properties: {
        fraudRiskScore: { type: SchemaType.NUMBER, description: "Overall fraud risk 0-100" },
        riskLevel: { type: SchemaType.STRING, description: "low, medium, high, or critical" },
        flags: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              type: { type: SchemaType.STRING },
              description: { type: SchemaType.STRING },
              severity: { type: SchemaType.STRING }
            },
            required: ["type", "description", "severity"]
          }
        },
        recommendations: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
        verificationSuggestions: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
      },
      required: ["fraudRiskScore", "riskLevel", "flags", "recommendations", "verificationSuggestions"]
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
    console.error("Fraud Detection Error:", error.message);
    return {
      fraudRiskScore: 0,
      riskLevel: "low",
      flags: [],
      recommendations: ["Fraud detection temporarily unavailable"],
      verificationSuggestions: ["Manual review recommended"]
    };
  }
};
