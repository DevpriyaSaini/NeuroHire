import { NextRequest, NextResponse } from "next/server";
import { feedback } from "../../../../public/constant";
import { json } from "stream/consumers";
import OpenAI from 'openai';

 export async function POST(req:NextRequest) {
    const {conversation}=await req.json();
    const final_promt=feedback.replace('{{conversation}}',JSON.stringify(conversation))
    try {
       const openai = new OpenAI({
                  baseURL: 'https://openrouter.ai/api/v1',
                  apiKey: process.env.OPENROUTER_API_KEY,
              });
        const completion = await openai.chat.completions.create({
            model: 'google/gemini-2.0-flash-exp:free',
            messages: [
                {
                    role: 'user',
                    content: final_promt,
                },
            ],
        });

        const responseContent = completion.choices[0]?.message?.content;
    } catch (error) {
      console.log(error);
     return NextResponse.json(error);
      
    }
 }