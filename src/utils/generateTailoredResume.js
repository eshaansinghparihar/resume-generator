import getTailorResumePrompt from '../prompts/getTailorResumePrompt.js';
import getOpenAIResponse from './getOpenAIResponse.js';

export default async function generateTailoredResume(jobDescription, resumeData) {
    const prompt = getTailorResumePrompt(jobDescription, resumeData);
    try {
        const response = await getOpenAIResponse(prompt);
        let htmlContent = response.data.choices[0].message.content;
        htmlContent = htmlContent.replace(/```html|```/g, '').trim();
        return htmlContent;
    } catch (error) {
        console.error('Error generating resume:', error.response ? error.response.data : error.message);
        return null;
    }
}