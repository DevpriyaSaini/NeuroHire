"use client"
import React from 'react'
import Vapi from '@vapi-ai/web';






function page() {
  const vapi = new Vapi(process.env.VAPI_API_PUBLIC_KEY!);


  return (
    <div>page</div>
  )
}

export default page