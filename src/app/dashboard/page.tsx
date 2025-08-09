
import Dash from '@/components/dash'
import { SidebarDemo } from '@/components/sidebar'
import React from 'react'

function page() {
  return (

   <div className='flex gap-1'>
     <SidebarDemo/>
     
    <Dash />
   </div>
  

  )
}

export default page