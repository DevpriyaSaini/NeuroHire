"use client"
import { SidebarDemo } from '@/components/sidebar';
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react'

function page() {
  const [roomName, setRoomName] = React.useState('');
  const router=useRouter()
  const handlebutton = useCallback(() => {
    if (roomName) {
      router.push(`/dashboard/room/${roomName}`);
    }
  },[roomName])
    return (
 <div className="h-screen flex flex-col md:flex-row">
  {/* Sidebar */}
  <div className="h-20 md:h-full md:w-64 shadow-lg bg-white dark:bg-gray-900">
    <SidebarDemo />
  </div>

  {/* Main Content */}
  <div
    className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 max-md:-mt-20
               p-6 flex flex-col items-center justify-center 
               bg-[url('https://imgs.search.brave.com/XVm4N-9_IPf0CY_3y__Byqg_zh9LT4NRZUGQ-o0gO5w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/ZnV0dXJpc3RpYy1n/bG9iYWwtbmV0d29y/ay10ZWNobm9sb2d5/XzUzODc2LTk3Mzk2/LmpwZz9zZW10PWFp/c19oeWJyaWQmdz03/NDA')]
              dark:bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')]
               bg-cover bg-center bg-no-repeat bg-fixed"
  >
   <div className="w-full flex justify-center mb-auto">
  <h1 className="text-3xl font-bold text-black dark:text-white border-b-4 border-indigo-500 pb-2 px-4 inline-block">
    Enter the Room ID and Start Interview
  </h1>
</div>

    <div className="w-full max-w-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-xl rounded-xl p-8 space-y-6 border border-gray-200 dark:border-gray-700 mb-auto z-0">
     
      {/* Headline */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Join Your <span className="text-indigo-600">Coding Room</span>
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Collaborate, code, and innovate together in real-time 🚀
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4 -z-10">
        <Input
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter Room Name"
          className="border-2 border-gray-300 focus:border-indigo-500 dark:focus:border-indigo-400 dark:bg-gray-800"
        />
        <Button
          onClick={handlebutton}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-300"
        >
          Click Here
        </Button>
      </div>
    </div>
  </div>
</div>


  )
}

export default page