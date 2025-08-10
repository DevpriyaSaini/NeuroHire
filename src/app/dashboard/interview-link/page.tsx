"use client"
import React, { useState } from 'react';
import { CheckCircle, Copy, Clock, Calendar, Mail, MessageSquare, Slack } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import Linkpage from './[interviewId]/page';
import formDatamodel from '@/model/formData';
import axios from 'axios';

function InterviewPage({interviewId,formData}:any) {
  const interviewLink = `http://localhost:3000/dashboard/interview-link/${interviewId}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(interviewLink);
    toast('Link copied to clipboard!');
  };

  return (
 <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
  <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-700/30 overflow-hidden p-6 sm:p-8 transition-colors duration-300">
    {/* Header Section */}
    <div className="flex items-start mb-6 sm:mb-8">
      <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full mr-4">
        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Your AI Interview is Ready!</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Share this link with your candidates to start the interview process
        </p>
      </div>
    </div>

    {/* Interview Link Section */}
    <div className="bg-gray-100 dark:bg-gray-700/50 p-4 rounded-lg mb-6 border border-gray-200 dark:border-gray-600">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Interview Link</p>
          <p className="text-blue-600 dark:text-blue-400 font-medium break-all">
            {interviewLink}
          </p>
        </div>
        <button 
          onClick={copyToClipboard}
          className="flex-shrink-0 flex items-center gap-1 bg-white dark:bg-gray-700 px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
        >
          <Copy className="h-4 w-4 text-gray-600 dark:text-gray-300" />
          <span className="text-sm text-gray-700 dark:text-gray-200">Copy Link</span>
        </button>
      </div>
    </div>

    {/* Details Section */}
    <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6 sm:mb-8">
      <div className="flex items-center text-gray-600 dark:text-gray-300">
        <Clock className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
        <span>30 Minutes</span>
      </div>
      <div className="flex items-center text-gray-600 dark:text-gray-300">
        <CheckCircle className="h-4 w-4 mr-2 text-green-500 dark:text-green-400" />
        <span>10 Questions</span>
      </div>
      <div className="flex items-center text-gray-600 dark:text-gray-300">
        <Calendar className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
        <span>Expires: Nov 20, 2025</span>
      </div>
    </div>

    {/* Share Options */}
    <div className="mb-6 sm:mb-8">
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Share via</p>
      <div className="flex gap-3 sm:gap-4">
        <button className="flex items-center justify-center p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors">
          <Mail className="h-5 w-5" />
        </button>
        <button className="flex items-center justify-center p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors">
          <Slack className="h-5 w-5" />
        </button>
        <button className="flex items-center justify-center p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800/50 transition-colors">
          <MessageSquare className="h-5 w-5" />
        </button>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row gap-3">
      <Link href="/dashboard" className="flex-1">
        <button className="w-full py-2.5 px-4 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-200">
          Back to Dashboard
        </button>
      </Link>
      <Link href="/create-interview" className="flex-1">
        <button className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-md transition-colors">
          + Create New Interview
        </button>
      </Link>
    </div>

    {/* Join Interview Button - Centered below */}
    <div className="mt-6 text-center">
      <Link href={`/dashboard/interview-link/${interviewId}`}>
        <Button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md transition-all">
          Join Interview Now
        </Button>
      </Link>
    </div>
  </div>
</div>
   
  );
}

export default InterviewPage;