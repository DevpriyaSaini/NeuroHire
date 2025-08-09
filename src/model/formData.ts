import mongoose, { Schema, Model, Document } from "mongoose";
export interface IFormData extends Document {
  jobPosition: string;
  jobDescription: string;
  duration: string;
  type: string;
  interviewId: string;
  email?: string;
  createdAt?: Date;
}

const formDataSchema: Schema<IFormData> = new Schema(
  {
    jobPosition: {
      type: String,
      required: [true, "Job position is required"],
      trim: true,
      minlength: [3, "Job position must be at least 3 characters"],
      maxlength: [100, "Job position cannot exceed 100 characters"]
    },
    jobDescription: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      minlength: [10, "Job description must be at least 10 characters"],
      maxlength: [2000, "Job description cannot exceed 2000 characters"]
    },
    duration: {
      type: String,
      required: [true, "Duration is required"],
      trim: true
    },
    type: {
      type: String,
      required: [true, "Interview type is required"],
      trim: true
    },
    interviewId: {
      type: String,
      required: [true, "Interview ID is required"],
      unique: true,
      index: true
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"]
    }
  },
  {
    timestamps: true, 
  }
);

// Model creation
const formDatamodel = mongoose.models.form || mongoose.model<FormData>('form', formDataSchema);

export default formDatamodel;
