"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import InterviewPage from "../interview-link/page";

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
    <div className="space-y-4">
      {loading && (
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" />
          <h2>Generating Interview Questions</h2>
        </div>
      )}

      {error && <div className="text-red-500">{error}</div>}

      {!showlink ? (
        <div>
          <div className="space-y-2">
            {questions.map((q, i) => (
              <div key={i} className="p-4 border rounded-lg dark:border-gray-700">
                <h3 className="font-medium">{q.question}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Type: {q.type}
                </p>
              </div>
            ))}
          </div>
          {simloading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Button onClick={saveQuestions}>Save and next</Button>
          )}
        </div>
      ) : (
        <InterviewPage interviewId={interviewId} formData={formData} />
      )}
    </div>
  );
}

export default AIgenque;
