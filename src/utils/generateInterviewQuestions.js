import fs from "fs";
import path from "path";
import getInterviewQuestionsPrompt from "../prompts/getInterviewQuestionsPrompt.js";
import getOpenAIResponse from "./getOpenAIResponse.js";

export default async function generateInterviewQuestions(resumeContent, companyName) {
    const prompt = getInterviewQuestionsPrompt(resumeContent, companyName)
    try {
        const response = await getOpenAIResponse(prompt);
        const questions = response.data.choices[0].message.content;
        const questionsFilePath = path.join('src/interview', `${companyName}_InterviewQuestions.txt`);
        fs.writeFileSync(questionsFilePath, questions);
        console.log(`Interview questions saved as ${questionsFilePath}.`);
    } catch (error) {
        console.error('Error generating interview questions:', error.response ? error.response.data : error.message);
    }
}