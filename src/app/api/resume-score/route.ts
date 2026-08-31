import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { resumeJobFitPrompt } from "../../../../public/constant";
import { createChatCompletion } from "@/lib/openrouter";
import { ncoOccupations } from "@/data/ncoOccupations";
import { authOptions } from "../auth/[...nextauth]/options";
import { Connectiondb } from "@/lib/dbconnect";
import ResumeScoreModel from "@/model/ResumeScore";

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const resumeFile = form.get("resume");
    const jobDescription = form.get("jobDescription");

    if (!(resumeFile instanceof File)) {
      return NextResponse.json({ error: "Resume file is required" }, { status: 400 });
    }
    if (typeof jobDescription !== "string" || !jobDescription.trim()) {
      return NextResponse.json({ error: "Job description is required" }, { status: 400 });
    }
    if (resumeFile.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: "Resume file is too large (max 5MB)" }, { status: 400 });
    }
    if (resumeFile.type !== "application/pdf") {
      return NextResponse.json({ error: "Only PDF resumes are supported" }, { status: 400 });
    }

    const buffer = Buffer.from(await resumeFile.arrayBuffer());
    const pdfParse = (await import("pdf-parse")).default;
    const parsed = await pdfParse(buffer);
    const resumeText = parsed.text.trim();

    if (!resumeText) {
      return NextResponse.json(
        { error: "Could not extract text from this PDF" },
        { status: 400 }
      );
    }

    const ncoList = ncoOccupations
      .map((o) => `${o.code} - ${o.title}: ${o.keywords.join(", ")}`)
      .join("\n");

    const finalPrompt = resumeJobFitPrompt
      .replace("{{resumeText}}", resumeText.slice(0, 8000))
      .replace("{{jobDescription}}", jobDescription.slice(0, 4000))
      .replace("{{ncoList}}", ncoList);

    const completion = await createChatCompletion([{ role: "user", content: finalPrompt }]);

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("No response content from AI");
    }

    let result;
    try {
      result = JSON.parse(responseContent);
    } catch {
      const jsonMatch = responseContent.match(/```json\n([\s\S]*?)\n```/);
      if (jsonMatch && jsonMatch[1]) {
        result = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error("Could not parse AI response");
      }
    }

    try {
      const session = await getServerSession(authOptions);
      if (session?.user?.email) {
        await Connectiondb();
        await ResumeScoreModel.create({
          email: session.user.email,
          fitScore: result.fitScore,
          matchedSkills: result.matchedSkills,
          missingSkills: result.missingSkills,
          suggestions: result.suggestions,
          summary: result.summary,
          ncoMatches: result.ncoMatches,
        });
      }
    } catch (dbError) {
      console.error("Failed to persist resume score (non-fatal):", dbError);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Resume score API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
