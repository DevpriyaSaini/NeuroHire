"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

interface PageProps {
  params: Promise<{
    roomId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { roomId } = await params;
  const videoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoContainerRef.current) return;

    const initializeVideoConference = async () => {
      // Dynamic import to ensure this only runs on client side
      const { ZegoUIKitPrebuilt } = await import("@zegocloud/zego-uikit-prebuilt");
      
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        309548902, 
        "b5a173465ba229056e0457f5d1c32b88", 
        roomId, 
        Date.now().toString(), 
        "user1"
      );
      
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      
      zp.joinRoom({
        container: videoContainerRef.current,
        sharedLinks: [{
          name: 'Personal link',
          url: `${window.location.protocol}//${window.location.host}${window.location.pathname}?roomID=${roomId}`,
        }],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    };

    initializeVideoConference();
  }, [roomId]);

  return (
   <div className="w-full max-w-5xl mx-auto p-4">
  {/* Room Title */}
  <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
    Room: {roomId}
  </h1>

  {/* Video Container */}
  <div
    ref={videoContainerRef}
    className="w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex items-center justify-center max-md:flex-col"
  />
</div>

  );
}