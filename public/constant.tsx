
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