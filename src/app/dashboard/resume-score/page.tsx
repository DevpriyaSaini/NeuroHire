"use client";
import React, { useState } from "react";
import { ArrowLeft, Loader2, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { SidebarDemo } from "@/components/sidebar";
import { useLanguage } from "@/lib/i18n";

interface NcoMatch {
  code: string;
  title: string;
  matchedSkills: string[];
  missingSkills: string[];
}

interface FitResult {
  fitScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  summary: string;
  ncoMatches?: NcoMatch[];
}

function ResumeScorePage() {
  const router = useRouter();
  const { t } = useLanguage();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FitResult | null>(null);

  async function handleSubmit() {
    if (!resumeFile) {
      toast.error("Please upload your resume as a PDF");
      return;
    }
    if (!jobDescription.trim()) {
      toast.error("Please paste the job description you're targeting");
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("jobDescription", jobDescription);

      const { data } = await axios.post("/api/resume-score", formData);
      setResult(data);
    } catch (error) {
      console.error("Resume scoring error:", error);
      const message = axios.isAxiosError(error)
        ? error.response?.data?.error || "Failed to score resume"
        : "Failed to score resume";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  const scoreColor = (score: number) =>
    score >= 70 ? "text-green-600 dark:text-green-400" : score >= 40 ? "text-amber-600 dark:text-amber-400" : "text-red-600 dark:text-red-400";

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <div className="h-full flex-shrink-0">
        <SidebarDemo />
      </div>

      <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-2xl mx-auto py-8 px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-green-50 dark:from-gray-700 dark:to-gray-700">
              <div className="flex items-center">
                <ArrowLeft
                  className="h-6 w-6 dark:text-white cursor-pointer mr-4"
                  onClick={() => router.back()}
                />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    {t("resume_title")}
                  </h1>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    {t("resume_subtitle")}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("resume_upload_label")} <span className="text-red-500">*</span>
                </label>
                <label className="flex flex-col items-center justify-center gap-2 w-full p-6 border-2 border-dashed rounded-lg cursor-pointer border-gray-300 hover:border-orange-400 dark:border-gray-600 dark:hover:border-orange-500 transition-colors">
                  <UploadCloud className="h-8 w-8 text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {resumeFile ? resumeFile.name : "Click to upload your resume (PDF only, max 5MB)"}
                  </span>
                  <input
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("resume_jd_label")} <span className="text-red-500">*</span>
                </label>
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description you're applying for..."
                  className="w-full min-h-[140px] dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <Button
                size="lg"
                className="w-full py-4 text-md font-medium bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 shadow-lg"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing your fit...
                  </span>
                ) : (
                  t("resume_check_fit")
                )}
              </Button>

              {result && (
                <div className="space-y-4 pt-2">
                  <div className="text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-700/30 border border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{t("resume_your_score")}</p>
                    <p className={`text-5xl font-bold ${scoreColor(result.fitScore)}`}>{result.fitScore}%</p>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-100 dark:border-orange-800">
                    <h3 className="font-medium mb-2 text-orange-800 dark:text-orange-200">{t("resume_summary")}</h3>
                    <p className="text-gray-700 dark:text-gray-300">{result.summary}</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-100 dark:border-green-800">
                      <h3 className="font-medium mb-2 text-green-800 dark:text-green-200">{t("resume_matched_skills")}</h3>
                      <div className="flex flex-wrap gap-2">
                        {result.matchedSkills.map((skill, i) => (
                          <span key={i} className="px-2 py-1 text-xs rounded-full bg-green-100 dark:bg-green-800/50 text-green-800 dark:text-green-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4 border border-amber-100 dark:border-amber-800">
                      <h3 className="font-medium mb-2 text-amber-800 dark:text-amber-200">{t("resume_missing_skills")}</h3>
                      <div className="flex flex-wrap gap-2">
                        {result.missingSkills.map((skill, i) => (
                          <span key={i} className="px-2 py-1 text-xs rounded-full bg-amber-100 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-100 dark:border-orange-800">
                    <h3 className="font-medium mb-2 text-orange-800 dark:text-orange-200">{t("resume_suggestions")}</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                      {result.suggestions.map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  {result.ncoMatches && result.ncoMatches.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-medium text-gray-800 dark:text-white">
                        {t("resume_nco_matches")}
                        <span className="ml-2 text-xs font-normal text-gray-500 dark:text-gray-400">
                          (National Classification of Occupations, Ministry of Labour &amp; Employment)
                        </span>
                      </h3>
                      {result.ncoMatches.map((match, i) => (
                        <div key={i} className="rounded-lg p-4 border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 text-xs font-mono font-semibold rounded bg-emerald-700 text-white">
                              NCO {match.code}
                            </span>
                            <span className="font-medium text-gray-800 dark:text-white">{match.title}</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-xs font-medium text-emerald-700 dark:text-emerald-300 mb-1">You have</p>
                              <div className="flex flex-wrap gap-1">
                                {match.matchedSkills.map((s, j) => (
                                  <span key={j} className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-800/50 text-emerald-800 dark:text-emerald-200 text-xs">{s}</span>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-amber-700 dark:text-amber-300 mb-1">Skill gaps</p>
                              <div className="flex flex-wrap gap-1">
                                {match.missingSkills.map((s, j) => (
                                  <span key={j} className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200 text-xs">{s}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                      <p className="text-xs italic text-gray-500 dark:text-gray-400">
                        Matched against a curated subset of NCO occupations, not the full national taxonomy.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeScorePage;
