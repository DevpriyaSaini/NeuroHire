import { NextRequest, NextResponse } from "next/server";
import { feedback } from "../../../../public/constant";
import { json } from "stream/consumers";
import OpenAI from 'openai';

 export async function POST(req: Request) {
  try {
    const { conversation } = await req.json();
    
    if (!conversation || !Array.isArray(conversation)) {
      return NextResponse.json(
        { error: "Invalid conversation data" },
        { status: 400 }
      );
    }

    const finalPrompt = feedback.replace(
      '{{conversation}}', 
      JSON.stringify(conversation, null, 2)
    );

    const openai = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey:process.env.OPENROUTER_API_KEY||"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",
    });

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-exp:free',
      messages: [
        {
          role: 'user',
          content: finalPrompt,
        },
      ],
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error("No content in response");
    }

    return NextResponse.json({
      success: true,
      feedback: responseContent,
      conversationLength: conversation.length
    });

  } catch (error) {
    console.error("Feedback generation error:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to generate feedback",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}