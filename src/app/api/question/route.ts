import { Connectiondb } from "@/lib/dbconnect";
import QuestionModel from "@/model/Question";
import { NextRequest, NextResponse } from "next/server";

interface Question {
  question: string;
  type: string;
}

interface Interview {
  username: string;
  interviewId: string;
  questions: Question[];
  createdAt: Date;
}

export async function POST(request: NextRequest) {
  await Connectiondb();
  
  try {
    const { username, questions, interviewId } = await request.json();
    console.log("Received data:", { username, interviewId, questions });

    // Validate input
    if (!username || !interviewId) {
      return NextResponse.json(
        { success: false, message: "Username and Interview ID are required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json(
        { success: false, message: "Questions array must not be empty" },
        { status: 400 }
      );
    }

    // Validate each question
    const invalidQuestions = questions.filter(
      q => !q.question || typeof q.question !== 'string' || !q.type
    );
    
    if (invalidQuestions.length > 0) {
      console.log("no questions");
      
      return NextResponse.json(
        { 
          success: false, 
          message: "Each question must have 'question' text and 'type'",
          invalidQuestions
        },
        { status: 400 }
      );
    }

    // Create new interview record
    const savedInterview = await QuestionModel.create({
      username,
      interviewId,
      questions,
      createdAt: new Date()
    });

    return NextResponse.json({
      success: true,
      message: "Interview saved successfully",
      data: savedInterview
    }, { status: 201 });

  } catch (error: any) {
    console.error("Detailed save error:", error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      console.log(error);
      
      return NextResponse.json(
        { 
          success: false, 
          message: "Validation failed",
          errors: error.errors 
        },
        { status: 400 }
      );
    }
    
    // Handle duplicate interviewId
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          message: "Interview ID already exists",
          error: error.keyValue 
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: "Internal server error",
        error: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  await Connectiondb();
  
  try {
    const { searchParams } = new URL(request.url);
    const interviewId = searchParams.get('interviewId');
    
    if (!interviewId) {
      return NextResponse.json(
        { success: false, message: "Interview ID is required" },
        { status: 400 }
      );
    }

    const interview = await QuestionModel.findOne({ interviewId });
    
    if (!interview) {
      return NextResponse.json(
        { success: false, message: "Interview not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: interview
    });

  } catch (error: any) {
    console.error("Error fetching interview:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}