
export const generateInterviewQuestions = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobPosition}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

➤ Your task:
1. Analyze the job description to identify key responsibilities, required skills, and expected experience.
2. Generate a list of interview questions based on the interview duration.
3. Adjust the number and depth of questions to match the interview duration.
4. Ensure the questions match the tone and structure of a real-life {{type}} interview.

➤ Format your response in JSON format with array list of questions.
format: 
[
  {
    "question": "Question text here",
    "type": "Technical/Behavioral/Experience/Problem-Solving/Leadership"
  },
  ...
]`;


export const resumeJobFitPrompt = `You are a career coach helping a job seeker understand how well their resume
fits a target job. Compare the resume text against the job description below.

Resume:
{{resumeText}}

Target Job Description:
{{jobDescription}}

Additionally, compare the resume against this curated list of official Indian occupation classifications
(NCO codes, Ministry of Labour & Employment). Identify the top 3 occupations from this list that the
candidate is the best fit for, based on overlapping skills/keywords. Only pick from this list, do not invent
codes or titles:

{{ncoList}}

For each of the top 3 NCO matches, list which of that occupation's keywords the resume shows evidence of
("matchedSkills") and which are missing ("missingSkills").

Analyze both comparisons and respond strictly in this JSON format:
{
  "fitScore": 72,
  "matchedSkills": ["skill 1", "skill 2"],
  "missingSkills": ["skill 1", "skill 2"],
  "suggestions": ["specific suggestion 1", "specific suggestion 2"],
  "summary": "<2-3 line plain-language summary of the fit>",
  "ncoMatches": [
    {
      "code": "331",
      "title": "Cashiers",
      "matchedSkills": ["skill 1"],
      "missingSkills": ["skill 2"]
    }
  ]
}

fitScore must be an integer from 0-100 representing overall job fit. Be honest and specific, referencing
actual skills/keywords found or missing, not generic advice.`;

export const feedback=`{{conversation}}
This is a transcript of a mock interview practice session between an AI interviewer and a job seeker
preparing for real interviews. You are an interview coach, not a hiring manager.

Based on the conversation:
1. Rate the candidate out of 10 for: Technical Skills, Communication, Problem Solving, Experience.
2. Rate their soft skills out of 10 for: Confidence (tone, hesitation), Clarity (how clearly answers were structured),
   Engagement (enthusiasm, active listening cues in the transcript).
3. Write a 3-line summary of how the practice session went.
4. Give 2-4 short, specific, actionable tips to improve before a real interview (e.g. "Use the STAR method for
   behavioral questions", "Avoid one-word answers, add examples").
5. Give an overall readiness verdict: "Ready" or "Needs More Practice", with a short encouraging message —
   never a hire/reject decision, this is self-practice only.

Respond strictly in this JSON format:
{
  "feedback": {
    "rating": {
      "technicalSkills": 5,
      "communication": 6,
      "problemSolving": 4,
      "experience": 7
    },
    "softSkills": {
      "confidence": 6,
      "clarity": 7,
      "engagement": 6
    },
    "summary": "<3 lines>",
    "improvementTips": ["tip 1", "tip 2"],
    "readiness": "Ready",
    "readinessMsg": ""
  }
}
`