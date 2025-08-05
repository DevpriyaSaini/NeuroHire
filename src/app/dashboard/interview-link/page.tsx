"use client"
import React from 'react';
import { CheckCircle, Copy, Clock, Calendar, Mail, MessageSquare, Slack } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

function InterviewPage({interviewId}:any) {
  const interviewLink = `http://localhost:3000/dashboard/interview-link/${interviewId}`;
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(interviewLink);
    toast('Link copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        {/* Header Section */}
        <div className="flex items-start mb-8">
          <div className="bg-green-100 p-2 rounded-full mr-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Your AI Interview is Ready!</h1>
            <p className="text-gray-600 mt-1">
              Share this link with your candidates to start the interview process
            </p>
          </div>
        </div>

        {/* Interview Link Section */}
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Interview Link</p>
              <p className="text-blue-600 font-medium break-all">{interviewLink}</p>
            </div>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-1 bg-white px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
            >
              <Copy className="h-4 w-4 text-gray-600" />
              <span className="text-sm">Copy Link</span>
            </button>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>30 Minutes</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            <span>10 Questions</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Expires: Nov 20, 2025</span>
          </div>
        </div>

        {/* Share Options */}
        <div className="mb-8">
          <p className="text-sm font-medium text-gray-500 mb-3">Share via</p>
          <div className="flex gap-4">
            <button className="flex items-center justify-center p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200">
              <Mail className="h-5 w-5" />
            </button>
            <button className="flex items-center justify-center p-3 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200">
              <Slack className="h-5 w-5" />
            </button>
            <button className="flex items-center justify-center p-3 rounded-full bg-green-100 text-green-600 hover:bg-green-200">
              <MessageSquare className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/dashboard" className="flex-1">
            <button className="w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              Back to Dashboard
            </button>
          </Link>
          <Link href="/create-interview" className="flex-1">
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              + Create New Interview
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InterviewPage;