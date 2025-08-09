import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { generateInterviewQuestions } from '../../../../public/constant';


export async function POST(req: Request) {
    try {
        // Destructure the formData object that's being sent
        const { jobPosition, jobDescription, duration, type } = await req.json();
        
        if (!jobPosition || !jobDescription || !type) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const final_prompt = generateInterviewQuestions
            .replace('{{jobPosition}}', jobPosition)
            .replace('{{jobDescription}}', jobDescription)
            .replace('{{duration}}', duration || '30 min') 
            .replace('{{type}}', type);

        const openai = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_API_KEY ||"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",
        });

        const completion = await openai.chat.completions.create({
            model: 'anthropic/claude-3-haiku',
            messages: [
                {
                    role: 'user',
                    content: final_prompt,
                },
            ],
        });

        const responseContent = completion.choices[0]?.message?.content;
        if (!responseContent) {
            throw new Error("No response content from AI");
        }

        let questions;
        try {
            questions = JSON.parse(responseContent);
        } catch (e) {
            // If parsing fails, try to extract JSON from the response
            const jsonMatch = responseContent.match(/```json\n([\s\S]*?)\n```/);
            if (jsonMatch && jsonMatch[1]) {
                questions = JSON.parse(jsonMatch[1]);
            } else {
                throw new Error("Could not parse AI response");
            }
        }

        return NextResponse.json(questions);
        
    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}