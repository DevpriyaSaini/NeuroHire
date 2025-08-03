"use client";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface InterviewForm {
  role: string;
  description: string;
  duration: string;
  type: string;
}

function Formpage() {
  const router = useRouter();
  const [formData, setFormData] = useState<InterviewForm>({
    role: "",
    description: "",
    duration: "",
    type: ""
  });

  const interviewTypes = [
    { title: "Technical", value: "technical" },
    { title: "Behavioral", value: "behavioral" },
    { title: "Experience", value: "experience" },
    { title: "Problem-solving", value: "problem-solving" },
    { title: "Leadership", value: "leadership" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeSelect = (type: string) => {
    setFormData(prev => ({ ...prev, type }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 -mt-5">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700">
            <div className="flex gap-5 items-center">
              <ArrowLeft 
                className="mr-2 h-7 w-7 dark:text-white cursor-pointer" 
                onClick={() => router.back()}
              />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                Create New Interview
              </h1>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Configure your interview settings and generate tailored questions
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8 space-y-3">
            {/* Job Position */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Job position
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Input
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder="e.g. Senior Frontend Developer"
                className="mt-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* Job Description */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Job description
                <span className="text-red-500 ml-1">*</span>
              </label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the role, responsibilities, and required skills..."
                className="mt-1 min-h-[100px] dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* Interview Duration */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                Interview duration
              </label>
              <Select
                value={formData.duration}
                onValueChange={(value) => setFormData(prev => ({ ...prev, duration: value }))}
              >
                <SelectTrigger className="w-full sm:w-[200px] dark:bg-gray-600 dark:border-gray-600 dark:text-white">
                  <SelectValue placeholder="Select duration" className="dark:text-gray-100" />
                </SelectTrigger>
                <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                  {[5, 15, 20, 30, 45, 60].map((minutes) => (
                    <SelectItem
                      key={minutes}
                      value={`${minutes} min`}
                      className="dark:hover:bg-gray-600"
                    >
                      {minutes} minutes
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Interview Types */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Interview focus areas
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {interviewTypes.map((type) => (
                  <div
                    key={type.value}
                    onClick={() => handleTypeSelect(type.value)}
                    className={`relative p-2 rounded-lg border-2 cursor-pointer transition-all
                      ${formData.type === type.value 
                        ? "border-blue-500 dark:border-blue-400 bg-blue-100 dark:bg-blue-900/70"
                        : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"}`}
                  >
                    <div className="flex flex-col items-center text-center">
                      <span className="text-2xl mb-2">{
                        type.value === "technical" ? "💻" :
                        type.value === "behavioral" ? "🧠" :
                        type.value === "experience" ? "📅" :
                        type.value === "problem-solving" ? "🧩" : "👥"
                      }</span>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        {type.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="pt-6 flex justify-start">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-lg font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-700 dark:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 shadow-lg hover:shadow-xl transition-all"
                onClick={() => console.log(formData)}
              >
                Generate Questions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Formpage;