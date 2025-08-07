import mongoose, { Schema } from "mongoose";

export interface FormData{
   jobPosition: string;
  jobDescription: string;
  duration: string;
  type: string;
}
  

const formdataSchema: Schema<FormData> = new Schema({
 jobPosition: {
    type: String,
    required: [true, "jobPosition is required"],
    trim: true
  },
 jobDescription: {
    type: String,
    required: [true, "jobDescription is required"],
    trim: true
  },
  
  duration: {
    type: String,
    required: [true, "duration is required"],
    unique: true
  },
  type: {
    type: String,
    required: [true, "type is required"],
    unique: true
  },
 
}, { timestamps: true });

const formDatamodel = mongoose.models.formdata || mongoose.model<FormData>('formdata', formdataSchema);
export default formDatamodel;