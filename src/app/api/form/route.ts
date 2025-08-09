import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import formDatamodel from "@/model/formData";
import { authOptions } from "../auth/[...nextauth]/options";
import { Connectiondb } from "@/lib/dbconnect";

export async function POST(request: Request) {
  await Connectiondb();

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const formData = body.formData;

    console.log("Received formData:", JSON.stringify(formData));

    const { jobPosition, jobDescription, duration, type, interviewId } = formData;

    if (!jobPosition || !jobDescription || !type || !interviewId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    try {
      const newForm = await formDatamodel.create({
        email: session.user.email,
        ...formData,
      });

      return NextResponse.json({ success: true, interviewId: newForm.interviewId }, { status: 200 });
    } catch (mongooseError: any) {
      console.error("Mongoose Error:", mongooseError);
      return NextResponse.json({ error: mongooseError.message }, { status: 500 });
    }
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const interviewId = searchParams.get("interviewId");

    if (!interviewId) {
      return NextResponse.json(
        { error: "interviewId is required" },
        { status: 400 }
      );
    }

    const formData = await formDatamodel.findOne({ interviewId });
    if (!formData) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { data: formData },
      { status: 200 }
    );

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}