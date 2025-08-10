
import Dash from '@/components/dash'
import { SidebarDemo } from '@/components/sidebar'
import React from 'react'

function page() {
  return (

   <div className="flex h-screen w-full overflow-hidden">
     {/* Sidebar - fixed width */}
     <div className="h-full flex-shrink-0">
       <SidebarDemo />
     </div>
     
     {/* Main content - flexible width */}
     <div className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ">
      <Dash/>
      </div>
      </div>
  

  )
}

export default page