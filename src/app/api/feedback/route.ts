import { NextResponse } from "next/server";
import { feedback } from "../../../../public/constant";
import { createChatCompletion } from "@/lib/openrouter";
import { Connectiondb } from "@/lib/dbconnect";
import InterviewFeedbackModel from "@/model/InterviewFeedback";

 export async function POST(req: Request) {
  try {
    const { conversation, interviewId, username } = await req.json();

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

    const completion = await createChatCompletion([
      {
        role: 'user',
        content: finalPrompt,
      },
    ]);

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error("No content in response");
    }

    let parsed;
    try {
      parsed = JSON.parse(responseContent);
    } catch {
      const jsonMatch = responseContent.match(/```json\n([\s\S]*?)\n```/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[1]) : null;
    }

    if (parsed?.feedback && interviewId && username) {
      try {
        await Connectiondb();
        const f = parsed.feedback;
        await InterviewFeedbackModel.findOneAndUpdate(
          { interviewId, username },
          {
            username,
            interviewId,
            rating: f.rating,
            softSkills: f.softSkills,
            summary: f.summary,
            improvementTips: f.improvementTips,
            readiness: f.readiness,
            readinessMsg: f.readinessMsg,
          },
          { upsert: true, new: true }
        );
      } catch (dbError) {
        console.error("Failed to persist feedback (non-fatal):", dbError);
      }
    }

    return NextResponse.json({
      success: true,
      feedback: parsed ?? responseContent,
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
