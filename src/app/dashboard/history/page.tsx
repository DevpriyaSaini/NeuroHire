"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Loader2, TrendingUp, Mic, FileText } from "lucide-react";
import { SidebarDemo } from "@/components/sidebar";
import { useLanguage } from "@/lib/i18n";

interface InterviewRecord {
  interviewId: string;
  jobPosition: string;
  type: string;
  rating?: { technicalSkills?: number; communication?: number; problemSolving?: number; experience?: number };
  softSkills?: { confidence?: number; clarity?: number; engagement?: number };
  summary?: string;
  readiness?: string;
  createdAt: string;
}

interface ResumeScoreRecord {
  fitScore: number;
  summary: string;
  matchedSkills: string[];
  missingSkills: string[];
  ncoMatches?: { code: string; title: string }[];
  createdAt: string;
}

function readinessScore(rating?: InterviewRecord["rating"]) {
  if (!rating) return null;
  const values = [rating.technicalSkills, rating.communication, rating.problemSolving, rating.experience].filter(
    (v): v is number => typeof v === "number"
  );
  if (values.length === 0) return null;
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return Math.round((avg / 10) * 100);
}

export default function HistoryPage() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [interviews, setInterviews] = useState<InterviewRecord[]>([]);
  const [resumeScores, setResumeScores] = useState<ResumeScoreRecord[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const { data } = await axios.get("/api/history");
        setInterviews(data.interviews || []);
        setResumeScores(data.resumeScores || []);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const latestInterview = interviews[0];
  const latestResumeScore = resumeScores[0];
  const latestInterviewScore = readinessScore(latestInterview?.rating);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="h-full flex-shrink-0">
        <SidebarDemo />
      </div>

      <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{t("side_history")}</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Track how your mock interviews and resume fit have progressed over time.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-3 p-10">
              <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
              <span className="text-gray-600 dark:text-gray-300">Loading your history...</span>
            </div>
          ) : (
            <>
              {(latestInterviewScore !== null || latestResumeScore) && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[var(--india-green)]" />
                    Interview Readiness vs Resume Fit
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                          <Mic className="h-4 w-4" /> Latest Interview Readiness
                        </span>
                        <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                          {latestInterviewScore !== null ? `${latestInterviewScore}%` : "—"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-orange-500 h-3 rounded-full transition-all"
                          style={{ width: `${latestInterviewScore ?? 0}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1">
                          <FileText className="h-4 w-4" /> Latest Resume Fit
                        </span>
                        <span className="text-lg font-bold text-[var(--india-green)]">
                          {latestResumeScore ? `${latestResumeScore.fitScore}%` : "—"}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-[var(--india-green)] h-3 rounded-full transition-all"
                          style={{ width: `${latestResumeScore?.fitScore ?? 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  {latestInterviewScore !== null && latestResumeScore && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                      {latestInterviewScore >= latestResumeScore.fitScore
                        ? "Your interview performance is currently ahead of your resume fit — consider tailoring your resume closer to the roles you're practicing for."
                        : "Your resume fit is currently ahead of your interview performance — a bit more voice practice could close the gap."}
                    </p>
                  )}
                </div>
              )}

              <div>
                <h2 className="font-semibold text-gray-800 dark:text-white mb-3">Past Interviews</h2>
                {interviews.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 mb-3">No completed practice interviews yet.</p>
                    <Link href="/dashboard/create-interview-form" className="text-orange-600 dark:text-orange-400 font-medium hover:underline">
                      Start your first mock interview →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {interviews.map((iv) => {
                      const score = readinessScore(iv.rating);
                      return (
                        <div key={iv.interviewId} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <p className="font-medium text-gray-800 dark:text-white">{iv.jobPosition} <span className="text-xs font-normal text-gray-500 dark:text-gray-400 capitalize">· {iv.type}</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(iv.createdAt).toLocaleDateString()}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            {score !== null && (
                              <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">{score}%</span>
                            )}
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                iv.readiness === "Ready"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
                                  : "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400"
                              }`}
                            >
                              {iv.readiness || "—"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div>
                <h2 className="font-semibold text-gray-800 dark:text-white mb-3">Past Resume Scores</h2>
                {resumeScores.length === 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center border border-gray-200 dark:border-gray-700">
                    <p className="text-gray-500 dark:text-gray-400 mb-3">No resume checks yet.</p>
                    <Link href="/dashboard/resume-score" className="text-[var(--india-green)] font-medium hover:underline">
                      Check your resume fit →
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {resumeScores.map((rs, i) => (
                      <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-1 max-w-md">{rs.summary}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{new Date(rs.createdAt).toLocaleDateString()}</p>
                        </div>
                        <span className="text-lg font-bold text-[var(--india-green)]">{rs.fitScore}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
