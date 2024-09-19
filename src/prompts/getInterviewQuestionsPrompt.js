export default function getInterviewQuestionsPrompt(resumeContent, companyName){
    const prompt = `
    Based on the following resume content and my skills, generate a list of potential technical and HR interview questions that an interviewer might ask for a job at ${companyName}.

    Resume Content:
    ${resumeContent}

    In addition to this also get the most commonly asked questions related to all the technologies mentioned in the resume.
    Please return a list of questions in plain text format.
    `;
    return prompt;
}
