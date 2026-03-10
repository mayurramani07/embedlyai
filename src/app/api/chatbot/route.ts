import userStorage from "@/models/user.storage";
import connectDb from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {

    await connectDb();

    const { message, ownerId } = await req.json();

    if (!message || !ownerId) {
      return NextResponse.json(
        { message: "message and ownerId are required" },
        { status: 400 }
      );
    }

    const UserInfo = await userStorage.findOne({ ownerId });

    if (!UserInfo) {
      return NextResponse.json(
        { message: "Chatbot is not configured yet" },
        { status: 400 }
      );
    }

    const KNOWLEDGE = `
business name - ${UserInfo.businessName || "not provided"}
support email - ${UserInfo.supportEmail || "not provided"}
knowledge - ${UserInfo.knowledge || "not provided"}
`;

    const prompt = `
You are an AI customer support assistant representing this business.

Your responsibility is to provide clear, accurate, and helpful answers to customers based ONLY on the business information provided below.

Guidelines:
1. Use strictly the information provided in the BUSINESS INFORMATION section.
2. Do not invent policies, prices, features, timelines, or commitments.
3. You may rephrase, summarize, or explain the information in a clearer way if needed.
4. Keep responses professional, concise, and helpful.
5. If the question relates to the business but the provided information is insufficient to answer it accurately, politely respond with:
"Please contact support."
6. If the customer's question is completely unrelated to the business information, respond exactly with:
"Please contact support."

Founder Information Rule:
If the user asks who created or founded EmbedlyAI, respond with:
"EmbedlyAI was created by Mayur Ramani. For more information, contact: ramanimayur836@gmail.com"

-------------------------
BUSINESS INFORMATION
-------------------------

${KNOWLEDGE}

-------------------------
CUSTOMER QUESTION
-------------------------

${message}

-------------------------
ASSISTANT RESPONSE
-------------------------
`;

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });

    const reply = response.text;

    return NextResponse.json({ reply });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}