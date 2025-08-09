"use client";
import React, { useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import { Mic, Phone, PhoneCall } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface FormData {
  email: string;
  type: string;
}

interface PageProps {
  params: {
    interviewId: string;
  };
}

function Linkpage(  { params }: PageProps) {
  const {data}=useSession();
   const username = data?.user?.username;
  const[formData,setFormData]=useState<FormData>(
   { email:"",
    type:"",}
  )
  const { interviewId } = params;
  

 async function fetchFormData() {
    if (!interviewId) return;
    try {
      const response = await axios.get("/api/form", {
        params: { interviewId },
      });
      
      setFormData(response.data?.data);
      
    } catch (error) {
      console.error("Error fetching form data:", error);
      toast.error("Failed to load interview details");
    }
  }

  useEffect(() => {
    fetchFormData();
  },[])

// fetchFormData()

  const vapiRef = React.useRef<Vapi | null>(null);
  
  const listenersRef = React.useRef<{
    callStart: () => void;
    callEnd: () => void;
    message: (message: any) => void;
  } | null>(null);

  React.useEffect(() => {
    if (!vapiRef.current) {
      vapiRef.current = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY || "21a39db0-4e25-4efc-83c2-d8bf43151758");
    }

    const vapi = vapiRef.current;

    const callStartListener = () => console.log("Call started");
    const callEndListener = () => console.log("Call ended");
    const messageListener = (message: any) => {
      if (message.type === "transcript") {
        console.log(`${message.role}: ${message.transcript}`);
      }
    };

    listenersRef.current = {
      callStart: callStartListener,
      callEnd: callEndListener,
      message: messageListener
    };

    vapi.on("call-start", listenersRef.current.callStart);
    vapi.on("call-end", listenersRef.current.callEnd);
    vapi.on("message", listenersRef.current.message);

    return () => {
      if (vapi && listenersRef.current) {
        vapi.off("call-start", listenersRef.current.callStart);
        vapi.off("call-end", listenersRef.current.callEnd);
        vapi.off("message", listenersRef.current.message);
      }
    };
  }, []);

  async function startCall() {
    try {
      if (!vapiRef.current) return;

      const { data } = await axios.get(`/api/question?interviewId=${interviewId}`);
      console.log("Fetched Questions:", data);

      const questionsArray = data?.data?.questions;
      if (!Array.isArray(questionsArray) || questionsArray.length === 0) {
        console.error("No questions found.");
        return;
      }
      const questionList = questionsArray
        .map((item) => item?.question)
        .filter(Boolean)
        .join(" ");

      const assistantConfig = {
        firstMessage: `Hi ${username}, ready for your ${formData.type} interview?`,
        model: {
          provider: "openai" as const,
          model: "gpt-4" as const,
          messages: [
            {
              role: "system" as const,
              content: `You are an AI voice assistant conducting interviews.
                Your job is to ask candidates provided interview questions, assess their responses.
                Begin with: "Hi ${username}, how are you? Ready for your interview on ${formData.type}?"
                Ask one question at a time: ${questionList}
                Keep the conversation natural and engaging.`
            }
          ],
          temperature: 0.7,
          maxTokens: 300
        },
        voice: {
          provider: "playht" as const,
          voiceId: "jennifer" as const,
        }
      };

      await vapiRef.current.start(assistantConfig);
    } catch (error) {
      console.error("Error starting call:", error);
    }
  }

  function stopCall() {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  }

  return (
    <div className="flex gap-4 items-center p-4">
      <Mic />
      <button 
        onClick={startCall} 
        className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors"
      >
        <PhoneCall />
      </button>
      <button 
        onClick={stopCall} 
        className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
      >
        <Phone />
      </button>
    </div>
  );
}
export default Linkpage;