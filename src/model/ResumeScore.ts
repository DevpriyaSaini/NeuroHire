import mongoose, { Schema } from "mongoose";

export interface INcoMatch {
  code: string;
  title: string;
  matchedSkills: string[];
  missingSkills: string[];
}

export interface IResumeScore {
  email: string;
  fitScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  summary: string;
  ncoMatches?: INcoMatch[];
  createdAt?: Date;
}

const resumeScoreSchema: Schema<IResumeScore> = new Schema(
  {
    email: { type: String, required: true, trim: true, index: true },
    fitScore: { type: Number, required: true },
    matchedSkills: [String],
    missingSkills: [String],
    suggestions: [String],
    summary: String,
    ncoMatches: [
      {
        code: String,
        title: String,
        matchedSkills: [String],
        missingSkills: [String],
      },
    ],
  },
  { timestamps: true }
);

const ResumeScoreModel =
  mongoose.models.ResumeScore || mongoose.model<IResumeScore>("ResumeScore", resumeScoreSchema);

export default ResumeScoreModel;
