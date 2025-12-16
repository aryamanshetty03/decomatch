import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
    console.error("Missing Gemini API Key");
}

export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
