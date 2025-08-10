"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import InterviewPage from "../interview-link/page";
import { SidebarDemo } from "@/components/sidebar";

interface InterviewForm {
  jobPosition: string;
  jobDescription: string;
  duration: string;
  type: string;
}

interface Question {
  question: string;
  type: string;
}

function AIgenque() {
  const router = useRouter();
  const { data } = useSession();
  const searchParams = useSearchParams();

  const username = data?.user?.username;
  const interviewId = searchParams.get("interviewId");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [simloading, setSimloading] = useState(false);
  const [showlink, setShowlink] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<InterviewForm | null>(null);

  const defaultQuestions: Question[] = [
    { question: "Tell me about yourself.", type: "Technical" },
    { question: "What are your strengths and weaknesses?", type: "Technical" },
    { question: "Why do you want this job?", type: "Technical" },
  ];

  // Fetch form data
  async function fetchFormData() {
    if (!interviewId) return;
    try {
      const response = await axios.get("/api/form", {
        params: { interviewId },
      });
      setFormData(response.data?.data || response.data); // fallback
    } catch (error) {
      console.error("Error fetching form data:", error);
      toast.error("Failed to load interview details");
    }
  }

  // Generate questions using AI
  const generateQuestions = async () => {
    if (!formData?.jobPosition || !formData?.jobDescription) {
      toast.error("Job position and description are required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.post("/api/ai-model", formData);
      console.log(data);
      
      if (!data || data.length === 0) {
        toast.info("Using default questions as fallback");
        setQuestions(defaultQuestions);
      } else {
        setQuestions(data);
      }
    } catch (error) {
      console.error("Error generating questions:", error);
      toast.error("AI failed. Using default questions.");
      setQuestions(defaultQuestions);
    } finally {
      setLoading(false);
    }
  };

  // Save questions
  async function saveQuestions() {
    if (!questions.length || !username || !interviewId) {
      toast.error("Missing required data");
      return;
    }

    setSimloading(true);

    try {
      const res = await axios.post("/api/question", {
        username,
        interviewId,
        questions: questions.map((q) => ({
          question: q.question,
          type: q.type,
        })),
      });

      if (res.data.success) {
        toast.success("Questions saved successfully");
        setShowlink(true);
      } else {
        throw new Error(res.data.message || "Failed to save questions");
      }
    } catch (error) {
      console.error("Error saving questions:", error);
      toast.error("Failed to save questions");
    } finally {
      setSimloading(false);
    }
  }

  // Load form data and generate questions
  useEffect(() => {
    if (interviewId) {
      fetchFormData();
    }
  }, [interviewId]);

  useEffect(() => {
    if (formData) {
      generateQuestions();
    }
  }, [formData]);

  return (
   <div className="flex h-screen w-full overflow-hidden">
       {/* Sidebar - fixed width */}
       <div className="h-full flex-shrink-0">
         <SidebarDemo />
       </div>
       
       {/* Main content - flexible width */}
       <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-10 ">
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center gap-3 p-6 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          <Loader2 className="w-6 h-6 text-blue-600 dark:text-blue-400 animate-spin" />
          <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Generating Interview Questions...
          </h2>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300">
          {error}
        </div>
      )}
      <h1 className="dark:text-white text-2xl font-bold ml-5 max-md:mt-2">AI-Genrated-Questions</h1>

      {/* Questions List */}
      {!showlink ? (
        <div className="space-y-6">
          <div className="space-y-4">
            {questions.map((q, i) => (
              <div 
                key={i} 
                className="p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {q.question}
                </h3>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200">
                    {q.type}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="pt-4">
            {simloading ? (
              <div className="flex justify-center">
                <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-400 animate-spin" />
              </div>
            ) : (
              <Button 
                onClick={saveQuestions}
                className="w-full md:w-auto px-6 py-3 text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transition-all"
              >
                Save and Continue →
              </Button>
            )}
          </div>
        </div>
      ) : (
        <InterviewPage interviewId={interviewId} formData={formData} />
      )}
    </div>
  </div>
</div>
  );
}

export default AIgenque;
