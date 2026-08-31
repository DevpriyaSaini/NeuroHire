"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link';
import React from 'react'
import { useLanguage } from '@/lib/i18n';

function Dash() {
  const { data } = useSession();
  const { t } = useLanguage();

  if (!data) {
    return null;
  }

  return (
    <div className=" md:w-[80vw] min-h-screen bg-gray-50 dark:bg-neutral-900 p-4 md:p-8 z-500 ml-auto max-md:mt-10">
      {/* Welcome Section */}
      <section className="mb-8">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-neutral-800 dark:text-white">
                {t("dash_welcome")}, {data.user?.username || 'User'}!
              </h1>
              <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                {t("dash_tagline")}
              </p>
            </div>
            <img 
              className="w-16 h-16 rounded-full border-2 border-white dark:border-neutral-700 shadow-md" 
              src={data.user?.image || "https://imgs.search.brave.com/ktnzS2prKG4EwzqpCUuQXqyjQUWihW7xE8HPJdW6fdg/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNTcv/ODYzLzUxNC9zbWFs/bC9zdHVubmluZy1j/bGFzc2ljLXVzZXIt/YXZhdGFyLWJhZGdl/LWljb24taXNvbGF0/ZWQtd2l0aC1ncmVl/bi1jaGVja21hcmst/aGlnaC1xdWFsaXR5/LWZyZWUtcG5nLnBu/Zw"} 
              alt="User profile" 
            />
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section>
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">{t("dash_heading")}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Interview Card */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4 flex items-center justify-center bg-orange-50 dark:bg-orange-900/20 rounded-full">
                <img 
                  src="https://imgs.search.brave.com/OnsM6Er2REkG3EiLsfqnZnwu_Ozw_sonR0yPMwlJx_0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYXJ0cy5jb20v/ZmlsZXMvNy9WaWRl/by1DYWxsLVBORy1J/bWFnZS1UcmFuc3Bh/cmVudC5wbmc" 
                  alt="Video interview" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{t("dash_start_interview_title")}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("dash_start_interview_desc")}
              </p>
              <Link href="/dashboard/create-interview-form" className="w-full max-w-xs px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors duration-300">
                {t("dash_get_started")}
              </Link >
            </div>
          </div>

          {/* Resume Job-Fit Card */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4 flex items-center justify-center bg-green-50 dark:bg-green-900/20 rounded-full">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1570/1570887.png"
                  alt="Resume scoring"
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{t("dash_resume_fit_title")}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("dash_resume_fit_desc")}
              </p>
              <Link href="/dashboard/resume-score" className="w-full max-w-xs px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-300">
                {t("dash_check_fit")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dash