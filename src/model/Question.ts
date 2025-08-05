import mongoose, { Schema } from "mongoose";

export interface IQuestionItem {
  question: string;  // Changed from 'text' to match frontend
  type: string;
}

export interface IInterview {
  username: string;
  date?: Date;
  interviewId: string;
  questions: IQuestionItem[];
}

const questionSchema: Schema<IInterview> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true
  },
  date: {
    type: Date,
    default: Date.now  // Removed parentheses to get current date on creation
  },
  interviewId: {
    type: String,
    required: [true, "Interview ID is required"],
    unique: true
  },
  questions: [{
    question: {  // Changed from 'text' to match frontend
      type: String,
      required: [true, "Question text is required"],
      trim: true
    },
    type: {
      type: String,
      required: [true, "Question type is required"],
      enum: ["Technical", "Behavioral", "Problem-Solving", "Experience", "Leadership"],
      default: "Technical"
    }
  }]
}, { timestamps: true });

const QuestionModel = mongoose.models.Interview || mongoose.model<IInterview>('Interview', questionSchema);
export default QuestionModel;