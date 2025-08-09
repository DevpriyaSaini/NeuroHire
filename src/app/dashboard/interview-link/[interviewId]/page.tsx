"use client";
import React, { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import { Mic, Phone, PhoneCall, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface FormData {
  email: string;
  type: string;
}

interface PageProps {
  params: {
    interviewId: string;
  };
}

interface ConversationMessage {
  role: string;
  transcript: string;
  timestamp?: string;
}

interface FeedbackData {
  feedback?: {
    rating?: {
      technicalSkills?: number;
      communication?: number;
      problemSolving?: number;
      experience?: number;
    };
    summary?: string;
    Recommendation?: string;
    RecommendationMsg?: string;
  };
}

function Linkpage({ params }: PageProps) {
  const { data } = useSession();
  const username = data?.user?.username;
  const [formData, setFormData] = useState<FormData>({ email: "", type: "" });
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);

  const { interviewId } = params;

  async function fetchFormData() {
    if (!interviewId) return;
    try {
      const response = await axios.get("/api/form", {
        params: { interviewId },
      });
      setFormData(response.data?.data);
    } catch (error) {
      console.error("Error fetching form data:", error);
      toast.error("Failed to load interview details");
    }
  }

  useEffect(() => {
    fetchFormData();
  }, []);

  const vapiRef = React.useRef<Vapi | null>(null);
  const listenersRef = React.useRef<any>(null);

  React.useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY || "21a39db0-4e25-4efc-83c2-d8bf43151758");
    }

    const vapi = vapiRef.current;

    const callStartListener = () => {
      console.log("Call started");
      setIsCallActive(true);
      setConversation([]);
      setFeedback(null);
    };
    
    const callEndListener = () => {
      console.log("Call ended");
      setIsCallActive(false);
      if (conversation.length > 0) {
        fetchFeedback(conversation);
      }
    };
    
    const messageListener = (message: any) => {
      if (message.type === "transcript") {
        const newMessage: ConversationMessage = {
          role: message.role,
          transcript: message.transcript,
          timestamp: new Date().toISOString()
        };
        setConversation(prev => [...prev, newMessage]);
      }
    };

    listenersRef.current = {
      callStart: callStartListener,
      callEnd: callEndListener,
      message: messageListener,
    };

    vapi.on("call-start", listenersRef.current.callStart);
    vapi.on("call-end", listenersRef.current.callEnd);
    vapi.on("message", listenersRef.current.message);

    return () => {
      if (vapi && listenersRef.current) {
        vapi.off("call-start", listenersRef.current.callStart);
        vapi.off("call-end", listenersRef.current.callEnd);
        vapi.off("message", listenersRef.current.message);
      }
    };
  }, [conversation]);

  async function startCall() {
    try {
      if (!vapiRef.current) return;

      const { data } = await axios.get(`/api/question?interviewId=${interviewId}`);
      const questionsArray = data?.data?.questions;
      if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
        toast.error("No questions found for this interview");
        return;
      }
      const questionList = questionsArray
        .map((item) => item?.question)
        .filter(Boolean)
        .join(" ");

      const assistantConfig = {
        firstMessage: `Hi ${username}, ready for your ${formData.type} interview?`,
        model: {
          provider: "openai" as const,
          model: "gpt-4" as const,
          messages: [
            {
              role: "system" as const,
              content: `You are an AI voice assistant conducting interviews.
                Ask these questions: ${questionList}.
                Keep it natural and engaging.`,
            },
          ],
          temperature: 0.7,
          maxTokens: 300,
        },
        voice: {
          provider: "playht" as const,
          voiceId: "jennifer" as const,
        },
      };

      await vapiRef.current.start(assistantConfig);
    } catch (error) {
      console.error("Error starting call:", error);
      toast.error("Failed to start call");
    }
  }

  function stopCall() {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  }

  async function fetchFeedback(conversationData: ConversationMessage[]) {
    setLoadingFeedback(true);
    try {
      const response = await axios.post('/api/feedback', {
        conversation: conversationData
      });

      // Try to parse the JSON feedback if it's wrapped in markdown code blocks
      let feedbackData = response.data?.feedback;
      if (typeof feedbackData === 'string') {
        try {
          // Remove markdown code blocks if present
          feedbackData = feedbackData.replace(/```json/g, '').replace(/```/g, '').trim();
          feedbackData = JSON.parse(feedbackData);
        } catch (e) {
          console.log("Feedback is not JSON format", e);
        }
      }

      setFeedback(feedbackData || response.data);
      toast.success("Feedback generated successfully");
    } catch (error) {
      console.error("Error fetching feedback:", error);
      toast.error("Failed to generate feedback");
    } finally {
      setLoadingFeedback(false);
    }
  }

  const renderRatingStars = (rating: number = 0) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-1 text-sm font-medium text-gray-500">
          {rating.toFixed(1)}/5
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {formData.type || "Technical"} Interview
            </h1>
            <p className="mt-2 opacity-90">
              Welcome {username || "Candidate"}, let's begin your interview
            </p>
          </div>

          {/* Controls */}
          <div className="p-6 border-b">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Mic className="text-blue-600" size={24} />
                <span className="font-medium">
                  {isCallActive ? "Interview in progress" : "Ready to start"}
                </span>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={startCall}
                  disabled={isCallActive}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isCallActive
                      ? 'bg-gray-200 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  <PhoneCall size={18} />
                  <span>Start</span>
                </button>
                <button
                  onClick={stopCall}
                  disabled={!isCallActive}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    !isCallActive
                      ? 'bg-gray-200 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  <Phone size={18} />
                  <span>End</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Transcript Column */}
            <div className="lg:border-r lg:pr-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Conversation Transcript
              </h2>
              {conversation.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                  {conversation.map((msg, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-blue-50 border border-blue-100'
                          : 'bg-gray-50 border border-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-medium capitalize text-blue-700">
                          {msg.role === 'user' ? 'You' : 'Interviewer'}
                        </span>
                        {msg.timestamp && (
                          <span className="text-xs text-gray-500">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-gray-800">{msg.transcript}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">
                    {isCallActive
                      ? "Conversation will appear here..."
                      : "Start the interview to see the transcript"}
                  </p>
                </div>
              )}
            </div>

            {/* Feedback Column */}
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                Interview Feedback
              </h2>
              {loadingFeedback ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                  <p className="mt-3 text-gray-600">Analyzing your interview...</p>
                </div>
              ) : feedback ? (
                <div className="space-y-6">
                  {/* Ratings */}
                  {feedback.feedback?.rating && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium mb-3">Performance Ratings</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.entries(feedback.feedback.rating).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <div className="flex justify-between">
                              <span className="capitalize text-sm font-medium text-gray-700">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <span className="text-sm font-medium">
                                {value}/10
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${(value / 10) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Summary */}
                  {feedback.feedback?.summary && (
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <h3 className="font-medium mb-2 text-blue-800">Summary</h3>
                      <p className="text-gray-700">{feedback.feedback.summary}</p>
                    </div>
                  )}

                  {/* Recommendation */}
                  {feedback.feedback?.Recommendation && (
                    <div
                      className={`rounded-lg p-4 border ${
                        feedback.feedback.Recommendation === "Recommended"
                          ? "bg-green-50 border-green-100"
                          : "bg-amber-50 border-amber-100"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-1 rounded-full ${
                            feedback.feedback.Recommendation === "Recommended"
                              ? "bg-green-100 text-green-600"
                              : "bg-amber-100 text-amber-600"
                          }`}
                        >
                          {feedback.feedback.Recommendation === "Recommended" ? (
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">
                            {feedback.feedback.Recommendation}
                          </h3>
                          {feedback.feedback.RecommendationMsg && (
                            <p className="text-sm mt-1 text-gray-700">
                              {feedback.feedback.RecommendationMsg}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">
                    {isCallActive
                      ? "Feedback will appear after the interview ends"
                      : "Complete the interview to receive feedback"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Linkpage;