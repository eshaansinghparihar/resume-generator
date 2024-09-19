export default function getTailorResumePrompt(jobDescription, resumeData){
const prompt = `
You are a seasoned HR professional with expertise in crafting ATS-compliant resumes. 
Your task is to create a tailored resume based on the following job description and my resume data. 
Focus on highlighting relevant skills, experiences and soft skills that align with the job description, ensuring that the final output is optimized for Applicant Tracking Systems (ATS).

Job Description:
"${jobDescription}"

Resume Data:
${JSON.stringify(resumeData)}

Please provide only the HTML resume without any additional text or explanations. 
The resume should include the following sections:
- Contact Information
- Summary
- Education
- Experience
- Skills
- Projects
- Certifications
- Achievements

Use the following styles:
- Headings: 10pt
- Body text: 9pt
- Body margin: 20px
- Ensure that the resume fits a single page and does not require scrolling.

Make sure to use clear and concise language, include relevant keywords from the job description, and ensure proper formatting for ATS compatibility.The total word count should be less than 700 words.
`;
return prompt;
}