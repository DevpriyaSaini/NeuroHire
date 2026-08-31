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
import axios from "axios";
import { toast } from "sonner";
import { SidebarDemo } from "@/components/sidebar";
import { useLanguage } from "@/lib/i18n";

interface InterviewForm {
  jobPosition: string;
  jobDescription: string;
  duration: string;
  type: string;
}

function Formpage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [formData, setFormData] = useState<InterviewForm>({
    jobPosition: "",
    jobDescription: "",
    duration: "30 min", // Default value
    type: "",
  });
  const [loading, setLoading] = useState(false);

  const interviewTypes = [
    { title: "Technical", value: "technical" },
    { title: "Behavioral", value: "behavioral" },
    { title: "Experience", value: "experience" },
    { title: "Problem-solving", value: "problem-solving" },
    { title: "Leadership", value: "leadership" },
  ];

  async function handleSubmit() {
    
    // Validate required fields
    if (!formData.jobPosition || !formData.jobDescription || !formData.type) {
      toast.error("Please fill all required fields (marked with *)");
      return;
    }
    if (formData.jobPosition.trim().length < 3) {
      toast.error("Job position must be at least 3 characters");
      return;
    }
    if (formData.jobDescription.trim().length < 10) {
      toast.error("Job description must be at least 10 characters");
      return;
    }

    setLoading(true);
    try {
      // Generate interview ID (or use your existing logic)
      const interviewId = crypto.randomUUID();

      console.log("formData: " + formData)

      const response = await axios.post("/api/form", {
        formData: {
          ...formData,
          interviewId,
        },
      });

      if (response.status === 200) {
        toast.success("Interview setup complete!");
        router.push(`/dashboard/AI-genrated-question?interviewId=${interviewId}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error || "Failed to save interview details"
        : "Failed to save interview details";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeSelect = (type: string) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  return (
   
 <div className="flex h-screen w-full overflow-hidden">
  {/* Sidebar - fixed width */}
  <div className="h-full flex-shrink-0">
    <SidebarDemo />
  </div>
  
  {/* Main content - flexible width */}
  <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-green-50 dark:from-gray-700 dark:to-gray-700">
          <div className="flex items-center">
            <ArrowLeft
              className="h-6 w-6 dark:text-white cursor-pointer mr-4"
              onClick={() => router.back()}
            />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                {t("form_title")}
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                {t("form_subtitle")}
              </p>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Job Position */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("form_job_position")} <span className="text-red-500">*</span>
            </label>
            <Input
              name="jobPosition"
              value={formData.jobPosition}
              onChange={handleInputChange}
              placeholder="e.g. Frontend Developer"
              className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("form_job_description")} <span className="text-red-500">*</span>
            </label>
            <Textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleInputChange}
              placeholder="Describe the role, responsibilities, and required skills..."
              className="w-full min-h-[120px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Interview Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("form_duration")}
            </label>
            <Select
              value={formData.duration}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, duration: value }))
              }
            >
              <SelectTrigger className="w-full sm:w-[200px] dark:bg-gray-700 dark:border-gray-600">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700 dark:border-gray-600">
                {[5, 15, 30, 45, 60].map((minutes) => (
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

          {/* Interview Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("form_focus_areas")} <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {interviewTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => handleTypeSelect(type.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.type === type.value
                      ? "border-orange-500 bg-orange-50 dark:border-orange-400 dark:bg-orange-900/30"
                      : "border-gray-200 hover:border-green-300 dark:border-gray-600 dark:hover:border-green-500"
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="text-2xl mb-1">
                      {type.value === "technical" ? "💻" : 
                       type.value === "behavioral" ? "🧠" :
                       type.value === "experience" ? "📅" :
                       type.value === "problem-solving" ? "🧩" : "👥"}
                    </span>
                    <span className="font-medium text-sm">{type.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              size="lg"
              className="w-full py-4 text-md font-medium bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 shadow-lg"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin">🌀</span>
                  Processing...
                </span>
              ) : (
                <>
                  {t("form_generate")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default Formpage;