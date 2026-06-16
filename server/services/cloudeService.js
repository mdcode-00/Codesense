import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


const reviewCode = async (diffText) => {
  const prompt = `
You are a senior software engineer doing a pull request code review.

Here is the PR diff:
${diffText}

Return ONLY valid JSON in this format:
{
  "bugs": [],
  "security": [],
  "suggestions": []
}

If nothing is found, return empty arrays.
`;

  const response = await ai.models.generateContent({
   model: "models/gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  const text = response.text;

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

// console.log("key" , process.env.GEMINI_API_KEY);

  return JSON.parse(cleaned);
};


export default reviewCode;