import mongoose, { Schema } from "mongoose";

export interface IInterviewFeedback {
  username: string;
  interviewId: string;
  rating?: {
    technicalSkills?: number;
    communication?: number;
    problemSolving?: number;
    experience?: number;
  };
  softSkills?: {
    confidence?: number;
    clarity?: number;
    engagement?: number;
  };
  summary?: string;
  improvementTips?: string[];
  readiness?: string;
  readinessMsg?: string;
  createdAt?: Date;
}

const interviewFeedbackSchema: Schema<IInterviewFeedback> = new Schema(
  {
    username: { type: String, required: true, trim: true },
    interviewId: { type: String, required: true, index: true },
    rating: {
      technicalSkills: Number,
      communication: Number,
      problemSolving: Number,
      experience: Number,
    },
    softSkills: {
      confidence: Number,
      clarity: Number,
      engagement: Number,
    },
    summary: String,
    improvementTips: [String],
    readiness: String,
    readinessMsg: String,
  },
  { timestamps: true }
);

const InterviewFeedbackModel =
  mongoose.models.InterviewFeedback ||
  mongoose.model<IInterviewFeedback>("InterviewFeedback", interviewFeedbackSchema);

export default InterviewFeedbackModel;
