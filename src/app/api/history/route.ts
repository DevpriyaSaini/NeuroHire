import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import { Connectiondb } from "@/lib/dbconnect";
import InterviewFeedbackModel from "@/model/InterviewFeedback";
import formDatamodel from "@/model/formData";
import ResumeScoreModel from "@/model/ResumeScore";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await Connectiondb();

    const username = session.user.username;
    const email = session.user.email;

    const feedbacks = await InterviewFeedbackModel.find({ username })
      .sort({ createdAt: -1 })
      .lean();

    const interviewIds = feedbacks.map((f) => f.interviewId);
    const formDataRecords = await formDatamodel
      .find({ interviewId: { $in: interviewIds } })
      .lean();
    const formDataById = new Map(formDataRecords.map((f) => [f.interviewId, f]));

    const interviews = feedbacks.map((f) => ({
      interviewId: f.interviewId,
      jobPosition: formDataById.get(f.interviewId)?.jobPosition || "Unknown role",
      type: formDataById.get(f.interviewId)?.type || "General",
      rating: f.rating,
      softSkills: f.softSkills,
      summary: f.summary,
      readiness: f.readiness,
      createdAt: f.createdAt,
    }));

    const resumeScores = await ResumeScoreModel.find({ email })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      interviews,
      resumeScores: resumeScores.map((r) => ({
        fitScore: r.fitScore,
        summary: r.summary,
        matchedSkills: r.matchedSkills,
        missingSkills: r.missingSkills,
        ncoMatches: r.ncoMatches,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    console.error("History API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
