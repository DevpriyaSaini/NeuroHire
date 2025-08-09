
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


export const feedback=`{{conversation}}
Depends on this Interview Conversation between assistant and user,
Give me feedback for user interview. Give me rating out of 10 for technical Skills, 
Communication, Problem Solving, Experience. Also give me summary in 3 lines 
about the interview and one line to let me know whether is recommended 
for hire or not with msg. Give me response in JSON format

{
  feedback: {
    rating: {
      technicalSkills: 5,
      communication: 6,
      problemSolving: 4,
      experience: 7
    },
    summary: <in 3 Line>,
    Recommendation: "",
    RecommendationMsg: ""
  }
}
`