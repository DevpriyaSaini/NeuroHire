"use client";
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import InterviewPage from '../interview-link/page';


function AIgenque({ formData }: { formData: any }) {
    const router=useRouter();
    const {data}=useSession();
    const [questions, setQuestions] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const[simloading,setSimloading]=useState(false)
    const[showlink,setshowlink]=useState(false);
    const [error, setError] = useState<string | null>(null);
   const[interviewId,setinterviewId]=useState("")
 const username=data?.user.username;
 console.log(username);

    async function random() {
    try {
      const res=await fetch("https://www.uuidtools.com/api/generate/v4/count/1");
      const data=await res.json();
     setinterviewId(data);
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
   random();
  },[]);

  useEffect(()=>{
    console.log(interviewId);
  },[interviewId])
  
 
    async function questionhandle() {
        setSimloading(true)
        setError(null);

        const questionsToSave = questions.length > 0 
            ? questions 
            : await generateQuestionList();

        if (!questionsToSave || questionsToSave.length === 0) {
            toast.error("No questions to save");
            return;
        }

        try {
            if(!questions||!username){
                toast("all fields are required")
            }
            const res = await axios.post("/api/question", {
  username,
  interviewId: interviewId[0], // Make sure this is the string, not array
  questions: questions.map(q => ({
    question: q.question,  // Change 'question' to 'text' to match schema
    type: q.type
  }))
});;
        if (res.data.success) {
            toast.success("Questions saved successfully");
            setshowlink(true);
        } else {
            throw new Error(res.data.message || "Failed to save");
        }

        } catch (error) {
            setError("Failed to generate questions");
            toast.error("Failed to generate interview questions");
           
        }
        
    }
    
    const generateQuestionList = async () => {
        setLoading(true);
        setError(null);
        try {
            
            const { data } = await axios.post("/api/ai-model", formData);
           
            
            setQuestions(data);
        } catch (error) {
            console.error("Error generating questions:", error);
            setError("Failed to generate questions");
            toast.error("Failed to generate interview questions");
        } finally {
            setLoading(false);
        }
    };
   
    useEffect(() => {
        if (formData?.jobPosition && formData?.jobDescription) {
            generateQuestionList();
           
        }
    }, [formData]);
     console.log("data",questions);

    return (
        <div className="space-y-4">
            {loading && (
                <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />
                    <h2>Generating Interview Questions</h2>
                </div>
            )}
            
            {error && (
                <div className="text-red-500">{error}</div>
            )}
            
            {!showlink?
           <div>
             <div className="space-y-2">
                {questions.map((q, i) => (
                    <div key={i} className="p-4 border rounded-lg dark:border-gray-700">
                        <h3 className="font-medium">{q.question}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Type: {q.type}
                        </p>
                    </div>
                ))}
            </div>
            {simloading?<Loader2/>:
               <Button onClick={questionhandle}>Save and next</Button>
            }
           
           </div>:
           <InterviewPage interviewId={interviewId} formData={formData}/>
           }
        </div>
    );
}

export default AIgenque;

