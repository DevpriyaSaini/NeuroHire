"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

function Dash() {
  const { data } = useSession();
  
  if (!data) {
    return null;
  }
  
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-neutral-900 p-4 md:p-8">
      {/* Welcome Section */}
      <section className="mb-8">
        <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-neutral-800 dark:text-white">
                Welcome back, {data.user?.username || 'User'}!
              </h1>
              <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                AI-driven interview platform. Let's go!
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
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Interview Card */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4 flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 rounded-full">
                <img 
                  src="https://imgs.search.brave.com/OnsM6Er2REkG3EiLsfqnZnwu_Ozw_sonR0yPMwlJx_0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYXJ0cy5jb20v/ZmlsZXMvNy9WaWRl/by1DYWxsLVBORy1J/bWFnZS1UcmFuc3Bh/cmVudC5wbmc" 
                  alt="Video interview" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Create new interview</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Create AI interviews and schedule with the candidate
              </p>
              <button className="w-full max-w-xs px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300">
                Get Started
              </button>
            </div>
          </div>

          {/* Analytics Card */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4 flex items-center justify-center bg-purple-50 dark:bg-purple-900/20 rounded-full">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/1570/1570887.png" 
                  alt="Analytics" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">View Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Track interview performance and candidate metrics
              </p>
              <button className="w-full max-w-xs px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors duration-300">
                View Dashboard
              </button>
            </div>
          </div>

          {/* Additional Card (Example) */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-4 flex items-center justify-center bg-green-50 dark:bg-green-900/20 rounded-full">
                <img 
                  src="https://cdn-icons-png.flaticon.com/512/4341/4341139.png" 
                  alt="Candidates" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Manage Candidates</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                View and manage all your candidate profiles
              </p>
              <button className="w-full max-w-xs px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors duration-300">
                View Candidates
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-8 px-4 sm:px-6 lg:px-8">
  {/* Header with responsive actions */}
  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
      Previous Created Interviews
    </h1>
    
    <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
     
      
      <button className="
        order-1 xs:order-2 sm:order-2
        px-3 py-1.5 sm:px-4 sm:py-2 
        bg-blue-600 text-white 
        rounded-md text-sm font-medium 
        hover:bg-blue-700 transition-colors 
        w-full xs:w-auto flex items-center justify-center gap-1
      ">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        <span>Create New</span>
      </button>
    </div>
  </div>

  {/* Responsive table container */}
  <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 shadow-xs">
    {/* Mobile cards view (shows on small screens) */}
    <div className="sm:hidden space-y-3 p-2">
      {[1, 2, 3].map((interview) => (
        <div key={interview} className="
          bg-white dark:bg-gray-800 
          p-4 rounded-lg border 
          border-gray-100 dark:border-gray-700
          shadow-sm
        ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Frontend Developer</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">React, TypeScript</p>
              </div>
            </div>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
              Active
            </span>
          </div>
          
          <div className="mt-3 flex items-center justify-between text-sm">
           
            <span className="text-gray-500 dark:text-gray-400">2d ago</span>
          </div>
          
          <div className="mt-3 flex justify-end gap-2">
            <button className="text-2xs rounded-2xl bg-green-900 text-amber-50 px-2 py-1">
              View
            </button>
           
          </div>
        </div>
      ))}
    </div>

    {/* Desktop table view (shows on medium+ screens) */}
    <table className="hidden sm:table w-full  divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Position
          </th>
          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Candidates
          </th>
          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Created
          </th>
          <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Status
          </th>
          <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
        {[1, 2, 3].map((interview) => (
          <tr key={interview} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">Frontend Developer</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">React, TypeScript</div>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].slice(0, 3).map((candidate) => (
                    <img
                      key={candidate}
                      className="h-8 w-8 rounded-full border-2 border-white dark:border-gray-800"
                      src={`https://randomuser.me/api/portraits/${candidate % 2 === 0 ? 'women' : 'men'}/${candidate}.jpg`}
                      alt="Candidate"
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">3</span>
              </div>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {Date.now()}
            </td>
            <td className="px-4 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400">
                Active
              </span>
            </td>
            <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-500 mr-3">
                View
              </button>
             
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Responsive pagination */}
  <div className="mt-4 flex flex-col xs:flex-row items-center justify-between gap-3">
    <div className="text-sm text-gray-500 dark:text-gray-400">
      Showing <span className="font-medium">1</span> to <span className="font-medium">3</span> of <span className="font-medium">3</span> interviews
    </div>
    <div className="flex gap-2">
      <button className="
        px-3 py-1.5 rounded-md border 
        border-gray-300 dark:border-gray-600 
        text-sm font-medium text-gray-700 dark:text-gray-300 
        bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 
        disabled:opacity-50 flex items-center gap-1
      " disabled>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden xs:inline">Previous</span>
      </button>
      <button className="
        px-3 py-1.5 rounded-md border 
        border-gray-300 dark:border-gray-600 
        text-sm font-medium text-gray-700 dark:text-gray-300 
        bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 
        flex items-center gap-1
      ">
        <span className="hidden xs:inline">Next</span>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</div>
    </div>
  )
}

export default Dash