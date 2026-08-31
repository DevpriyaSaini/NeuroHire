"use client"
import React from 'react';
import { CheckCircle, Clock, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface InterviewPageProps {
  interviewId: string | null;
  formData?: { duration?: string; type?: string } | null;
  questionCount?: number;
}

function InterviewPage({ interviewId, formData, questionCount }: InterviewPageProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-700/30 overflow-hidden p-6 sm:p-8 transition-colors duration-300">
        {/* Header Section */}
        <div className="flex items-start mb-6 sm:mb-8">
          <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Your Mock Interview is Ready!</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Practice out loud, then get instant feedback on your answers and soft skills
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6 sm:mb-8">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            <span>{formData?.duration || "30 min"}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <HelpCircle className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
            <span>{questionCount ?? 0} Questions</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500 dark:text-green-400" />
            <span className="capitalize">{formData?.type || "General"} focus</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/dashboard" className="flex-1">
            <button className="w-full py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200">
              Back to Dashboard
            </button>
          </Link>
          <Link href={`/dashboard/interview-link/${interviewId}`} className="flex-1">
            <Button className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-green-600 hover:from-orange-600 hover:to-green-700 text-white shadow-md transition-all">
              Start Practicing Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InterviewPage;